import $config from "../../config";

function rewriteURL(url, base) {
  if (!url || typeof url !== "string") return url;

  const trimmed = url.trim();

  if (trimmed.toLowerCase().startsWith("javascript:")) {
    // TODO - JS rewriting
  }
  // just skip it
  if (
    trimmed.toLowerCase().startsWith("mailto:") ||
    trimmed.toLowerCase().startsWith("tel:")
  ) {
    return trimmed;
  }
  if (
    trimmed.toLowerCase().startsWith("data:") &&
    !trimmed.toLowerCase().startsWith("data:image/")
  ) {
    return "#";
  }
  if (trimmed.startsWith($config.preifx)) {
    return trimmed;
  }

  try {
    const resolvedUrl = new URL(trimmed, base).href;
    return $config.prefix + resolvedUrl;
  } catch {
    return trimmed;
  }
}

export default rewriteURL;
