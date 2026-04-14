import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weeks = [
  {
    title: "Week 1: HTML Foundations",
    topics: "HTML structure, elements, attributes, forms, semantic tags",
    dailyPlan: `Day 1: What is HTML? Create first page with headings & paragraphs (90 min)
Day 2: Links, images, and lists (75 min)
Day 3: Tables and forms — input, select, textarea (90 min)
Day 4: Semantic HTML — header, nav, main, section, footer (75 min)
Day 5: Build a complete "About Me" page (90 min)`,
    concepts: `HTML is the skeleton of a website — it defines the structure.
Think of tags like containers: <h1> is a big box for titles, <p> is a box for paragraphs.
Attributes are like labels on the box — they give extra info (href, src, alt).`,
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>I am learning web design!</p>
            <img src="profile.jpg" alt="My profile photo">
        </section>
        
        <section id="contact">
            <h2>Contact Me</h2>
            <form>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <button type="submit">Send</button>
            </form>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
</body>
</html>`,
    exercises: [
      "Create an HTML page with a navigation bar linking to 3 sections",
      "Build a registration form with name, email, password, and a dropdown for country",
      "Create a table showing a weekly class schedule",
    ],
    miniProject: "Personal Bio Page — A complete page with header, photo, bio section, hobbies list, and contact form",
  },
  {
    title: "Week 2: CSS Fundamentals",
    topics: "Selectors, box model, colors, typography, backgrounds",
    dailyPlan: `Day 1: What is CSS? Inline, internal, external styles (75 min)
Day 2: Selectors — element, class, ID, combinators (90 min)
Day 3: Box model — margin, border, padding, content (90 min)
Day 4: Colors, fonts, text styling, Google Fonts (75 min)
Day 5: Backgrounds, gradients, shadows, borders (90 min)`,
    concepts: `CSS is the clothing of a website — it makes HTML look good.
The box model is like a gift box: content inside, padding is bubble wrap, border is the box wall, margin is space between boxes.
Selectors are like addresses — they tell CSS which element to style.`,
    code: `/* External stylesheet: styles.css */

/* Reset default margins */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f5f5f5;
}

/* Header styling */
header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 2rem;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
}

/* Navigation */
nav a {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background 0.3s;
}

nav a:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* Cards */
.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin: 1rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-5px);
}`,
    exercises: [
      "Style the bio page from Week 1 with colors, fonts, and spacing",
      "Create 3 different button styles: primary, secondary, danger",
      "Build a styled card component with shadow and hover effect",
    ],
    miniProject: "Styled Profile Card — A visually appealing card with photo, name, title, social links, and hover animations",
  },
  {
    title: "Week 3: Layouts — Flexbox & Grid",
    topics: "Flexbox, CSS Grid, positioning, responsive basics",
    dailyPlan: `Day 1: Display property, Flexbox basics — direction, justify, align (90 min)
Day 2: Flexbox advanced — wrap, grow, shrink, order (75 min)
Day 3: CSS Grid basics — columns, rows, gap, template areas (90 min)
Day 4: Grid advanced — span, auto-fit, minmax (75 min)
Day 5: Responsive design with media queries (90 min)`,
    concepts: `Flexbox is a one-dimensional layout — think of items on a shelf (row) or a stack of books (column).
Grid is two-dimensional — think of a spreadsheet with rows AND columns.
Media queries are like outfit changes — different styles for different screen sizes.`,
    code: `/* Flexbox Navigation */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #2d3436;
}

.nav-links {
    display: flex;
    gap: 1.5rem;
    list-style: none;
}

/* CSS Grid Gallery */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 2rem;
}

.gallery-item {
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 1;
}

.gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.gallery-item:hover img {
    transform: scale(1.05);
}

/* Responsive Layout */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .gallery {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    header h1 {
        font-size: 1.5rem;
    }
}`,
    exercises: [
      "Create a flexbox navigation bar with logo on left and links on right",
      "Build a 3-column grid layout that becomes 1 column on mobile",
      "Design a photo gallery grid with hover effects",
    ],
    miniProject: "Responsive Landing Page — A full landing page with hero section, features grid, testimonials row, and footer",
  },
  {
    title: "Week 4: Complete Website Project",
    topics: "Multi-page site, animations, forms, deployment",
    dailyPlan: `Day 1: Plan and wireframe a multi-page website (75 min)
Day 2: Build the homepage — hero, features, CTA (90 min)
Day 3: Build inner pages — about, services, contact (90 min)
Day 4: Add CSS animations, transitions, polish (75 min)
Day 5: Deploy to GitHub Pages or Netlify (90 min)`,
    concepts: `A real website connects multiple pages with consistent navigation.
Animations add life — use transitions for hover effects and @keyframes for entrance animations.
Deployment is publishing your site so the world can see it — like printing a book after writing it.`,
    code: `/* CSS Animations */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero-title {
    animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
    animation: fadeInUp 0.8s ease-out 0.2s;
    animation-fill-mode: both;
}

/* Smooth scroll */
html {
    scroll-behavior: smooth;
}

/* Button animations */
.btn-primary {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #6c5ce7;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-primary:hover {
    background: #5f3dc4;
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(108, 92, 231, 0.4);
}

/* Loading animation */
@keyframes spin {
    to { transform: rotate(360deg); }
}

.loader {
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-top-color: #6c5ce7;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}`,
    exercises: [
      "Add entrance animations to all sections of your landing page",
      "Create a working contact form with validation styling",
      "Deploy your website and share the live URL",
    ],
    miniProject: "Restaurant Website — A 3-page restaurant site with menu, gallery, reservation form, and CSS animations. Deploy live.",
  },
];

const WebDesignOneMonth = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">1-Month Fast-Track</h1>
          <p className="text-muted-foreground mt-1">HTML, CSS, and responsive design in 4 weeks — build real websites from day one.</p>
        </div>
        <Tabs defaultValue="week-1" className="w-full">
          <TabsList className="flex flex-wrap h-auto gap-1">
            {weeks.map((_, i) => (
              <TabsTrigger key={i} value={`week-${i + 1}`} className="text-xs">Week {i + 1}</TabsTrigger>
            ))}
          </TabsList>
          {weeks.map((week, i) => (
            <TabsContent key={i} value={`week-${i + 1}`} className="space-y-6 mt-4">
              <Card>
                <CardHeader><CardTitle className="text-lg">{week.title}</CardTitle></CardHeader>
                <CardContent className="space-y-1 text-sm text-muted-foreground">
                  <p><strong className="text-foreground">Topics:</strong> {week.topics}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Daily Session Plan</CardTitle></CardHeader>
                <CardContent><pre className="text-xs whitespace-pre-wrap text-muted-foreground font-mono">{week.dailyPlan}</pre></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Key Concepts & Analogies</CardTitle></CardHeader>
                <CardContent><pre className="text-xs whitespace-pre-wrap text-muted-foreground">{week.concepts}</pre></CardContent>
              </Card>
              <CodeBlock code={week.code} />
              <Card>
                <CardHeader><CardTitle className="text-base">Practice Exercises</CardTitle></CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    {week.exercises.map((ex, j) => <li key={j}>{ex}</li>)}
                  </ol>
                </CardContent>
              </Card>
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader><CardTitle className="text-base">Mini Project</CardTitle></CardHeader>
                <CardContent className="text-sm text-muted-foreground">{week.miniProject}</CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignOneMonth;
