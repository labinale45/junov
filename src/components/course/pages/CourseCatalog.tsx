import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Globe, GraduationCap, Clock, ArrowRight } from "lucide-react";

const courses = [
  {
    id: "cpp",
    title: "C++ Programming",
    description:
      "Go from zero to building real-world console applications using OOP and file handling. Master variables, control flow, classes, inheritance, and build complete management systems.",
    icon: Code2,
    difficulty: "Beginner → Intermediate",
    durations: ["1-Month Fast-Track", "3-Month Comprehensive"],
    topics: ["Variables & Data Types", "OOP & Classes", "File Handling", "Real-World Projects"],
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "web-design",
    title: "Basic Website Designing",
    description:
      "Learn to build beautiful, responsive websites from scratch using HTML5, CSS3, and introductory JavaScript. Create portfolios, landing pages, and e-commerce storefronts.",
    icon: Globe,
    difficulty: "Beginner",
    durations: ["1-Month Fast-Track", "3-Month Comprehensive"],
    topics: ["HTML5 & Semantic Markup", "CSS3 & Flexbox/Grid", "Responsive Design", "Real Websites"],
    color: "text-accent",
    bg: "bg-accent/10",
  },
];

const CourseCatalog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Explore Our Courses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical, industry-oriented courses designed for complete beginners.
            Pick a track and start building real projects today.
          </p>
        </div>
      </header>

      {/* Course Grid */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <Link key={course.id} href={`/course/${course.id}`} className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary/40">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${course.bg}`}>
                      <course.icon className={`h-6 w-6 ${course.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {course.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((t) => (
                      <Badge key={t} variant="outline" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {course.durations.join(" · ")}
                  </div>

                  <Button className="w-full group-hover:bg-primary/90 mt-2" size="sm">
                    Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;
