export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTimeMinutes: number;
  body: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "java-nullpointerexception-beginners-guide",
    title: "Java NullPointerException: A Beginner-Friendly Guide to Causes and Fixes",
    description:
      "Understand why NullPointerException happens in Java, how to read the stack trace, and practical patterns to avoid null bugs in real code.",
    date: "2026-01-15",
    category: "Java",
    readTimeMinutes: 12,
    body: `
In Java, **NullPointerException** (often shortened to **NPE**) is one of the most common runtime errors beginners see. It is not a “compiler error”—your code compiles—but when the program runs, Java tries to use a reference that points to **no object** (i.e. \`null\`), and that operation is not allowed.

## What \`null\` actually means

A variable that holds an object reference either points to an object in memory, or it holds the special value \`null\`, meaning “no object.” If you call a method, read a field, or index as if there were an object—but the reference is \`null\`—the JVM throws \`NullPointerException\`.

\`\`\`java
String name = null;
System.out.println(name.length()); // NullPointerException here
\`\`\`

The error happens at \`.length()\` because \`name\` does not refer to a \`String\` instance.

## Typical causes (with quick fixes)

### 1. Forgetting to assign before use

\`\`\`java
String userId;
// ... later ...
System.out.println(userId.trim()); // NPE if userId was never assigned
\`\`\`

**Fix:** Initialize variables when you declare them, or assign in all branches before use.

### 2. Methods that return \`null\`

\`\`\`java
String email = findEmailForUser(id);
System.out.println(email.toLowerCase());
\`\`\`

If \`findEmailForUser\` returns \`null\`, the second line throws.

**Fix:** Check for \`null\`, use \`Optional\` (Java 8+), or return empty strings / sentinel objects consistently—pick one strategy for your codebase.

### 3. Collections and arrays

\`\`\`java
List<String> items = getItems();
for (String s : items) { ... } // NPE if items is null
\`\`\`

**Fix:** Defensive checks or \`Collections.emptyList()\` instead of \`null\` lists.

## How to read the stack trace

The stack trace shows the **exact line** where the dereference happened. Start at the top frame that mentions **your** package (not only \`java.lang\`). That line is where you need a null check or a better initialization path.

## Practical habits that reduce NPEs

- Prefer **clear APIs**: document whether a method can return \`null\`.
- Use **Objects.requireNonNull** during development to fail fast when assumptions break.
- For strings, know the difference between **empty** (\`""\`) and **null**—they are not the same.

## FAQ

**Is catching NullPointerException a good idea?**  
Usually **no** as a general strategy—it hides bugs. Fix the root cause instead.

**Does \`== null\` work?**  
Yes. \`value == null\` is the idiomatic null check (and \`value != null\` before use).

---

Understanding NPE is a core skill for Java courses and real projects. Once you can spot “who might be null on this line?”, debugging becomes much faster—and your students or teammates will thank you for writing clearer, safer code.
`.trim(),
  },
  {
    slug: "nextjs-app-router-what-to-learn-first",
    title: "Next.js App Router: What to Learn First (for Developers Coming from React)",
    description:
      "A practical learning order for the App Router: layouts, server vs client components, routing, and data fetching—without drowning in docs.",
    date: "2026-01-22",
    category: "Web Development",
    readTimeMinutes: 10,
    body: `
If you already know React, **Next.js App Router** can still feel like a new framework—not just a router swap. The mental model changes because Next.js is not only rendering UI; it is also deciding **where code runs** (server vs browser) and **how URLs map to files**.

This article gives a **learning order** that works well in classrooms and self-study.

## 1. Start with file-based routing

In the \`app/\` directory:

- \`app/page.tsx\` → \`/\`
- \`app/blog/page.tsx\` → \`/blog\`
- \`app/blog/[slug]/page.tsx\` → dynamic segments

**Goal:** You can predict a URL from the folder structure. That alone removes a lot of confusion.

## 2. Layouts vs pages

- A **layout** wraps nested routes and persists across navigation.
- A **page** is the leaf UI for a route.

**Goal:** Understand why headers/sidebars belong in \`layout.tsx\` and why page files should stay focused.

## 3. Server Components by default

React Server Components mean much of your UI can render on the server **without shipping large client bundles**. Client interactivity is added only where needed using \`"use client"\`.

**Goal:** Know when you need a client component (state, effects, browser APIs) and when you do not.

## 4. Data fetching boundaries

In the App Router, data fetching patterns depend on whether you are in a Server Component or a Client Component. Mixing them without a plan creates “works on my machine” bugs.

**Goal:** Be able to explain in one sentence where your data is fetched for a page.

## 5. Metadata and SEO basics

Use the **Metadata API** (\`export const metadata\`) for titles and descriptions. This matters for portfolios, blogs, and any site that should be discoverable.

## Common pitfalls

- Importing a client-only library into a server component by accident.
- Putting too much logic into \`layout.tsx\` so every navigation feels slow.
- Duplicating fetch logic across many pages instead of centralizing helpers.

## A simple weekly plan

- **Day 1–2:** Routing + layouts  
- **Day 3–4:** Server vs client components  
- **Day 5:** Metadata + one dynamic route  
- **Day 6–7:** Build a small feature end-to-end (list + detail page)

---

If you teach web development, have students **ship a tiny App Router project** early (two routes + a layout). The confidence from a working URL structure beats reading ten tutorials in isolation.
`.trim(),
  },
  {
    slug: "teaching-programming-ten-classroom-techniques",
    title: "Teaching Programming: 10 Techniques That Work in Real Classrooms",
    description:
      "Practical methods for computer labs: live coding, micro-exercises, error normalization, and keeping beginners from quitting early.",
    date: "2026-02-01",
    category: "Teaching",
    readTimeMinutes: 11,
    body: `
Teaching programming is not only explaining syntax. Students fail for predictable reasons: **cognitive overload**, **fear of errors**, and **unclear practice loops**. The following techniques are battle-tested in labs teaching Java and web development.

## 1. Normalize errors early

Show students that errors are **information**, not shame. Pick a simple typo, paste the compiler message, and walk through how to read line numbers and keywords.

## 2. Live code slowly—narrate decisions

Fast typing looks impressive but teaches little. Speak aloud: “Why am I creating this variable here?” “What happens if input is empty?”

## 3. Micro-exercises (5–10 minutes)

Long assignments too early create anxiety. Short tasks with a clear “done” condition build momentum.

## 4. Pair programming (short bursts)

Pairing reduces individual pressure and surfaces misconceptions quickly. Rotate pairs so stronger students do not become permanent tutors.

## 5. Rubrics that reward process

Grade **attempt + reflection**, not only final output—especially in early weeks.

## 6. One new concept per session

Mixing OOP + exceptions + collections in one lecture overwhelms beginners. Sequence topics tightly.

## 7. Use real but small examples

A tiny inventory or gradebook beats abstract \`Foo\`/\`Bar\` examples—still small enough to finish.

## 8. Code reading before code writing

Have students predict output or find a bug in a short snippet. Reading trains attention to detail.

## 9. Lab time is sacred

Protect hands-on time. Lectures can be recorded; debugging with an instructor often cannot.

## 10. Close loops with feedback

Return assignments quickly with **actionable** notes: “Fix null handling in login path,” not only “Good job.”

## What this means for your curriculum

If you teach Java and web stacks, align modules so each week ends with a **visible artifact**: a CLI tool, a tiny API, a static page—something students can show friends.

---

Great teaching compounds: students who learn how to learn become the developers who keep improving after the course ends.
`.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
