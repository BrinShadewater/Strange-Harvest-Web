/**
 * Shopify Storefront API Integration
 * 
 * Types for product data from Shopify
 */

/**
 * Card images are requested from Shopify already resized. The originals are
 * 2048x2048 and the card renders at ~300 CSS px, so serving them untransformed
 * cost 1.69 MB across twelve products for about 0.12 MB of actual pixels.
 * `url(transform:)` makes the CDN do the work; the two sizes feed a srcset.
 */
export const CARD_IMAGE_1X = 320;
export const CARD_IMAGE_2X = 640;

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  images: {
    edges: Array<{
      node: {
        /** Transformed to CARD_IMAGE_1X; GraphQL aliases, not raw `url`. */
        url1x: string;
        url2x: string;
        altText?: string;
      };
    }>;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        priceV2: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
      };
    }>;
  };
}

export interface ShopifyProductsResponse {
  data: {
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  };
}

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const isDev = process.env.NODE_ENV === 'development';

/**
 * Fetch products from Shopify Storefront API
 * Uses GraphQL to query product data
 */
export async function getProducts(): Promise<ShopifyProduct[]> {
  // Check if credentials are configured
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    if (isDev) {
      console.warn("Shopify credentials not configured. Set NEXT_PUBLIC_SHOPIFY_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env");
    }
    return [];
  }

  try {
    const res = await fetch(
      `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
        },
        body: JSON.stringify({
          query: `
          {
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        url1x: url(transform: {maxWidth: ${CARD_IMAGE_1X}, maxHeight: ${CARD_IMAGE_1X}})
                        url2x: url(transform: {maxWidth: ${CARD_IMAGE_2X}, maxHeight: ${CARD_IMAGE_2X}})
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }`,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Shopify API error: ${res.status}`);
    }

    const json: ShopifyProductsResponse = await res.json();
    
    // Extract products from GraphQL response structure
    return json.data.products.edges.map((edge) => edge.node);
  } catch (error) {
    if (isDev) {
      console.error("Error fetching Shopify products:", error);
    }
    return [];
  }
}

/**
 * Generate a Shopify checkout URL for a product
 * @param handle - Product handle from Shopify
 */
export function getCheckoutUrl(handle: string): string {
  return `https://${SHOPIFY_DOMAIN}/products/${handle}`;
}

/**
 * Format price with currency symbol
 */
export function formatPrice(amount: string, currencyCode: string): string {
  const price = parseFloat(amount);
  
  // USD, CAD and AUD all mapped to a bare "$", so a Canadian buyer saw "$25.00"
  // with no way to tell which dollar they were about to be charged. The dollar
  // currencies carry their prefix; the unambiguous symbols do not need one.
  const currencySymbols: Record<string, string> = {
    USD: "US$",
    GBP: "£",
    EUR: "€",
    CAD: "CA$",
    AUD: "A$",
  };

  const symbol = currencySymbols[currencyCode] || `${currencyCode} `;

  return `${symbol}${price.toFixed(2)}`;
}
