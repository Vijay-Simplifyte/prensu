export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://prensusonkar-portfolio.netlify.app"
).replace(/\/$/, "");

export const SITE_NAME = "Prensu Sonkar";
export const SITE_TITLE = "Prensu Sonkar — UI/UX Designer Portfolio";
export const SITE_DESCRIPTION =
  "UI/UX Designer with experience at Simplifyte Labs. Designing website interfaces, mobile screens, wireframes, prototypes, design systems, and brand assets.";

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
