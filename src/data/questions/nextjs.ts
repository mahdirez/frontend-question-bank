import type { Question } from "@/types/question";

export const nextjsQuestions: Question[] = [
  {
    id: "nextjs-routing-01",
    level: "basic",
    topic: "nextjs",
    question: "How does routing work in the Next.js App Router?",
    answer:
      "Routing is file-system based. Folders inside app/ define URL segments, and a route becomes publicly accessible only when it contains a page file.\n\nlayout.tsx wraps the pages below it and stays mounted during navigation between them, so its state is preserved. Special files like loading.tsx, error.tsx and not-found.tsx handle loading, error and 404 states for a segment.\n\nSquare brackets create dynamic segments ([id]), and a folder in parentheses ((marketing)) groups routes without affecting the URL.",
    code: {
      language: "text",
      content: `app/
  layout.tsx          wraps every page
  page.tsx            /
  questions/
    page.tsx          /questions
    [id]/
      page.tsx        /questions/:id
  (marketing)/
    about/page.tsx    /about`,
    },
  },
  {
    id: "nextjs-image-font-01",
    level: "basic",
    topic: "nextjs",
    question: "What do next/image and next/font do for performance?",
    answer:
      "next/image optimizes images automatically. It serves correctly sized images for the device, uses modern formats such as WebP or AVIF when the browser supports them, lazy-loads by default, and reserves space (via width and height, or fill) to avoid layout shift. Add the priority prop to the image that is the Largest Contentful Paint element.\n\nnext/font downloads fonts at build time and serves them from your own domain, so there is no extra request to a font provider at runtime. It also generates a fallback font with adjusted metrics, which reduces layout shift when the web font loads.",
  },
  {
    id: "nextjs-server-client-01",
    level: "intermediate",
    topic: "nextjs",
    question:
      "What is the difference between Server Components and Client Components?",
    answer:
      'In the App Router, components are Server Components by default. They run on the server, ship no component JavaScript to the browser, can read data directly (database, files, secrets) and can be async.\n\nClient Components start with the "use client" directive. They are needed for state, effects, event handlers and browser APIs. They are still pre-rendered on the server, then hydrated in the browser.\n\n"use client" marks a boundary: everything imported into that file becomes part of the client bundle. Keep client components small and near the leaves of the tree, and pass server-rendered content to them as children. Props passed from server to client must be serializable.',
    code: {
      language: "tsx",
      content: `// app/page.tsx (Server Component)
export default async function Page() {
  const items = await getItems(); // runs on the server
  return <LikeButtons items={items} />;
}

// components/LikeButtons.tsx
"use client";

import { useState } from "react";

export function LikeButtons({ items }: { items: string[] }) {
  const [liked, setLiked] = useState<string[]>([]);
  // ...handlers and interactivity live here
}`,
    },
  },
  {
    id: "nextjs-hydration-01",
    level: "intermediate",
    topic: "nextjs",
    question: "What is hydration, and what causes hydration mismatch errors?",
    answer:
      "The server sends HTML so the user sees content quickly. Hydration is the step where React runs in the browser, attaches event handlers to that HTML and makes it interactive.\n\nReact expects the first client render to produce the same output as the server HTML. A mismatch happens when it does not. Typical causes are Date.now() or Math.random() during render, reading window or localStorage to decide what to render, locale or timezone differences between server and client, invalid HTML nesting (a div inside a p), and browser extensions that modify the DOM.\n\nThe fix is to render the same thing first and apply client-only values after mount (in an effect), or read external stores with useSyncExternalStore and a server snapshot. For a single unavoidable difference, such as a timestamp, suppressHydrationWarning on that element is acceptable.",
    code: {
      language: "tsx",
      content: `// Mismatch: server and client render different times
<p>{new Date().toLocaleTimeString()}</p>

// Fix: render a stable value first, update after mount
const [time, setTime] = useState<string | null>(null);
useEffect(() => setTime(new Date().toLocaleTimeString()), []);
return <p>{time ?? "--:--"}</p>;`,
    },
  },
  {
    id: "nextjs-rendering-01",
    level: "advanced",
    topic: "nextjs",
    question:
      "Compare static rendering, dynamic rendering, ISR and streaming in Next.js. How do you choose?",
    answer:
      "Static rendering (SSG) builds the page once at build time and serves it from a CDN. It is the fastest and cheapest option, but the content is only as fresh as the last build.\n\nDynamic rendering (SSR) renders on every request. Use it when content depends on the request, such as cookies, headers or per-user data, at the cost of higher TTFB and server load.\n\nISR (incremental static regeneration) serves a static page and regenerates it in the background after a time interval or on demand, so you keep CDN speed with reasonably fresh content.\n\nStreaming sends the page in chunks. Wrapping slow parts in Suspense lets the shell and fast content appear immediately while slower data fills in. Partial prerendering, available through Cache Components in recent versions, goes further: a static shell is served instantly and only the dynamic holes are streamed.\n\nA practical rule: make everything static by default, and make only the parts that truly depend on the request dynamic. Rendering rules and caching defaults have changed between Next.js versions, so confirm details in the docs for your version.",
  },
  {
    id: "nextjs-revalidation-01",
    level: "advanced",
    topic: "nextjs",
    question:
      "How does revalidation work in Next.js, and when would you use on-demand revalidation?",
    answer:
      "Revalidation refreshes cached or statically generated content without a full rebuild.\n\nTime-based revalidation sets an interval. After it passes, the next request still receives the stale content while a fresh version is generated in the background (stale-while-revalidate behavior).\n\nOn-demand revalidation invalidates content when something actually changes. You call revalidatePath to refresh a route, or revalidateTag to refresh everything tagged with a label, from a Server Action or Route Handler, for example after a CMS webhook or a form submission.\n\nUse time-based for content where a delay is acceptable, and on-demand when users must see changes quickly but you still want static performance. Tags scale better than paths when many pages share the same data.",
    code: {
      language: "ts",
      content: `"use server";

import { revalidatePath } from "next/cache";

export async function publishPost(id: string) {
  await db.posts.publish(id);
  revalidatePath("/blog"); // refresh the blog list
  revalidatePath(\`/blog/\${id}\`); // and the post page
}`,
    },
  },
];
