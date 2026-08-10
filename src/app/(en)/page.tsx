import ClientPage from "@/components/ClientPage";
import { getCountryFromHeaders } from "@/services/geoServer";
import { resolvePosterVariant } from "@/services/posterVariant";

export default async function HomePage() {
  // An explicit toggle choice wins over the A/B assignment — see posterVariant.ts.
  const { variant } = await resolvePosterVariant();
  const initialCountry = await getCountryFromHeaders();
  return <ClientPage lang="en" abVariant={variant} initialCountry={initialCountry} />;
}
