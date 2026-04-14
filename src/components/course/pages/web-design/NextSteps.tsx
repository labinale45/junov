import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WebDesignNextSteps = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Next Steps</h1>
          <p className="text-muted-foreground mt-1">Where to go after completing the course.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">1. Learn JavaScript Deeply</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>JavaScript brings interactivity to websites. After HTML/CSS, learn:</p>
            <p>• DOM manipulation — changing page content dynamically</p>
            <p>• Event handling — responding to clicks, inputs, scrolls</p>
            <p>• Fetch API — loading data from servers</p>
            <p>• ES6+ features — arrow functions, destructuring, modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">2. CSS Frameworks</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Speed up development with pre-built styles:</p>
            <p>• <strong className="text-foreground">Tailwind CSS</strong> — utility-first, highly customizable</p>
            <p>• <strong className="text-foreground">Bootstrap</strong> — component-based, great documentation</p>
            <p>• <strong className="text-foreground">Bulma</strong> — clean, modern, flexbox-based</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">3. JavaScript Frameworks</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Build complex, dynamic web applications:</p>
            <p>• <strong className="text-foreground">React</strong> — most popular, component-based, massive ecosystem</p>
            <p>• <strong className="text-foreground">Vue.js</strong> — beginner-friendly, progressive framework</p>
            <p>• <strong className="text-foreground">Svelte</strong> — compile-time framework, minimal overhead</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">4. Deploy Your Website</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Make your website live for the world to see:</p>
            <CodeBlock code={`# Using GitHub Pages:
# 1. Create a repository on github.com
# 2. Push your HTML/CSS files
# 3. Go to Settings → Pages → Deploy from main branch
# Your site is live at: https://username.github.io/repo-name

# Using Netlify:
# 1. Go to netlify.com and sign up
# 2. Drag and drop your project folder
# 3. Your site gets a free .netlify.app URL
# 4. Connect a custom domain if you have one

# File structure for deployment:
my-website/
├── index.html          ← Homepage
├── about.html          ← About page
├── contact.html        ← Contact page
├── css/
│   └── styles.css      ← All styles
├── js/
│   └── main.js         ← JavaScript
└── images/
    ├── logo.png
    └── hero.jpg`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">5. Build Your Portfolio</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>Create a portfolio website showcasing your projects:</p>
            <p>• Include 3-5 of your best projects with screenshots</p>
            <p>• Add a brief description of what you built and learned</p>
            <p>• Include links to live demos and source code (GitHub)</p>
            <p>• Add a professional bio and contact form</p>
            <p>• Keep it clean, fast, and mobile-friendly</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">6. Continuous Learning Resources</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• <strong className="text-foreground">MDN Web Docs</strong> — comprehensive reference for HTML/CSS/JS</p>
            <p>• <strong className="text-foreground">CSS-Tricks</strong> — articles and guides on modern CSS</p>
            <p>• <strong className="text-foreground">freeCodeCamp</strong> — free courses with certifications</p>
            <p>• <strong className="text-foreground">Frontend Mentor</strong> — real-world design challenges</p>
            <p>• <strong className="text-foreground">Can I Use</strong> — browser compatibility checker</p>
          </CardContent>
        </Card>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignNextSteps;
