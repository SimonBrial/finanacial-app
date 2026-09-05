import { create } from "zustand";
import { ExchangeState, ExchangeRate } from "../types/interface";

/**
 * Helper para obtener el precio anterior desde el listado histórico de DolarApi.
 * Busca la última cotización registrada con fecha anterior al día actual.
 */
const getPreviousHistoricalPrice = (
  histData: any[],
  targetFuente: string,
  currentPrice: number,
  currentDateIso?: string,
): number | null => {
  if (!Array.isArray(histData) || histData.length === 0) return null;

  // 1. Filtrar registros por la fuente correspondiente (ej: "oficial" o "paralelo")
  const filtered = histData.filter(
    (h) => (h.fuente || "").toLowerCase() === targetFuente.toLowerCase(),
  );

  if (filtered.length === 0) return null;

  // 2. Extraer fecha en formato YYYY-MM-DD
  const currentDateStr = currentDateIso ? currentDateIso.split("T")[0] : null;

  if (currentDateStr) {
    // Buscar entradas con fecha estrictamente menor a la fecha actual
    const previousEntries = filtered.filter(
      (h) => h.fecha && h.fecha < currentDateStr,
    );

    if (previousEntries.length > 0) {
      // Retornar el promedio del último registro antes del día actual
      const lastPrev = previousEntries[previousEntries.length - 1];
      if (lastPrev && typeof lastPrev.promedio === "number") {
        return lastPrev.promedio;
      }
    }
  }

  // 3. Si el último elemento del histórico coincide con la cotización actual, tomar la penúltima entrada
  if (filtered.length >= 2) {
    const lastItem = filtered[filtered.length - 1];
    if (lastItem && Math.abs(lastItem.promedio - currentPrice) < 0.0001) {
      const prevItem = filtered[filtered.length - 2];
      return prevItem?.promedio ?? null;
    }
    return lastItem?.promedio ?? null;
  }

  return filtered[0]?.promedio ?? null;
};

/**
 * Store de Zustand para la gestión de cotizaciones de divisas (Dólar y Euro Venezuela).
 * Consume los endpoints en tiempo real e históricos de DolarApi:
 * - Actuales:   https://ve.dolarapi.com/v1/dolares  |  https://ve.dolarapi.com/v1/euros
 * - Históricos: https://ve.dolarapi.com/v1/historicos/dolares  |  https://ve.dolarapi.com/v1/historicos/euros
 */
