"use client";

import { useSitecopy } from "./LanguageProvider";
import { useState, useEffect } from "react";
import {
  getProducts,
  getCheckoutUrl,
  formatPrice,
  CARD_IMAGE_1X,
  CARD_IMAGE_2X,
  type ShopifyProduct,
} from "../services/shopify";

export default function Merch() {
  const { merch } = useSitecopy();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isDev = process.env.NODE_ENV === 'development';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
        
        // Show error state if no products returned (likely due to missing credentials)
        if (productsData.length === 0) {
          setError(true);
        }
      } catch (err) {
        if (isDev) {
          console.error("Failed to load products:", err);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="merch" id="shop">
      <h2>{merch.title}</h2>
      <p className="merchBlurb">{merch.blurb}</p>
      
      {loading && (
        <div className="merchLoading">
          <p>{merch.loadingMessage}</p>
        </div>
      )}

      {error && !loading && (
        <div className="merchComingSoon" role="status">
          <div className="comingSoonContent">
            <h3>{merch.errorTitle}</h3>
            <p>{merch.errorBody}</p>
            <a
              href={merch.shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta primary"
              style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              {merch.storeLink}
            </a>
          </div>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="merchGrid">
          {products.map((product) => {
            const image = product.images.edges[0]?.node;
            const imageAlt = image?.altText || product.title;
            const price = formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            );
            const checkoutUrl = getCheckoutUrl(product.handle);

            return (
              <article key={product.id} className="merchCard">
                {image && (
                  <div className="merchCardImage">
                    <img
                      src={image.url1x}
                      srcSet={`${image.url1x} ${CARD_IMAGE_1X}w, ${image.url2x} ${CARD_IMAGE_2X}w`}
                      /* The card is ~283 CSS px on desktop and ~301 on mobile's
                         single column, so one size hint covers both breakpoints. */
                      sizes={`${CARD_IMAGE_1X}px`}
                      alt={imageAlt}
                      loading="lazy"
                      decoding={"async"}
                      width={CARD_IMAGE_1X}
                      height={CARD_IMAGE_1X}
                    />
                  </div>
                )}
                <div className="merchCardContent">
                  <h3 className="merchCardTitle">{product.title}</h3>
                  <p className="merchCardPrice">{price}</p>
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta primary"
                  >
                    {merch.buyNow}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
