"use client";

import { sitecopy } from "./sitecopy";
import { useState, useEffect } from "react";
import { getProducts, getCheckoutUrl, formatPrice, type ShopifyProduct } from "../services/shopify";

export default function Merch() {
  const { merch } = sitecopy;
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
        <div className="merchComingSoon">
          <div className="comingSoonContent">
            <h3>{merch.comingSoonTitle}</h3>
            <p>{merch.comingSoonBody}</p>
            <a 
              href={merch.shopifyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta primary"
              style={{ marginTop: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <img src="/images/svgcons/still-icon-notify.svg" alt="" style={{ width: '20px', height: '20px', filter: 'brightness(0) invert(1)' }} loading={"lazy"} decoding={"async"} />
              {merch.notifyMe}
            </a>
          </div>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="merchGrid">
          {products.map((product) => {
            const imageUrl = product.images.edges[0]?.node.url;
            const imageAlt = product.images.edges[0]?.node.altText || product.title;
            const price = formatPrice(
              product.priceRange.minVariantPrice.amount,
              product.priceRange.minVariantPrice.currencyCode
            );
            const checkoutUrl = getCheckoutUrl(product.handle);

            return (
              <article key={product.id} className="merchCard">
                {imageUrl && (
                  <div className="merchCardImage">
                    <img src={imageUrl} alt={imageAlt} loading="lazy" decoding={"async"} width={600} height={600} />
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
