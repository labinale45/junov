export type ProjectEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  tech: string[];
  projectType: "Professional" | "Academic";
  collaboration?: "Individual" | "Team";
  contextLabel?: string;
  repoUrl: string;
  liveUrl?: string;
  showcaseImage?: string;
  body: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: "typingowl",
    title: "TypingOwl",
    shortDescription:
      "A live professional typing practice platform with analytics, lessons, and progress feedback to improve speed and accuracy.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    projectType: "Professional",
    contextLabel: "Live product (non-academic)",
    repoUrl: "https://github.com/labinale45/typing-platform.git",
    liveUrl: "https://typingowl.com",
    showcaseImage: "/TypingOwl_white.webp",
    body: `
## Project snapshot

- **Type:** Professional project (non-college)
- **Repository:** [typing-platform](https://github.com/labinale45/typing-platform.git)
- **Production URL:** [typingowl.com](https://typingowl.com)
- **Domain:** Typing education / productivity

## Problem

Many learners want to improve typing speed without jumping across random tools and disconnected trackers. The goal was a focused web experience with measurable progress.

## What I built

TypingOwl is a typing practice platform centered around clear learning loops: lessons, speed/accuracy tracking, and incremental improvement.

## Technical approach

- **Next.js** for routing, SEO-friendly pages, and production performance.
- **TypeScript** for maintainable feature growth.
- **Tailwind CSS** for fast, consistent UI iteration.
- **Supabase** for structured data and auth-ready backend workflows.

## Challenges

Balancing engagement with educational value: too much gamification can distract; too little reduces retention. The approach was iterative UX simplification and actionable feedback.

## Outcome

The product is live and designed to scale content, analytics depth, and learning flows without rewriting core architecture.

## Lessons learned

Real users uncover the highest-value improvements quickly. Shipping and measuring in production is more useful than over-optimizing in private.
`.trim(),
  },
  {
    slug: "resultaayo",
    title: "ResultAayo",
    shortDescription:
      "Final-semester college team project for secure student result publishing with authentication and structured result workflows.",
    tech: ["Next.js", "Tailwind CSS", "Supabase"],
    projectType: "Academic",
    collaboration: "Team",
    contextLabel: "College final project (last semester)",
    repoUrl: "https://github.com/labinale45/resultAayo.git",
    showcaseImage: "/resultaayo.png",
    body: `
## Project snapshot

- **Type:** Academic project
- **Collaboration:** Team
- **Academic context:** Final project (last semester)
- **Repository:** [resultAayo](https://github.com/labinale45/resultAayo.git)
- **Domain:** Education result management

## Problem

Institutions need a safer and clearer process to publish student results while minimizing data exposure and admin mistakes.

## What we built

A web-based result management flow with authentication, role-aware access, and readable student views.

## Technical approach

- **Next.js** for fast pages and maintainable app structure.
- **Supabase** for authentication and persistent result data.
- **Tailwind CSS** for responsive UI.

## Security mindset

Student data requires strict boundaries: least-privilege access, careful validation, and safe publishing patterns.

## UX highlights

- Student login flow designed for clarity.
- Mobile-friendly result readability.
- Short admin workflows to reduce operational errors.

## My contribution and learning

As a team build, this project strengthened collaboration discipline: splitting features, keeping naming conventions aligned, and validating edge cases before merge.
`.trim(),
  },
  {
    slug: "chat-app-dotnet",
    title: "LinkUs (C# / .NET)",
    shortDescription:
      "Individual college project using C# and .NET patterns to build a desktop-style messaging prototype with structured UI and authentication flow concepts.",
    tech: ["C#", ".NET Framework"],
    projectType: "Academic",
    collaboration: "Individual",
    contextLabel: "College project (individual)",
    repoUrl: "https://github.com/labinale45/linkus.git",
    showcaseImage: "/linkus.png",
    body: `
## Project snapshot

- **Type:** Academic project
- **Collaboration:** Individual
- **Repository:** [linkus](https://github.com/labinale45/linkus.git)
- **Domain:** Desktop messaging prototype

## Goal

Build a desktop-style chat application to practice C# fundamentals, object-oriented structure, and stateful UI flow.

## Scope

- User authentication concepts (login/session assumptions).
- Message models and UI flows.
- Separation of UI concerns from data-access logic where practical.

## Engineering notes

.NET Framework differs from modern .NET tooling, but the core patterns remain valuable: strong typing, namespaces, layered code, and disciplined exception handling.

## My key takeaways

- Early **data modeling** prevents painful refactors later.
- **Threading and UI updates** are common pitfalls; plan for safe UI updates.

This project helped build confidence in enterprise-style desktop architecture before moving to web-first service systems.
`.trim(),
  },
  {
    slug: "online-test-java",
    title: "Online Test (Java)",
    shortDescription:
      "College team project: Java-based quiz and assessment system with login, MCQ delivery, and automated scoring.",
    tech: ["Java"],
    projectType: "Academic",
    collaboration: "Team",
    contextLabel: "College project (team)",
    repoUrl: "https://github.com/labinale45/onlineTest.git",
    showcaseImage: "/onlineTest.png",
    body: `
## Project snapshot

- **Type:** Academic project
- **Collaboration:** Team
- **Repository:** [onlineTest](https://github.com/labinale45/onlineTest.git)
- **Domain:** Java quiz and assessment workflow

## Problem

Classroom testing needed a lightweight system for login, question delivery, and scoring without complex infrastructure.

## What we built

- **User login** (conceptual model for student identity).
- **Multiple-choice questions** with deterministic scoring.
- **Result evaluation** with clear feedback to the user.

## Why Java and team setup

Java is strong for OOP-focused education projects and predictable class-based architecture. In team collaboration, it also encourages clear contracts between modules.

## Design tradeoffs

- **Simplicity first**: a minimal schema reduces setup time for labs.
- **Extensibility**: question types can be expanded later without rewriting the whole app.

## Team learning outcomes

The project improved coordination around shared models, scoring logic consistency, and predictable Java package structure.
`.trim(),
  },
];

export function getProjectBySlug(slug: string): ProjectEntry | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
