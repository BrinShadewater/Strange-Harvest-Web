import { cookies } from "next/headers";
import ClientPage from "@/components/ClientPage";
import { getCountryFromHeaders } from "@/services/geoServer";

export default async function HomePage() {
  const cookieStore = await cookies();
  const abVariant = (cookieStore.get("sh_ab_theme_v1")?.value ?? "red") as "red" | "blue";
  const initialCountry = await getCountryFromHeaders();
  return <ClientPage lang="en" abVariant={abVariant} initialCountry={initialCountry} />;
}
