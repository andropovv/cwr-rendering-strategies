import React from "react";
import type { Product, ProductExperienceData } from "../data/products";
import { formatProductReviewDate } from "../utils/productExperience";

export interface ProductExperienceDetailsProps {
  product: Product;
  experience: ProductExperienceData;
}

export function ProductExperienceDetails({
  product,
  experience,
}: ProductExperienceDetailsProps) {
  const ratingCounts = new Map<number, number>();
  for (const review of experience.reviews) {
    ratingCounts.set(review.rating, (ratingCounts.get(review.rating) ?? 0) + 1);
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = ratingCounts.get(rating) ?? 0;
    return {
      rating,
      count,
      width: `${Math.max(14, Math.round((count / experience.reviews.length) * 100))}%`,
    };
  });

  return (
    <div className="cwr-product-sections">
      <section className="cwr-product-section-card">
        <div className="cwr-product-section-header">
          <h2>Характеристики</h2>
          <span>{product.category}</span>
        </div>
        <div className="cwr-product-spec-grid">
          {experience.specs.map((spec) => (
            <div key={spec.label} className="cwr-product-spec-row">
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="cwr-product-section-card">
        <div className="cwr-product-section-header">
          <h2>Отзывы и рейтинг</h2>
          <span>{experience.reviews.length} последних отзывов</span>
        </div>
        <div className="cwr-product-review-summary">
          <div className="cwr-product-review-score">
            <strong>{product.rating}</strong>
            <span>средняя оценка</span>
          </div>
          <div className="cwr-product-review-bars">
            {ratingDistribution.map((entry) => (
              <div key={entry.rating} className="cwr-product-review-bar-row">
                <span>{entry.rating}★</span>
                <div className="cwr-product-review-bar-track">
                  <div
                    className="cwr-product-review-bar-fill"
                    style={{ width: entry.width }}
                  />
                </div>
                <strong>{entry.count}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="cwr-product-review-list">
          {experience.reviews.slice(0, 8).map((review) => (
            <article key={review.id} className="cwr-product-review-card">
              <div className="cwr-product-review-card-head">
                <strong>{review.author}</strong>
                <span>{formatProductReviewDate(review.createdAt)}</span>
              </div>
              <div className="cwr-product-review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <h3>{review.title}</h3>
              <p>{review.body}</p>
              <div className="cwr-product-review-meta">
                <span>{review.verified ? "Подтверждённая покупка" : "Без верификации"}</span>
                <span>Полезно: {review.helpfulCount}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
