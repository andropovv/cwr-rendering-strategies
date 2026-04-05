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

export interface ProductVariantOption {
  id: string;
  label: string;
  accent: string;
  priceDelta: number;
  inventory: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  createdAt: number;
  verified: boolean;
  helpfulCount: number;
}

export interface DeliveryOption {
  id: string;
  label: string;
  etaDays: number;
  price: number;
  note: string;
}

export interface ProductExperienceData {
  variants: ProductVariantOption[];
  specs: ProductSpec[];
  reviews: ProductReview[];
  deliveryOptions: DeliveryOption[];
}

const productNames = [
  "Беспроводные наушники Pro",
  "Умные часы Sport",
  "Портативная колонка Mini",
  "Игровая клавиатура Air",
  "Смарт-камера Home",
  "Монитор Studio 27",
];

const categories = [
  "Аудио",
  "Носимые устройства",
  "Периферия",
  "Дом",
  "Мониторы",
];

export function generateProducts(count = 1200): Product[] {
  return Array.from({ length: count }, (_, index) => {
    const name = productNames[index % productNames.length];
    const category = categories[index % categories.length];
    const price = 3990 + ((index * 137) % 24000);
    return {
      id: String(index + 1),
      name: `${name} ${index + 1}`,
      description:
        "Демо-товар для нагрузочного сравнения гидратации. Один и тот же UI, но разные стратегии рендеринга.",
      price,
      currency: "₽",
      image: `/placeholder-${(index % 5) + 1}.svg`,
      category,
      rating: Number((4.1 + ((index % 8) * 0.1)).toFixed(1)),
      reviewCount: 120 + ((index * 43) % 5000),
    };
  });
}

export const products: Product[] = generateProducts(24);

export function getProducts(count = 24): Product[] {
  return generateProducts(count);
}

export function getProductById(id: string, count = 1200): Product | undefined {
  return generateProducts(count).find((product) => product.id === id);
}
