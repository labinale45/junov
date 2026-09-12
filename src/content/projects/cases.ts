export type ProjectEntry = {
  slug: string;
  title: string;
  shortDescription: string;
  tech: string[];
  projectType: "Professional" | "Academic";
  collaboration?: "Individual" | "Team";
  contextLabel?: string;
  repoUrl?: string;
  liveLabel?: string;
  liveUrl?: string;
  showcaseImage?: string;
  body: string;
};

export const projects: ProjectEntry[] = [
  {
    slug: "wigo",
    title: "Wigo - Never Go Alone",
    shortDescription: "A published Flutter app for finding nearby companions, joining activities, sharing rides and splitting costs, with in-app chat and safety features.",
    tech: ["Flutter", "Android"],
    projectType: "Professional",
    contextLabel: "Published on Google Play",
    liveUrl: "https://play.google.com/store/apps/details?id=com.rabinale.wigo&hl=en",
    liveLabel: "Google Play",
    showcaseImage: "/projects/wigo.png",
    body: `
## Overview

Wigo is a Flutter mobile app I built and published on Google Play. It helps people find nearby companions for activities and shared journeys.

## Features

- Discover nearby people and post activities for others to join.
- Offer or find shared rides, with automatic fare splitting.
- Connect through in-app messaging and voice calls.
- Optional ID verification, opt-in location sharing, SOS alerts to trusted contacts, and reporting tools.

## Platform

Built with Flutter and available for Android. Location visibility is controlled by the user.

## Try the app

[View Wigo on Google Play](https://play.google.com/store/apps/details?id=com.rabinale.wigo&hl=en).
`.trim(),
  },
  {
    slug: "homecostguide",
    title: "HomeCostGuide",
    shortDescription: "A home-improvement research site with US cost guides, interactive estimators, regional comparisons and maintenance advice grounded in public data.",
    tech: ["Next.js", "Interactive calculators"],
    projectType: "Professional",
    contextLabel: "Live web product",
    liveUrl: "https://homecostguide.rabinale.com.np/",
    showcaseImage: "/projects/homecostguide.png",
    body: `
## Overview

HomeCostGuide helps homeowners research renovation and maintenance costs before planning a project.

## Features

- Cost guides for remodeling, roofing, HVAC, plumbing and flooring.
- Interactive calculators using project dimensions and details.
- Breakdowns by material, labor, project size and region.
- How-to articles, comparisons and a published research methodology.

## Approach

The Next.js site brings research and calculation tools together in a responsive interface. Published estimates are planning guidance, not contractor quotes.

## Explore

[Visit HomeCostGuide](https://homecostguide.rabinale.com.np/).
`.trim(),
  },
  {
    slug: "jcalc",
    title: "JCalc",
    shortDescription: "A browser-based calculator suite for loans, ROI, percentages and business metrics, with formula explanations, examples and no signup required.",
    tech: ["Next.js", "Browser-based calculations"],
    projectType: "Professional",
    contextLabel: "Live web product",
    liveUrl: "https://jcalc.rabinale.com.np/",
    showcaseImage: "/projects/jcalc.png",
    body: `
## Overview

JCalc is a collection of accessible online calculators for everyday math, finance and business planning.

## Features

- Fixed-rate loan payments, total interest and amortization.
- Return on investment and percentage calculations.
- Profit, pricing, break-even, cash flow and growth tools.
- Unit economics including customer acquisition cost and lifetime value.
- Formula explanations, worked examples and FAQs.

## Approach

Calculations run in the browser, without requiring an account or installation. The site uses Next.js and is designed for fast, clear results.

## Try the tools

[Visit JCalc](https://jcalc.rabinale.com.np/).
`.trim(),
  },
  {
    slug: "reflexpeak",
    title: "ReflexPeak",
    shortDescription: "A personal-performance platform with reaction time, click speed, aim, memory and focus tests, daily challenges and locally stored personal bests.",
    tech: ["Next.js", "Interactive browser tests"],
    projectType: "Professional",
    contextLabel: "Live web product",
    liveUrl: "https://reflexpeak.com/",
    showcaseImage: "/projects/reflexpeak.png",
    body: `
## Overview

ReflexPeak provides short, repeatable browser tests for personal performance practice.

## Features

- Reaction time and click speed tests.
- Aim training for mouse control and accuracy.
- Sequence memory, visual memory and choice reaction exercises.
- Daily Peak: a rotating challenge across reaction, accuracy and memory.
- Instant scores and locally stored personal bests and recent results.

## Design considerations

Clear instructions and repeatable sessions help users compare their progress on the same device. These are entertainment and personal-benchmarking tools, not medical or intelligence assessments.

## Try the tests

[Visit ReflexPeak](https://reflexpeak.com/).
`.trim(),
  },
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
