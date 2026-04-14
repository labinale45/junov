import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const weeks = [
  {
    title: "Week 1: Foundations",
    topics: "Setup, Variables, Data Types, Input/Output, Operators",
    dailyPlan: `Day 1: Install g++/VS Code, write first "Hello World" (90 min)
Day 2: Variables & data types — int, float, char, string (75 min)
Day 3: Arithmetic & assignment operators (60 min)
Day 4: Input with cin, formatted output with cout (75 min)
Day 5: if/else and nested conditions (90 min)`,
    concepts: `Think of variables like labeled boxes — each box holds one type of item.
An int box holds whole numbers, a float box holds decimals, a char box holds a single letter.
cin is like a microphone (takes input), cout is like a speaker (gives output).`,
    code: `#include <iostream>
using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    cin >> name;
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello, " << name << "!" << endl;
    cout << "In 5 years, you'll be " << age + 5 << endl;
    
    if (age >= 18) {
        cout << "You are an adult." << endl;
    } else {
        cout << "You are a minor." << endl;
    }
    
    return 0;
}`,
    output: `Enter your name: Alice
Enter your age: 20
Hello, Alice!
In 5 years, you'll be 25
You are an adult.`,
    problems: [
      "Write a program that converts Celsius to Fahrenheit.",
      "Create a simple calculator that takes two numbers and an operator (+, -, *, /).",
      "Write a program to check if a number is even or odd.",
      "Create a program that calculates the area of a rectangle from user input.",
      "Write a program that finds the largest of three numbers entered by the user.",
    ],
    miniProject: {
      title: "Simple Bill Calculator",
      desc: "Build a restaurant bill calculator that takes item prices, calculates subtotal, applies 10% tax, and shows the final amount. Allow the user to enter up to 5 items.",
    },
  },
  {
    title: "Week 2: Control Flow & Functions",
    topics: "Loops (for, while, do-while), Functions, Arrays",
    dailyPlan: `Day 1: for loops — counting, patterns, tables (90 min)
Day 2: while and do-while loops — input validation (75 min)
Day 3: Functions — definition, parameters, return values (90 min)
Day 4: Arrays — declaration, traversal, searching (90 min)
Day 5: Practice — combining loops, functions, and arrays (75 min)`,
    concepts: `A for loop is like a conveyor belt — it runs a fixed number of times.
A while loop is like a security guard checking your ticket before you enter — it checks first.
A function is like a vending machine — put something in, get something out.
An array is like a row of lockers, each with a number (index) starting from 0.`,
    code: `#include <iostream>
using namespace std;

// Function to find the average of an array
double findAverage(int scores[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += scores[i];
    }
    return (double)sum / size;
}

int main() {
    const int SIZE = 5;
    int marks[SIZE];
    
    cout << "Enter marks of 5 students:" << endl;
    for (int i = 0; i < SIZE; i++) {
        cout << "Student " << i + 1 << ": ";
        cin >> marks[i];
    }
    
    double avg = findAverage(marks, SIZE);
    cout << "Class average: " << avg << endl;
    
    // Find highest score
    int highest = marks[0];
    for (int i = 1; i < SIZE; i++) {
        if (marks[i] > highest) {
            highest = marks[i];
        }
    }
    cout << "Highest score: " << highest << endl;
    
    return 0;
}`,
    output: `Enter marks of 5 students:
Student 1: 85
Student 2: 92
Student 3: 78
Student 4: 95
Student 5: 88
Class average: 87.6
Highest score: 95`,
    problems: [
      "Print a multiplication table for any number entered by the user.",
      "Write a function that checks if a number is prime.",
      "Create a program that reverses an array.",
      "Write a program to count vowels in a string using a loop.",
      "Create a function that returns the factorial of a number.",
    ],
    miniProject: {
      title: "Student Grade Tracker",
      desc: "Build a program that stores marks of 10 students in an array, calculates the average, finds the highest and lowest marks, and assigns grades (A/B/C/D/F) using functions.",
    },
  },
  {
    title: "Week 3: OOP Fundamentals",
    topics: "Classes, Objects, Constructors, Encapsulation, Inheritance",
    dailyPlan: `Day 1: Classes and objects — creating your first class (90 min)
Day 2: Constructors (default, parameterized) and destructors (75 min)
Day 3: Encapsulation — getters, setters, access modifiers (90 min)
Day 4: Inheritance — base and derived classes (90 min)
Day 5: Practice — building a mini class hierarchy (75 min)`,
    concepts: `A class is like a blueprint for a house — it describes what the house will have.
An object is the actual house built from that blueprint.
A constructor is the construction crew that builds the house when you order one.
Inheritance is like a child inheriting traits from parents — a SportsCar inherits from Car.`,
    code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string ownerName;
    double balance;

public:
    // Constructor
    BankAccount(string name, double initialBalance) {
        ownerName = name;
        balance = initialBalance;
    }
    
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited $" << amount << endl;
        }
    }
    
    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn $" << amount << endl;
        } else {
            cout << "Insufficient balance!" << endl;
        }
    }
    
    void showBalance() {
        cout << ownerName << "'s Balance: $" << balance << endl;
    }
};

