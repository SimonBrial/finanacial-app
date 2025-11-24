# 💰 Personal Finance App

## 🎯 Objetivo del Diseño
Crear la interfaz base de una aplicación de finanzas personales que permita registrar, visualizar y analizar ingresos, egresos, presupuestos, metas de ahorro y el valor actualizado de criptomonedas y divisas. La interfaz debe ser clara, modular, visualmente atractiva y centrada en la experiencia del usuario.

## 🧩 Estructura General de la App

### 1. Dashboard Principal (Inicio)
- **Tarjetas resumen con:**
  - Balance mensual actual (ingresos - egresos)
  - Ahorro acumulado total
  - Progreso de metas de ahorro
- **Gráficas:**
  - 📊 Gráfico de barras: Ingresos vs Egresos por mes (últimos 6 meses)
  - 🧭 Gráfico de pastel: Distribución de gastos por categoría
  - 📈 Línea de ahorro acumulado en el tiempo
- **Alertas visuales:**
  - Categorías que superaron el presupuesto
  - Días con gastos inusuales

### 2. Módulo de Transacciones
- **Lista de transacciones con filtros por:**
  - Fecha, tipo (ingreso/egreso), categoría, cuenta
- **Botón flotante ➕ para agregar nueva transacción**
- **Campos requeridos:**
  - Monto, tipo, fecha, categoría, descripción (opcional), cuenta (opcional)
- **Opción para marcar como gasto fijo o variable**

### 3. Categorización
- Vista de categorías y subcategorías
- Opción para editar, agregar o eliminar categorías
- Marcar categorías como “fijas” para cálculo automático

### 4. Presupuestos
- Lista de presupuestos activos por categoría
- **Barra de progreso por cada presupuesto:**
  - Fórmula: `(Gasto actual / Límite) * 100%`
  - Indicador visual (verde/amarillo/rojo) según nivel de cumplimiento

### 5. Metas de Ahorro
- **Crear metas con:**
  - Nombre, monto objetivo, fecha límite (opcional)
- Asignar ahorro mensual a metas
- Visualización de progreso con barra y porcentaje

### 6. Reportes
- Selector de período (mensual, trimestral, anual)
- **Gráficas:**
  - Evolución del flujo de caja
  - Comparativa de gastos fijos vs variables
  - Historial de ahorro mensual
- Exportar como PDF o Excel (opcional)

### 7. Criptomonedas y Divisas
- **Integración con APIs:**
  - [CoinGecko](https://www.coingecko.com/) para precios de criptomonedas
  - [Frankfurter.app](https://www.frankfurter.app/) para tasas de cambio fiat
- **Vista de activos en otras monedas:**
  - Conversión automática a moneda local
  - Histórico de valor (gráfico de línea)

## 🧠 Lógica y Cálculos Clave
- **Balance mensual:** `∑(Ingresos) - ∑(Egresos)`
- **Ahorro acumulado:** `∑(BalancesMensualesPositivos)`
- **Gastos fijos:** `∑(Egresos donde categoría.esFija == true)`
- **Gastos variables:** `∑(EgresosTotales) - GastosFijos`
- **Progreso de presupuesto:** `(Gasto actual / Límite) * 100%`

## 🎨 Estilo Visual Sugerido
- **Paleta de colores:** Tonos neutros con acentos en:
  - 🟢 Verde (ahorro)
  - 🔴 Rojo (déficit)
  - 🔵 Azul (información)
- **Tipografía:** Clara y moderna
- **Iconografía intuitiva:** 💰 ingreso, 🛒 egreso, 📈 ahorro, 🎯 meta
- **Diseño responsive:** Optimizado para móvil

## 🧩 Extras Opcionales
- Modo oscuro
- Notificaciones de presupuesto excedido
- Widget de resumen diario/semanal
- Backup en la nube o exportación local
- Multiusuario o perfiles familiares
