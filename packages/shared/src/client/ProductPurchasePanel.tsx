"use client";

import type { Product, ProductExperienceData } from "../data/products";
import type {
  ProductPurchaseState,
  ProductPurchaseSummary,
} from "../utils/productExperience";

export interface ProductPurchasePanelProps {
  product: Product;
  experience: ProductExperienceData;
  state: ProductPurchaseState;
  summary: ProductPurchaseSummary;
  isPending?: boolean;
  onVariantChange: (variantId: string) => void;
  onDeliveryChange: (deliveryId: string) => void;
  onQuantityChange: (nextQuantity: number) => void;
  onAddToCart: () => void;
}

export function ProductPurchasePanel({
  product,
  experience,
  state,
  summary,
  isPending = false,
  onVariantChange,
  onDeliveryChange,
  onQuantityChange,
  onAddToCart,
}: ProductPurchasePanelProps) {
  return (
    <section className="cwr-product-section-card">
      <div className="cwr-product-section-header">
        <h2>Покупка и доставка</h2>
        <span>{summary.savingsLabel}</span>
      </div>

      <div className="cwr-product-config-group">
        <div className="cwr-product-config-label">Комплектация</div>
        <div className="cwr-product-chip-row">
          {experience.variants.map((variant) => {
            const active = variant.id === state.variantId;
            return (
              <button
                key={variant.id}
                type="button"
                data-testid={`variant-${variant.id}`}
                onClick={() => onVariantChange(variant.id)}
                className={`cwr-product-chip${active ? " cwr-product-chip-active" : ""}`}
                style={active ? { borderColor: variant.accent, color: variant.accent } : undefined}
              >
                <span>{variant.label}</span>
                <strong>
                  {(product.price + variant.priceDelta).toLocaleString("ru-RU")} {product.currency}
                </strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className="cwr-product-config-group">
        <div className="cwr-product-config-label">Способ доставки</div>
        <div className="cwr-product-chip-row">
          {experience.deliveryOptions.map((option) => {
            const active = option.id === state.deliveryId;
            return (
              <button
                key={option.id}
                type="button"
                data-testid={`delivery-${option.id}`}
                onClick={() => onDeliveryChange(option.id)}
                className={`cwr-product-chip${active ? " cwr-product-chip-active" : ""}`}
              >
                <span>{option.label}</span>
                <strong>
                  {option.price === 0
                    ? "Бесплатно"
                    : `${option.price.toLocaleString("ru-RU")} ${product.currency}`}
                </strong>
              </button>
            );
          })}
        </div>
      </div>

      <div className="cwr-product-purchase-row">
        <div className="cwr-product-qty">
          <button
            type="button"
            data-testid="quantity-decrease"
            onClick={() => onQuantityChange(Math.max(1, state.quantity - 1))}
          >
            −
          </button>
          <span data-testid="quantity-value">{state.quantity}</span>
          <button
            type="button"
            data-testid="quantity-increase"
            onClick={() => onQuantityChange(Math.min(10, state.quantity + 1))}
          >
            +
          </button>
        </div>

        <button
          type="button"
          data-testid="add-to-cart"
          disabled={state.added}
          onClick={onAddToCart}
          className="cwr-product-buy-button"
        >
          {state.added ? "В корзине" : "Добавить в корзину"}
        </button>
      </div>

      <div className="cwr-product-purchase-summary">
        <div>
          <span>Итого</span>
          <strong data-testid="purchase-total">
            {summary.totalPrice.toLocaleString("ru-RU")} {product.currency}
          </strong>
        </div>
        <div>
          <span>Рассрочка</span>
          <strong>{summary.monthlyInstallment.toLocaleString("ru-RU")} ₽ / мес</strong>
        </div>
        <div>
          <span>Доставка</span>
          <strong>{summary.selectedDelivery.note}</strong>
        </div>
      </div>

      {isPending && <div className="cwr-product-pending">Пересчитываем конфигурацию…</div>}
    </section>
  );
}
