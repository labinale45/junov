import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const concepts = [
  {
    title: "HTML Document Structure",
    analogy: "An HTML document is like a building: DOCTYPE is the foundation, <head> is the blueprint room (metadata), and <body> is the actual building people see.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <nav><!-- Navigation links --></nav>
    </header>
    <main>
        <h1>Main Heading</h1>
        <p>Content goes here.</p>
    </main>
    <footer>
        <p>&copy; 2024 My Site</p>
    </footer>
</body>
</html>`,
    output: "A well-structured page with header, main content area, and footer.",
  },
  {
    title: "CSS Selectors & Specificity",
    analogy: "Selectors are like addresses. Element selectors are like 'all houses on Main Street'. Class selectors are 'the blue houses'. ID selectors are 'house #42'. The more specific the address, the higher priority.",
    code: `/* Element selector — least specific */
p { color: gray; }

/* Class selector — medium specific */
.highlight { color: blue; }

/* ID selector — most specific */
#main-title { color: red; }

/* Combining selectors */
header nav a.active { 
    color: white;
    background: #333;
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

/* Pseudo-classes */
a:hover { color: orange; }
li:first-child { font-weight: bold; }
input:focus { border-color: blue; outline: none; }`,
    output: "Different elements styled with increasing specificity.",
  },
  {
    title: "CSS Box Model",
    analogy: "Every element is a box with 4 layers: Content (the gift), Padding (bubble wrap), Border (the box wall), Margin (space between boxes on a shelf).",
    code: `/* Box model demonstration */
.card {
    /* Content area */
    width: 300px;
    height: 200px;
    
    /* Padding — space inside the border */
    padding: 20px;
    
    /* Border — the visible edge */
    border: 2px solid #333;
    
    /* Margin — space outside the border */
    margin: 16px;
    
    /* Use border-box so padding/border don't add to width */
    box-sizing: border-box;
}

/* Total visible width with border-box: 300px
   Without border-box: 300 + 40 + 4 = 344px */`,
    output: "A 300px card with internal padding and external spacing.",
  },
  {
    title: "Flexbox Layout",
    analogy: "Flexbox is like arranging books on a shelf. You decide: horizontal or vertical shelf (flex-direction), how to spread them out (justify-content), and how to align them vertically (align-items).",
    code: `/* Horizontal navigation */
.navbar {
    display: flex;
    justify-content: space-between;  /* Logo left, links right */
    align-items: center;             /* Vertically centered */
    padding: 1rem 2rem;
}

/* Centered content */
.hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    text-align: center;
}

/* Card row that wraps */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.card-container .card {
    flex: 1 1 300px;  /* Grow, shrink, min 300px */
}`,
    output: "Navigation bar with spaced items, centered hero, and wrapping card grid.",
  },
  {
    title: "CSS Grid Layout",
    analogy: "Grid is like a spreadsheet — you define rows and columns, then place items in specific cells. Perfect for complex, two-dimensional layouts.",
    code: `/* Basic grid layout */
.page-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    min-height: 100vh;
}

.page-header { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-main { grid-area: main; }
.page-footer { grid-area: footer; }

/* Responsive product grid */
.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
}`,
    output: "A page with sidebar layout and auto-fitting product grid.",
  },
  {
    title: "Responsive Design & Media Queries",
    analogy: "Responsive design is like water — your layout should flow and adapt to fit any container (screen size). Media queries are the rules for how it adapts.",
    code: `/* Mobile-first approach */
.container {
    width: 100%;
    padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
        padding: 2rem;
    }
    
    .grid-2col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }
    
    .grid-3col {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Hide on mobile, show on desktop */
.desktop-only { display: none; }

@media (min-width: 768px) {
    .desktop-only { display: block; }
    .mobile-only { display: none; }
}`,
    output: "Layout adapts from single column on mobile to multi-column on desktop.",
  },
  {
    title: "HTML Forms & Validation",
    analogy: "Forms are like paper applications — each field collects specific information. HTML5 validation is like a secretary checking if fields are filled correctly before submitting.",
    code: `<form action="/submit" method="POST">
    <div class="form-group">
        <label for="fullname">Full Name *</label>
        <input type="text" id="fullname" name="fullname" 
               required minlength="2" maxlength="50"
               placeholder="John Doe">
    </div>

    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required
               placeholder="john@example.com">
    </div>

    <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone"
               pattern="[0-9]{10}" 
               placeholder="1234567890">
    </div>

    <div class="form-group">
        <label for="age">Age (18-100)</label>
        <input type="number" id="age" name="age" min="18" max="100">
    </div>

    <div class="form-group">
        <label for="website">Website</label>
        <input type="url" id="website" name="website"
               placeholder="https://example.com">
    </div>

    <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="4" 
                  required minlength="10"></textarea>
    </div>

    <button type="submit">Submit</button>
</form>`,
    output: "A complete form with built-in validation for name, email, phone, age, URL, and message.",
  },
];

const WebDesignCoreConcepts = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Core Concepts</h1>
          <p className="text-muted-foreground mt-1">Step-by-step explanations of HTML, CSS, and responsive design fundamentals.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {concepts.map((concept, i) => (
            <AccordionItem key={i} value={`concept-${i}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-base font-semibold">{concept.title}</AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <Card>
                  <CardHeader><CardTitle className="text-sm">Real-World Analogy</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{concept.analogy}</CardContent>
                </Card>
                <CodeBlock code={concept.code} />
                <Card>
                  <CardHeader><CardTitle className="text-sm">Expected Result</CardTitle></CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{concept.output}</CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignCoreConcepts;
