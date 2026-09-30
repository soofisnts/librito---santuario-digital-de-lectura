# Decisión: Arquitectura de Estado Unificada con Persistencia en LocalStorage

- **Fecha:** 2026-09-28
- **Estado:** Aprobado / En Producción
- **Impacto:** `src/context/LibritoContext.tsx`, `src/types/index.ts`

---

## 1. Contexto y Problema
Librito es un prototipo interactivo de alta fidelidad que necesita persistir el progreso del usuario (libros leídos, borradores, metas mensuales, publicaciones en comunidad) entre recargas y pruebas de usuario, sin la latencia ni complejidad operativa de una base de datos backend remota en esta fase.

## 2. Decisión Tomada
1. Centralizar todo el estado global en un único proveedor de React (`LibritoContext.tsx`).
2. Sincronizar automáticamente el estado con `localStorage` bajo claves aisladas con prefijo de dominio:
   - `librito_books`: Catálogo personal del usuario y lecturas guardadas.
   - `librito_user`: Perfil, racha, puntos ritual y estado de desbloqueo del beneficio.
   - `librito_posts`: Publicaciones de comunidad y estado de felicitaciones.
   - `librito_drafts`: Borradores parciales de registro de lectura.
3. Hidratación segura con fallback a datos semilla (`src/data/mockData.ts`) y rescate de URLs de portadas si el mock se actualiza en el código.

## 3. Razón Principal
Permite pruebas de UX fluidas, funciona de forma 100% offline y elimina dependencias de infraestructura backend, manteniendo el código simple y fácil de auditar.

## 4. Consecuencias
- **Positivas:** Carga inmediata, sin latencia de red, cero costo de servidores.
- **Negativas / Cuidados:** Riesgo de datos corruptos si cambia la interfaz TypeScript; mitigado con `try/catch` obligatorio y saneamiento en cada lectura de `localStorage`.
