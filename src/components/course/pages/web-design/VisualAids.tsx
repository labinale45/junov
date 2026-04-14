import WebDesignLayout from "@/components/course/WebDesignLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const diagrams = [
  {
    title: "CSS Box Model",
    diagram: `┌──────────────────────────────────────────┐
│                 MARGIN                   │
│  ┌────────────────────────────────────┐  │
│  │              BORDER                │  │
│  │  ┌──────────────────────────────┐  │  │
│  │  │           PADDING            │  │  │
│  │  │  ┌──────────────────────┐   │  │  │
│  │  │  │                      │   │  │  │
│  │  │  │      CONTENT         │   │  │  │
│  │  │  │   (width × height)   │   │  │  │
│  │  │  │                      │   │  │  │
│  │  │  └──────────────────────┘   │  │  │
│  │  └──────────────────────────────┘  │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘

box-sizing: content-box  → width = content only
box-sizing: border-box   → width = content + padding + border`,
  },
  {
    title: "Flexbox — Main Axis & Cross Axis",
    diagram: `flex-direction: row (default)
═══════════════════════════════════════════
         MAIN AXIS →
    ┌──────┐  ┌──────┐  ┌──────┐
    │ Item │  │ Item │  │ Item │    ↕ CROSS
    │  1   │  │  2   │  │  3   │      AXIS
    └──────┘  └──────┘  └──────┘

justify-content (main axis):
  flex-start:    |▪ ▪ ▪         |
  center:        |    ▪ ▪ ▪     |
  flex-end:      |         ▪ ▪ ▪|
  space-between: |▪     ▪     ▪ |
  space-around:  | ▪   ▪   ▪   |
  space-evenly:  |  ▪   ▪   ▪  |

align-items (cross axis):
  flex-start:  items at top
  center:      items vertically centered
  flex-end:    items at bottom
  stretch:     items fill full height`,
  },
  {
    title: "CSS Grid — Template Areas",
    diagram: `grid-template-areas:
  "header  header  header"
  "sidebar main    main"
  "sidebar main    main"
  "footer  footer  footer";

Visual Layout:
┌──────────────────────────────────┐
│            HEADER                │
├──────────┬───────────────────────┤
│          │                       │
│ SIDEBAR  │       MAIN            │
│          │                       │
│          │                       │
├──────────┴───────────────────────┤
│            FOOTER                │
└──────────────────────────────────┘

grid-template-columns: 250px 1fr 1fr;
grid-template-rows: auto 1fr auto;`,
  },
  {
    title: "Responsive Breakpoints",
    diagram: `                 MOBILE           TABLET          DESKTOP
                 < 768px         768-1024px        > 1024px
            ┌──────────┐    ┌──────────────┐  ┌────────────────┐
            │ ████████ │    │ ████  ████   │  │ ██  ██  ██  ██ │
            │ ████████ │    │ ████  ████   │  │                │
            │ ████████ │    │              │  │ ██  ██  ██  ██ │
            │ ████████ │    │ ████  ████   │  │                │
            └──────────┘    └──────────────┘  └────────────────┘
             1 column         2 columns        4 columns

@media (min-width: 768px)  { /* tablet styles */ }
@media (min-width: 1024px) { /* desktop styles */ }`,
  },
  {
    title: "HTML Document Flow",
    diagram: `Browser reads HTML top → bottom:

  <!DOCTYPE html>        ← Tells browser: "This is HTML5"
  <html>
    <head>               ← NOT visible on page
      <meta>             ← Settings (charset, viewport)
      <title>            ← Tab/window title
      <link>             ← CSS files
    </head>
    <body>               ← VISIBLE content
      <header>           ← Top of page (logo, nav)
        <nav>            ← Navigation links
      </header>
      <main>             ← Primary content
        <section>        ← Grouped content block
        <article>        ← Self-contained content
      </main>
      <aside>            ← Secondary content (sidebar)
      <footer>           ← Bottom of page
      <script>           ← JavaScript (load last!)
    </body>
  </html>`,
  },
  {
    title: "CSS Specificity Hierarchy",
    diagram: `SPECIFICITY (highest → lowest):

  !important           →  Overrides everything (avoid!)
  ────────────────────────────────────────
  Inline styles        →  style="color:red"     (1000)
  ────────────────────────────────────────
  ID selectors         →  #header               (0100)
  ────────────────────────────────────────
  Class / Attribute    →  .card, [type="text"]   (0010)
  Pseudo-class         →  :hover, :first-child   (0010)
  ────────────────────────────────────────
  Element / Pseudo     →  div, p, ::before       (0001)
  ────────────────────────────────────────
  Universal            →  *                      (0000)

  Example: div.card#main = 0001 + 0010 + 0100 = 0111
  Example: .card .title  = 0010 + 0010          = 0020`,
  },
];

const WebDesignVisualAids = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Visual Aids</h1>
          <p className="text-muted-foreground mt-1">Diagrams and visual references for CSS layout and HTML structure.</p>
        </div>
        {diagrams.map((d, i) => (
          <Card key={i}>
            <CardHeader><CardTitle className="text-lg">{d.title}</CardTitle></CardHeader>
            <CardContent>
              <pre className="text-xs font-mono whitespace-pre overflow-x-auto bg-muted p-4 rounded-md text-muted-foreground">{d.diagram}</pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignVisualAids;
