import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BestPractices = () => {
  return (
    <CppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Best Practices</h1>
          <p className="text-muted-foreground mt-2">
            Write clean, maintainable, and bug-free C++ code.
          </p>
        </div>

        <Card>
          <CardHeader><CardTitle>🧹 Clean Code Rules</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {[
                { rule: "One function, one job", desc: "Each function should do exactly one thing. If you can't describe it without 'and', split it." },
                { rule: "Keep functions short", desc: "Aim for 20-30 lines max. If a function is longer, break it into helper functions." },
                { rule: "Use const wherever possible", desc: "Mark variables, parameters, and methods as const when they shouldn't change." },
                { rule: "Initialize all variables", desc: "Never rely on default values. Always give variables an explicit initial value." },
                { rule: "Avoid magic numbers", desc: "Replace hardcoded numbers with named constants: const int MAX_STUDENTS = 100;" },
                { rule: "RAII — Resource Acquisition Is Initialization", desc: "Acquire resources in constructors, release in destructors. Use smart pointers." },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-md bg-muted">
                  <p className="font-semibold text-sm text-foreground">{item.rule}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock
              title="clean_code_example.cpp"
              code={`// ❌ BAD — Magic numbers, unclear names, too much in one function
void f(int a[], int n) {
    for(int i=0; i<n; i++)
        if(a[i] > 100) a[i] = 100;
    int s = 0;
    for(int i=0; i<n; i++) s += a[i];
    cout << s/n;
}

// ✅ GOOD — Named constants, clear names, single responsibility
const int MAX_SCORE = 100;

void capScores(int scores[], int count) {
    for (int i = 0; i < count; i++) {
        if (scores[i] > MAX_SCORE) {
            scores[i] = MAX_SCORE;
        }
    }
}

double calculateAverage(const int scores[], int count) {
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += scores[i];
    }
    return static_cast<double>(total) / count;
}

void displayClassAverage(int scores[], int count) {
    capScores(scores, count);
    double avg = calculateAverage(scores, count);
    cout << "Class average: " << avg << endl;
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>📛 Naming Conventions</CardTitle></CardHeader>
          <CardContent>
            <CodeBlock
              title="naming_conventions.cpp"
              code={`// Variables — camelCase
int studentCount = 0;
double averageScore = 85.5;
string firstName = "Alice";

// Constants — UPPER_SNAKE_CASE
const int MAX_RETRIES = 3;
const double TAX_RATE = 0.08;

// Functions — camelCase (verb-first)
void calculateTotal();
bool isValidEmail(string email);
int findMaxValue(int arr[], int size);

// Classes — PascalCase
class StudentManager { };
class BankAccount { };

// Private members — with underscore or m_ prefix
class Employee {
    string m_name;       // m_ prefix style
    double salary_;      // trailing underscore style
};

// Enums — PascalCase type, UPPER values
enum class Color { RED, GREEN, BLUE };
enum class Status { ACTIVE, INACTIVE, PENDING };

// File names — snake_case
// student_manager.cpp
// bank_account.h`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>🔧 Debugging Techniques</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {[
                { technique: "1. Print Debugging", desc: "Add cout statements to trace variable values and execution flow. Remove them after fixing." },
                { technique: "2. Rubber Duck Debugging", desc: "Explain your code line by line to an imaginary listener. The act of explaining often reveals the bug." },
                { technique: "3. Binary Search Debugging", desc: "Comment out half your code. If the bug disappears, it's in the commented half. Repeat." },
                { technique: "4. Read the Error Message", desc: "Compiler errors tell you the file, line, and what's wrong. Read from the first error — later errors are often cascading." },
                { technique: "5. Check Edge Cases", desc: "Test with: empty input, one element, very large values, negative numbers, and boundary values." },
                { technique: "6. Use a Debugger", desc: "Learn GDB or your IDE's debugger. Set breakpoints, step through code, and inspect variables at runtime." },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-md bg-muted">
                  <p className="font-semibold text-sm text-foreground">{item.technique}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <CodeBlock
              title="debugging_example.cpp"
              code={`// Using print debugging to trace a sorting bug
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        cout << "[DEBUG] Pass " << i + 1 << endl;  // Track passes
        
        for (int j = 0; j < n - i - 1; j++) {
            cout << "  Comparing arr[" << j << "]=" << arr[j]
                 << " with arr[" << j+1 << "]=" << arr[j+1] << endl;
            
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                cout << "  → Swapped!" << endl;
            }
        }
        
        // Print array state after each pass
        cout << "  Array: ";
        for (int k = 0; k < n; k++) cout << arr[k] << " ";
        cout << endl;
    }
}`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>⚠️ Common Mistakes</CardTitle></CardHeader>
          <CardContent>
            <CodeBlock
              title="common_mistakes.cpp"
              code={`// ❌ MISTAKE 1: Using = instead of == in conditions
if (x = 5) { }    // WRONG — assigns 5 to x (always true)
if (x == 5) { }   // CORRECT — compares x to 5

// ❌ MISTAKE 2: Off-by-one errors in loops
int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i <= 5; i++) { }  // WRONG — accesses arr[5] (out of bounds!)
for (int i = 0; i < 5; i++) { }   // CORRECT — stops at arr[4]

// ❌ MISTAKE 3: Forgetting to close files
ofstream file("data.txt");
file << "Hello";
// WRONG — file not closed, data may not be written!
file.close();  // CORRECT — always close your files

// ❌ MISTAKE 4: Integer division when you want decimal
int a = 7, b = 2;
double result = a / b;          // WRONG — result is 3.0 (integer division)
double result = (double)a / b;  // CORRECT — result is 3.5

// ❌ MISTAKE 5: Memory leaks with new/delete
int* p = new int(42);
p = new int(100);    // WRONG — lost pointer to first allocation!
delete p;            // Only deletes the second one

// ❌ MISTAKE 6: Forgetting break in switch
switch (x) {
    case 1: cout << "One";    // WRONG — falls through to case 2!
    case 2: cout << "Two";
}
switch (x) {
    case 1: cout << "One"; break;  // CORRECT
    case 2: cout << "Two"; break;
}

// ❌ MISTAKE 7: Dangling else
if (a > 0)
    if (b > 0)
        cout << "Both positive";
else                  // This else belongs to inner if, not outer!
    cout << "a is not positive";  // MISLEADING
// CORRECT: Always use braces
if (a > 0) {
    if (b > 0) {
        cout << "Both positive";
    }
} else {
    cout << "a is not positive";
}`}
            />
          </CardContent>
        </Card>
      </div>
    </CppLayout>
  );
};

export default BestPractices;
