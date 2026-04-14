import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NextSteps = () => {
  return (
    <CppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Next Steps</h1>
          <p className="text-muted-foreground mt-2">
            How to compile, structure projects, and where to go from here.
          </p>
        </div>

        <Card>
          <CardHeader><CardTitle>⚙️ How to Compile and Run</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock
              title="Terminal Commands"
              code={`# Compile a single file
g++ main.cpp -o main

# Compile with warnings and C++17 standard
g++ -Wall -Wextra -std=c++17 main.cpp -o main

# Compile multiple files
g++ main.cpp student.cpp utils.cpp -o myapp

# Run the program
./main          # Linux/Mac
main.exe        # Windows

# Compile and run in one step
g++ main.cpp -o main && ./main

# Using Makefile (recommended for larger projects)
make            # Compiles using Makefile rules
make clean      # Removes compiled files`}
            />

            <CodeBlock
              title="Sample Makefile"
              code={`# Makefile for a C++ project
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17
TARGET = myapp
SOURCES = main.cpp student.cpp utils.cpp
OBJECTS = $(SOURCES:.cpp=.o)

$(TARGET): $(OBJECTS)
\t$(CXX) $(CXXFLAGS) -o $@ $^

%.o: %.cpp
\t$(CXX) $(CXXFLAGS) -c $<

clean:
\trm -f $(OBJECTS) $(TARGET)

.PHONY: clean`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>📁 How to Structure Projects</CardTitle></CardHeader>
          <CardContent>
            <CodeBlock
              title="Recommended Project Structure"
              code={`my_project/
├── src/               ← Source files (.cpp)
│   ├── main.cpp
│   ├── student.cpp
│   ├── database.cpp
│   └── utils.cpp
├── include/           ← Header files (.h)
│   ├── student.h
│   ├── database.h
│   └── utils.h
├── data/              ← Data files
│   ├── students.txt
│   └── config.txt
├── tests/             ← Test files
│   └── test_student.cpp
├── Makefile           ← Build instructions
└── README.md          ← Project documentation`}
            />

            <div className="mt-4">
              <CodeBlock
                title="include/student.h — Header File"
                code={`#ifndef STUDENT_H    // Include guard
#define STUDENT_H

#include <string>
using namespace std;

class Student {
private:
    string name;
    int rollNumber;
    double marks;
    
public:
    Student(string n, int r, double m);
    void display() const;
    int getRoll() const;
    double getMarks() const;
    void setMarks(double m);
    string toFileString() const;
    static Student fromFileString(const string& line);
};

#endif // STUDENT_H`}
              />
            </div>

            <div className="mt-4">
              <CodeBlock
                title="src/student.cpp — Implementation"
                code={`#include "student.h"
#include <iostream>
using namespace std;

Student::Student(string n, int r, double m)
    : name(n), rollNumber(r), marks(m) {}

void Student::display() const {
    cout << "Roll: " << rollNumber 
         << " | Name: " << name 
         << " | Marks: " << marks << endl;
}

int Student::getRoll() const { return rollNumber; }
double Student::getMarks() const { return marks; }
void Student::setMarks(double m) { marks = m; }

string Student::toFileString() const {
    return name + "|" + to_string(rollNumber) + "|" + to_string(marks);
}

Student Student::fromFileString(const string& line) {
    int p1 = line.find("|");
    int p2 = line.find("|", p1 + 1);
    string n = line.substr(0, p1);
    int r = stoi(line.substr(p1 + 1, p2 - p1 - 1));
    double m = stod(line.substr(p2 + 1));
    return Student(n, r, m);
}`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>🚀 Moving to GUI & Beyond</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Qt Framework",
                  desc: "The most popular C++ GUI framework. Build desktop applications with buttons, windows, menus, and modern UIs. Cross-platform (Windows, Mac, Linux).",
                  link: "qt.io",
                },
                {
                  title: "Game Development",
                  desc: "Use SFML or SDL for 2D games, or Unreal Engine for 3D. C++ is the language behind most AAA game engines.",
                  link: "sfml-dev.org",
                },
                {
                  title: "Web Integration",
                  desc: "C++ can power web backends using frameworks like Crow or Drogon. Also compile to WebAssembly (WASM) for browser apps.",
                  link: "crowcpp.org",
                },
                {
                  title: "Data Structures & Algorithms",
                  desc: "Deepen your CS knowledge. Study: linked lists, trees, graphs, sorting, searching, dynamic programming. Practice on LeetCode.",
                  link: "leetcode.com",
                },
                {
                  title: "Systems Programming",
                  desc: "Build operating system components, network servers, embedded systems, and high-performance tools.",
                  link: "Learn Linux kernel dev",
                },
                {
                  title: "Modern C++ (C++17/20/23)",
                  desc: "Learn smart pointers, lambdas, ranges, concepts, coroutines, and other modern features that make C++ safer and more expressive.",
                  link: "cppreference.com",
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-lg bg-muted">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  <p className="text-xs text-primary mt-2">→ {item.link}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>📚 Recommended Resources</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {[
                { cat: "Books", items: "• 'C++ Primer' by Lippman — Best for beginners\n• 'Effective C++' by Scott Meyers — Best practices\n• 'The C++ Programming Language' by Stroustrup — Reference" },
                { cat: "Online", items: "• cppreference.com — Official reference\n• learncpp.com — Free tutorial site\n• GeeksforGeeks C++ — Practice problems" },
                { cat: "Practice", items: "• LeetCode — Algorithm challenges\n• HackerRank — C++ skill tracks\n• Codeforces — Competitive programming" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-md bg-muted">
                  <p className="font-semibold text-sm text-foreground">{item.cat}</p>
                  <pre className="text-xs text-muted-foreground mt-1 whitespace-pre-wrap">{item.items}</pre>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </CppLayout>
  );
};

export default NextSteps;
