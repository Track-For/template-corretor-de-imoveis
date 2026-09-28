const defaultSiteUrl = "https://aurora-residencias.vercel.app";

function resolveSiteUrl(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    return defaultSiteUrl;
  }

  try {
    const url = new URL(candidate);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return defaultSiteUrl;
    }

    return url.origin;
  } catch {
    return defaultSiteUrl;
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const metadataBase = new URL(siteUrl);
