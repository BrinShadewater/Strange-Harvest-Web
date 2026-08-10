import { cookies } from "next/headers";

export type ThemeVariant = "red" | "blue";

/** The A/B assignment. Written once by the edge/middleware; never overwritten by the UI,
 *  because analytics attribute every exposure and click to this value. */
export const AB_ASSIGNMENT_COOKIE = "sh_ab_theme_v1";

/** The visitor's explicit poster choice from the hero toggle. Deliberately a SECOND
 *  cookie: writing the toggle back into the assignment would re-bucket the visitor
 *  mid-experiment and make a "blue won" result unreadable. */
export const POSTER_CHOICE_COOKIE = "sh_poster_choice";

const isVariant = (v: string | undefined): v is ThemeVariant => v === "red" || v === "blue";

/**
 * Which poster to render, and which one to preload.
 *
 * Choice wins over assignment. Before this existed the hero toggle changed nothing
 * durable: picking "Official Poster" and reloading snapped straight back to Festival,
 * and navigating to a static page showed the assigned arm while the home page showed
 * the chosen one.
 *
 * `assigned` is returned alongside so analytics can keep reporting against the original
 * bucket regardless of what the visitor is looking at.
 */
export async function resolvePosterVariant(): Promise<{
  variant: ThemeVariant;
  assigned: ThemeVariant;
}> {
  const cookieStore = await cookies();
  const assignedRaw = cookieStore.get(AB_ASSIGNMENT_COOKIE)?.value;
  const choiceRaw = cookieStore.get(POSTER_CHOICE_COOKIE)?.value;

  const assigned: ThemeVariant = isVariant(assignedRaw) ? assignedRaw : "red";
  const variant: ThemeVariant = isVariant(choiceRaw) ? choiceRaw : assigned;

  return { variant, assigned };
}
