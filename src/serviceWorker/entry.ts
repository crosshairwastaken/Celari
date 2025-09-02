// @ts-ignore
import $config from "../config";
import { BareClient } from "@mercuryworkshop/bare-mux";
import { rewriteHTML } from "../rewrite/html/main";

const routeCelari = async function (request: any) {
  try {
    const url = new URL(request.url);
    if (url.pathname.startsWith($config.prefix)) {
      const client = new BareClient();

      const targetUrl = $config.decodeUrl(
        url.pathname.slice($config.prefix.length),
      );
      console.log(`[serviceWorker] fetching ${targetUrl}`);

      const response = await client.fetch(targetUrl, {
        headers: new Headers(request.headers),
      });

      const mime = response.headers.get("Content-Type") || "";

      const headers = new Headers(response.headers);
      headers.set("X-Frame-Options", "SAMEORIGIN");
      headers.delete("Content-Security-Policy");
      headers.delete("Content-Security-Policy-Report-Only");

      if (
        mime.includes("text/html") ||
        mime.includes("application/xhtml+xml")
      ) {
        const text = await response.text();
        const rewritten = rewriteHTML(text, url);
        return new Response(rewritten, { headers });
      }
      if (
        mime.includes("application/javascript") ||
        mime.includes("text/javascript")
      ) {
        const text = await response.text();
        return new Response(text, { headers });
      }

      // for everything thats not rewritten, stream
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
    return fetch(request);
  } catch (e) {
    // TODO - custom err page impl
    return new Response("Fetch failed: " + e, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

// @ts-ignore
self.routeCelari = routeCelari;
