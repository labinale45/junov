import WebDesignLayout from "@/components/course/WebDesignLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WebDesignBestPractices = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Best Practices</h1>
          <p className="text-muted-foreground mt-1">Write clean, accessible, and maintainable websites.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-lg">1. Semantic HTML</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Use meaningful tags instead of generic divs. This improves accessibility, SEO, and readability.</p>
            <CodeBlock code={`<!-- ❌ Bad -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>

<!-- ✅ Good -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">2. CSS Organization</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Group styles logically: reset → layout → components → utilities. Use consistent naming.</p>
            <CodeBlock code={`/* 1. Reset / Base */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. Layout */
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

/* 3. Components */
.card { background: white; border-radius: 8px; padding: 1.5rem; }
.btn { padding: 0.75rem 1.5rem; border-radius: 6px; border: none; }
.btn-primary { background: #0984e3; color: white; }

/* 4. Utilities */
.text-center { text-align: center; }
.mb-2 { margin-bottom: 2rem; }`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">3. Accessibility (a11y)</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Always include <code className="bg-muted px-1 rounded">alt</code> text on images</p>
            <p>• Use proper heading hierarchy (h1 → h2 → h3, never skip levels)</p>
            <p>• Ensure sufficient color contrast (4.5:1 minimum for text)</p>
            <p>• Make all interactive elements keyboard-accessible</p>
            <p>• Use <code className="bg-muted px-1 rounded">label</code> elements for form inputs</p>
            <p>• Add <code className="bg-muted px-1 rounded">aria-label</code> for icon-only buttons</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">4. SEO Basics</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Help search engines understand your page with proper meta tags and structure.</p>
            <CodeBlock code={`<head>
    <title>My Business - Web Design Services in NYC</title>
    <meta name="description" content="Professional web design services for small businesses in New York City. Modern, responsive websites starting at $499.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="canonical" href="https://mybusiness.com/">
    
    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="My Business - Web Design">
    <meta property="og:description" content="Professional web design services">
    <meta property="og:image" content="https://mybusiness.com/preview.jpg">
</head>`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">5. Performance Tips</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• Compress images — use WebP format when possible</p>
            <p>• Minify CSS and JavaScript for production</p>
            <p>
              • Use <code className="bg-muted px-1 rounded">loading=&quot;lazy&quot;</code> on images below the fold
            </p>
            <p>• Put CSS in <code className="bg-muted px-1 rounded">&lt;head&gt;</code>, scripts before <code className="bg-muted px-1 rounded">&lt;/body&gt;</code></p>
            <p>• Avoid excessive DOM nesting (keep HTML structure flat)</p>
            <p>• Use CSS custom properties for repeated values</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">6. Common Mistakes to Avoid</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• ❌ Using only divs — use semantic elements instead</p>
            <p>• ❌ Inline styles everywhere — use external CSS files</p>
            <p>• ❌ Fixed widths on everything — use relative units and max-width</p>
            <p>• ❌ Skipping mobile testing — always check responsive layouts</p>
            <p>• ❌ Forgetting <code className="bg-muted px-1 rounded">box-sizing: border-box</code> — add it to your reset</p>
            <p>• ❌ Not validating HTML — use the W3C validator</p>
          </CardContent>
        </Card>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignBestPractices;
