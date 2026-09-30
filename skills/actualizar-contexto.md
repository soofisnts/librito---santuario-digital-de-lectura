# Skill: Actualizar Contexto (`skills/actualizar-contexto.md`)

> **Propósito:** Mantener la memoria viva del repositorio sincronizada, de alta densidad y con mínimo consumo de tokens para futuras sesiones.

---

## 1. Cuándo Ejecutar Esta Skill

- **SÍ ejecutar:** Al concluir una sesión de trabajo importante, cerrar un hito de producto, tras una refactorización estructural o antes de que el usuario cierre el entorno.
- **NO ejecutar:** En cada mensaje o tras tareas triviales (corregir un typo o ajustar un margen de 2px).

---

## 2. Checklist de Actualización Paso a Paso

Al invocar esta skill, el agente debe seguir rigurosamente este flujo:

### Paso 1: Actualizar Estado del Proyecto (`state/actual.md`)
- Mover tareas completadas de la sección **En Progreso** a **Completado Reciente**.
- Agregar nuevas tareas pendientes descubiertas en la sesión a **Pendiente**.
- Registrar bloqueos vigentes o deuda técnica detectada.
- **Poda:** Eliminar items completados de hace más de 3 sesiones para no inflar el archivo.

### Paso 2: Registrar Decisiones Clave (`decisions/`)
- Si durante la sesión se eligió una arquitectura, se cambió una estructura de datos o se descartó una alternativa, crear un archivo corto en `decisions/YYYY-MM-DD-nombre-decision.md`.
- Formato: Contexto (2 líneas), Decisión tomada (2 líneas), Razón principal (2 líneas), Consecuencias (3 puntos).

### Paso 3: Consignar Nuevos Gotchas (`gotchas/`)
- Si se resolvió un bug caprichoso o un error de configuración que tomó tiempo diagnosticar, documentarlo en `gotchas/nombre-problema.md`.
- Incluir: Síntoma exacto, causa raíz y la solución en código.

### Paso 4: Comprimir Sesión en Logs (`logs/`)
- Generar una entrada comprimida en `logs/YYYY-MM-DD-sesion-resumen.md`.
- Máximo 30 líneas por sesión. Prohibido transcribir logs de consola o conversaciones enteras.
- Estructura: Objetivo, Archivos intervenidos, Decisiones tomadas, Próximos pasos.

### Paso 5: Auditar Líneas Rojas (`reglas.md` y `AGENTS.md`)
- Si el usuario o el equipo definieron una nueva restricción innegociable, añadirla a `reglas.md`.
- Verificar que `AGENTS.md` tenga **menos de 300 líneas**. Si creció, recortar explicaciones secundarias y derivarlas a carpetas temáticas.

---

## 3. Protocolo de Compresión y Eficiencia

Para garantizar que el contexto quede **más corto y limpio que al empezar**:
1. **Borrar lo efímero:** Limpiar archivos temporales en `scratch/` o scripts de prueba que ya cumplieron su propósito.
2. **Deduplicar:** Si una regla o decisión ya está en un archivo especializado (`decisions/` o `gotchas/`), dejar solo una referencia de 1 línea en `AGENTS.md`.
3. **Poda selectiva en logs:** Mantener únicamente los últimos 5 logs de sesión en el radar; archivar o condensar sesiones antiguas.

---

## 4. Resultado Esperado al Finalizar la Skill

Un reporte breve al usuario con:
- Estado sincronizado en `state/actual.md`.
- Nuevos archivos creados (si hubo decisiones o gotchas).
- Línea de confirmación: `«Contexto sincronizado y comprimido con éxito. Listo para la siguiente sesión.»`
