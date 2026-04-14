import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const months = [
  {
    label: "Month 1: Fundamentals",
    weeks: [
      {
        title: "Week 1: Setup & First Programs",
        topics: "Environment setup, Hello World, cout, cin, comments",
        code: `#include <iostream>
using namespace std;

int main() {
    // Your first C++ program
    cout << "Welcome to C++ Programming!" << endl;
    
    string name;
    cout << "What is your name? ";
    cin >> name;
    cout << "Hello, " << name << "! Let's learn C++." << endl;
    
    return 0;
}`,
        output: `Welcome to C++ Programming!
What is your name? Maria
Hello, Maria! Let's learn C++.`,
        exercises: ["Print your name and age", "Take two numbers as input and display their sum", "Print a pattern of stars using cout"],
        miniProject: "Personal Info Card — Take name, age, city as input and display a formatted info card.",
      },
      {
        title: "Week 2: Variables & Operators",
        topics: "int, float, double, char, string, bool, arithmetic/relational/logical operators",
        code: `#include <iostream>
using namespace std;

int main() {
    double price = 49.99;
    int quantity = 3;
    double discount = 0.10; // 10%
    
    double subtotal = price * quantity;
    double discountAmount = subtotal * discount;
    double total = subtotal - discountAmount;
    
    cout << "Subtotal: $" << subtotal << endl;
    cout << "Discount: -$" << discountAmount << endl;
    cout << "Total: $" << total << endl;
    
    bool isExpensive = (total > 100);
    cout << "Expensive order? " << (isExpensive ? "Yes" : "No") << endl;
    
    return 0;
}`,
        output: `Subtotal: $149.97
Discount: -$14.997
Total: $134.973
Expensive order? Yes`,
        exercises: ["Calculate area of a circle (pi * r * r)", "Convert temperature between Celsius and Fahrenheit", "Calculate simple interest (P * R * T / 100)"],
        miniProject: "Shopping Cart Calculator — Enter up to 5 items with price and quantity, calculate total with tax.",
      },
      {
        title: "Week 3: Conditionals",
        topics: "if, else if, else, switch, nested conditions, ternary operator",
        code: `#include <iostream>
using namespace std;

int main() {
    int marks;
    cout << "Enter your marks (0-100): ";
    cin >> marks;
    
    char grade;
    if (marks >= 90) grade = 'A';
    else if (marks >= 80) grade = 'B';
    else if (marks >= 70) grade = 'C';
    else if (marks >= 60) grade = 'D';
    else grade = 'F';
    
    cout << "Grade: " << grade << endl;
    cout << "Status: " << (grade != 'F' ? "PASS" : "FAIL") << endl;
    
    return 0;
}`,
        output: `Enter your marks (0-100): 85
Grade: B
Status: PASS`,
        exercises: ["Build a menu-driven calculator with switch-case", "Check if a year is a leap year", "Determine ticket price based on age (child/adult/senior)"],
        miniProject: "ATM Simulator — Login with PIN, show menu (check balance, deposit, withdraw), validate all inputs.",
      },
      {
        title: "Week 4: Loops",
        topics: "for, while, do-while, break, continue, nested loops",
        code: `#include <iostream>
using namespace std;

int main() {
    // Print a right triangle pattern
    int rows = 5;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            cout << "* ";
        }
        cout << endl;
    }
    
    // Sum until user enters 0
    cout << "\\nEnter numbers (0 to stop):" << endl;
    int num, sum = 0;
    do {
        cin >> num;
        sum += num;
    } while (num != 0);
    
    cout << "Total sum: " << sum << endl;
    
    return 0;
}`,
        output: `* 
* * 
* * * 
* * * * 
* * * * * 

Enter numbers (0 to stop):
10 20 30 0
Total sum: 60`,
        exercises: ["Print multiplication table for 1 to 10", "Find all prime numbers between 1 and 100", "Print a diamond pattern with nested loops"],
        miniProject: "Number Guessing Game — Computer picks a random number, user guesses with hints (higher/lower). Track attempts.",
      },
    ],
  },
  {
    label: "Month 2: OOP & File Handling",
    weeks: [
      {
        title: "Week 5: Functions",
        topics: "Function declaration, definition, parameters, return types, overloading, default args",
        code: `#include <iostream>
using namespace std;

// Function overloading
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// Default parameter
void greet(string name, string greeting = "Hello") {
    cout << greeting << ", " << name << "!" << endl;
}

// Pass by reference
void swap(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    cout << add(5, 3) << endl;       // 8
    cout << add(2.5, 3.7) << endl;   // 6.2
    
    greet("Alice");                   // Hello, Alice!
    greet("Bob", "Good morning");     // Good morning, Bob!
    
    int x = 10, y = 20;
    swap(x, y);
    cout << "x=" << x << " y=" << y << endl; // x=20 y=10
    
    return 0;
}`,
        output: `8
6.2
Hello, Alice!
Good morning, Bob!
x=20 y=10`,
        exercises: ["Write a recursive function for Fibonacci series", "Create a function to check if a string is a palindrome", "Build a mini math library with power, factorial, and GCD functions"],
        miniProject: "Unit Converter — Functions for km↔miles, kg↔lbs, C↔F. Menu-driven interface.",
      },
      {
        title: "Week 6: Arrays & Strings",
        topics: "1D arrays, 2D arrays, string manipulation, C-strings vs std::string",
        code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // 2D array: 3 students, 4 subjects
    int marks[3][4] = {
        {85, 90, 78, 92},
        {88, 76, 95, 80},
        {92, 88, 84, 91}
    };
    string students[] = {"Alice", "Bob", "Charlie"};
    
    for (int i = 0; i < 3; i++) {
        int total = 0;
        for (int j = 0; j < 4; j++) {
            total += marks[i][j];
        }
        double avg = total / 4.0;
        cout << students[i] << " — Avg: " << avg;
        cout << " (" << (avg >= 85 ? "Distinction" : "Pass") << ")" << endl;
    }
    
    // String operations
    string sentence = "Learn C++ Programming";
    cout << "\\nLength: " << sentence.length() << endl;
    cout << "Substring: " << sentence.substr(6, 3) << endl;
    cout << "Found 'C++' at index: " << sentence.find("C++") << endl;
    
    return 0;
}`,
        output: `Alice — Avg: 86.25 (Distinction)
Bob — Avg: 84.75 (Pass)
Charlie — Avg: 88.75 (Distinction)

Length: 21
Substring: C++
Found 'C++' at index: 6`,
        exercises: ["Sort an array using bubble sort", "Count frequency of each character in a string", "Merge two sorted arrays into one sorted array"],
        miniProject: "Student Marksheet — Store marks of N students in a 2D array. Calculate total, average, grade for each. Display in a formatted table.",
      },
      {
        title: "Week 7: Classes & Objects",
        topics: "Class definition, access modifiers, constructors, destructors, encapsulation",
        code: `#include <iostream>
#include <string>
using namespace std;

class Product {
private:
    string name;
    double price;
    int stock;

public:
    // Parameterized constructor
    Product(string n, double p, int s) : name(n), price(p), stock(s) {}
    
    // Getters
    string getName() const { return name; }
    double getPrice() const { return price; }
    int getStock() const { return stock; }
    
    // Methods
    bool sell(int qty) {
        if (qty <= stock) {
            stock -= qty;
            cout << "Sold " << qty << " x " << name << " = $" << price * qty << endl;
            return true;
        }
        cout << "Not enough stock!" << endl;
        return false;
    }
    
    void restock(int qty) {
        stock += qty;
        cout << "Restocked " << name << ". New stock: " << stock << endl;
    }
    
    void display() const {
        cout << name << " | $" << price << " | Stock: " << stock << endl;
    }
};

int main() {
    Product laptop("Dell Laptop", 899.99, 10);
    Product phone("iPhone 15", 999.99, 25);
    
    laptop.display();
    phone.display();
    
    laptop.sell(3);
    phone.sell(2);
    laptop.restock(5);
    laptop.display();
    
    return 0;
}`,
        output: `Dell Laptop | $899.99 | Stock: 10
iPhone 15 | $999.99 | Stock: 25
Sold 3 x Dell Laptop = $2699.97
Sold 2 x iPhone 15 = $1999.98
Restocked Dell Laptop. New stock: 12
Dell Laptop | $899.99 | Stock: 12`,
        exercises: ["Create a 'Time' class with hours, minutes, seconds and add/display methods", "Build a 'Circle' class with radius, area(), and circumference()", "Create a 'Car' class with speed controls (accelerate, brake, display)"],
        miniProject: "Inventory Manager — Product class with add, sell, restock, display. Array of up to 20 products with menu interface.",
      },
      {
        title: "Week 8: Inheritance & File Handling",
        topics: "Inheritance types, file read/write, fstream, data persistence",
        code: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

class Person {
protected:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}
    virtual void display() {
        cout << "Name: " << name << ", Age: " << age;
    }
    
    void saveToFile(ofstream &out) {
        out << name << "|" << age;
    }
};

class Employee : public Person {
    string department;
    double salary;
public:
    Employee(string n, int a, string dept, double sal)
        : Person(n, a), department(dept), salary(sal) {}
    
    void display() override {
        Person::display();
        cout << ", Dept: " << department << ", Salary: $" << salary << endl;
    }
    
    void saveToFile(ofstream &out) {
        Person::saveToFile(out);
        out << "|" << department << "|" << salary << endl;
    }
};

int main() {
    Employee emp1("Sarah Connor", 35, "Engineering", 85000);
    Employee emp2("James Wilson", 42, "Marketing", 72000);
    
    // Save to file
    ofstream outFile("employees.txt");
    emp1.saveToFile(outFile);
    emp2.saveToFile(outFile);
    outFile.close();
    cout << "Employees saved to file." << endl;
    
    // Read from file
    ifstream inFile("employees.txt");
    string line;
    cout << "\\n--- Employee Records ---" << endl;
    while (getline(inFile, line)) {
        cout << line << endl;
    }
    inFile.close();
    
    emp1.display();
    emp2.display();
    
    return 0;
}`,
        output: `Employees saved to file.

--- Employee Records ---
Sarah Connor|35|Engineering|85000
James Wilson|42|Marketing|72000
Name: Sarah Connor, Age: 35, Dept: Engineering, Salary: $85000
Name: James Wilson, Age: 42, Dept: Marketing, Salary: $72000`,
        exercises: ["Create a Vehicle → Car/Truck hierarchy with file saving", "Write a program that appends log messages to a file with timestamps", "Build a config file reader that loads key=value pairs"],
        miniProject: "Employee Records System — Add, view, search, delete employees. All data persisted in a text file. Uses inheritance (Person → Employee → Manager).",
      },
    ],
  },
  {
    label: "Month 3: Advanced & Projects",
    weeks: [
      {
        title: "Week 9: Polymorphism & Advanced OOP",
        topics: "Virtual functions, abstract classes, pure virtual functions, operator overloading",
        code: `#include <iostream>
using namespace std;

// Abstract base class
class Shape {
public:
    virtual double area() = 0;          // Pure virtual
    virtual string getType() = 0;       // Pure virtual
    
    void display() {
        cout << getType() << " — Area: " << area() << " sq units" << endl;
    }
    
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override { return 3.14159 * radius * radius; }
    string getType() override { return "Circle"; }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() override { return width * height; }
    string getType() override { return "Rectangle"; }
};

class Triangle : public Shape {
    double base, height;
public:
    Triangle(double b, double h) : base(b), height(h) {}
    double area() override { return 0.5 * base * height; }
    string getType() override { return "Triangle"; }
};

int main() {
    Shape* shapes[3];
    shapes[0] = new Circle(5.0);
    shapes[1] = new Rectangle(4.0, 6.0);
    shapes[2] = new Triangle(3.0, 8.0);
    
    cout << "--- Shape Calculator ---" << endl;
    for (int i = 0; i < 3; i++) {
        shapes[i]->display();
        delete shapes[i];
    }
    
    return 0;
}`,
        output: `--- Shape Calculator ---
Circle — Area: 78.5398 sq units
Rectangle — Area: 24 sq units
Triangle — Area: 12 sq units`,
        exercises: ["Create an abstract Media class with derived Book and DVD classes", "Overload the + operator for a Vector2D class", "Build a payment system with abstract PaymentMethod → CreditCard, Cash, UPI"],
        miniProject: "Shape Calculator Pro — Abstract Shape class with Circle, Rectangle, Triangle, Square. Menu to create shapes, store in an array, display all with areas and perimeters.",
      },
      {
        title: "Week 10: Pointers & Dynamic Memory",
        topics: "Pointers, dynamic allocation, new/delete, linked list basics",
        code: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class SimpleList {
    Node* head;
public:
    SimpleList() : head(nullptr) {}
    
    void addFront(int val) {
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }
    
    void display() {
        Node* curr = head;
        while (curr) {
            cout << curr->data << " -> ";
            curr = curr->next;
        }
        cout << "NULL" << endl;
    }
    
    ~SimpleList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    // Dynamic array
    int size;
    cout << "How many scores? ";
    cin >> size;
    int* scores = new int[size];
    
    for (int i = 0; i < size; i++) {
        cout << "Score " << i + 1 << ": ";
        cin >> scores[i];
    }
    
    int total = 0;
    for (int i = 0; i < size; i++) total += scores[i];
    cout << "Average: " << (double)total / size << endl;
    
    delete[] scores;
    
    // Linked list
    SimpleList list;
    list.addFront(30);
    list.addFront(20);
    list.addFront(10);
    cout << "\\nLinked List: ";
    list.display();
    
    return 0;
}`,
        output: `How many scores? 3
Score 1: 85
Score 2: 90
Score 3: 78
Average: 84.3333

Linked List: 10 -> 20 -> 30 -> NULL`,
        exercises: ["Create a dynamic array class that resizes automatically", "Implement a stack using a linked list", "Build a simple queue with enqueue and dequeue"],
        miniProject: "Dynamic Student Database — Use dynamic memory to store an unknown number of student records. Support add, delete, search, and display.",
      },
      {
        title: "Week 11: STL & Error Handling",
        topics: "Vectors, maps, sets, iterators, try-catch, custom exceptions",
        code: `#include <iostream>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

class InsufficientFunds : public exception {
    string msg;
public:
    InsufficientFunds(double bal, double amt) {
        msg = "Cannot withdraw $" + to_string(amt) + 
              " — balance is only $" + to_string(bal);
    }
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

int main() {
    // Vector
    vector<string> tasks = {"Design UI", "Write code", "Test app"};
    tasks.push_back("Deploy");
    tasks.push_back("Document");
    
    cout << "--- Task List ---" << endl;
    for (int i = 0; i < tasks.size(); i++) {
        cout << i + 1 << ". " << tasks[i] << endl;
    }
    
    // Map
    map<string, int> inventory;
    inventory["Laptop"] = 15;
    inventory["Mouse"] = 50;
    inventory["Keyboard"] = 30;
    
    cout << "\\n--- Inventory ---" << endl;
    for (auto& item : inventory) {
        cout << item.first << ": " << item.second << " units" << endl;
    }
    
    // Exception handling
    double balance = 500.0;
    try {
        double withdrawAmt = 700.0;
        if (withdrawAmt > balance)
            throw InsufficientFunds(balance, withdrawAmt);
        balance -= withdrawAmt;
    } catch (const InsufficientFunds& e) {
        cout << "\\nError: " << e.what() << endl;
    }
    
    return 0;
}`,
        output: `--- Task List ---
1. Design UI
2. Write code
3. Test app
4. Deploy
5. Document

--- Inventory ---
Keyboard: 30 units
Laptop: 15 units
Mouse: 50 units

Error: Cannot withdraw $700.000000 — balance is only $500.000000`,
        exercises: ["Build a word frequency counter using map", "Create a set-based unique ID generator", "Implement a try-catch-based input validator for age/email"],
        miniProject: "Task Management App — Use vectors to manage tasks. Add, remove, mark complete, filter by status. Save/load from file.",
      },
      {
        title: "Week 12: Capstone Projects",
        topics: "Full system design, multi-file projects, integration, testing",
        code: `// This week focuses on building complete systems.
// See the "Real-World Projects" section for full implementations.

// Example: Main menu structure for a management system

#include <iostream>
using namespace std;

void showMenu() {
    cout << "\\n=============================" << endl;
    cout << "  HOTEL MANAGEMENT SYSTEM" << endl;
    cout << "=============================" << endl;
    cout << "1. Room Booking" << endl;
    cout << "2. Hall Booking" << endl;
    cout << "3. Food Ordering" << endl;
    cout << "4. View Customer Records" << endl;
    cout << "5. Generate Bill" << endl;
    cout << "6. Exit" << endl;
    cout << "=============================" << endl;
    cout << "Enter choice: ";
}

int main() {
    int choice;
    do {
        showMenu();
        cin >> choice;
        
        switch (choice) {
            case 1: cout << "\\n[Room Booking Module]" << endl; break;
            case 2: cout << "\\n[Hall Booking Module]" << endl; break;
            case 3: cout << "\\n[Food Ordering Module]" << endl; break;
            case 4: cout << "\\n[Customer Records Module]" << endl; break;
            case 5: cout << "\\n[Billing Module]" << endl; break;
            case 6: cout << "\\nGoodbye!" << endl; break;
            default: cout << "\\nInvalid choice!" << endl;
        }
    } while (choice != 6);
    
    return 0;
}`,
        output: `=============================
  HOTEL MANAGEMENT SYSTEM
=============================
1. Room Booking
2. Hall Booking
3. Food Ordering
4. View Customer Records
5. Generate Bill
6. Exit
=============================
Enter choice: 1

[Room Booking Module]`,
        exercises: ["Design the class structure for a hotel management system", "Create a file-based database manager class", "Write a billing module that calculates totals with tax and discounts"],
        miniProject: "Choose and build one of the Real-World Projects (Homestay Management or Business Management) — see the Real-World Projects section for full specifications.",
      },
    ],
  },
];

const ThreeMonthCourse = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">3-Month Comprehensive Course</h1>
          <p className="text-muted-foreground mt-2">
            12-week deep-dive program. Daily 60–90 minute sessions.
            Fundamentals → OOP → Advanced concepts → Real-world systems.
          </p>
        </div>

        <Tabs defaultValue="month-0">
          <TabsList className="flex-wrap h-auto">
            {months.map((m, i) => (
              <TabsTrigger key={i} value={`month-${i}`}>
                {m.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {months.map((month, mi) => (
            <TabsContent key={mi} value={`month-${mi}`} className="space-y-8 mt-4">
              <h2 className="text-2xl font-bold">{month.label}</h2>

              {month.weeks.map((week, wi) => (
                <div key={wi} className="space-y-4 pb-8 border-b border-border last:border-b-0">
                  <h3 className="text-xl font-semibold">{week.title}</h3>
                  <p className="text-sm text-muted-foreground">{week.topics}</p>

                  <CodeBlock code={week.code} title={`week${mi * 4 + wi + 1}.cpp`} output={week.output} />

                  <Card>
                    <CardHeader><CardTitle className="text-base">✏️ Exercises</CardTitle></CardHeader>
                    <CardContent>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        {week.exercises.map((e, i) => <li key={i}>{e}</li>)}
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/30">
                    <CardHeader>
                      <CardTitle className="text-sm">🚀 Mini Project</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{week.miniProject}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CppLayout>
  );
};

export default ThreeMonthCourse;
