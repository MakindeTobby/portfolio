import Script from "next/script";

// Privacy-friendly analytics (Plausible). Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to switch it on.
export default function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.tagged-events.js";
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
