# Future Changes

> [!info] Main Objective
> Configurar los modales de tipo bottom sheet (`BottomSheetModal` de la librería `@gorhom/bottom-sheet` v5) en la aplicación para que su altura se ajuste dinámicamente al contenido interno sin permitir que el usuario los arrastre o expanda hacia arriba de forma libre, permitiendo así una visualización a altura fija y exacta del contenido. Asimismo, se contempla la posibilidad de replicar la interfaz de usuario en base a una referencia visual con tarjetas de botones estilizadas con bordes blancos y fondos oscuros.

---

## Key Discussion Points

### 1. Dynamic Height Sizing
* **Automatic Adjustment**: En `@gorhom/bottom-sheet` v5, se puede activar el ajuste dinámico mediante el prop `enableDynamicSizing={true}` y removiendo la propiedad `snapPoints` para evitar altos fijos predefinidos.
* **Layout Constraints**: Para que la altura dinámica funcione de manera correcta, es indispensable eliminar el estilo `flex: 1` del contenedor interno (`BottomSheetView`), permitiendo así que la altura se defina puramente por el tamaño acumulado de sus hijos.

### 2. Disabling Drag / Panning
Para prevenir que el usuario altere el alto de la ventana arrastrándola hacia arriba, se deben desactivar los gestos de paneo:
* `enableContentPanningGesture={false}`: Deshabilita el arrastre táctil desde la sección de contenido.
* `enableHandlePanningGesture={false}`: Deshabilita el arrastre táctil desde el indicador de agarre superior (handle).

### 3. Visual UI Styling (Target Design)
Se validó la factibilidad de rediseñar el modal para coincidir exactamente con una referencia de diseño premium:
* Tarjetas de botón (`ModalItems`) altamente redondeadas (`borderRadius: 24`).
* Bordes finos blancos translúcidos (`borderWidth: 1`, `borderColor: 'rgba(255, 255, 255, 0.3)'`).
* Iconografía limpia y alineada horizontalmente junto al título y la descripción detallada.

---

## Technical Solutions & Configurations

### Configuración del Modal con Altura Dinámica y Arrastre Deshabilitado

```tsx
<BottomSheetModal
  ref={sheetRef}
  enableDynamicSizing={true} // Altura adaptada a los elementos internos
  enableContentPanningGesture={false} // Evita el arrastre en el contenido
  enableHandlePanningGesture={false} // Evita el arrastre en la barra superior (handle)
  enablePanDownToClose={false} // Crucial: Evita cerrar arrastrando hacia abajo
  backdropComponent={renderBackdrop}
  backgroundStyle={styles.background}
  handleIndicatorStyle={styles.indicator}
>
  <BottomSheetView style={styles.contentContainer}>
    {/* Contenido del modal */}
  </BottomSheetView>
</BottomSheetModal>
```

> [!WARNING] Importancia de `enablePanDownToClose={false}`
> **¿Por qué se deberá implementar?**
> Al configurar la altura de forma dinámica basándonos en los elementos internos y buscando mantener la información a una **altura completamente fija**, habilitar el arrastre hacia abajo provocaría que el usuario pudiera deslizar el modal accidentalmente o de forma inconsistente, rompiendo la restricción de altura estática. 
> 
> Al definir `enablePanDownToClose={false}`, se **obliga** al modal a cerrarse únicamente mediante una acción explícita (como pulsar en el botón de confirmación/cancelación o presionar fuera del modal en el fondo translúcido backdrop), garantizando así que la interfaz permanezca inmóvil y segura a la vista mientras dure la interacción.

---

## Next Steps

- [ ] Modificar `generic-bottom-sheet-modal.tsx` para aplicar las propiedades de altura dinámica (`enableDynamicSizing={true}`) y deshabilitar los gestos de arrastre (`enableContentPanningGesture`, `enableHandlePanningGesture` y `enablePanDownToClose`).
- [ ] Eliminar `flex: 1` del estilo `contentContainer` en `generic-bottom-sheet-modal.tsx`.
- [ ] Adaptar la interfaz visual de `ModalItems` en `modal-items.tsx` agregando bordes translúcidos (`borderColor: 'rgba(255, 255, 255, 0.3)'`, `borderWidth: 1`) y esquinas redondeadas de `24px` para imitar el diseño de la imagen de referencia.
- [ ] Reemplazar los iconos actuales por sus variantes correspondientes de `Ionicons` u otra biblioteca instalada para encajar con la estética deseada.
