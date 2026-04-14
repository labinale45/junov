import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    id: "student",
    title: "Student Management System",
    features: ["Add new student (name, roll, marks)", "View all students", "Search by roll number", "Update student marks", "Delete a student", "Save/load data from file"],
    classDesign: `Class: Student
├── Attributes: name (string), rollNumber (int), marks (double)
├── Constructor: Student(name, roll, marks)
├── Methods: display(), getMarks(), setMarks(), getRoll()
└── Friend: operator<< for easy printing

Class: StudentManager
├── Attributes: students (vector<Student>), filename (string)
├── Methods: addStudent(), viewAll(), searchByRoll()
├── Methods: updateMarks(), deleteStudent()
└── Methods: saveToFile(), loadFromFile()`,
    flowchart: `START
  │
  ▼
Load data from file
  │
  ▼
┌─────────────────┐
│   MAIN MENU     │
│ 1. Add Student  │
│ 2. View All     │
│ 3. Search       │
│ 4. Update Marks │
│ 5. Delete       │
│ 6. Exit         │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Choice? │──── 1 ──→ Get name, roll, marks → Add to vector → Save
    │         │──── 2 ──→ Loop through vector → Display each
    │         │──── 3 ──→ Get roll → Linear search → Display or "Not found"
    │         │──── 4 ──→ Search → If found → Get new marks → Update → Save
    │         │──── 5 ──→ Search → If found → Remove from vector → Save
    │         │──── 6 ──→ Save to file → EXIT
    └─────────┘`,
    code: `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

class Student {
    string name;
    int rollNumber;
    double marks;
public:
    Student() : name(""), rollNumber(0), marks(0) {}
    Student(string n, int r, double m) : name(n), rollNumber(r), marks(m) {}
    
    int getRoll() const { return rollNumber; }
    double getMarks() const { return marks; }
    void setMarks(double m) { marks = m; }
    
    void display() const {
        cout << "Roll: " << rollNumber 
             << " | Name: " << name 
             << " | Marks: " << marks << endl;
    }
    
    string toFileString() const {
        return name + "|" + to_string(rollNumber) + "|" + to_string(marks);
    }
    
    static Student fromFileString(const string& line) {
        int p1 = line.find("|");
        int p2 = line.find("|", p1 + 1);
        string n = line.substr(0, p1);
        int r = stoi(line.substr(p1 + 1, p2 - p1 - 1));
        double m = stod(line.substr(p2 + 1));
        return Student(n, r, m);
    }
};

class StudentManager {
    vector<Student> students;
    string filename;
    
public:
    StudentManager(string file) : filename(file) { loadFromFile(); }
    
    void addStudent() {
        string name;
        int roll;
        double marks;
        cout << "Enter name: ";
        cin.ignore();
        getline(cin, name);
        cout << "Enter roll number: ";
        cin >> roll;
        
        // Check duplicate
        for (const auto& s : students) {
            if (s.getRoll() == roll) {
                cout << "Roll number already exists!" << endl;
                return;
            }
        }
        
        cout << "Enter marks: ";
        cin >> marks;
        students.push_back(Student(name, roll, marks));
        saveToFile();
        cout << "Student added successfully!" << endl;
    }
    
    void viewAll() const {
        if (students.empty()) {
            cout << "No students found." << endl;
            return;
        }
        cout << "\\n--- All Students (" << students.size() << ") ---" << endl;
        for (const auto& s : students) s.display();
    }
    
    void searchByRoll() const {
        int roll;
        cout << "Enter roll number: ";
        cin >> roll;
        for (const auto& s : students) {
            if (s.getRoll() == roll) {
                cout << "\\nStudent found:" << endl;
                s.display();
                return;
            }
        }
        cout << "Student not found!" << endl;
    }
    
    void updateMarks() {
        int roll;
        double newMarks;
        cout << "Enter roll number: ";
        cin >> roll;
        for (auto& s : students) {
            if (s.getRoll() == roll) {
                cout << "Current marks: " << s.getMarks() << endl;
                cout << "Enter new marks: ";
                cin >> newMarks;
                s.setMarks(newMarks);
                saveToFile();
                cout << "Marks updated!" << endl;
                return;
            }
        }
        cout << "Student not found!" << endl;
    }
    
    void deleteStudent() {
        int roll;
        cout << "Enter roll number to delete: ";
        cin >> roll;
        for (int i = 0; i < students.size(); i++) {
            if (students[i].getRoll() == roll) {
                students[i].display();
                cout << "Confirm delete? (y/n): ";
                char ch;
                cin >> ch;
                if (ch == 'y' || ch == 'Y') {
                    students.erase(students.begin() + i);
                    saveToFile();
                    cout << "Student deleted!" << endl;
                }
                return;
            }
        }
        cout << "Student not found!" << endl;
    }
    
    void saveToFile() {
        ofstream file(filename);
        for (const auto& s : students) {
            file << s.toFileString() << endl;
        }
        file.close();
    }
    
    void loadFromFile() {
        ifstream file(filename);
        string line;
        students.clear();
        while (getline(file, line)) {
            if (!line.empty()) {
                students.push_back(Student::fromFileString(line));
            }
        }
        file.close();
    }
};

int main() {
    StudentManager manager("students.txt");
    int choice;
    
    do {
        cout << "\\n===== STUDENT MANAGEMENT SYSTEM =====" << endl;
        cout << "1. Add Student" << endl;
        cout << "2. View All Students" << endl;
        cout << "3. Search by Roll Number" << endl;
        cout << "4. Update Marks" << endl;
        cout << "5. Delete Student" << endl;
        cout << "6. Exit" << endl;
        cout << "Enter choice: ";
        cin >> choice;
        
        switch (choice) {
            case 1: manager.addStudent(); break;
            case 2: manager.viewAll(); break;
            case 3: manager.searchByRoll(); break;
            case 4: manager.updateMarks(); break;
            case 5: manager.deleteStudent(); break;
            case 6: cout << "Goodbye!" << endl; break;
            default: cout << "Invalid choice!" << endl;
        }
    } while (choice != 6);
    
    return 0;
}`,
  },
  {
    id: "bank",
    title: "Bank Account System",
    features: ["Create account (name, type, initial deposit)", "Deposit money", "Withdraw money (with balance check)", "Check balance", "View transaction history", "Save/load all data from file"],
    classDesign: `Class: Transaction
├── Attributes: type (string), amount (double), date (string)
└── Methods: display(), toFileString()

Class: BankAccount
├── Attributes: holder (string), accountNo (string), balance (double)
│              type (string), transactions (vector<Transaction>)
├── Constructor: BankAccount(holder, accountNo, type, initialDeposit)
├── Methods: deposit(), withdraw(), getBalance()
├── Methods: showTransactions(), display()
└── Methods: saveToFile(), loadFromFile()

Class: Bank
├── Attributes: accounts (vector<BankAccount>), filename (string)
├── Methods: createAccount(), findAccount()
├── Methods: depositToAccount(), withdrawFromAccount()
└── Methods: saveAll(), loadAll()`,
    flowchart: `START
  │
  ▼
Load accounts from file
  │
  ▼
┌──────────────────────┐
│     BANK MENU        │
│ 1. Create Account    │
│ 2. Deposit           │
│ 3. Withdraw          │
│ 4. Check Balance     │
│ 5. Transaction Hist. │
│ 6. Exit              │
└──────────┬───────────┘
           │
      ┌────▼────┐
      │ Choice? │──── 1 ──→ Get details → Generate acc# → Create → Save
      │         │──── 2 ──→ Enter acc# → Find → Enter amount → Update → Save
      │         │──── 3 ──→ Enter acc# → Find → Check balance → Deduct → Save
      │         │──── 4 ──→ Enter acc# → Find → Display balance
      │         │──── 5 ──→ Enter acc# → Find → Show all transactions
      │         │──── 6 ──→ Save all → EXIT
      └─────────┘`,
    code: `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <ctime>
using namespace std;

string getCurrentDate() {
    time_t now = time(0);
    char buf[11];
    strftime(buf, sizeof(buf), "%Y-%m-%d", localtime(&now));
    return string(buf);
}

class BankAccount {
    string holderName;
    string accountNumber;
    string accountType;
    double balance;
    vector<string> transactions;
    
public:
    BankAccount(string name, string accNo, string type, double initial)
        : holderName(name), accountNumber(accNo), accountType(type), balance(initial) {
        transactions.push_back(getCurrentDate() + " | OPENING DEPOSIT | +$" + to_string(initial));
    }
    
    string getAccountNo() const { return accountNumber; }
    
    void deposit(double amount) {
        if (amount <= 0) { cout << "Invalid amount!" << endl; return; }
        balance += amount;
        transactions.push_back(getCurrentDate() + " | DEPOSIT | +$" + to_string(amount));
        cout << "Deposited $" << amount << ". New balance: $" << balance << endl;
    }
    
    void withdraw(double amount) {
        if (amount <= 0) { cout << "Invalid amount!" << endl; return; }
        if (amount > balance) {
            cout << "Insufficient funds! Balance: $" << balance << endl;
            return;
        }
        balance -= amount;
        transactions.push_back(getCurrentDate() + " | WITHDRAWAL | -$" + to_string(amount));
        cout << "Withdrawn $" << amount << ". New balance: $" << balance << endl;
    }
    
    void showBalance() const {
        cout << "\\nAccount: " << accountNumber << endl;
        cout << "Holder: " << holderName << endl;
        cout << "Type: " << accountType << endl;
        cout << "Balance: $" << balance << endl;
    }
    
    void showTransactions() const {
        cout << "\\n--- Transaction History for " << accountNumber << " ---" << endl;
        for (const auto& t : transactions) {
            cout << t << endl;
        }
    }
    
    void display() const {
        cout << accountNumber << " | " << holderName << " | " 
             << accountType << " | $" << balance << endl;
    }
};

int main() {
    vector<BankAccount> accounts;
    int accCounter = 1001;
    int choice;
    
    do {
        cout << "\\n======= BANK SYSTEM =======" << endl;
        cout << "1. Create Account" << endl;
        cout << "2. Deposit" << endl;
        cout << "3. Withdraw" << endl;
        cout << "4. Check Balance" << endl;
        cout << "5. Transaction History" << endl;
        cout << "6. View All Accounts" << endl;
        cout << "7. Exit" << endl;
        cout << "Choice: ";
        cin >> choice;
        
        if (choice == 1) {
            string name, type;
            double initial;
            cout << "Enter name: ";
            cin.ignore();
            getline(cin, name);
            cout << "Account type (Savings/Current): ";
            cin >> type;
            cout << "Initial deposit: $";
            cin >> initial;
            string accNo = "ACC-" + to_string(accCounter++);
            accounts.push_back(BankAccount(name, accNo, type, initial));
            cout << "Account created! Number: " << accNo << endl;
        }
        else if (choice >= 2 && choice <= 5) {
            string accNo;
            cout << "Enter account number: ";
            cin >> accNo;
            bool found = false;
            for (auto& acc : accounts) {
                if (acc.getAccountNo() == accNo) {
                    found = true;
                    if (choice == 2) {
                        double amt;
                        cout << "Amount to deposit: $";
                        cin >> amt;
                        acc.deposit(amt);
                    }
                    else if (choice == 3) {
                        double amt;
                        cout << "Amount to withdraw: $";
                        cin >> amt;
                        acc.withdraw(amt);
                    }
                    else if (choice == 4) acc.showBalance();
                    else if (choice == 5) acc.showTransactions();
                    break;
                }
            }
            if (!found) cout << "Account not found!" << endl;
        }
        else if (choice == 6) {
            cout << "\\n--- All Accounts ---" << endl;
            for (const auto& acc : accounts) acc.display();
        }
    } while (choice != 7);
    
    cout << "Thank you for banking with us!" << endl;
    return 0;
}`,
  },
  {
    id: "library",
    title: "Library Management System",
    features: ["Add new book (title, author, ISBN)", "View all books", "Search by title or author", "Issue book to member", "Return book", "View issued books", "Save/load from file"],
    classDesign: `Class: Book
├── Attributes: title, author, isbn, isIssued, issuedTo, issueDate
├── Methods: display(), issue(), returnBook()
└── Methods: toFileString(), fromFileString()

Class: Library
├── Attributes: books (vector<Book>), filename (string)
├── Methods: addBook(), viewAll(), searchBook()
├── Methods: issueBook(), returnBook(), viewIssued()
└── Methods: saveToFile(), loadFromFile()`,
    flowchart: `START
  │
  ▼
Load books from file
  │
  ▼
┌───────────────────┐
│   LIBRARY MENU    │
│ 1. Add Book       │
│ 2. View All       │
│ 3. Search         │
│ 4. Issue Book     │
│ 5. Return Book    │
│ 6. View Issued    │
│ 7. Exit           │
└────────┬──────────┘
         │
    ┌────▼────┐
    │ Choice? │──── 1 ──→ Get details → Add to vector → Save
    │         │──── 2 ──→ Display all books with status
    │         │──── 3 ──→ Get keyword → Search title & author → Display matches
    │         │──── 4 ──→ Find book → If available → Set issued → Save
    │         │──── 5 ──→ Find book → If issued → Set available → Save
    │         │──── 6 ──→ Filter issued books → Display
    │         │──── 7 ──→ Save → EXIT
    └─────────┘`,
    code: `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Book {
    string title;
    string author;
    string isbn;
    bool isIssued;
    string issuedTo;

public:
    Book(string t, string a, string i)
        : title(t), author(a), isbn(i), isIssued(false), issuedTo("") {}
    
    string getISBN() const { return isbn; }
    bool getIssued() const { return isIssued; }
    
    void display() const {
        cout << isbn << " | " << title << " | " << author 
             << " | " << (isIssued ? "ISSUED to " + issuedTo : "AVAILABLE") << endl;
    }
    
    bool matchesSearch(const string& keyword) const {
        string lowerTitle = title, lowerAuthor = author, lowerKey = keyword;
        transform(lowerTitle.begin(), lowerTitle.end(), lowerTitle.begin(), ::tolower);
        transform(lowerAuthor.begin(), lowerAuthor.end(), lowerAuthor.begin(), ::tolower);
        transform(lowerKey.begin(), lowerKey.end(), lowerKey.begin(), ::tolower);
        return lowerTitle.find(lowerKey) != string::npos || 
               lowerAuthor.find(lowerKey) != string::npos;
    }
    
    void issue(const string& memberName) {
        if (isIssued) {
            cout << "Book already issued to " << issuedTo << endl;
            return;
        }
        isIssued = true;
        issuedTo = memberName;
        cout << "\\\"" << title << "\\\" issued to " << memberName << endl;
    }
    
    void returnBook() {
        if (!isIssued) {
            cout << "Book is not issued." << endl;
            return;
        }
        cout << "\\\"" << title << "\\\" returned by " << issuedTo << endl;
        isIssued = false;
        issuedTo = "";
    }
    
    string toFileString() const {
        return title + "|" + author + "|" + isbn + "|" + 
               (isIssued ? "1" : "0") + "|" + issuedTo;
    }
};

class Library {
    vector<Book> books;
    string filename;
    
public:
    Library(string file) : filename(file) {}
    
    void addBook() {
        string title, author, isbn;
        cout << "Enter title: ";
        cin.ignore();
        getline(cin, title);
        cout << "Enter author: ";
        getline(cin, author);
        cout << "Enter ISBN: ";
        cin >> isbn;
        books.push_back(Book(title, author, isbn));
        saveToFile();
        cout << "Book added!" << endl;
    }
    
    void viewAll() const {
        if (books.empty()) { cout << "No books." << endl; return; }
        cout << "\\n--- Library Catalog (" << books.size() << " books) ---" << endl;
        for (const auto& b : books) b.display();
    }
    
    void search() const {
        string keyword;
        cout << "Search keyword: ";
        cin.ignore();
        getline(cin, keyword);
        cout << "\\n--- Search Results ---" << endl;
        bool found = false;
        for (const auto& b : books) {
            if (b.matchesSearch(keyword)) {
                b.display();
                found = true;
            }
        }
        if (!found) cout << "No matches found." << endl;
    }
    
    void issueBook() {
        string isbn, member;
        cout << "Enter ISBN: ";
        cin >> isbn;
        for (auto& b : books) {
            if (b.getISBN() == isbn) {
                cout << "Member name: ";
                cin.ignore();
                getline(cin, member);
                b.issue(member);
                saveToFile();
                return;
            }
        }
        cout << "Book not found!" << endl;
    }
    
    void returnBook() {
        string isbn;
        cout << "Enter ISBN: ";
        cin >> isbn;
        for (auto& b : books) {
            if (b.getISBN() == isbn) {
                b.returnBook();
                saveToFile();
                return;
            }
        }
        cout << "Book not found!" << endl;
    }
    
    void viewIssued() const {
        cout << "\\n--- Issued Books ---" << endl;
        bool found = false;
        for (const auto& b : books) {
            if (b.getIssued()) { b.display(); found = true; }
        }
        if (!found) cout << "No books currently issued." << endl;
    }
    
    void saveToFile() {
        ofstream file(filename);
        for (const auto& b : books) file << b.toFileString() << endl;
        file.close();
    }
};

int main() {
    Library lib("library.txt");
    int choice;
    
    do {
        cout << "\\n====== LIBRARY SYSTEM ======" << endl;
        cout << "1. Add Book" << endl;
        cout << "2. View All Books" << endl;
        cout << "3. Search" << endl;
        cout << "4. Issue Book" << endl;
        cout << "5. Return Book" << endl;
        cout << "6. View Issued Books" << endl;
        cout << "7. Exit" << endl;
        cout << "Choice: ";
        cin >> choice;
        
        switch (choice) {
            case 1: lib.addBook(); break;
            case 2: lib.viewAll(); break;
            case 3: lib.search(); break;
            case 4: lib.issueBook(); break;
            case 5: lib.returnBook(); break;
            case 6: lib.viewIssued(); break;
            case 7: cout << "Goodbye!" << endl; break;
            default: cout << "Invalid!" << endl;
        }
    } while (choice != 7);
    
    return 0;
}`,
  },
];

const DemoProjects = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Demo Projects (Guided)</h1>
          <p className="text-muted-foreground mt-2">
            Step-by-step guided projects with features list, class design, flowcharts, and full working code.
          </p>
        </div>

        <Tabs defaultValue="student">
          <TabsList className="flex-wrap h-auto">
            {projects.map((p) => (
              <TabsTrigger key={p.id} value={p.id}>{p.title}</TabsTrigger>
            ))}
          </TabsList>

          {projects.map((project) => (
            <TabsContent key={project.id} value={project.id} className="space-y-6 mt-4">
              <h2 className="text-2xl font-bold">{project.title}</h2>

              <Card>
                <CardHeader><CardTitle className="text-base">📋 Features</CardTitle></CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {project.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">🏗️ Class Design</CardTitle></CardHeader>
                <CardContent>
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre overflow-x-auto">{project.classDesign}</pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-base">📊 Flowchart</CardTitle></CardHeader>
                <CardContent>
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre overflow-x-auto">{project.flowchart}</pre>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold mb-2">💻 Full Implementation</h3>
                <CodeBlock code={project.code} title={`${project.id}_system.cpp`} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </CppLayout>
  );
};

export default DemoProjects;
