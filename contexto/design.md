# design.md — Guía de Tokens Visuales y Pautas UX

> **Sistema de Diseño:** Warm Paper & Serif Analytics  
> **Última revisión:** 2026-09-28  
> **Uso:** Consultar antes de cualquier tarea que toque UI, estilos o copy.

---

## 1. Paleta de Color

### Superficies y Fondos

| Token           | Hex        | Uso                                                    |
| :-------------- | :--------- | :----------------------------------------------------- |
| `papel-base`    | `#fdf9f4`  | Fondo principal de la app (body, pantallas)           |
| `papel-alt`     | `#fafafb`  | Fondos de módulos de métricas / cajas internas        |
| `papel-gris`    | `#f7f3ee`  | Fondos de secciones secundarias (estantes, borradores) |
| `borde-suave`   | `#e6e2dd`  | Divisores, bordes de tarjetas, separadores            |
| `blanco-puro`   | `#ffffff`  | Tarjetas elevadas, modales, tooltips                  |

### Tinta y Texto

| Token           | Hex        | Uso                                                    |
| :-------------- | :--------- | :----------------------------------------------------- |
| `tinta-oscura`  | `#17191c`  | Texto principal (casi negro azulado)                  |
| `tinta-cuerpo`  | `#1c1c19`  | Alternativa neutra para párrafos                      |
| `tinta-media`   | `#50443f`  | Descripciones secundarias, subheadings                |
| `tinta-tenue`   | `#82746e`  | Texto terciario, metadatos, labels de ayuda           |
| `gris-plomo`    | `#777b86`  | Timestamps, iconos inactivos, placeholders            |

### Arcilla / Terracota (Acento Editorial Principal)

| Token               | Hex        | Uso                                                        |
| :------------------ | :--------- | :--------------------------------------------------------- |
| `arcilla-profunda`  | `#43271a`  | Fondos de headers serif, texto de marca                  |
| `arcilla-media`     | `#5c3d2e`  | Fondos de CTA oscuro cálido, iconos de navegación activos |
| `arcilla-principal` | `#5d2a1a`  | Color de identidad del beneficio / librería              |
| `arcilla-vivo`      | `#a13f2a`  | Botones de acción primaria, puntos de énfasis            |
| `arcilla-suave`     | `#fbe1d1`  | Fondos de chips de beneficio, callouts activos           |

### Durazno / Salmon (Acento Cálido)

| Token              | Hex        | Uso                                                  |
| :----------------- | :--------- | :--------------------------------------------------- |
| `durazno-tenue`    | `#ffdad3`  | Selection highlight, anillos de avatar              |
| `durazno-vivo`     | `#ff866c`  | Iconos animados (pulse), estrellas de calificación  |
| `durazno-extra`    | `#ffdbcc`  | Bordes de toasts y badges de sistema               |

### Verde Bosque (Acento Secundario — Logros)

| Token            | Hex        | Uso                                              |
| :--------------- | :--------- | :----------------------------------------------- |
| `bosque-profundo`| `#1b4d2e`  | Icono de logros (`workspace_premium`), sellos    |

---

## 2. Tipografía

### Escala y Reglas

| Rol                        | Familia                     | Tamaño     | Peso      | Clase Tailwind     |
| :------------------------- | :-------------------------- | :--------- | :-------- | :----------------- |
| Display / Marca            | `Source Serif 4`, Georgia   | `22–28px`  | **400**   | `font-serif`       |
| Subtítulo / Modal Header   | `Source Serif 4`, Georgia   | `17–21px`  | **400**   | `font-serif`       |
| Cuerpo de artículo         | `Inter`, system-ui          | `14–16px`  | 400       | (default)          |
| Etiquetas / Chips          | `Inter`, system-ui          | `11–12px`  | 500–600   | `font-medium`      |
| Código / ISBN / Cupones    | `font-mono` del sistema     | `11–12px`  | 500       | `font-mono`        |

> **Regla absoluta:** `Source Serif 4` en `h1`–`h4` y `.font-serif` siempre `font-weight: 400 !important` (forzado en `src/index.css`). **Jamás usar `font-bold` en cabeceras serif.**

---

## 3. Bordes, Radios y Sombras

| Elemento                   | Radio          | Clase/valor                             |
| :------------------------- | :------------- | :-------------------------------------- |
| Tarjetas principales       | `16–20px`      | `rounded-2xl` / `rounded-[20px]`        |
| Modales                    | `24px`         | `rounded-[24px]`                        |
| Botones primarios          | `999px (pill)` | `rounded-full`                          |
| Chips y badges             | `999px (pill)` | `rounded-full`                          |
| Toasts                     | `999px (pill)` | `rounded-full`                          |
| Campos de texto y áreas    | `12–14px`      | `rounded-xl`                            |

