export interface Artwork {
  id: string;
  title: string;
  category: 'Ganesh Idols' | 'Rangoli' | 'Paintings';
  categorySlug: 'ganesh-idols' | 'rangoli' | 'paintings';
  image: string;
  alt: string;
  medium?: string;
  dimensions?: string;
  description: string;
  featured?: boolean;
  aspect?: 'landscape' | 'portrait' | 'square';
}

export interface CategoryInfo {
  id: 'ganesh-idols' | 'rangoli' | 'paintings';
  name: string;
  shortDesc: string;
  image: string;
  alt: string;
  count: number;
}

export const ARTIST_INFO = {
  brandName: 'Kesar Art Work',
  location: 'Nagpur, Maharashtra, India',
  city: 'Nagpur',
  state: 'Maharashtra',
  tagline: 'Ganesh Idols · Rangoli · Paintings',
  heroKicker: 'HANDMADE ART • NAGPUR',
  heroTitle: 'Art That Begins With an Idea.',
  heroSubtitle: 'Ganesh idols, rangoli and paintings created with a personal touch.',
  aboutHeadline: 'Creating handmade art with patience, creativity and a love for detail.',
  aboutBio:
    'From handcrafted Ganesh idols to colourful rangoli and paintings, each creation is made with care and a personal artistic touch. Based in Nagpur, the work can also be created according to individual ideas and requirements.',
  contact: {
    phone: '+91 90030 00000',
    whatsapp: 'https://wa.me/919003000000?text=Hello%2C%20I%20came%20across%20your%20art%20portfolio%20and%20would%20like%20to%20know%20more%20about%20your%20work.',
    instagram: 'https://instagram.com/kesar_artwork',
    instagramHandle: '@kesar_artwork',
    email: 'contact@kesarartwork.com',
  },
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ganesh-idols',
    name: 'Ganesh Idols',
    shortDesc: 'Handcrafted Ganesh idols created with care and attention to detail.',
    image: '/images/ganesh-01.jpg',
    alt: 'Handcrafted clay Ganesh idol with detailed craftsmanship',
    count: 4,
  },
  {
    id: 'rangoli',
    name: 'Rangoli',
    shortDesc: 'Creative rangoli designs made for festivals, celebrations and special moments.',
    image: '/images/rangoli-01.jpg',
    alt: 'Vibrant festival rangoli artwork with traditional pigments',
    count: 4,
  },
  {
    id: 'paintings',
    name: 'Paintings',
    shortDesc: 'Original and custom paintings created in different artistic styles.',
    image: '/images/painting-01.jpg',
    alt: 'Original textured painting with gold leaf and rich pigments',
    count: 4,
  },
];

export const ARTWORKS: Artwork[] = [
  {
    id: 'ganesh-01',
    title: 'Clay Ganesh with Intricate Mukut',
    category: 'Ganesh Idols',
    categorySlug: 'ganesh-idols',
    image: '/images/ganesh-01.jpg',
    alt: 'Lord Ganesha hand-sculpted clay idol with ornate crown and traditional features',
    medium: 'Natural Clay & Organic Ochre',
    dimensions: '18 inches height',
    description: 'Sculpted entirely by hand using natural river clay with intricate detailing on the mukut and ornaments.',
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 'rangoli-01',
    title: 'Festival Mandala Rangoli',
    category: 'Rangoli',
    categorySlug: 'rangoli',
    image: '/images/rangoli-01.jpg',
    alt: 'Complex circular geometric and floral rangoli with natural colored powder',
    medium: 'Stone Powder & Marigold Petals',
    dimensions: '6 ft diameter',
    description: 'Detailed symmetrical floor rangoli designed for festive celebrations and cultural ceremonies in Nagpur.',
    featured: true,
    aspect: 'square',
  },
  {
    id: 'painting-01',
    title: 'Crimson & Gold Textured Canvas',
    category: 'Paintings',
    categorySlug: 'paintings',
    image: '/images/painting-01.jpg',
    alt: 'Contemporary acrylic and gold leaf textured abstract painting on canvas',
    medium: 'Acrylic & Gold Leaf on Canvas',
    dimensions: '36 x 24 inches',
    description: 'Rich impasto textures balanced with warm gold leaf leafing on deep earthen crimson pigments.',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 'ganesh-02',
    title: 'Alankrita Eco-Friendly Ganesh Idol',
    category: 'Ganesh Idols',
    categorySlug: 'ganesh-idols',
    image: '/images/ganesh-02.jpg',
    alt: 'Handmade eco-friendly Ganesh idol sculpture illuminated with warm diya lighting',
    medium: 'Shadu Clay & Water-Soluble Pigments',
    dimensions: '21 inches height',
    description: 'Created for traditional domestic Ganeshotsav with pure eco-friendly shadu mati and natural colors.',
    featured: true,
    aspect: 'landscape',
  },
  {
    id: 'rangoli-02',
    title: 'Traditional Floral Motif Rangoli',
    category: 'Rangoli',
    categorySlug: 'rangoli',
    image: '/images/rangoli-02.jpg',
    alt: 'Hand-drawn Indian rangoli featuring floral designs and festive lamps',
    medium: 'Organic Pigment Powders',
    dimensions: '4.5 ft width',
    description: 'Harmonious blend of traditional auspicious motifs, floral gradients, and diya placement.',
    featured: true,
    aspect: 'square',
  },
  {
    id: 'painting-02',
    title: 'Heritage Ochre & Gold Study',
    category: 'Paintings',
    categorySlug: 'paintings',
    image: '/images/painting-02.jpg',
    alt: 'Rich heritage inspired Indian painting with fine textural layers and gold accents',
    medium: 'Mixed Media on Wood Panel',
    dimensions: '30 x 30 inches',
    description: 'Custom art composition inspired by traditional Indian temple textures and warm candlelight.',
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 'ganesh-03',
    title: 'Dhyan Mudra Ganesh Idol',
    category: 'Ganesh Idols',
    categorySlug: 'ganesh-idols',
    image: '/images/ganesh-01.jpg',
    alt: 'Serene meditative Lord Ganesh handmade clay sculpture',
    medium: 'Handcrafted Clay',
    dimensions: '15 inches height',
    description: 'Focusing on serene facial expression and flowing posture, sculpted with meticulous proportion.',
    featured: false,
    aspect: 'portrait',
  },
  {
    id: 'rangoli-03',
    title: 'Mayur (Peacock) Feather Rangoli',
    category: 'Rangoli',
    categorySlug: 'rangoli',
    image: '/images/rangoli-01.jpg',
    alt: 'Detailed peacock feather motif rangoli with blue and emerald shades',
    medium: 'Fine Colored Sand Powders',
    dimensions: '5 ft diameter',
    description: 'Custom festive installation combining rich indigo, peacock green, and marigold borders.',
    featured: false,
    aspect: 'landscape',
  },
  {
    id: 'painting-03',
    title: 'Warm Devotion Abstract',
    category: 'Paintings',
    categorySlug: 'paintings',
    image: '/images/painting-01.jpg',
    alt: 'Expressive abstract painting with devotional warmth and glowing earthen tones',
    medium: 'Oil & Acrylic on Canvas',
    dimensions: '40 x 30 inches',
    description: 'Layered brushstrokes capturing the warmth of festive light and traditional earthen elements.',
    featured: false,
    aspect: 'portrait',
  },
];