// Inheritance: SavingsAccount extends BankAccount
class SavingsAccount : public BankAccount {
private:
    double interestRate;
public:
    SavingsAccount(string name, double bal, double rate)
        : BankAccount(name, bal), interestRate(rate) {}
    
    void showInterestRate() {
        cout << "Interest Rate: " << interestRate << "%" << endl;
    }
};

int main() {
    SavingsAccount acc("John Doe", 1000.0, 3.5);
    acc.showBalance();
    acc.deposit(500);
    acc.withdraw(200);
    acc.showBalance();
    acc.showInterestRate();
    
    return 0;
}`,
    output: `John Doe's Balance: $1000
Deposited $500
Withdrawn $200
John Doe's Balance: $1300
Interest Rate: 3.5%`,
    problems: [
      "Create a 'Student' class with name, roll number, and marks. Add a method to display details.",
      "Build a 'Rectangle' class with methods to calculate area and perimeter.",
      "Create a class hierarchy: Shape → Circle and Shape → Square.",
      "Write a class 'Employee' with constructor that initializes name, position, and salary.",
      "Create a 'Book' class and a 'EBook' class that inherits from it, adding a fileSize attribute.",
    ],
    miniProject: {
      title: "Contact Book",
      desc: "Build a contact book using classes. Store up to 50 contacts with name, phone, and email. Support add, search by name, display all, and delete operations using a menu-driven interface.",
    },
  },
  {
    title: "Week 4: File Handling & Final Project",
    topics: "File I/O, Polymorphism, Final Project",
    dailyPlan: `Day 1: File handling — reading and writing text files (90 min)
Day 2: Polymorphism — virtual functions, function overriding (90 min)
Day 3: Final project — design and class structure (75 min)
Day 4: Final project — implementation (90 min)
Day 5: Final project — testing and review (75 min)`,
    concepts: `File handling is like using a notebook — you can open it, write in it, read from it, and close it.
ofstream = your pen (writes to file), ifstream = your eyes (reads from file).
Polymorphism means "many forms" — like a remote control button that does different things on different devices.`,
    code: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

struct Student {
    string name;
    int age;
    double gpa;
};

void saveStudent(const Student& s) {
    ofstream file("students.txt", ios::app);
    if (file.is_open()) {
        file << s.name << "," << s.age << "," << s.gpa << endl;
        file.close();
        cout << "Student saved to file." << endl;
    }
}

void loadStudents() {
    ifstream file("students.txt");
    string line;
    cout << "\\n--- All Students ---" << endl;
    while (getline(file, line)) {
        cout << line << endl;
    }
    file.close();
}

int main() {
    Student s1 = {"Alice Johnson", 20, 3.8};
    Student s2 = {"Bob Smith", 22, 3.5};
    
    saveStudent(s1);
    saveStudent(s2);
    loadStudents();
    
    return 0;
}`,
    output: `Student saved to file.
Student saved to file.

--- All Students ---
Alice Johnson,20,3.8
Bob Smith,22,3.5`,
    problems: [
      "Write a program that saves and loads a to-do list from a file.",
      "Create a class hierarchy with virtual functions: Animal → Dog, Cat (each with a unique speak() method).",
      "Build a program that counts the number of words in a text file.",
    ],
    miniProject: {
      title: "Student Management System",
      desc: "Build a complete student management system with OOP and file handling. Features: Add student, View all students, Search by roll number, Update marks, Delete student. All data is saved to and loaded from a text file.",
    },
  },
];

const OneMonthCourse = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">1-Month Fast-Track Course</h1>
          <p className="text-muted-foreground mt-2">
            Intensive 4-week program. Daily 60–90 minute sessions. Covers fundamentals through OOP and file handling.
          </p>
        </div>

        <Tabs defaultValue="week-1">
          <TabsList className="flex-wrap h-auto">
            {weeks.map((_, i) => (
              <TabsTrigger key={i} value={`week-${i + 1}`}>
                Week {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {weeks.map((week, i) => (
            <TabsContent key={i} value={`week-${i + 1}`} className="space-y-6 mt-4">
              <h2 className="text-2xl font-bold">{week.title}</h2>
              <p className="text-sm text-muted-foreground font-medium">{week.topics}</p>

              <Card>
                <CardHeader><CardTitle className="text-base">📅 Daily Session Plan</CardTitle></CardHeader>
                <CardContent>
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">{week.dailyPlan}</pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">💡 Key Concepts & Analogies</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{week.concepts}</p>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold mb-2">Code Example</h3>
                <CodeBlock code={week.code} title={`week${i + 1}_example.cpp`} output={week.output} />
              </div>

              <Card>
                <CardHeader><CardTitle className="text-base">✏️ Practice Problems</CardTitle></CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    {week.problems.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-base">🚀 Mini Project: {week.miniProject.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{week.miniProject.desc}</p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CppLayout>
  );
};

export default OneMonthCourse;
