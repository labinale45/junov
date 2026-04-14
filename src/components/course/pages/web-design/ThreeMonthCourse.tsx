import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const months = [
  {
    title: "Month 1: HTML & CSS Mastery",
    weeks: [
      { week: 1, title: "HTML Fundamentals", topics: "Document structure, elements, attributes, semantic tags, forms, tables" },
      { week: 2, title: "CSS Fundamentals", topics: "Selectors, box model, typography, colors, backgrounds, borders" },
      { week: 3, title: "Flexbox & Grid", topics: "Flex containers, grid layouts, responsive patterns, media queries" },
      { week: 4, title: "CSS Advanced", topics: "Animations, transitions, transforms, pseudo-elements, custom properties" },
    ],
  },
  {
    title: "Month 2: JavaScript & Interactivity",
    weeks: [
      { week: 5, title: "JavaScript Basics", topics: "Variables, data types, operators, console.log, string methods" },
      { week: 6, title: "Control Flow & Functions", topics: "if/else, loops, functions, parameters, return values" },
      { week: 7, title: "DOM Manipulation", topics: "Selecting elements, changing content, event listeners, forms" },
      { week: 8, title: "Interactive Components", topics: "Modals, tabs, accordions, image sliders, form validation" },
    ],
  },
  {
    title: "Month 3: Real Websites & Deployment",
    weeks: [
      { week: 9, title: "Multi-Page Websites", topics: "Navigation, page templates, consistent styling, favicon, meta tags" },
      { week: 10, title: "E-Commerce Storefront", topics: "Product grids, cart UI, checkout form, responsive images" },
      { week: 11, title: "Business Website", topics: "Services page, testimonials, contact form, Google Maps embed" },
      { week: 12, title: "Polish & Deploy", topics: "Performance, accessibility, SEO basics, GitHub Pages, Netlify" },
    ],
  },
];

const sampleCode = `<!-- Week 7: DOM Manipulation Example -->
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Interactive Todo List</title>
    <style>
        body { font-family: sans-serif; max-width: 500px; margin: 2rem auto; }
        .todo-item { display: flex; align-items: center; gap: 0.5rem; 
                     padding: 0.5rem; border-bottom: 1px solid #eee; }
        .todo-item.done span { text-decoration: line-through; color: #999; }
        .delete-btn { margin-left: auto; color: red; cursor: pointer; border: none; background: none; }
    </style>
</head>
<body>
    <h1>My Todo List</h1>
    <form id="todoForm">
        <input type="text" id="todoInput" placeholder="Add a task..." required>
        <button type="submit">Add</button>
    </form>
    <div id="todoList"></div>

    <script>
        const form = document.getElementById('todoForm');
        const input = document.getElementById('todoInput');
        const list = document.getElementById('todoList');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) return;

            const item = document.createElement('div');
            item.className = 'todo-item';
            item.innerHTML = \`
                <input type="checkbox" onchange="this.parentElement.classList.toggle('done')">
                <span>\${text}</span>
                <button class="delete-btn" onclick="this.parentElement.remove()">✕</button>
            \`;
            list.appendChild(item);
            input.value = '';
        });
    </script>
</body>
</html>`;

const WebDesignThreeMonth = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">3-Month Comprehensive</h1>
          <p className="text-muted-foreground mt-1">HTML, CSS, JavaScript, and real-world website projects in 12 weeks.</p>
        </div>
        <Tabs defaultValue="month-1" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {months.map((_, i) => (
              <TabsTrigger key={i} value={`month-${i + 1}`} className="text-xs">Month {i + 1}</TabsTrigger>
            ))}
          </TabsList>
          {months.map((month, i) => (
            <TabsContent key={i} value={`month-${i + 1}`} className="space-y-6 mt-4">
              <h2 className="text-xl font-bold">{month.title}</h2>
              {month.weeks.map((week) => (
                <Card key={week.week}>
                  <CardHeader>
                    <CardTitle className="text-base">Week {week.week}: {week.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p><strong className="text-foreground">Topics:</strong> {week.topics}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Sample: Interactive Todo List (Week 7)</h3>
          <CodeBlock code={sampleCode} />
        </div>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignThreeMonth;