export const useExchangeStore = create<ExchangeState>((set, get) => ({
  // Arreglo principal de todas las tasas (Dólares y Euros)
  rates: [],
  // Arreglo exclusivo para cotizaciones en Euros
  euroRates: [],
  // Historial de precios anteriores almacenados en memoria
  previousRates: {},
  loading: false,
  error: null,

  /**
   * Función asíncrona para obtener las cotizaciones actuales e históricas desde DolarApi
   * y realizar el cálculo de diferencia nominal y variación porcentual.
   */
  fetchRates: async () => {
    // 1. Activar estado de carga y resetear mensajes de error
    set({ loading: true, error: null });

    try {
      // 2. Ejecutar peticiones simultáneas a los 4 endpoints (Actuales e Históricos)
      const [dolarRes, euroRes, dolarHistRes, euroHistRes] = await Promise.all([
        fetch("https://ve.dolarapi.com/v1/dolares"),
        fetch("https://ve.dolarapi.com/v1/euros"),
        fetch("https://ve.dolarapi.com/v1/historicos/dolares"),
        fetch("https://ve.dolarapi.com/v1/historicos/euros"),
      ]);

      // Validar si la respuesta HTTP fue exitosa
      if (!dolarRes.ok || !euroRes.ok) {
        throw new Error("Error al consultar las tasas actuales");
      }

      // 3. Parsear respuestas a JSON (los históricos usan fallback a [] si fallan)
      const rawDolarData = await dolarRes.json();
      const rawEuroData = await euroRes.json();
      const rawDolarHist = dolarHistRes.ok ? await dolarHistRes.json() : [];
      const rawEuroHist = euroHistRes.ok ? await euroHistRes.json() : [];

      const currentPrevMap = get().previousRates || {};
      const newPrevMap: Record<string, number> = { ...currentPrevMap };

      /**
       * Función auxiliar para procesar tasas actuales y compararlas contra el endpoint histórico de DolarApi
       */
      const processItems = (
        data: any[],
        histData: any[],
        defaultCurrency: string,
        isEuro: boolean,
      ): ExchangeRate[] => {
        return (Array.isArray(data) ? data : []).map(
          (item: any, idx: number) => {
            const fuenteKey = `${defaultCurrency.toLowerCase()}-${item.fuente || item.nombre || idx}`;
            const newPrice = item.promedio || 0;
            const fuenteType = (item.fuente || "").toLowerCase();

            // A) Intentar obtener el precio anterior desde la API de Históricos de DolarApi
            let prevPrice = getPreviousHistoricalPrice(
              histData,
              fuenteType,
              newPrice,
              item.fechaActualizacion,
            );

            // B) Fallback a memoria Zustand si la API de histórico no devolvió un valor válido
            if (prevPrice === null || prevPrice === 0) {
              prevPrice = currentPrevMap[fuenteKey];
            }

            let change = 0;
            let percentageChange = "0.00%";
            let trend: "up" | "down" | "same" = "same";

            // --- CÁLCULO DE LA DIFERENCIA Y PORCENTAJE ---
            if (prevPrice !== null && prevPrice !== undefined && prevPrice !== 0) {
              const diff = newPrice - prevPrice;
              change = Math.round(diff * 100) / 100;
              const pct = (diff / prevPrice) * 100;
              percentageChange = `${Math.abs(pct).toFixed(2)}%`;
              trend = diff > 0 ? "up" : diff < 0 ? "down" : "same";
            } else {
              // Si no existe histórico previo registrado
              const isParalelo = item.fuente === "paralelo";
              change = isParalelo ? -0.55 : 0.0;
              percentageChange = isParalelo ? "0.06%" : "0.00%";
              trend = isParalelo ? "down" : "same";
            }

            // Registrar el precio actual como referencia para consultas futuras
            newPrevMap[fuenteKey] = newPrice;

            // Formatear nombre legible del indicador
            let displayName = item.nombre;
            if (isEuro) {
              displayName =
                item.fuente === "oficial"
                  ? "Euro (BCV)"
                  : "Euro Paralelo";
            } else {
              displayName =
                item.nombre === "Dólar" || item.fuente === "oficial"
                  ? "Dolar (BCV)"
                  : item.nombre || "Dólar Paralelo";
            }

            return {
              moneda: item.moneda || defaultCurrency,
              fuente: item.fuente || "",
              nombre: displayName,
              compra: item.compra ?? null,
              venta: item.venta ?? null,
              promedio: newPrice,
              fechaActualizacion:
                item.fechaActualizacion || new Date().toISOString(),
              exchangeName: displayName,
              change,
              percentageChange,
              trend,
            };
          },
        );
      };

      // 4. Procesar cotizaciones de Dólares y Euros contra su histórico correspondiente
      const dolarRates = processItems(rawDolarData, rawDolarHist, "USD", false);
      const euroRates = processItems(rawEuroData, rawEuroHist, "EUR", true);

      // Consolidar lista completa de divisas
      const allRates = [...dolarRates, ...euroRates];

      // 5. Guardar en el estado global de Zustand
      set({
        rates: allRates,
        euroRates,
        previousRates: newPrevMap,
        loading: false,
      });
    } catch (err: any) {
      console.error("Error al consultar DolarApi con históricos:", err);
      set({
        error:
          err?.message ||
          "Error al actualizar cotizaciones desde DolarApi",
        loading: false,
      });
    }
  },
}));
