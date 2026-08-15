"use client";

import { useSitecopy } from "./LanguageProvider";
import { useState, useEffect, useRef } from "react";
import {
  getProducts,
  getCheckoutUrl,
  formatPrice,
  CARD_IMAGE_1X,
  CARD_IMAGE_2X,
  type ShopifyProduct,
} from "../services/shopify";

const isDev = process.env.NODE_ENV === 'development';

export default function Merch() {
  const { merch } = useSitecopy();
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // An empty catalogue and a failed fetch are different states with different copy.
  // They used to share the "something broke on our end" message.
  const [isEmpty, setIsEmpty] = useState(false);

  // Fetch only when the visitor nears the section. A 2026-08-15 bundle profile
  // found this effect firing on mount: a Shopify round-trip, JSON parse and
  // 12-card render for a section far below the fold, during the load window
  // where the field INP (378 ms) is measured. The `dynamic()` split in
  // ClientPage.tsx does NOT defer this — Next preloads dynamic chunks for
  // hydration, so the code and the fetch both ran at load anyway.
  //
  // Same IntersectionObserver discipline as the press carousel: fails OPEN
  // (no IO support -> fetch immediately, behaviour identical to before), and
  // the 1200px rootMargin starts the fetch well before the section is visible,
  // so a scrolling visitor still sees products, not the loading state. A
  // #shop deep link lands inside the margin and fires at once.
  const sectionRef = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "1200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProducts();
        if (cancelled) return;
        setProducts(productsData);

        if (productsData.length === 0) {
          setIsEmpty(true);
        }
      } catch (err) {
        if (isDev) {
          console.error("Failed to load products:", err);
        }
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [near]);

  return (
    <section ref={sectionRef} className="merch" id="shop">
      <h2>{merch.title}</h2>
      <p className="merchBlurb">{merch.blurb}</p>
      
      {loading && (
        <div className="merchLoading">
          <p>{merch.loadingMessage}</p>
        </div>
      )}

      {(error || isEmpty) && !loading && (
        <div className="merchErrorState" role="status">
          <div className="merchErrorContent">
            <h3>{error ? merch.errorTitle : merch.emptyTitle}</h3>
            <p>{error ? merch.errorBody : merch.emptyBody}</p>
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
                  {/* Outline, not primary. Twelve filled primary buttons here against
                      zero in the Watch section inverted the stated conversion
                      hierarchy — PRODUCT.md makes watch paths the conversion and
                      everything else the thing that earns that click. */}
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta"
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
