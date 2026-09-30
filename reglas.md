# reglas.md — Líneas Rojas y Restricciones Falsificables

Este archivo contiene **exclusivamente restricciones negativas directas y detectables**. Si una regla no se puede verificar mediante inspección de código o linter, no pertenece a este archivo.

---

## 1. UI y Tipografía

1. **PROHIBIDO aplicar pesos tipográficos `font-bold`, `font-semibold` o superiores a elementos con clase `font-serif`, `font-editorial` o etiquetas `h1`-`h4`.**  
   *Motivo:* En el sistema de diseño editorial de Librito, `Source Serif 4` / `Signifier` se utiliza estrictamente en peso regular 400.
2. **PROHIBIDO utilizar paletas sintéticas o saturadas ajenas a la identidad editorial** (por ejemplo: `#0000FF`, `#00FF00`, `#7C3AED`, `#2563EB`).  
   *Regla:* Emplear únicamente la paleta aprobada: papel (`#fdf9f4`, `#fafafb`), tinta (`#17191c`, `#1c1c19`), arcilla/terracota (`#5d2a1a`, `#a13f2a`, `#fbe1d1`), durazno (`#ffdad3`, `#ff866c`) y gris neutro cálido (`#777b86`, `#e6e2dd`).
3. **PROHIBIDO incorporar métricas de lectura con semáforos de estrés o barras de progreso tipo velocímetro/KPI.**  
   *Regla:* El seguimiento de objetivos se limita a conteos discretos («3 de 4 libros») y etiquetas de estado («Activo», «Ritual sostenido»).

---

## 2. Configuración y Dependencias

4. **PROHIBIDO crear archivos `tailwind.config.js` o `tailwind.config.ts`.**  
   *Motivo:* El proyecto corre Tailwind CSS v4 vía `@tailwindcss/vite` e `@import "tailwindcss";` en `src/index.css`. Crear configuración clásica rompe la compilación.
5. **PROHIBIDO instalar librerías de estado globales (Redux, Zustand, Recoil).**  
   *Motivo:* Toda la reactividad de la aplicación está unificada en `LibritoContext.tsx`.

---

## 3. Manejo de Estado y Persistencia

6. **PROHIBIDO escribir en `localStorage` con claves que no inicien con el prefijo `librito_`.**  
   *Válidas:* `librito_books`, `librito_user`, `librito_posts`, `librito_drafts`.
7. **PROHIBIDO invocar `JSON.parse(localStorage.getItem(...))` sin bloque `try/catch` y fallback.**  
   *Motivo:* Evitar pantallazos blancos por esquemas desactualizados o datos corruptos en el navegador del usuario.
8. **PROHIBIDO modificar `src/types/index.ts` sin actualizar simultáneamente `src/data/mockData.ts` y los inicializadores de `LibritoContext.tsx`.**

---

## 4. Experiencia de Usuario y Componentes

9. **PROHIBIDO usar `window.alert()`, `window.confirm()` o `window.prompt()`.**  
   *Regla:* Usar el método `showToast(msg)` o modales del diseño (`GoalSettingModal`, `ManualBookModal`, etc.).
10. **PROHIBIDO eliminar o desconectar `src/components/EditorialReadingScreen.tsx`.**  
    *Motivo:* Es el archivo de referencia de diseño editorial y wireframes de investigación UX.
11. **PROHIBIDO alterar o eliminar la lista oficial de 5 librerías asociadas de Buenos Aires en `src/data/bookstores.ts`.**

---

## 5. Gestión del Contexto y Conversación

12. **PROHIBIDO pegar en el chat el contenido completo de archivos existentes de más de 30 líneas.**  
    *Regla:* Citar siempre el archivo con markdown link (`[Componente.tsx](file:///ruta/Componente.tsx#L10-L25)`) y mostrar únicamente el fragmento modificado.
13. **PROHIBIDO exceder las 300 líneas en `AGENTS.md`.** Si crece, condensar o trasladar detalles a `gotchas/`, `decisions/` o `contexto/`.
