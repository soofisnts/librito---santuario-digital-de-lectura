# 📖 Librito — Santuario Digital de Lectura

> Una webapp editorial para lectores pausados. Sin barras de progreso agresivas, sin métricas de ansiedad. Solo tus libros, tus notas y el placer de leer.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Version](https://img.shields.io/badge/versión-0.1.0--alpha-terracotta)](https://github.com/soofisnts/librito---santuario-digital-de-lectura)

---

## ✨ ¿Qué es Librito?

Librito es una alternativa contemplativa a Goodreads. Una app de registro de lecturas que prioriza la experiencia sobre el rendimiento. Sin comparativas de velocidad, sin gamificación tóxica.

**Los lectores que completan su meta mensual desbloquean un 15% de descuento real en librerías independientes y de autor.**

---

## 🖥️ Capturas de pantalla

> *Próximamente — el prototipo está en fase alpha.*

---

## 🗂️ Funcionalidades principales

| Módulo | Descripción |
|--------|-------------|
| 📚 **Registro de lectura** | Flujo de 2 pasos: selección del libro y formulario con rating, vibras literarias, notas, citas y tags |
| 📝 **Borradores** | Guarda un registro a medio completar y retómalo desde tu biblioteca |
| 🎯 **Objetivo mensual** | Selector interactivo de meta (1–20 libros) con beneficio desbloqueado en librerías |
| 🏷️ **Cupón de librería** | `librito-oct15` — 15% OFF en 5 librerías independientes asociadas |
| 🌿 **Feed editorial** | Posts de comunidad, vibras literarias, logros simbólicos sin presión |
| 🔍 **Explorar** | Catálogo clasificado por vibras y tendencias de la comunidad |
| 👤 **Perfil** | Sellos simbólicos, puntos ritual y resumen de citas atesoradas |

---

## 🛠️ Stack tecnológico

- **Frontend:** React 19 + TypeScript 7
- **Estilos:** Tailwind CSS v4 (configurado vía `@import` en CSS, sin `tailwind.config.js`)
- **Build:** Vite 8
- **Animaciones:** Motion (Framer Motion)
- **Iconografía:** Material Symbols Outlined + Lucide React
- **Tipografía:** Source Serif 4 (Google Fonts) — `font-weight: 400` estricto
- **Persistencia:** `localStorage` con prefijos `librito_*` (sin backend, cero dependencia de servidor)
- **AI (roadmap):** `@google/genai` ya integrado como dependencia — pendiente de implementación

---

## 🚀 Correr localmente

**Requisitos previos:** Node.js 18+

```bash
# 1. Clonar el repositorio
git clone https://github.com/soofisnts/librito---santuario-digital-de-lectura.git
cd librito---santuario-digital-de-lectura

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu GEMINI_API_KEY (opcional para el prototipo actual)

# 4. Iniciar el servidor de desarrollo
npm run dev
```

La app abre en `http://localhost:3000`

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Verificación de tipos con `tsc --noEmit` |
| `npm run clean` | Limpia `/dist` y `server.js` |

---

## 📁 Estructura del proyecto

```
librito/
├── src/
│   ├── components/       # Componentes de UI por pantalla
│   ├── context/          # LibritoContext — estado global + localStorage
│   ├── data/             # Datos mock y catálogo de librerías
│   ├── types/            # Tipado TypeScript del dominio
│   └── index.css         # Tailwind v4 + tokens visuales
├── contexto/
│   └── design.md         # Tokens visuales, paleta y guías UX
├── decisions/            # ADRs — Registros de Decisión Arquitectónica
├── state/
│   └── actual.md         # Backlog: completado, en curso y deuda técnica
├── gotchas/              # Trampas conocidas del stack
├── skills/               # Flujos de trabajo repetitivos documentados
└── AGENTS.md             # Protocolo de agentes AI del proyecto
```

---

## 🗺️ Roadmap

- [ ] Integración de Gemini API — recomendaciones contextuales y reflexiones literarias
- [ ] Generador de tarjetas de citas para compartir en redes
- [ ] Búsqueda avanzada en biblioteca (por vibe, autor y tags)
- [ ] Decidir integración de `EditorialReadingScreen` como pantalla zen

---

## 🎨 Filosofía de diseño

- **Anti-Goodreads:** No hay velocidad lectora, rankings ni comparativas entre usuarios.
- **Lenguaje contemplativo:** *Ritual de lectura*, *Vibras literarias*, *Santuario*.
- **Paleta editorial:** Papel cálido `#fdf9f4`, terracota `#5d2a1a`, serif en 400.
- **Beneficios reales:** El único incentivo es un descuento tangible en librerías independientes.

---

## 🤝 Contribuir

Este es un proyecto en fase alpha. Si querés contribuir, abrí un issue primero para discutir el cambio propuesto.

1. Fork del repositorio
2. Creá tu rama: `git checkout -b feat/mi-feature`
3. Commiteá: `git commit -m 'feat: descripción clara'`
4. Push: `git push origin feat/mi-feature`
5. Abrí un Pull Request

---

## 📄 Licencia

MIT © [soofisnts](https://github.com/soofisnts)