| Sombra        | Uso                                               |
| :------------ | :------------------------------------------------ |
| `shadow-xs`   | Tarjetas en reposo, header                       |
| `shadow-sm`   | Botones primarios, modales elevados              |
| `shadow-2xs`  | Botones secundarios, chips interactivos          |
| `shadow-xl`   | Modales de detalle de librería                   |

---

## 4. Iconografía

### Reglas de Uso

- **Material Symbols Outlined** (`material-symbols-outlined`): iconos de navegación, acciones dentro de componentes principales y todos los íconos que cambian de estado (FILL 0 → FILL 1 al activarse).
  - Activar `FILL 1` con `style={{ fontVariationSettings: "'FILL' 1" }}` cuando el icono representa un estado activo/seleccionado.
- **Lucide React**: uso puntual en componentes donde la integración de fuente de iconos puede ser conflictiva o se necesite un icono específico no disponible en Material.
- **Regla de no mezcla:** Dentro de un mismo componente, no combinar arbitrariamente ambas familias sin justificación documentada.

### Mapa de Iconos Clave del Proyecto

| Concepto                 | Icono Material Symbol         |
| :----------------------- | :---------------------------- |
| Marca / Libro abierto    | `menu_book`                   |
| Registrar lectura         | `auto_stories`               |
| Escanear código           | `document_scanner`           |
| Racha de lectura          | `local_fire_department`      |
| Logros / Premium          | `workspace_premium`          |
| Puntos ritual             | `military_tech`              |
| Cita / Quote              | `format_quote`               |
| Borrador                  | `edit_note`                  |
| Cupón / Beneficio         | `local_activity`             |
| Librería                  | `storefront`                 |
| Notificación de éxito     | `celebration`                |
| Estado verificado         | `verified`                   |

---

## 5. Lenguaje y Copys

### Vocabulario Aprobado

| Concepto genérico         | Término Librito                          |
| :------------------------ | :--------------------------------------- |
| Registro de libro         | «Registrar lectura» / «Ritual de lectura» |
| Estado del usuario        | «Santuario» / «Nivel de santuario»       |
| Puntos                    | «Puntos Ritual»                          |
| Racha                     | «Días de ritual sostenido»               |
| Calificación emocional    | «Vibras literarias»                      |
| Objetivo mensual          | «Meta mensual de lecturas»               |
| Favoritos                 | «Favoritas»                             |
| Historial de lectura      | «Tu biblioteca personal»                |
| Guardado como pendiente   | «Guardado en tus pendientes»             |

### Términos Prohibidos en Copy

- ~~Velocidad de lectura~~ / ~~Libros por hora~~
- ~~Ranking~~ / ~~Posición en la tabla~~
- ~~¡Supera tu récord!~~
- ~~Lectores más rápidos~~
- Ninguna comparativa cuantitativa entre usuarios.

---

## 6. Animaciones y Transiciones

| Nombre                 | Uso                                                   | Clase / Estilo                          |
| :--------------------- | :---------------------------------------------------- | :-------------------------------------- |
| `animate-fade-in`      | Apertura de modales, toasts, acordeones               | `animate-fade-in` (Tailwind custom)     |
| `animate-pulse`        | Indicador de lectura activa en hero                   | `animate-pulse` (Tailwind built-in)     |
| `transition-all`       | Hover de botones, escala de iconos                    | `transition-all`                        |
| `active:scale-95`      | Feedback táctil en botones                            | `active:scale-95` / `active:scale-98`  |
| `hover:bg-*`           | Estado hover de botones y tarjetas                    | Tailwind hover utilities                |

---

## 7. Patrones de Layout

- **Contenedor central:** `max-w-md mx-auto px-4` (ancho máximo 448px, centrado).
- **Separación vertical de secciones:** `flex flex-col space-y-5` o `space-y-6`.
- **Padding inferior para evitar BottomNav:** `pb-24` en pantallas principales.
- **Header sticky:** `sticky top-0 z-40 bg-[#fdf9f4]/90 backdrop-blur-md` con borde inferior tenue.
- **Grillas de stats:** `grid grid-cols-3 gap-2.5` para módulos de métricas de 3 columnas.
- **Efecto lomo de libro:** `.book-spine-effect` (definido en `src/index.css`) para portadas de libros en estante.
