export interface AssociatedBookstore {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  benefit: string;
  hours: string;
  note: string;
  phone?: string;
  badge?: string;
}

export const ASSOCIATED_BOOKSTORES: AssociatedBookstore[] = [
  {
    id: 'el-ateneo',
    name: 'El Ateneo Grand Splendid',
    address: 'Av. Santa Fe 1860',
    neighborhood: 'Recoleta',
    city: 'Buenos Aires',
    benefit: '15% en novedades editoriales y cafetería en el palco',
    hours: 'Lun a Sáb 09:00 - 22:00 · Dom 12:00 - 22:00',
    note: 'Teatro histórico reconvertido con cúpula pintada y selección literaria cuidada.',
    badge: 'Café & Librería',
  },
  {
    id: 'eterna-cadencia',
    name: 'Librería Eterna Cadencia',
    address: 'Honduras 5574',
    neighborhood: 'Palermo Soho',
    city: 'Buenos Aires',
    benefit: '15% en todo el catálogo de narrativa y ensayo',
    hours: 'Lun a Vie 10:00 - 20:00 · Sáb 11:30 - 20:00',
    note: 'Terraza y patio arbolado ideal para leer con café de filtro y prensa cultural.',
    badge: 'Editorial independiente',
  },
  {
    id: 'falena',
    name: 'Librería Falena',
    address: 'Charlone 201',
    neighborhood: 'Chacarita',
    city: 'Buenos Aires',
    benefit: '15% en libros importados de colección y copas de vino',
    hours: 'Mar a Sáb 15:00 - 20:30',
    note: 'Santuario íntimo con chimenea de ladrillo a la vista y patio botánico silencioso.',
    badge: 'Espacio secreto',
  },
  {
    id: 'cespedes',
    name: 'Librería Céspedes',
    address: 'Céspedes 3065',
    neighborhood: 'Colegiales',
    city: 'Buenos Aires',
    benefit: '15% en narrativa latinoamericana e ilustración',
    hours: 'Lun a Sáb 10:30 - 19:30',
    note: 'Librería de barrio con recomendación personalizada y talleres abiertos.',
    badge: 'De barrio',
  },
  {
    id: 'clasica-moderna',
    name: 'Clásica y Moderna',
    address: 'Av. Callao 892',
    neighborhood: 'San Nicolás',
    city: 'Buenos Aires',
    benefit: '15% en libros de poesía, arte y servicio de té',
    hours: 'Lun a Vie 09:00 - 20:00',
    note: 'Punto de encuentro emblemático de la cultura rioplatense desde 1938.',
    badge: 'Patrimonio cultural',
  },
];
