import type { Question } from "@/types/question";

export const browserNetworkQuestions: Question[] = [
  {
    id: "net-storage-01",
    level: "basic",
    topic: "browser-network",
    question:
      "What are the differences between cookies, localStorage, sessionStorage and IndexedDB?",
    answer:
      "Cookies are small (about 4KB), are sent to the server with every matching request, can expire, and can be marked HttpOnly, Secure and SameSite. They suit sessions and data the server needs.\n\nlocalStorage holds around 5MB of string key-value pairs per origin, persists until cleared, and is synchronous, so heavy use blocks the main thread. It is readable by any script on the origin, so it is not for secrets.\n\nsessionStorage works like localStorage but is scoped to a single tab and cleared when the tab closes.\n\nIndexedDB is an asynchronous, transactional database for large amounts of structured data, available in workers too. It is the right choice for offline apps and big datasets.",
  },
  {
    id: "net-url-to-page-01",
    level: "intermediate",
    topic: "browser-network",
    question: "What happens between typing a URL and seeing the page?",
    answer:
      "1. The browser checks its caches and HSTS list, then resolves the domain name through DNS.\n2. It opens a connection: TCP with a TLS handshake, or QUIC for HTTP/3.\n3. It sends the HTTP request and the server responds with HTML.\n4. The browser parses the HTML into the DOM while a preload scanner discovers CSS, scripts and images early.\n5. CSS is parsed into the CSSOM. CSS blocks rendering, and synchronous scripts block the parser unless marked async or defer.\n6. DOM and CSSOM combine into a render tree, then the browser runs layout, paint and compositing.\n7. JavaScript runs, and for frameworks like React the page is hydrated to become interactive.\n\nMost performance work targets one of these steps: faster DNS and connections, smaller and cached responses, less render-blocking work, and less JavaScript.",
  },
  {
    id: "net-cors-01",
    level: "intermediate",
    topic: "browser-network",
    question: "What is CORS and why do preflight requests exist?",
    answer:
      "Browsers enforce the same-origin policy: a page can only read responses from its own origin. CORS (cross-origin resource sharing) is how a server opts in to letting other origins read its responses, using headers such as Access-Control-Allow-Origin.\n\nFor 'non-simple' requests, such as those with custom headers, methods like PUT or DELETE, or JSON content types, the browser first sends an OPTIONS preflight asking whether the real request is allowed. Only if the server agrees does the actual request go out.\n\nWith credentials (cookies), the server must name the exact origin instead of * and send Access-Control-Allow-Credentials: true.\n\nCORS is enforced by the browser, not the server. It does not stop tools like curl, so it is not an authentication mechanism. The fix for a CORS error is configuring the server (or using a same-origin proxy), not changing the frontend.",
    code: {
      language: "http",
      content: `Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true`,
    },
  },
  {
    id: "net-http-caching-01",
    level: "advanced",
    topic: "browser-network",
    question:
      "How does HTTP caching work, and what is a good Cache-Control strategy?",
    answer:
      "Cache-Control tells browsers and CDNs how long a response may be reused. max-age sets the freshness lifetime, s-maxage applies to shared caches such as CDNs, and stale-while-revalidate allows serving a stale copy while refreshing in the background.\n\nno-cache does not mean 'do not cache'. It means the cache must revalidate before reusing the response. no-store means never store it.\n\nRevalidation uses validators: the server sends an ETag or Last-Modified, the browser sends it back, and the server replies 304 Not Modified with no body if nothing changed.\n\nA solid strategy is to give fingerprinted assets (file names containing a content hash) a one-year immutable lifetime, because a changed file gets a new URL, and to keep HTML on no-cache or a short lifetime so deployments are picked up quickly.",
    code: {
      language: "http",
      content: `# /_next/static/app.3f9a1c.js
Cache-Control: public, max-age=31536000, immutable

# HTML document
Cache-Control: no-cache`,
    },
  },
  {
    id: "net-http-versions-01",
    level: "advanced",
    topic: "browser-network",
    question: "How do HTTP/1.1, HTTP/2 and HTTP/3 differ?",
    answer:
      "HTTP/1.1 handles one request at a time per connection, so browsers open several connections, and a slow response blocks the ones behind it. This led to workarounds like bundling files, image sprites and domain sharding.\n\nHTTP/2 multiplexes many requests over a single connection and compresses headers, which makes those workarounds mostly unnecessary. Because it runs over TCP, one lost packet still stalls all streams (head-of-line blocking at the transport level). HTTP/2 server push was largely abandoned; use preload hints or 103 Early Hints instead.\n\nHTTP/3 runs over QUIC on UDP. Streams are independent, so packet loss only affects one of them, connections are established faster, and they survive network changes such as moving from Wi-Fi to mobile data.\n\nFor frontend work this means you no longer need to merge everything into one huge file, but sending fewer bytes and loading critical resources first still matters most.",
  },
  {
    id: "net-service-worker-01",
    level: "engineering",
    topic: "browser-network",
    question: "How would you design an offline strategy with a service worker?",
    answer:
      "A service worker is a script that runs separately from the page and sits between the app and the network, intercepting fetches. It requires HTTPS and has an install, activate and fetch lifecycle.\n\nChoose a caching strategy per resource type. Cache-first suits fingerprinted static assets. Network-first suits HTML and API data where freshness matters, with the cache as an offline fallback. Stale-while-revalidate gives instant responses while updating in the background and suits content that can be slightly old.\n\nVersion your caches and delete old ones during activate. Plan the update flow carefully: a new worker waits until old tabs close, and forcing skipWaiting can mix old pages with new assets, so many apps show an 'update available' prompt.\n\nThe risks are real: users stuck on a stale version, hard-to-debug cache bugs and storage limits. Libraries like Workbox reduce the boilerplate. Before building any of this, confirm that offline support is an actual product requirement, because it adds permanent complexity.",
    code: {
      language: "js",
      content: `// Cache-first for static assets
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached ?? fetch(event.request)),
  );
});`,
    },
  },
];
