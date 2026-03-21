export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Беспроводные наушники Pro",
    description: "Шумоподавление, до 30 часов работы, поддержка высокого разрешения аудио.",
    price: 12990,
    currency: "₽",
    image: "/placeholder-headphones.svg",
    category: "Аудио",
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: "2",
    name: "Умные часы Sport",
    description: "Мониторинг пульса, GPS, водозащита 5 ATM, до 7 дней без подзарядки.",
    price: 18990,
    currency: "₽",
    image: "/placeholder-watch.svg",
    category: "Носимые устройства",
    rating: 4.6,
    reviewCount: 892,
  },
  {
    id: "3",
    name: "Портативная колонка Mini",
    description: "Компактный размер, 12 часов воспроизведения, защита от брызг.",
    price: 4990,
    currency: "₽",
    image: "/placeholder-speaker.svg",
    category: "Аудио",
    rating: 4.5,
    reviewCount: 534,
  },
];

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
