import type {
  DeliveryOption,
  Product,
  ProductExperienceData,
  ProductReview,
  ProductSpec,
  ProductVariantOption,
} from "../data/products";

export interface ProductPurchaseState {
  variantId: string;
  deliveryId: string;
  quantity: number;
  added: boolean;
}

export interface ProductPurchaseSummary {
  selectedVariant: ProductVariantOption;
  selectedDelivery: DeliveryOption;
  unitPrice: number;
  totalPrice: number;
  monthlyInstallment: number;
  inventoryLabel: string;
  deliveryLabel: string;
  savingsLabel: string;
}

const variantAccents = ["#0f172a", "#1d4ed8", "#065f46", "#7c3aed"];
const reviewAuthors = [
  "Алина",
  "Никита",
  "Виктор",
  "Елена",
  "Дмитрий",
  "Полина",
  "Максим",
  "Дарья",
];
const reviewFragments = [
  "Стабильно работает под ежедневной нагрузкой и не перегревается.",
  "Хорошо подходит для сценариев, где важно быстрое открытие и предсказуемый отклик.",
  "После недели использования особенно понравилась автономность и качество сборки.",
  "Интерфейс понятный, а базовая настройка заняла буквально несколько минут.",
  "По ощущениям лучше всего раскрывается при активном использовании в течение дня.",
];

function getNumericId(product: Product): number {
  return Number(product.id) || 1;
}

export function buildProductExperienceData(product: Product): ProductExperienceData {
  const numericId = getNumericId(product);

  const variants: ProductVariantOption[] = [
    {
      id: "standard",
      label: "Standard",
      accent: variantAccents[numericId % variantAccents.length],
      priceDelta: 0,
      inventory: 24 + (numericId % 16),
    },
    {
      id: "pro",
      label: "Pro",
      accent: variantAccents[(numericId + 1) % variantAccents.length],
      priceDelta: 2490,
      inventory: 10 + (numericId % 9),
    },
    {
      id: "max",
      label: "Max",
      accent: variantAccents[(numericId + 2) % variantAccents.length],
      priceDelta: 4990,
      inventory: 4 + (numericId % 6),
    },
  ];

  const specs: ProductSpec[] = [
    { label: "Категория", value: product.category },
    { label: "Рейтинг", value: `${product.rating} / 5` },
    { label: "Отзывы", value: product.reviewCount.toLocaleString("ru-RU") },
    { label: "Автономность", value: `${14 + (numericId % 9)} ч` },
    { label: "Вес", value: `${180 + ((numericId * 17) % 140)} г` },
    { label: "Bluetooth / Wi-Fi", value: numericId % 2 === 0 ? "Bluetooth 5.4" : "Wi-Fi 6 / BT 5.3" },
    { label: "Гарантия", value: "24 месяца" },
    { label: "Доставка", value: "Курьер или пункт выдачи" },
  ];

  const reviews: ProductReview[] = Array.from({ length: 18 }, (_, index) => {
    const rating = 5 - (index % 4 === 3 ? 1 : 0);
    const createdAt = Date.UTC(2026, 2, 24 - index, 10 + (index % 6), 0, 0);
    return {
      id: `review-${product.id}-${index + 1}`,
      author: reviewAuthors[(numericId + index) % reviewAuthors.length],
      rating,
      title: `Опыт использования ${index + 1}`,
      body: `${reviewFragments[index % reviewFragments.length]} ${
        reviewFragments[(index + 2) % reviewFragments.length]
      }`,
      createdAt,
      verified: index % 3 !== 1,
      helpfulCount: 8 + ((numericId * 11 + index * 7) % 140),
    };
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "pickup",
      label: "Самовывоз",
      etaDays: 1,
      price: 0,
      note: "Бесплатно из ближайшего пункта выдачи",
    },
    {
      id: "courier",
      label: "Курьер",
      etaDays: 2,
      price: 390,
      note: "Доставка до двери с примеркой",
    },
    {
      id: "express",
      label: "Экспресс",
      etaDays: 0,
      price: 790,
      note: "В тот же день в пределах города",
    },
  ];

  return { variants, specs, reviews, deliveryOptions };
}

export function getInitialProductPurchaseState(
  experience: ProductExperienceData,
): ProductPurchaseState {
  return {
    variantId: experience.variants[0]?.id ?? "standard",
    deliveryId: experience.deliveryOptions[0]?.id ?? "pickup",
    quantity: 1,
    added: false,
  };
}

export function calculateProductPurchaseSummary(
  product: Product,
  experience: ProductExperienceData,
  state: ProductPurchaseState,
): ProductPurchaseSummary {
  const selectedVariant =
    experience.variants.find((variant) => variant.id === state.variantId) ??
    experience.variants[0];
  const selectedDelivery =
    experience.deliveryOptions.find((option) => option.id === state.deliveryId) ??
    experience.deliveryOptions[0];

  const unitPrice = product.price + selectedVariant.priceDelta;
  const totalPrice = unitPrice * state.quantity + selectedDelivery.price;

  return {
    selectedVariant,
    selectedDelivery,
    unitPrice,
    totalPrice,
    monthlyInstallment: Math.round(totalPrice / 12),
    inventoryLabel:
      selectedVariant.inventory > 12
        ? "В наличии"
        : `Осталось ${selectedVariant.inventory} шт.`,
    deliveryLabel:
      selectedDelivery.etaDays === 0
        ? "Сегодня"
        : `Через ${selectedDelivery.etaDays} дн.`,
    savingsLabel:
      selectedVariant.priceDelta === 0
        ? "Базовая комплектация"
        : `+${selectedVariant.priceDelta.toLocaleString("ru-RU")} ₽ к базе`,
  };
}

export function formatProductReviewDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
