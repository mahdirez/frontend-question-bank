import type { Question } from "@/types/question";

export const securityQuestions: Question[] = [
  {
    id: "sec-secrets-01",
    level: "basic",
    topic: "security",
    question: "Can you keep an API key secret in frontend code?",
    answer:
      "No. Anything shipped to the browser is public: JavaScript bundles, source maps and network requests can all be inspected. Obfuscation does not change that.\n\nIn Next.js, environment variables prefixed with NEXT_PUBLIC_ are inlined into the client bundle at build time, so they must never hold secrets. Variables without the prefix stay on the server.\n\nKeep keys with real privileges on the server (Route Handlers, Server Actions or a backend proxy) and have the browser call your server instead. If a key must be public, such as a maps key, restrict it by domain and by API scope. If a secret leaks, rotate it immediately. Make sure .env files are in .gitignore.",
  },
  {
    id: "sec-xss-01",
    level: "intermediate",
    topic: "security",
    question: "What is XSS and how do you prevent it in a React app?",
    answer:
      "Cross-site scripting happens when an attacker gets their JavaScript to run in your origin. It can be stored (saved in your database), reflected (echoed from a request) or DOM-based (introduced by client-side code). From there the script can read the page, act as the user and exfiltrate data.\n\nReact escapes values rendered in JSX by default, which prevents most cases. The risks come from bypassing it: dangerouslySetInnerHTML, innerHTML, eval, and user-controlled URLs such as href values starting with javascript:.\n\nIf you must render user-provided HTML, sanitize it with a well-maintained library like DOMPurify. Validate URL protocols, and add a Content Security Policy as defense in depth.",
    code: {
      language: "tsx",
      content: `// Safe by default: React escapes the value
<div>{userComment}</div>

// Dangerous: renders raw HTML
<div dangerouslySetInnerHTML={{ __html: userComment }} />

// If you must, sanitize first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userComment) }} />`,
    },
  },
  {
    id: "sec-csrf-01",
    level: "intermediate",
    topic: "security",
    question: "What is CSRF and how do you defend against it?",
    answer:
      "Cross-site request forgery tricks a logged-in user's browser into sending an authenticated request to your site from another site. It works because browsers attach cookies automatically.\n\nDefenses include the SameSite cookie attribute (Lax or Strict; modern browsers default to Lax), anti-CSRF tokens that the server verifies on state-changing requests, checking the Origin or Referer header, and requiring a custom header for API calls so that cross-origin requests need a CORS preflight. Never change state with GET requests.\n\nAPIs that authenticate with an Authorization header instead of cookies are not exposed to CSRF, since the header is not added automatically. They have different trade-offs around where the token is stored.",
  },
  {
    id: "sec-token-storage-01",
    level: "intermediate",
    topic: "security",
    question:
      "Where should you store authentication tokens: localStorage or cookies?",
    answer:
      "There is no perfect option, only trade-offs.\n\nlocalStorage is readable by any script running on your origin, so one XSS vulnerability lets an attacker steal the token and reuse it anywhere.\n\nAn HttpOnly cookie cannot be read by JavaScript, so it cannot be stolen by XSS. But the browser sends it automatically, so you need CSRF protection (SameSite, tokens). Secure ensures it is only sent over HTTPS.\n\nA common recommendation is a session or refresh token in an HttpOnly, Secure, SameSite cookie, with a short-lived access token kept in memory. Note that XSS can still perform actions as the user even if it cannot read the cookie, so preventing XSS remains essential.",
    code: {
      language: "http",
      content: `Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=3600`,
    },
  },
  {
    id: "sec-csp-01",
    level: "advanced",
    topic: "security",
    question:
      "What is a Content Security Policy and how do you roll one out safely?",
    answer:
      "CSP is a response header that tells the browser which sources are allowed for scripts, styles, images, connections, frames and more. If an attacker injects a script tag, the browser refuses to run it because its source is not allowed. It limits the damage of XSS but does not replace fixing it.\n\nKey directives are default-src, script-src, style-src, img-src, connect-src, object-src, base-uri and frame-ancestors (which also protects against clickjacking). Avoid 'unsafe-inline' for scripts. Use per-request nonces or hashes, optionally with 'strict-dynamic'.\n\nRoll it out in stages: start with Content-Security-Policy-Report-Only, collect violation reports, fix legitimate sources, then enforce. In Next.js, nonce-based policies typically require per-request rendering, which trades off against static optimization.",
    code: {
      language: "http",
      content: `Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-r4nd0m' 'strict-dynamic';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none'`,
    },
  },
  {
    id: "sec-authz-01",
    level: "engineering",
    topic: "security",
    question:
      "Where should authorization be enforced in a frontend application, and why?",
    answer:
      "Always on the server, for every request that reads or changes protected data. Anything in the browser can be modified by the user, so hiding a button or redirecting from a route guard is a user experience feature, not a security control.\n\nIn practice this means authenticating and authorizing inside every API endpoint, Route Handler and Server Action (Server Actions are reachable as public HTTP endpoints), validating all input on the server with a schema, and checking ownership of each resource to prevent insecure direct object reference bugs, where changing an id in a request exposes someone else's data.\n\nIn Next.js, a proxy or middleware redirect is a good optimistic check, but it should not be the only layer. Centralize the checks in a data access layer so every query goes through the same policy, apply least privilege, and avoid passing more data than necessary to Client Components.\n\nThe trade-off is some duplicated checks and a small performance cost, in exchange for removing an entire class of vulnerabilities.",
  },
];
