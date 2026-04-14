import CppLayout from "@/components/course/CppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const diagrams = [
  {
    title: "C++ Program Execution Flow",
    diagram: `┌──────────────────┐
│  Source Code     │  (.cpp file)
│  main.cpp        │
└────────┬─────────┘
         │ Compile (g++ main.cpp -o main)
         ▼
┌──────────────────┐
│  Preprocessor    │  Handles #include, #define
│  Expands headers │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Compiler        │  Converts C++ to assembly
│  Checks syntax   │  Reports errors
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Assembler       │  Converts to machine code
│  (.o object file)│
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Linker          │  Links libraries
│  Creates .exe    │  Resolves references
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Executable      │  ./main
│  Runs on OS      │
└──────────────────┘`,
  },
  {
    title: "OOP Relationships",
    diagram: `┌─────────────────────────────────────────────┐
│              INHERITANCE (IS-A)             │
│                                             │
│         ┌──────────┐                        │
│         │  Animal  │ ◄── Base Class         │
│         │──────────│                        │
│         │ name     │                        │
│         │ age      │                        │
│         │ speak()  │ ◄── virtual            │
│         └────┬─────┘                        │
│         ┌────┴─────┐                        │
│         │          │                        │
│    ┌────▼───┐ ┌────▼───┐                    │
│    │  Dog   │ │  Cat   │ ◄── Derived        │
│    │────────│ │────────│                    │
│    │ breed  │ │ indoor │                    │
│    │speak() │ │speak() │ ◄── Override       │
│    │"Woof!" │ │"Meow!" │                    │
│    └────────┘ └────────┘                    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           COMPOSITION (HAS-A)              │
│                                             │
│    ┌──────────┐    contains    ┌─────────┐  │
│    │  Car     │───────────────►│ Engine  │  │
│    │──────────│    1       1   │─────────│  │
│    │ brand    │               │ hp      │  │
│    │ model    │               │ start() │  │
│    │ drive()  │               │ stop()  │  │
│    └──────────┘               └─────────┘  │
│         │                                   │
│         │ contains 4                        │
│         ▼                                   │
│    ┌─────────┐                              │
│    │  Wheel  │                              │
│    │─────────│                              │
│    │ size    │                              │
│    │ rotate()│                              │
│    └─────────┘                              │
└─────────────────────────────────────────────┘`,
  },
  {
    title: "Memory Layout (Stack vs Heap)",
    diagram: `┌─────────────────────────────────────┐
│           MEMORY LAYOUT            │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐   │
│  │       STACK (automatic)     │   │
│  │  ┌───────────────────────┐  │   │
│  │  │ int x = 10;           │  │   │  ← Local variables
│  │  │ double y = 3.14;      │  │   │  ← Function parameters
│  │  │ char c = 'A';         │  │   │  ← Return addresses
│  │  └───────────────────────┘  │   │
│  │  Grows ▼ downward           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │       HEAP (dynamic)        │   │
│  │  ┌───────────────────────┐  │   │
│  │  │ int* p = new int(42); │  │   │  ← new / delete
│  │  │ int* arr = new int[5];│  │   │  ← Dynamic arrays
│  │  │ // Must call delete!  │  │   │  ← Manual management
│  │  └───────────────────────┘  │   │
│  │  Grows ▲ upward             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      GLOBAL / STATIC       │   │
│  │  int globalVar = 100;      │   │  ← Whole program lifetime
│  │  static int count = 0;     │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      CODE (Text Segment)    │   │
│  │  main(), functions, etc.   │   │  ← Read-only instructions
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘`,
  },
  {
    title: "Control Flow Decision Tree",
    diagram: `              ┌─────────┐
              │  START  │
              └────┬────┘
                   │
              ┌────▼────┐
         ┌────│ if (x>0) │────┐
         │    └─────────┘    │
       TRUE              FALSE
         │                   │
    ┌────▼────┐        ┌────▼────────┐
    │ "Pos."  │   ┌────│ if (x==0)   │────┐
    └────┬────┘   │    └─────────────┘    │
         │      TRUE                   FALSE
         │        │                      │
         │   ┌────▼────┐           ┌────▼────┐
         │   │ "Zero"  │           │ "Neg."  │
         │   └────┬────┘           └────┬────┘
         │        │                      │
         └────────┼──────────────────────┘
                  │
             ┌────▼────┐
             │   END   │
             └─────────┘


         ┌─────────────────────────┐
         │  FOR LOOP FLOW          │
         │                         │
         │  for(i=0; i<5; i++)     │
         │                         │
         │  INIT ──→ CHECK ──→ NO ──→ EXIT
         │            │              │
         │           YES             │
         │            │              │
         │          BODY             │
         │            │              │
         │         UPDATE ───────────┘
         │         (i++)
         └─────────────────────────┘`,
  },
  {
    title: "File Handling Flow",
    diagram: `┌──────────────────────────────────────────┐
│          FILE WRITING (ofstream)        │
│                                          │
│  ┌──────────┐    ┌──────────────────┐   │
│  │ Program  │───►│ ofstream file    │   │
│  │ Data     │    │ ("data.txt")     │   │
│  └──────────┘    └────────┬─────────┘   │
│                           │              │
│                  ┌────────▼─────────┐   │
│                  │ file << data;    │   │
│                  │ file << endl;    │   │
│                  └────────┬─────────┘   │
│                           │              │
│                  ┌────────▼─────────┐   │
│                  │ file.close();    │   │
│                  └────────┬─────────┘   │
│                           │              │
│                  ┌────────▼─────────┐   │
│                  │  data.txt 📄     │   │
│                  │  (on disk)       │   │
│                  └──────────────────┘   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│          FILE READING (ifstream)        │
│                                          │
│  ┌──────────────────┐    ┌──────────┐   │
│  │ ifstream file    │───►│ Program  │   │
│  │ ("data.txt")     │    │ Variable │   │
│  └────────┬─────────┘    └──────────┘   │
│           │                              │
│  ┌────────▼─────────┐                   │
│  │ while(getline    │                   │
│  │   (file, line))  │                   │
│  │ { process line } │                   │
│  └────────┬─────────┘                   │
│           │                              │
│  ┌────────▼─────────┐                   │
│  │ file.close();    │                   │
│  └──────────────────┘                   │
└──────────────────────────────────────────┘`,
  },
  {
    title: "Polymorphism in Action",
    diagram: `┌────────────────────────────────────────────┐
│    POLYMORPHISM — "One Interface,         │
│                   Many Implementations"   │
│                                            │
│    Base* ptr;   // Base class pointer     │
│                                            │
│    ┌──────────────────┐                    │
│    │  Shape (abstract) │                   │
│    │  ─────────────── │                    │
│    │  + area() = 0    │ ◄── Pure Virtual  │
│    │  + display()     │                    │
│    └────────┬─────────┘                    │
│        ┌────┼────────┐                     │
│        │    │        │                     │
│   ┌────▼──┐ ┌──▼───┐ ┌──▼──────┐          │
│   │Circle │ │Rect. │ │Triangle │          │
│   │───────│ │──────│ │────────│           │
│   │area() │ │area()│ │area()  │           │
│   │=πr²   │ │=w*h  │ │=½b*h   │           │
│   └───────┘ └──────┘ └────────┘           │
│                                            │
│   Shape* s = new Circle(5);               │
│   s->area();  // Calls Circle::area()     │
│                                            │
│   s = new Rectangle(4, 6);                │
│   s->area();  // Calls Rectangle::area()  │
│                                            │
│   SAME call, DIFFERENT behavior! ✓        │
└────────────────────────────────────────────┘`,
  },
];

const VisualAids = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Visual Learning Aids</h1>
          <p className="text-muted-foreground mt-2">
            ASCII diagrams and flowcharts to help visualize C++ concepts.
          </p>
        </div>

        <div className="space-y-6">
          {diagrams.map((d, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle className="text-lg">{d.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs sm:text-sm font-mono text-muted-foreground whitespace-pre overflow-x-auto bg-muted/50 p-4 rounded-md">
                  {d.diagram}
                </pre>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CppLayout>
  );
};

export default VisualAids;
