# Guía de Diseño - Financial App

Este documento detalla los estilos actuales utilizados en el proyecto y proporciona sugerencias estratégicas para la implementación de un tema claro (Light Mode).

## 1. Identidad Visual Actual (Dark Mode)

La aplicación utiliza una estética moderna de alto contraste, inspirada en aplicaciones "fintech" y "neobanks". Se basa en superficies oscuras con acentos vibrantes de color.

### 1.1 Paleta de Colores

| Categoría | Variable | Hexadecimal | Uso |
| :--- | :--- | :--- | :--- |
| **Primario** | `theme.t100` | `#006DFF` | Botones principales, acentos, marca. |
| **Éxito** | `complete.c100` | `#17C964` | Metas completadas, ingresos, estados positivos. |
| **Advertencia** | `inProgress.p100` | `#FFBF00` | Estados pendientes, progreso. |
| **Peligro** | `danger.d100` | `#F31260` | Errores, gastos críticos, alertas. |
| **Fondo 1** | `bgContainerStart`| `#100F14` | Fondo base de la aplicación. |
| **Fondo 2** | `bgContainerEnd` | `#1B1A1F` | Gradientes de fondo y tarjetas secundarias. |
| **Bordes** | `borderContainer` | `#313035` | Divisores, bordes de tarjetas y inputs. |
| **Texto P.** | - | `#FFFFFF` | Títulos y cuerpo de texto principal. |
| **Texto S.** | `subtitle` | `#747474` | Subtítulos, etiquetas y texto de apoyo. |

### 1.2 Tipografía

- **Fuente:** Inter (Variable Font).
- **Estilos:** Light, Regular, Medium, Bold, Italic.
- **Escala de tamaños:**
  - `xxs`: 4px (spacing)
  - `xs`: 8px
  - `sm`: 12px
  - `md`: 16px (base)
  - `lg`: 20px
  - `xl`: 24px
  - `xxl`: 28px
  - `xxxl`: 32px

### 1.3 Componentes y Formas

- **Bordes Redondeados:**
  - Tarjetas (Cards): `20px`
  - Botones y Badges: `8px` a `1000px` (estilo píldora).
- **Efectos:**
  - Uso extensivo de `LinearGradient` para profundidad.
  - `Skia` para gradientes radiales y efectos de iluminación.
  - Opacidad en colores (`t20`, `t40`, etc.) para fondos de iconos y estados "ghost".

---

## 2. Sugerencias para Implementación de Tema Claro

Para que la transición a un tema claro sea coherente y estética, se sugieren los siguientes cambios en la arquitectura de estilos:

### 2.1 Mapeo de Colores (Propuesta Light Mode)

| Categoría | Dark Mode | Propuesta Light Mode | Razón |
| :--- | :--- | :--- | :--- |
| **Fondo Base** | `#000000` / `#100F14` | `#FFFFFF` | Blanco puro para limpieza. |
| **Fondo Secundario**| `#1B1A1F` | `#F8F9FA` | Gris muy claro para diferenciar secciones. |
| **Texto Principal** | `#FFFFFF` | `#1A1A1E` | Negro suave/azul marino para legibilidad. |
| **Texto Secundario**| `#747474` | `#6B7280` | Gris medio (Slate/Gray 500). |
| **Bordes** | `#313035` | `#E5E7EB` | Gris claro (Gray 200). |
| **Primario** | `#006DFF` | `#0056D2` | Un tono ligeramente más oscuro para mejor contraste en blanco. |

### 2.2 Estrategia de Elevación y Profundidad

En el modo oscuro, la profundidad se logra con bordes (`borderContainer`) y gradientes. En el modo claro, se recomienda:
- **Sombras (Shadows):** Utilizar sombras muy sutiles (`shadowOpacity: 0.05`) para elevar las tarjetas sobre el fondo blanco.
- **Remover Bordes:** En modo claro, las tarjetas suelen verse mejor sin bordes si tienen una sombra suave o un fondo ligeramente gris.

### 2.3 Refactorización de Código Necesaria

Actualmente, hay valores "hardcoded" que impiden el tema claro dinámico:

1.  **Eliminar "black" y "white" literales:**
    - En `src/app/_layout.tsx` y `src/components/ui/global-container.tsx`, el fondo está forzado a `black`. Debe usar `globalStyles.bgContainerStart`.
    - En `src/components/ui/typography.tsx`, el `txtWhite` fuerza color `white`. Debería ser un color de tema (ej: `textPrimary`).

2.  **Extender el `ThemeContext`:**
    ```typescript
    // Ejemplo de estructura deseada
    const lightTheme = {
      background: "#FFFFFF",
      text: "#1A1A1E",
      border: "#E5E7EB",
      // ...
    };

    const darkTheme = {
      background: "#100F14",
      text: "#FFFFFF",
      border: "#313035",
      // ...
    };
    ```

3.  **Botones y Estados:**
    - Los botones actualmente usan `#333333` para deshabilitado. En modo claro, esto debería ser un gris claro como `#E0E0E0`.

---

## 3. Próximos Pasos Recomendados

1.  **Centralizar todos los colores** en `theme-provider.tsx`, eliminando cualquier hexadecimal de los componentes individuales.
2.  **Implementar un switch de estado** (`isDarkMode`) en el `ThemeProvider`.
3.  **Actualizar el `StatusBar`** dinámicamente (`dark-content` para modo claro).
4.  **Ajustar los gradientes** de las tarjetas bancarias para que no choquen visualmente con el fondo blanco (ej: usar gradientes con mayor opacidad o colores pastel).
