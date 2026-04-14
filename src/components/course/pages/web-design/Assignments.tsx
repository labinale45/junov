import WebDesignLayout from "@/components/course/WebDesignLayout";
import MCQCard from "@/components/course/MCQCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mcqs = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    answer: 0,
  },
  {
    question: "Which HTML element is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: 2,
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["text-style", "font-size", "text-size", "font-style"],
    answer: 1,
  },
  {
    question: "What is the correct CSS syntax to make all <p> elements bold?",
    options: ["p {text-size: bold;}", "p {font-weight: bold;}", "<p style='bold'>", "p.all {font: bold;}"],
    answer: 1,
  },
  {
    question: "Which CSS property is used to change the background color?",
    options: ["bgcolor", "color", "background-color", "bg-color"],
    answer: 2,
  },
  {
    question: "Which display property value makes items lay out in a row by default?",
    options: ["display: grid", "display: block", "display: flex", "display: inline"],
    answer: 2,
  },
  {
    question: "What does the 'alt' attribute in <img> provide?",
    options: ["Alternative styling", "Image alignment", "Text description for accessibility", "Image animation"],
    answer: 2,
  },
  {
    question: "Which CSS property adds space INSIDE an element's border?",
    options: ["margin", "spacing", "padding", "border-spacing"],
    answer: 2,
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    options: ["<a href='url'>text</a>", "<link src='url'>text</link>", "<a url='url'>text</a>", "<hyperlink>text</hyperlink>"],
    answer: 0,
  },
  {
    question: "Which CSS unit is relative to the font-size of the root element?",
    options: ["em", "px", "rem", "%"],
    answer: 2,
  },
];

const codingChallenges = [
  "Create a responsive navigation bar that collapses into a hamburger icon on mobile",
  "Build a CSS-only accordion (hint: use checkbox hack or details/summary)",
  "Design a pricing table with 3 columns: Basic, Pro, Enterprise — highlight the Pro plan",
  "Create a CSS Grid-based image gallery with different sized items",
  "Build a complete contact page with a styled form and embedded map placeholder",
];

const WebDesignAssignments = () => {
  return (
    <WebDesignLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assignments & MCQs</h1>
          <p className="text-muted-foreground mt-1">Test your HTML, CSS, and web design knowledge.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Multiple Choice Questions</h2>
          <div className="space-y-4">
            {mcqs.map((mcq, i) => (
              <MCQCard key={i} question={`${i + 1}. ${mcq.question}`} options={mcq.options} correctIndex={mcq.answer} />
            ))}
          </div>
        </div>
        <Card>
          <CardHeader><CardTitle className="text-lg">Coding Challenges</CardTitle></CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              {codingChallenges.map((c, i) => <li key={i}>{c}</li>)}
            </ol>
          </CardContent>
        </Card>
      </div>
    </WebDesignLayout>
  );
};

export default WebDesignAssignments;
