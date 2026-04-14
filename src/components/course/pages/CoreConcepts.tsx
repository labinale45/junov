import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const concepts = [
  {
    id: "variables",
    title: "Variables & Data Types",
    explanation: "A variable is a named container that stores data in your program. Each variable has a type that determines what kind of data it can hold.",
    analogy: "Think of variables as labeled jars in a kitchen. A jar labeled 'Sugar' holds sugar (numbers), a jar labeled 'Spice Name' holds text (strings). You can't put sugar in a jar designed for liquids — the type must match.",
    code: `#include <iostream>
using namespace std;

int main() {
    int age = 25;              // Whole number
    double salary = 55000.50;  // Decimal number
    char grade = 'A';          // Single character
    string name = "Alice";     // Text
    bool isActive = true;      // True/False
    
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Salary: $" << salary << endl;
    cout << "Grade: " << grade << endl;
    cout << "Active: " << isActive << endl;
    
    return 0;
}`,
    output: `Name: Alice
Age: 25
Salary: $55000.5
Grade: A
Active: 1`,
  },
  {
    id: "control-flow",
    title: "Control Flow (if, loops)",
    explanation: "Control flow lets your program make decisions (if/else) and repeat actions (loops). Without it, programs would just run top-to-bottom without any logic.",
    analogy: "An if statement is like a traffic signal — green means go (execute code), red means stop (skip it). A loop is like a washing machine cycle — it repeats the same steps until the clothes are clean (condition is false).",
    code: `#include <iostream>
using namespace std;

int main() {
    // Decision making
    int temperature = 35;
    if (temperature > 30) {
        cout << "It's hot! Stay hydrated." << endl;
    } else if (temperature > 20) {
        cout << "Nice weather!" << endl;
    } else {
        cout << "It's cold! Wear a jacket." << endl;
    }
    
    // Loop — countdown
    cout << "\\nCountdown: ";
    for (int i = 5; i >= 1; i--) {
        cout << i << " ";
    }
    cout << "GO!" << endl;
    
    // While loop — input validation
    int pin;
    int correctPin = 1234;
    int attempts = 0;
    do {
        cout << "Enter PIN: ";
        cin >> pin;
        attempts++;
    } while (pin != correctPin && attempts < 3);
    
    if (pin == correctPin)
        cout << "Access granted!" << endl;
    else
        cout << "Account locked!" << endl;
    
    return 0;
}`,
    output: `It's hot! Stay hydrated.

Countdown: 5 4 3 2 1 GO!
Enter PIN: 0000
Enter PIN: 1234
Access granted!`,
  },
  {
    id: "functions",
    title: "Functions",
    explanation: "A function is a reusable block of code that performs a specific task. You define it once and call it whenever you need that task done. Functions take inputs (parameters) and can return an output.",
    analogy: "A function is like a coffee machine. You put in water and coffee beans (parameters), press a button (call the function), and it gives you coffee (return value). You don't need to know how it works inside — just what goes in and what comes out.",
    code: `#include <iostream>
using namespace std;

// Function with return value
double calculateBMI(double weight, double height) {
    return weight / (height * height);
}

// Function with no return
void printCategory(double bmi) {
    if (bmi < 18.5) cout << "Underweight" << endl;
    else if (bmi < 25.0) cout << "Normal weight" << endl;
    else if (bmi < 30.0) cout << "Overweight" << endl;
    else cout << "Obese" << endl;
}

// Recursive function
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    double bmi = calculateBMI(70.0, 1.75);
    cout << "BMI: " << bmi << endl;
    cout << "Category: ";
    printCategory(bmi);
    
    cout << "5! = " << factorial(5) << endl;
    
    return 0;
}`,
    output: `BMI: 22.8571
Category: Normal weight
5! = 120`,
  },
  {
    id: "arrays-strings",
    title: "Arrays & Strings",
    explanation: "An array stores multiple values of the same type in contiguous memory. A string is essentially an array of characters. Arrays use zero-based indexing — the first element is at index 0.",
    analogy: "An array is like a row of mailboxes in an apartment building. Each mailbox (element) has a number (index). Mailbox 0 is the first one. You can put mail in any specific box or check all boxes one by one (loop through).",
    code: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // Array
    int prices[] = {299, 599, 149, 899, 449};
    int numItems = 5;
    
    int maxPrice = prices[0];
    int minPrice = prices[0];
    
    for (int i = 0; i < numItems; i++) {
        if (prices[i] > maxPrice) maxPrice = prices[i];
        if (prices[i] < minPrice) minPrice = prices[i];
    }
    
    cout << "Most expensive: $" << maxPrice << endl;
    cout << "Cheapest: $" << minPrice << endl;
    
    // String
    string email = "john.doe@company.com";
    int atPos = email.find("@");
    string username = email.substr(0, atPos);
    string domain = email.substr(atPos + 1);
    
    cout << "\\nEmail: " << email << endl;
    cout << "Username: " << username << endl;
    cout << "Domain: " << domain << endl;
    
    return 0;
}`,
    output: `Most expensive: $899
Cheapest: $149

Email: john.doe@company.com
Username: john.doe
Domain: company.com`,
  },
  {
    id: "classes",
    title: "Classes & Objects",
    explanation: "A class is a user-defined data type that bundles data (attributes) and functions (methods) together. An object is an instance of a class — a concrete thing created from the blueprint.",
    analogy: "A class is like a cookie cutter (blueprint). An object is the actual cookie made with that cutter. The cookie cutter defines the shape (attributes like flavor, size) and what you can do with the cookie (methods like eat, decorate). You can make many cookies from one cutter.",
    code: `#include <iostream>
#include <string>
using namespace std;

class Dog {
private:
    string name;
    string breed;
    int age;

public:
    // Constructor
    Dog(string n, string b, int a) : name(n), breed(b), age(a) {}
    
    void bark() {
        cout << name << " says: Woof! Woof!" << endl;
    }
    
    void info() {
        cout << name << " | " << breed << " | " << age << " years" << endl;
    }
    
    int getAgeInHumanYears() {
        return age * 7;
    }
};

int main() {
    Dog dog1("Buddy", "Golden Retriever", 3);
    Dog dog2("Max", "German Shepherd", 5);
    
    dog1.info();
    dog1.bark();
    cout << "Human years: " << dog1.getAgeInHumanYears() << endl;
    
    cout << endl;
    dog2.info();
    dog2.bark();
    
    return 0;
}`,
    output: `Buddy | Golden Retriever | 3 years
Buddy says: Woof! Woof!
Human years: 21

Max | German Shepherd | 5 years
Max says: Woof! Woof!`,
  },
  {
    id: "constructors",
    title: "Constructors",
    explanation: "A constructor is a special method that runs automatically when you create an object. It initializes the object's attributes. The constructor has the same name as the class and no return type.",
    analogy: "A constructor is like a hospital registration desk for a newborn baby. The moment the baby is born (object is created), the desk fills in the birth certificate with name, weight, and date (initializes attributes). It happens automatically — you don't call it separately.",
    code: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
    string holder;
    string accountNumber;
    double balance;

public:
    // Default constructor
    BankAccount() : holder("Unknown"), accountNumber("000000"), balance(0.0) {
        cout << "Default account created." << endl;
    }
    
    // Parameterized constructor
    BankAccount(string h, string acc, double bal)
        : holder(h), accountNumber(acc), balance(bal) {
        cout << "Account created for " << holder << endl;
    }
    
    // Copy constructor
    BankAccount(const BankAccount& other)
        : holder(other.holder + " (Copy)"),
          accountNumber(other.accountNumber),
          balance(other.balance) {
        cout << "Account copied for " << holder << endl;
    }
    
    void display() {
        cout << holder << " | Acc#: " << accountNumber
             << " | Balance: $" << balance << endl;
    }
};

int main() {
    BankAccount acc1;                                  // Default
    BankAccount acc2("John Doe", "ACC-1001", 5000.0); // Parameterized
    BankAccount acc3 = acc2;                           // Copy
    
    cout << "\\n--- All Accounts ---" << endl;
    acc1.display();
    acc2.display();
    acc3.display();
    
    return 0;
}`,
    output: `Default account created.
Account created for John Doe
Account copied for John Doe (Copy)

--- All Accounts ---
Unknown | Acc#: 000000 | Balance: $0
John Doe | Acc#: ACC-1001 | Balance: $5000
John Doe (Copy) | Acc#: ACC-1001 | Balance: $5000`,
  },
  {
    id: "inheritance",
    title: "Inheritance",
    explanation: "Inheritance lets a class (child/derived) inherit attributes and methods from another class (parent/base). The child can add new features or override existing ones. It promotes code reuse.",
    analogy: "Inheritance is like a family tree. A child inherits eye color, height genes from parents (base class attributes). But the child can also develop their own unique skills (new methods). A 'SportsCar' inherits everything from 'Car' but adds turbo boost.",
    code: `#include <iostream>
#include <string>
using namespace std;

class Vehicle {
protected:
    string brand;
    int year;
    double speed;

public:
    Vehicle(string b, int y) : brand(b), year(y), speed(0) {}
    
    void accelerate(double amount) {
        speed += amount;
        cout << brand << " accelerates to " << speed << " km/h" << endl;
    }
    
    virtual void display() {
        cout << brand << " (" << year << ") — " << speed << " km/h" << endl;
    }
};

class Car : public Vehicle {
    int doors;
public:
    Car(string b, int y, int d) : Vehicle(b, y), doors(d) {}
    
    void display() override {
        Vehicle::display();
        cout << "  Type: Car, Doors: " << doors << endl;
    }
};

class Motorcycle : public Vehicle {
    bool hasSidecar;
public:
    Motorcycle(string b, int y, bool sc) : Vehicle(b, y), hasSidecar(sc) {}
    
    void display() override {
        Vehicle::display();
        cout << "  Type: Motorcycle, Sidecar: " << (hasSidecar ? "Yes" : "No") << endl;
    }
    
    void wheelie() {
        cout << brand << " does a wheelie!" << endl;
    }
};

int main() {
    Car car("Toyota Camry", 2023, 4);
    Motorcycle bike("Harley Davidson", 2022, false);
    
    car.accelerate(80);
    bike.accelerate(120);
    bike.wheelie();
    
    cout << "\\n--- Vehicle Info ---" << endl;
    car.display();
    bike.display();
    
    return 0;
}`,
    output: `Toyota Camry accelerates to 80 km/h
Harley Davidson accelerates to 120 km/h
Harley Davidson does a wheelie!

--- Vehicle Info ---
Toyota Camry (2023) — 80 km/h
  Type: Car, Doors: 4
Harley Davidson (2022) — 120 km/h
  Type: Motorcycle, Sidecar: No`,
  },
  {
    id: "polymorphism",
    title: "Polymorphism",
    explanation: "Polymorphism means 'many forms.' In C++, it lets you use a base class pointer/reference to call derived class methods. The correct method is determined at runtime (dynamic polymorphism) using virtual functions.",
    analogy: "Polymorphism is like a universal remote control. You press 'Play' — but what happens depends on the device. On a TV, it plays a show. On a music player, it plays a song. Same button (function call), different behavior (implementation).",
    code: `#include <iostream>
#include <string>
using namespace std;

class Payment {
protected:
    double amount;
public:
    Payment(double amt) : amount(amt) {}
    virtual void processPayment() = 0;  // Pure virtual
    virtual void printReceipt() {
        cout << "Amount: $" << amount << endl;
    }
    virtual ~Payment() {}
};

class CreditCard : public Payment {
    string cardNumber;
public:
    CreditCard(double amt, string card) : Payment(amt), cardNumber(card) {}
    void processPayment() override {
        cout << "Processing credit card ending in " 
             << cardNumber.substr(cardNumber.length() - 4) << endl;
    }
    void printReceipt() override {
        Payment::printReceipt();
        cout << "Paid via Credit Card" << endl;
    }
};

class Cash : public Payment {
    double givenAmount;
public:
    Cash(double amt, double given) : Payment(amt), givenAmount(given) {}
    void processPayment() override {
        cout << "Cash received: $" << givenAmount << endl;
        cout << "Change: $" << givenAmount - amount << endl;
    }
};

class UPI : public Payment {
    string upiId;
public:
    UPI(double amt, string id) : Payment(amt), upiId(id) {}
    void processPayment() override {
        cout << "UPI payment from " << upiId << " — Success!" << endl;
    }
};

int main() {
    Payment* payments[3];
    payments[0] = new CreditCard(150.00, "4532-1234-5678-9012");
    payments[1] = new Cash(75.50, 100.00);
    payments[2] = new UPI(200.00, "user@bank");
    
    for (int i = 0; i < 3; i++) {
        cout << "--- Payment " << i + 1 << " ---" << endl;
        payments[i]->processPayment();
        payments[i]->printReceipt();
        cout << endl;
        delete payments[i];
    }
    
    return 0;
}`,
    output: `--- Payment 1 ---
Processing credit card ending in 9012
Amount: $150
Paid via Credit Card

--- Payment 2 ---
Cash received: $100
Change: $24.5
Amount: $75.5

--- Payment 3 ---
UPI payment from user@bank — Success!
Amount: $200`,
  },
  {
    id: "file-handling",
    title: "File Handling",
    explanation: "File handling lets your program save data permanently (to disk) and read it back. C++ uses fstream library: ofstream to write, ifstream to read, and fstream for both.",
    analogy: "File handling is like using a diary. ofstream is your pen — you open the diary and write entries. ifstream is your eyes — you open the diary and read entries. You always close the diary when done. Without file handling, all your program's data disappears when it closes — like writing on a whiteboard that gets erased.",
    code: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

struct Contact {
    string name;
    string phone;
    string email;
};

void saveContacts(const vector<Contact>& contacts) {
    ofstream file("contacts.txt");
    for (const auto& c : contacts) {
        file << c.name << "|" << c.phone << "|" << c.email << endl;
    }
    file.close();
    cout << contacts.size() << " contacts saved." << endl;
}

vector<Contact> loadContacts() {
    vector<Contact> contacts;
    ifstream file("contacts.txt");
    string line;
    while (getline(file, line)) {
        Contact c;
        int p1 = line.find("|");
        int p2 = line.find("|", p1 + 1);
        c.name = line.substr(0, p1);
        c.phone = line.substr(p1 + 1, p2 - p1 - 1);
        c.email = line.substr(p2 + 1);
        contacts.push_back(c);
    }
    file.close();
    return contacts;
}

int main() {
    // Save
    vector<Contact> myContacts = {
        {"Alice Johnson", "+1-555-0101", "alice@email.com"},
        {"Bob Smith", "+1-555-0202", "bob@email.com"},
        {"Charlie Brown", "+1-555-0303", "charlie@email.com"}
    };
    saveContacts(myContacts);
    
    // Load and display
    vector<Contact> loaded = loadContacts();
    cout << "\\n--- Loaded Contacts ---" << endl;
    for (const auto& c : loaded) {
        cout << c.name << " | " << c.phone << " | " << c.email << endl;
    }
    
    return 0;
}`,
    output: `3 contacts saved.

--- Loaded Contacts ---
Alice Johnson | +1-555-0101 | alice@email.com
Bob Smith | +1-555-0202 | bob@email.com
Charlie Brown | +1-555-0303 | charlie@email.com`,
  },
];

const CoreConcepts = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Core Concepts Reference</h1>
          <p className="text-muted-foreground mt-2">
            Step-by-step explanations with real-world analogies and working code examples.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {concepts.map((concept) => (
            <AccordionItem key={concept.id} value={concept.id} className="border rounded-lg px-4">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {concept.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-6">
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">📖 Explanation</h4>
                  <p className="text-sm text-muted-foreground">{concept.explanation}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">🌍 Real-World Analogy</h4>
                  <p className="text-sm text-muted-foreground">{concept.analogy}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-1">💻 Code Example</h4>
                  <CodeBlock code={concept.code} title={`${concept.id}.cpp`} output={concept.output} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </CppLayout>
  );
};

export default CoreConcepts;
