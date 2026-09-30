# AGENTS.md — Protocolo Central de Control

> **Proyecto:** Librito — Santuario Digital de Lectura  
> **Propósito:** Webapp editorial para lectores pausados. Registro de lecturas, notas, citas y catálogo sin gamificación tóxica ni ansiedad métrica, con beneficios reales (15% OFF) en librerías independientes y de autor.

---

## 1. Reglas de Comportamiento del Contexto (Invariantes)

1. **El context window es caro y volátil:** La memoria real del proyecto vive en archivos, no en la memoria efímera del chat.
2. **Nunca cargar todo el historial ni todos los archivos:** Prohibido hacer volcados masivos o leer componentes no afectados por el cambio.
3. **Cargar solo lo estrictamente necesario:** Si vas a modificar un componente, lee solo ese componente, su tipo y su entrada en `LibritoContext`.
4. **Al final de cada sesión importante:** Actualizar `state/actual.md`, registrar nuevas decisiones en `decisions/` y comprimir lo valioso en `logs/`.
5. **Referenciar antes de copiar:** En respuestas y prompts, citar rutas (`src/components/...`) en vez de pegar bloques enteros de código.
6. **Procedimientos repetitivos a skills:** Si un flujo de trabajo se repite más de dos veces, documentarlo como skill en `skills/`.
7. **Mantener AGENTS.md conciso:** Longitud máxima entre 200 y 300 líneas. Densidad de información pura, sin texto motivacional ni relleno.
8. **Cierre de sesión con skill:** Al cerrar un hito o sesión de trabajo, ejecutar `skills/actualizar-contexto.md`.

---

## 2. Invariantes Técnicas y de Diseño (Líneas Rojas)

- **Tipografía Serif:** Los títulos y textos con `font-serif` (`Source Serif 4`) usan estrictamente `font-weight: 400` (`!important` en CSS). Prohibido usar `font-bold` en cabeceras serif.
- **Filosofía UX:** Anti-Goodreads. No mostrar barras de progreso agresivas ni comparativas de velocidad. Usar lenguaje contemplativo: «Ritual de lectura», «Vibras literarias», «Santuario».
- **Persistencia:** Estado centralizado en `src/context/LibritoContext.tsx` respaldado en `localStorage` con prefijos `librito_*` (`librito_books`, `librito_user`, `librito_posts`, `librito_drafts`).
- **Iconografía dual:** Material Symbols Outlined (`material-symbols-outlined` con font variation `FILL 1` cuando corresponda) y Lucide React. No mezclar arbitrariamente dentro del mismo componente.
- **Tailwind CSS v4:** La configuración vive en `src/index.css` vía `@import "tailwindcss";`. No crear `tailwind.config.js` clásico a menos que se migre intencionalmente.
- **Componente huérfano:** `src/components/EditorialReadingScreen.tsx` es una pantalla experimental/prototipo desvinculada de `App.tsx`. No eliminar sin autorización explícita.

---

## 3. Orden de Lectura Preferido

Antes de implementar una tarea, consulta los archivos en este orden estricto:

```
1. AGENTS.md                  (Reglas generales y mapa del proyecto)
2. reglas.md                  (Líneas rojas y lo que JAMÁS se debe hacer)
3. state/actual.md            (Estado de avance y dependencias activas)
4. contexto/design.md         (Tokens visuales, paleta y pautas UX si la tarea toca UI)
5. src/types/index.ts         (Tipado relevante del modelo de dominio)
6. Archivo específico a editar (Solo el componente o módulo afectado)
```

---

## 4. Matriz de Skills según la Tarea

| Tipo de Tarea | Recurso / Skill a Usar | Ubicación |
| :--- | :--- | :--- |
| **Cierre de hito / sesión** | `actualizar-contexto` | `skills/actualizar-contexto.md` |
| **Cambios de UI / Estilos** | Guía de tokens y variantes | `contexto/design.md` |
| **Problemas técnicos recurrentes** | Base de conocimiento de errores | `gotchas/` |
| **Decisión de producto o arquitectura**| Plantilla de ADR | `decisions/` |

---

## 5. Punteros al Sistema de Memoria Persistente

- **`reglas.md`**: Restricciones negativas falsificables (lo que nunca se debe hacer).
- **`decisions/`**: Registros de Decisión Arquitectónica (ADR) con fecha, contexto y consecuencias.
- **`state/`**: `state/actual.md` refleja el backlog real: completado, en curso, deuda técnica y bloqueos.
- **`gotchas/`**: Trampas conocidas del stack (Tailwind v4, React 19, sync de localStorage).
- **`logs/`**: Resúmenes cronológicos de sesiones de trabajo importantes.
- **`contexto/`**: Documentación consolidada de diseño (`design.md`), decisiones (`decisiones.md`) y reglas operativas (`reglas.md`).

---

## 6. Definition of Done (DoD)

Una tarea se considera finalizada únicamente cuando:
1. El código compila sin errores de TypeScript (`npm run lint` / `tsc --noEmit`).
2. No se violó ninguna regla de `reglas.md` ni invariante de diseño de `contexto/design.md`.
3. Si se crearon o modificaron entidades de datos, se actualizaron `src/types/index.ts` y las migraciones de `localStorage` en `LibritoContext.tsx`.
4. El estado del proyecto se actualizó en `state/actual.md`.
5. Si hubo cambios estructurales, se registró un log en `logs/`.
