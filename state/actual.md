# Estado Actual del Proyecto (`state/actual.md`)

> **Última actualización:** 2026-09-28  
> **Versión:** 0.1.0-alpha (Prototipo funcional reactivo)

---

## 1. Módulos y Funcionalidades Completadas

- [x] **Flujo de Registro de Lectura (2 pasos):**
  - Paso 1: Selección de lectura actual, búsqueda en catálogo, lista de pendientes o acceso a registro manual/código.
  - Paso 2: Formulario sensible con rating de 1 a 5 estrellas, vibras literarias, notas, citas, tags y visibilidad (pública/privada).
  - Sistema de borradores locales (`ReadingDraft`): guardar a medio completar y reanudar desde la biblioteca.
- [x] **Gestión de Objetivo Mensual y Beneficio en Librerías:**
  - Selector con stepper interactivo (1 a 20 libros) y chips directos (`GoalSettingModal.tsx`).
  - Tarjeta de beneficio mensual (`MonthlyBenefitCard.tsx`) con copia de cupón `librito-oct15` al portapapeles y acordeón modal de las 5 librerías asociadas.
  - Conservación ética de beneficio desbloqueado al subir de meta.
- [x] **Pantallas Principales (`App.tsx` / `BottomNav.tsx`):**
  - **Feed:** Hero de lectura actual con acceso directo a registro, módulo «Tus logros», filtros por amigos o tendencias, y posts de comunidad con felicitaciones.
  - **Explorar:** Catálogo clasificado por vibras y libros más leídos.
  - **Biblioteca:** Filtrado por estantes (Leídos, Pendientes, Favoritos) y sección dedicada de borradores guardados.
  - **Perfil:** Cabecera de usuario, sellos simbólicos («Café & Tinta», «Santuario Lector»), puntos ritual y resumen de citas atesoradas.
- [x] **Persistencia en el Cliente:**
  - `LibritoContext` con sincronización en tiempo real con `localStorage` (`librito_books`, `librito_user`, `librito_posts`, `librito_drafts`).
- [x] **Diseño Visual y Estética Editorial:**
  - Paleta de papel cálido (`#fdf9f4`), terracota (`#5d2a1a`) y tipografía serif regular 400.
  - Efecto lomo táctil de libro (`book-spine-effect`).

---

## 2. En Progreso y Próximos Pasos (Backlog Inmediato)

- [ ] **Decidir el destino de `EditorialReadingScreen.tsx`:** Determinar si se integra como pantalla de lectura zen o si se extrae a un módulo de prototipos.
- [ ] **Integración de Gemini API (`@google/genai`):** Ya figura como dependencia en `package.json`. Falta implementar asistente de recomendación contextual o generador de reflexiones literarias a partir de notas del lector.
- [ ] **Generador de Citas para Compartir:** Función para exportar una cita favorita o nota en formato tarjeta gráfica editorial para redes o mensajería.
- [ ] **Búsqueda Avanzada en Biblioteca:** Filtros por vibe, autor y tags personalizados en la pestaña de Biblioteca.

---

## 3. Bloqueadores y Deuda Técnica

- **Bloqueadores actuales:** Ninguno. La compilación `npm run build` y el entorno `npm run dev` operan con normalidad.
- **Deuda Técnica:**
  1. `EditorialReadingScreen.tsx` (434 líneas) no está enlazada en la navegación de `App.tsx` y genera advertencias de código desaprovechado.
  2. Uso mixto de `material-symbols-outlined` (vía Google Fonts en `index.html`) y `lucide-react`. Conviene estandarizar criterio.
  3. No hay tests unitarios de los reducers o sincronización de `localStorage`.
