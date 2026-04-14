import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Calendar, BookOpen, Target, Wrench, Users } from "lucide-react";
import CppLayout from "@/components/course/CppLayout";

const Index = () => {
  return (
    <CppLayout>
      <div className="space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Learn C++ Programming
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Go from zero knowledge to building real-world console applications.
            Practical, industry-oriented, and beginner-friendly.
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <Button asChild size="lg">
              <Link href="/course/cpp/one-month">
                <Zap className="mr-2 h-4 w-4" />
                1-Month Fast-Track
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/course/cpp/three-month">
                <Calendar className="mr-2 h-4 w-4" />
                3-Month Comprehensive
              </Link>
            </Button>
          </div>
        </div>

        {/* Target Audience & Outcomes */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" /> Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>• Complete beginners with no prior programming experience</p>
              <p>• Students pursuing Computer Science or IT degrees</p>
              <p>• Professionals switching careers to software development</p>
              <p>• Anyone wanting to build real console-based applications</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" /> Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-muted-foreground">
              <p>• Write clean, efficient C++ programs from scratch</p>
              <p>• Apply Object-Oriented Programming (OOP) principles</p>
              <p>• Handle files for data persistence</p>
              <p>• Build complete management systems (Hotel, Bank, Library)</p>
            </CardContent>
          </Card>
        </div>

        {/* Tools */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-primary" /> Tools Required
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">Compiler</p>
                <p>GCC (g++) — free, cross-platform</p>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">IDE</p>
                <p>VS Code with C/C++ extension, or Code::Blocks</p>
              </div>
              <div className="p-3 rounded-md bg-muted">
                <p className="font-semibold text-foreground">OS</p>
                <p>Windows, macOS, or Linux</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Methodology */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" /> Teaching Methodology
            </CardTitle>
            <CardDescription>Practical-first approach</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong className="text-foreground">1. Learn by Doing:</strong> Every concept is followed by hands-on code examples that students type, run, and modify.
            </p>
            <p>
              <strong className="text-foreground">2. Real-World Analogies:</strong> Abstract concepts are explained using everyday situations (bank accounts, hotel rooms, library books).
            </p>
            <p>
              <strong className="text-foreground">3. Progressive Projects:</strong> Small exercises build into mini projects, which build into full systems.
            </p>
            <p>
              <strong className="text-foreground">4. Daily Sessions (60–90 min):</strong> 15 min concept → 30 min coding → 15 min exercises → 15 min review.
            </p>
          </CardContent>
        </Card>

        {/* Quick Nav */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/course/cpp/concepts", label: "Core Concepts", desc: "Variables, OOP, File I/O" },
            { href: "/course/cpp/demo-projects", label: "Demo Projects", desc: "Student, Bank, Library" },
            { href: "/course/cpp/real-projects", label: "Real-World Projects", desc: "Homestay & Business Mgmt" },
            { href: "/course/cpp/visual-aids", label: "Visual Aids", desc: "Diagrams & flowcharts" },
            { href: "/course/cpp/assignments", label: "Assignments & MCQs", desc: "Practice and test yourself" },
            { href: "/course/cpp/best-practices", label: "Best Practices", desc: "Clean code & debugging" },
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
    </CppLayout>
  );
};

export default Index;
