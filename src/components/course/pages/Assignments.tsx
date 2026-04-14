import CppLayout from "@/components/course/CppLayout";
import MCQCard from "@/components/course/MCQCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const topics = [
  {
    title: "Variables & Data Types",
    mcqs: [
      { q: "Which data type is used to store a single character in C++?", options: ["string", "char", "int", "bool"], correct: 1, explanation: "char stores a single character like 'A' or '5'. string stores multiple characters." },
      { q: "What is the default value of an uninitialized local int variable?", options: ["0", "null", "Undefined/garbage", "-1"], correct: 2, explanation: "Local variables in C++ are not automatically initialized. They contain whatever was previously in that memory location." },
      { q: "Which of the following is a valid variable name?", options: ["2ndValue", "my-var", "_count", "class"], correct: 2, explanation: "Variable names can start with _ or a letter, not a digit. Hyphens and reserved words are not allowed." },
      { q: "What does 'double' store?", options: ["Two integers", "Decimal numbers", "Two characters", "Boolean values"], correct: 1, explanation: "double stores floating-point (decimal) numbers with double precision, like 3.14159." },
      { q: "Which operator is used for modulus (remainder)?", options: ["/", "\\\\", "%", "&"], correct: 2, explanation: "The % operator returns the remainder of integer division. Example: 10 % 3 = 1." },
    ],
    codingProblems: [
      "Write a program that swaps two variables without using a third variable.",
      "Create a program that takes a temperature in Celsius and converts it to Fahrenheit, Kelvin, and Rankine.",
      "Build a program that calculates compound interest: A = P(1 + r/n)^(nt).",
    ],
    challenge: "Create a program that reads a 4-digit number and prints the sum of its digits, the reverse of the number, and whether it's a palindrome.",
  },
  {
    title: "Control Flow",
    mcqs: [
      { q: "What is the output of: if(0) cout << \"Yes\"; else cout << \"No\";?", options: ["Yes", "No", "Error", "Nothing"], correct: 1, explanation: "In C++, 0 is treated as false. Any non-zero value is true." },
      { q: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "None"], correct: 2, explanation: "do-while checks the condition after executing the body, so it always runs at least once." },
      { q: "What does 'break' do inside a loop?", options: ["Pauses the loop", "Exits the loop immediately", "Skips the current iteration", "Restarts the loop"], correct: 1, explanation: "break immediately exits the innermost loop or switch statement." },
      { q: "Which statement is used for multi-way branching?", options: ["if-else", "switch", "Both a and b", "while"], correct: 2, explanation: "Both if-else chains and switch statements can handle multi-way branching, but switch is cleaner for discrete values." },
      { q: "What is the output of: for(int i=0; i<5; i++) if(i==3) continue; else cout << i;", options: ["01245", "0124", "01234", "012"], correct: 1, explanation: "continue skips the rest of the current iteration. When i==3, it skips printing, so 3 is not printed." },
    ],
    codingProblems: [
      "Write a program that prints all Armstrong numbers between 1 and 1000.",
      "Create a number pyramid pattern of N rows (1, 12, 123, 1234...).",
      "Build a menu-driven calculator that keeps running until the user chooses to exit.",
    ],
    challenge: "Create a program that generates a calendar for any given month and year, properly aligning days under the correct weekday headers.",
  },
  {
    title: "Functions",
    mcqs: [
      { q: "What is function overloading?", options: ["Calling a function multiple times", "Multiple functions with the same name but different parameters", "A function inside a function", "A function that calls itself"], correct: 1, explanation: "Function overloading allows multiple functions with the same name but different parameter types or counts." },
      { q: "What keyword is used to return nothing from a function?", options: ["null", "void", "none", "empty"], correct: 1, explanation: "void indicates a function does not return any value." },
      { q: "What happens when you pass by reference using &?", options: ["A copy is made", "The original variable is modified", "The function returns a reference", "Nothing special"], correct: 1, explanation: "Pass by reference sends the memory address, so changes inside the function affect the original variable." },
      { q: "What is recursion?", options: ["A loop inside a loop", "A function calling another function", "A function calling itself", "An infinite loop"], correct: 2, explanation: "Recursion is when a function calls itself with a smaller problem until it reaches a base case." },
      { q: "What is a default parameter?", options: ["A parameter that must be provided", "A parameter with a pre-set value if not provided", "The first parameter", "A global variable"], correct: 1, explanation: "Default parameters have pre-assigned values used when the caller doesn't provide an argument." },
    ],
    codingProblems: [
      "Write a recursive function to calculate the power of a number (base^exponent).",
      "Create overloaded functions to find the maximum of 2, 3, and 4 numbers.",
      "Build a function that checks if a string is a palindrome (ignoring case and spaces).",
    ],
    challenge: "Create a simple expression evaluator that takes a string like '3 + 5 * 2' and calculates the result respecting operator precedence.",
  },
  {
    title: "OOP (Classes & Objects)",
    mcqs: [
      { q: "What is encapsulation?", options: ["Hiding data using access modifiers", "Inheriting from a class", "Creating multiple objects", "Using virtual functions"], correct: 0, explanation: "Encapsulation is bundling data and methods together while restricting direct access to some components (using private/protected)." },
      { q: "Which access modifier makes members accessible only within the class?", options: ["public", "private", "protected", "static"], correct: 1, explanation: "private members can only be accessed by member functions of the same class." },
      { q: "What is the purpose of a destructor?", options: ["To create objects", "To initialize objects", "To clean up when an object is destroyed", "To copy objects"], correct: 2, explanation: "Destructors run automatically when an object goes out of scope, used to free resources like dynamic memory." },
      { q: "How do you create an object of class Car named 'myCar'?", options: ["Car = myCar;", "Car myCar();", "Car myCar;", "new Car myCar;"], correct: 2, explanation: "Car myCar; creates an object using the default constructor. Car myCar() would be a function declaration (most vexing parse)." },
      { q: "What does the 'this' pointer refer to?", options: ["The parent class", "The current object", "The main function", "A global variable"], correct: 1, explanation: "The 'this' pointer is an implicit pointer available in member functions that points to the object that called the function." },
    ],
    codingProblems: [
      "Create a 'Date' class with day, month, year. Add methods to validate the date and calculate the day of the week.",
      "Build a 'Fraction' class with add, subtract, multiply, divide methods that return simplified fractions.",
      "Create a 'Playlist' class that manages songs (add, remove, shuffle, display, play next/previous).",
    ],
    challenge: "Create a complete 'Matrix' class that supports addition, multiplication, transpose, and determinant calculation for 2D matrices.",
  },
  {
    title: "Inheritance & Polymorphism",
    mcqs: [
      { q: "Which keyword is used to inherit from a base class?", options: ["extends", "inherits", ":", "->"], correct: 2, explanation: "In C++, inheritance uses the colon syntax: class Derived : public Base { };" },
      { q: "What is a pure virtual function?", options: ["A function with no parameters", "A function declared with = 0", "A function that returns void", "A static function"], correct: 1, explanation: "A pure virtual function is declared with = 0 and makes the class abstract — it must be overridden by derived classes." },
      { q: "Can you create an object of an abstract class?", options: ["Yes", "No", "Only with new", "Only inside main"], correct: 1, explanation: "Abstract classes (with at least one pure virtual function) cannot be instantiated. You can only use pointers/references to them." },
      { q: "What is the order of constructor calls in inheritance?", options: ["Derived then Base", "Base then Derived", "Only Derived", "Random"], correct: 1, explanation: "The base class constructor runs first, then the derived class constructor. Destructors run in reverse order." },
      { q: "What does 'override' keyword do?", options: ["Creates a new function", "Indicates a function replaces a virtual function from the base class", "Makes a function static", "Prevents inheritance"], correct: 1, explanation: "override tells the compiler to verify that this function actually overrides a virtual function in the base class." },
    ],
    codingProblems: [
      "Create a Shape hierarchy (Circle, Rectangle, Triangle) with virtual area() and perimeter() methods.",
      "Build an Employee system with Manager and Intern derived classes, each with different salary calculation.",
      "Create an abstract Account class with SavingsAccount and CurrentAccount that calculate interest differently.",
    ],
    challenge: "Build a simple game character system: Character (base) → Warrior, Mage, Archer. Each has unique attack(), defend(), and specialAbility() methods. Create a battle simulator between two characters.",
  },
  {
    title: "File Handling",
    mcqs: [
      { q: "Which header file is needed for file operations?", options: ["<iostream>", "<fstream>", "<string>", "<cstdlib>"], correct: 1, explanation: "<fstream> provides ifstream (reading), ofstream (writing), and fstream (both) for file operations." },
      { q: "What does ios::app do when opening a file?", options: ["Creates a new file", "Appends to the end of the file", "Opens in read-only mode", "Clears the file"], correct: 1, explanation: "ios::app (append mode) adds new data to the end of the file without erasing existing content." },
      { q: "Which function reads a full line from a file?", options: ["cin >>", "file.read()", "getline(file, str)", "file.get()"], correct: 2, explanation: "getline(file, string) reads an entire line including spaces until it hits a newline character." },
      { q: "What happens if you open a non-existent file with ofstream?", options: ["Error", "It creates the file", "Nothing", "Program crashes"], correct: 1, explanation: "ofstream creates the file if it doesn't exist. ifstream would fail if the file doesn't exist." },
      { q: "How do you check if a file was opened successfully?", options: ["file.check()", "file.is_open()", "file.exists()", "file.valid()"], correct: 1, explanation: "file.is_open() returns true if the file was successfully opened, false otherwise." },
    ],
    codingProblems: [
      "Write a program that copies the contents of one file to another, converting all text to uppercase.",
      "Create a log system that writes timestamped messages to a file and can display the last N entries.",
      "Build a CSV file reader that parses a comma-separated file and displays it as a formatted table.",
    ],
    challenge: "Create a simple text-based database: store records in a binary file, support add, search, update, and delete operations with an index for fast lookup.",
  },
];

const Assignments = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assignments & MCQs</h1>
          <p className="text-muted-foreground mt-2">
            Test your knowledge with interactive MCQs and challenging coding problems.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {topics.map((topic, ti) => (
            <AccordionItem key={ti} value={`topic-${ti}`} className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {topic.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-6 pb-6">
                <div>
                  <h3 className="text-base font-semibold mb-3">📝 Multiple Choice Questions</h3>
                  {topic.mcqs.map((mcq, mi) => (
                    <MCQCard
                      key={mi}
                      question={`${mi + 1}. ${mcq.q}`}
                      options={mcq.options}
                      correctIndex={mcq.correct}
                      explanation={mcq.explanation}
                    />
                  ))}
                </div>

                <Card>
                  <CardHeader><CardTitle className="text-base">💻 Coding Problems</CardTitle></CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      {topic.codingProblems.map((p, i) => <li key={i}>{p}</li>)}
                    </ol>
                  </CardContent>
                </Card>

                <Card className="border-primary/30">
                  <CardHeader><CardTitle className="text-base">🏆 Challenge Problem</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{topic.challenge}</p>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </CppLayout>
  );
};

export default Assignments;
