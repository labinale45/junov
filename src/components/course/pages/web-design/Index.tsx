import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, BookOpen, Target, Wrench, Users } from "lucide-react";
import WebDesignLayout from "@/components/course/WebDesignLayout";

const WebDesignIndex = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Basic Website Designing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn to build beautiful, responsive websites from scratch using HTML5, CSS3, and introductory JavaScript.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button asChild size="lg">
              <Link href="/course/web-design/one-month">
                <Zap className="mr-2 h-4 w-4" /> 1-Month Fast-Track
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/course/web-design/three-month">
                <Calendar className="mr-2 h-4 w-4" /> 3-Month Comprehensive
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" /> Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>• Complete beginners with no coding experience</p>
              <p>• Students wanting to build personal websites or portfolios</p>
              <p>• Freelancers looking to offer web design services</p>
              <p>• Anyone wanting to understand how websites work</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" /> Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>• Build responsive websites with HTML5 and CSS3</p>
              <p>• Use Flexbox and CSS Grid for modern layouts</p>
              <p>• Create interactive elements with basic JavaScript</p>
              <p>• Deploy websites to the internet</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-primary" /> Tools Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">Editor</p>
                <p>VS Code with Live Server extension</p>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">Browser</p>
                <p>Chrome with DevTools</p>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">Hosting</p>
                <p>GitHub Pages or Netlify (free)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" /> Teaching Methodology
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-foreground">1. Visual First:</strong> See the result immediately — every code change reflects in the browser instantly.</p>
            <p><strong className="text-foreground">2. Real Websites:</strong> Build actual pages you can show — portfolios, landing pages, stores.</p>
            <p><strong className="text-foreground">3. Progressive Complexity:</strong> Start with a heading, end with a full e-commerce storefront.</p>
            <p><strong className="text-foreground">4. Daily Sessions (60–90 min):</strong> 15 min concept → 30 min coding → 15 min exercises → 15 min review.</p>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/course/web-design/concepts", label: "Core Concepts", desc: "HTML, CSS, Responsive Design" },
            { href: "/course/web-design/demo-projects", label: "Demo Projects", desc: "Portfolio, Landing Page" },
            { href: "/course/web-design/real-projects", label: "Real-World Projects", desc: "E-commerce & Business Sites" },
            { href: "/course/web-design/visual-aids", label: "Visual Aids", desc: "Box model, Flexbox, Grid" },
            { href: "/course/web-design/assignments", label: "Assignments & MCQs", desc: "Practice and test yourself" },
            { href: "/course/web-design/best-practices", label: "Best Practices", desc: "Semantic HTML, Accessibility" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:border-primary/50 transition-colors h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{item.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignIndex;
