import CppLayout from "@/components/course/CppLayout";
import CodeBlock from "@/components/course/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const homestayCode = `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

// ========== ROOM CLASS ==========
class Room {
    int roomNo;
    string type; // Single, Double, Suite
    double pricePerNight;
    bool isBooked;
    string guestName;
    int nights;
public:
    Room(int no, string t, double price)
        : roomNo(no), type(t), pricePerNight(price), isBooked(false), guestName(""), nights(0) {}
    
    int getRoomNo() const { return roomNo; }
    bool getBooked() const { return isBooked; }
    double getTotal() const { return pricePerNight * nights; }
    string getGuest() const { return guestName; }
    
    void book(string guest, int n) {
        isBooked = true;
        guestName = guest;
        nights = n;
        cout << "Room " << roomNo << " (" << type << ") booked for " 
             << guest << " — " << n << " nights" << endl;
    }
    
    void checkout() {
        cout << "Room " << roomNo << " checked out. Total: $" << fixed << setprecision(2) << getTotal() << endl;
        isBooked = false;
        guestName = "";
        nights = 0;
    }
    
    void display() const {
        cout << "Room " << roomNo << " | " << type << " | $" << pricePerNight << "/night | "
             << (isBooked ? "BOOKED (" + guestName + ", " + to_string(nights) + " nights)" : "AVAILABLE") << endl;
    }
};

// ========== HALL CLASS ==========
class Hall {
    string name;
    int capacity;
    double pricePerHour;
    bool isBooked;
    string bookedBy;
    int hours;
public:
    Hall(string n, int cap, double price)
        : name(n), capacity(cap), pricePerHour(price), isBooked(false), bookedBy(""), hours(0) {}
    
    string getName() const { return name; }
    bool getBooked() const { return isBooked; }
    double getTotal() const { return pricePerHour * hours; }
    
    void book(string client, int h) {
        isBooked = true;
        bookedBy = client;
        hours = h;
        cout << name << " booked for " << client << " — " << h << " hours" << endl;
    }
    
    void release() {
        cout << name << " released. Total: $" << fixed << setprecision(2) << getTotal() << endl;
        isBooked = false;
        bookedBy = "";
        hours = 0;
    }
    
    void display() const {
        cout << name << " | Capacity: " << capacity << " | $" << pricePerHour << "/hr | "
             << (isBooked ? "BOOKED (" + bookedBy + ")" : "AVAILABLE") << endl;
    }
};

// ========== FOOD ORDER ==========
struct FoodItem {
    string name;
    double price;
};

class FoodOrder {
    string guestName;
    vector<pair<FoodItem, int>> items; // item, quantity
public:
    FoodOrder(string guest) : guestName(guest) {}
    
    void addItem(FoodItem item, int qty) {
        items.push_back({item, qty});
    }
    
    double getTotal() const {
        double total = 0;
        for (const auto& p : items) total += p.first.price * p.second;
        return total;
    }
    
    void display() const {
        cout << "\\nFood Order for " << guestName << ":" << endl;
        for (const auto& p : items) {
            cout << "  " << p.first.name << " x" << p.second 
                 << " = $" << fixed << setprecision(2) << p.first.price * p.second << endl;
        }
        cout << "  TOTAL: $" << fixed << setprecision(2) << getTotal() << endl;
    }
};

// ========== HOMESTAY SYSTEM ==========
class HomestaySystem {
    vector<Room> rooms;
    vector<Hall> halls;
    vector<FoodOrder> foodOrders;
    
    vector<FoodItem> menu = {
        {"Continental Breakfast", 15.00},
        {"Full English Breakfast", 22.00},
        {"Lunch Buffet", 35.00},
        {"Dinner Set Menu", 45.00},
        {"Snack Platter", 18.00},
        {"Coffee & Tea", 5.00}
    };

public:
    HomestaySystem() {
        // Initialize rooms
        rooms.push_back(Room(101, "Single", 80.00));
        rooms.push_back(Room(102, "Single", 80.00));
        rooms.push_back(Room(201, "Double", 120.00));
        rooms.push_back(Room(202, "Double", 120.00));
        rooms.push_back(Room(301, "Suite", 200.00));
        
        // Initialize halls
        halls.push_back(Hall("Grand Ballroom", 200, 150.00));
        halls.push_back(Hall("Conference Room A", 50, 75.00));
        halls.push_back(Hall("Meeting Room B", 20, 40.00));
    }
    
    void bookRoom() {
        cout << "\\n--- Available Rooms ---" << endl;
        bool hasAvailable = false;
        for (const auto& r : rooms) {
            if (!r.getBooked()) { r.display(); hasAvailable = true; }
        }
        if (!hasAvailable) { cout << "No rooms available!" << endl; return; }
        
        int roomNo, nights;
        string guest;
        cout << "Enter room number: ";
        cin >> roomNo;
        cout << "Guest name: ";
        cin.ignore(); getline(cin, guest);
        cout << "Number of nights: ";
        cin >> nights;
        
        for (auto& r : rooms) {
            if (r.getRoomNo() == roomNo && !r.getBooked()) {
                r.book(guest, nights);
                return;
            }
        }
        cout << "Room not available!" << endl;
    }
    
    void bookHall() {
        cout << "\\n--- Available Halls ---" << endl;
        for (const auto& h : halls) {
            if (!h.getBooked()) h.display();
        }
        
        string hallName, client;
        int hours;
        cout << "Enter hall name: ";
        cin.ignore(); getline(cin, hallName);
        cout << "Client name: ";
        getline(cin, client);
        cout << "Hours: ";
        cin >> hours;
        
        for (auto& h : halls) {
            if (h.getName() == hallName && !h.getBooked()) {
                h.book(client, hours);
                return;
            }
        }
        cout << "Hall not available!" << endl;
    }
    
    void orderFood() {
        string guest;
        cout << "Guest name: ";
        cin.ignore(); getline(cin, guest);
        
        FoodOrder order(guest);
        
        cout << "\\n--- MENU ---" << endl;
        for (int i = 0; i < menu.size(); i++) {
            cout << i + 1 << ". " << menu[i].name << " — $" << menu[i].price << endl;
        }
        
        int itemChoice;
        do {
            cout << "Select item (0 to finish): ";
            cin >> itemChoice;
            if (itemChoice >= 1 && itemChoice <= (int)menu.size()) {
                int qty;
                cout << "Quantity: ";
                cin >> qty;
                order.addItem(menu[itemChoice - 1], qty);
            }
        } while (itemChoice != 0);
        
        foodOrders.push_back(order);
        order.display();
    }
    
    void viewRecords() {
        cout << "\\n========== HOMESTAY RECORDS ==========" << endl;
        cout << "\\n--- ROOMS ---" << endl;
        for (const auto& r : rooms) r.display();
        cout << "\\n--- HALLS ---" << endl;
        for (const auto& h : halls) h.display();
        cout << "\\n--- FOOD ORDERS: " << foodOrders.size() << " ---" << endl;
        for (const auto& f : foodOrders) f.display();
    }
    
    void generateBill() {
        string guest;
        cout << "Guest name for billing: ";
        cin.ignore(); getline(cin, guest);
        
        double total = 0;
        cout << "\\n============ BILL ============" << endl;
        cout << "Guest: " << guest << endl;
        cout << "------------------------------" << endl;
        
        for (auto& r : rooms) {
            if (r.getBooked() && r.getGuest() == guest) {
                cout << "Room " << r.getRoomNo() << ": $" << fixed << setprecision(2) << r.getTotal() << endl;
                total += r.getTotal();
            }
        }
        
        for (const auto& f : foodOrders) {
            total += f.getTotal();
        }
        
        cout << "------------------------------" << endl;
        cout << "Subtotal: $" << fixed << setprecision(2) << total << endl;
        double tax = total * 0.10;
        cout << "Tax (10%): $" << fixed << setprecision(2) << tax << endl;
        cout << "TOTAL: $" << fixed << setprecision(2) << total + tax << endl;
        cout << "==============================" << endl;
    }
    
    void run() {
        int choice;
        do {
            cout << "\\n===== HOMESTAY MANAGEMENT SYSTEM =====" << endl;
            cout << "1. Book Room" << endl;
            cout << "2. Book Hall" << endl;
            cout << "3. Order Food" << endl;
            cout << "4. View All Records" << endl;
            cout << "5. Generate Bill" << endl;
            cout << "6. Exit" << endl;
            cout << "Choice: ";
            cin >> choice;
            
            switch (choice) {
                case 1: bookRoom(); break;
                case 2: bookHall(); break;
                case 3: orderFood(); break;
                case 4: viewRecords(); break;
                case 5: generateBill(); break;
                case 6: cout << "Thank you! Goodbye." << endl; break;
                default: cout << "Invalid choice!" << endl;
            }
        } while (choice != 6);
    }
};

int main() {
    HomestaySystem system;
    system.run();
    return 0;
}`;

const businessCode = `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <iomanip>
#include <map>
using namespace std;

// ========== CUSTOMER ==========
class Customer {
    int id;
    string name;
    string phone;
    string email;
public:
    Customer(int i, string n, string p, string e)
        : id(i), name(n), phone(p), email(e) {}
    
    int getId() const { return id; }
    string getName() const { return name; }
    
    void display() const {
        cout << "ID: " << id << " | " << name << " | " << phone << " | " << email << endl;
    }
    
    string toFile() const {
        return to_string(id) + "|" + name + "|" + phone + "|" + email;
    }
};

// ========== SERVICE/INVENTORY ==========
class Service {
    int code;
    string name;
    double price;
    int stock; // -1 for unlimited (services), >= 0 for products
public:
    Service(int c, string n, double p, int s = -1)
        : code(c), name(n), price(p), stock(s) {}
    
    int getCode() const { return code; }
    string getName() const { return name; }
    double getPrice() const { return price; }
    int getStock() const { return stock; }
    
    bool isAvailable(int qty = 1) const {
        return stock == -1 || stock >= qty;
    }
    
    void reduceStock(int qty) {
        if (stock >= 0) stock -= qty;
    }
    
    void addStock(int qty) {
        if (stock >= 0) stock += qty;
    }
    
    void display() const {
        cout << code << " | " << name << " | $" << fixed << setprecision(2) << price;
        if (stock >= 0) cout << " | Stock: " << stock;
        else cout << " | Service";
        cout << endl;
    }
};

// ========== BOOKING ==========
class Booking {
    int bookingId;
    int customerId;
    string customerName;
    vector<pair<Service, int>> items; // service, quantity
    string date;
    bool isPaid;
public:
    Booking(int bId, int cId, string cName, string d)
        : bookingId(bId), customerId(cId), customerName(cName), date(d), isPaid(false) {}
    
    void addItem(Service s, int qty) {
        items.push_back({s, qty});
    }
    
    double getTotal() const {
        double total = 0;
        for (const auto& p : items) total += p.first.getPrice() * p.second;
        return total;
    }
    
    void markPaid() { isPaid = true; }
    bool getPaid() const { return isPaid; }
    int getBookingId() const { return bookingId; }
    string getCustomerName() const { return customerName; }
    
    void display() const {
        cout << "\\nBooking #" << bookingId << " | Customer: " << customerName
             << " | Date: " << date << " | " << (isPaid ? "PAID" : "UNPAID") << endl;
        for (const auto& p : items) {
            cout << "  " << p.first.getName() << " x" << p.second 
                 << " = $" << fixed << setprecision(2) << p.first.getPrice() * p.second << endl;
        }
        cout << "  TOTAL: $" << fixed << setprecision(2) << getTotal() << endl;
    }
    
    void printBill() const {
        cout << "\\n============================================" << endl;
        cout << "         BUSINESS MANAGEMENT SYSTEM" << endl;
        cout << "              INVOICE #" << bookingId << endl;
        cout << "============================================" << endl;
        cout << "Customer: " << customerName << endl;
        cout << "Date: " << date << endl;
        cout << "--------------------------------------------" << endl;
        cout << left << setw(25) << "Item" << setw(5) << "Qty" << setw(12) << "Price" << "Subtotal" << endl;
        cout << "--------------------------------------------" << endl;
        
        for (const auto& p : items) {
            cout << left << setw(25) << p.first.getName() 
                 << setw(5) << p.second
                 << "$" << setw(11) << fixed << setprecision(2) << p.first.getPrice()
                 << "$" << p.first.getPrice() * p.second << endl;
        }
        
        double subtotal = getTotal();
        double tax = subtotal * 0.08;
        cout << "--------------------------------------------" << endl;
        cout << right << setw(43) << "Subtotal: $" << fixed << setprecision(2) << subtotal << endl;
        cout << right << setw(43) << "Tax (8%): $" << tax << endl;
        cout << right << setw(43) << "TOTAL: $" << subtotal + tax << endl;
        cout << "============================================" << endl;
    }
};

// ========== BUSINESS SYSTEM ==========
class BusinessSystem {
    vector<Customer> customers;
    vector<Service> services;
    vector<Booking> bookings;
    int nextCustId = 1001;
    int nextBookingId = 5001;
    
public:
    BusinessSystem() {
        // Seed services
        services.push_back(Service(1, "Consultation (1 hr)", 100.00));
        services.push_back(Service(2, "Premium Package", 500.00));
        services.push_back(Service(3, "Basic Package", 250.00));
        services.push_back(Service(4, "Product A - Widget", 29.99, 100));
        services.push_back(Service(5, "Product B - Gadget", 49.99, 50));
        services.push_back(Service(6, "Product C - Tool Kit", 79.99, 30));
    }
    
    void addCustomer() {
        string name, phone, email;
        cout << "Name: "; cin.ignore(); getline(cin, name);
        cout << "Phone: "; cin >> phone;
        cout << "Email: "; cin >> email;
        customers.push_back(Customer(nextCustId, name, phone, email));
        cout << "Customer added! ID: " << nextCustId++ << endl;
    }
    
    void viewCustomers() const {
        cout << "\\n--- Customers (" << customers.size() << ") ---" << endl;
        for (const auto& c : customers) c.display();
    }
    
    void viewInventory() const {
        cout << "\\n--- Services & Inventory ---" << endl;
        for (const auto& s : services) s.display();
    }
    
    void createBooking() {
        if (customers.empty()) {
            cout << "Add a customer first!" << endl;
            return;
        }
        
        int custId;
        cout << "Customer ID: "; cin >> custId;
        
        Customer* cust = nullptr;
        for (auto& c : customers) {
            if (c.getId() == custId) { cust = &c; break; }
        }
        if (!cust) { cout << "Customer not found!" << endl; return; }
        
        string date;
        cout << "Date (YYYY-MM-DD): "; cin >> date;
        
        Booking booking(nextBookingId++, custId, cust->getName(), date);
        
        viewInventory();
        int serviceCode;
        do {
            cout << "Add service/product code (0 to finish): ";
            cin >> serviceCode;
            if (serviceCode != 0) {
                for (auto& s : services) {
                    if (s.getCode() == serviceCode) {
                        int qty;
                        cout << "Quantity: "; cin >> qty;
                        if (s.isAvailable(qty)) {
                            booking.addItem(s, qty);
                            s.reduceStock(qty);
                            cout << "Added: " << s.getName() << " x" << qty << endl;
                        } else {
                            cout << "Not enough stock!" << endl;
                        }
                        break;
                    }
                }
            }
        } while (serviceCode != 0);
        
        bookings.push_back(booking);
        cout << "Booking #" << booking.getBookingId() << " created!" << endl;
        booking.printBill();
    }
    
    void viewBookings() const {
        cout << "\\n--- All Bookings (" << bookings.size() << ") ---" << endl;
        for (const auto& b : bookings) b.display();
    }
    
    void generateReport() const {
        cout << "\\n============ BUSINESS REPORT ============" << endl;
        cout << "Total Customers: " << customers.size() << endl;
        cout << "Total Bookings: " << bookings.size() << endl;
        
        double totalRevenue = 0, paidRevenue = 0, unpaidRevenue = 0;
        for (const auto& b : bookings) {
            double t = b.getTotal();
            totalRevenue += t;
            if (b.getPaid()) paidRevenue += t;
            else unpaidRevenue += t;
        }
        
        cout << fixed << setprecision(2);
        cout << "Total Revenue: $" << totalRevenue << endl;
        cout << "Paid: $" << paidRevenue << endl;
        cout << "Unpaid: $" << unpaidRevenue << endl;
        
        cout << "\\n--- Inventory Status ---" << endl;
        for (const auto& s : services) {
            if (s.getStock() >= 0) {
                cout << s.getName() << ": " << s.getStock() << " remaining" << endl;
            }
        }
        cout << "=========================================" << endl;
    }
    
    void run() {
        int choice;
        do {
            cout << "\\n===== BUSINESS MANAGEMENT SYSTEM =====" << endl;
            cout << "1. Add Customer" << endl;
            cout << "2. View Customers" << endl;
            cout << "3. View Inventory/Services" << endl;
            cout << "4. Create Booking" << endl;
            cout << "5. View Bookings" << endl;
            cout << "6. Generate Report" << endl;
            cout << "7. Exit" << endl;
            cout << "Choice: ";
            cin >> choice;
            
            switch (choice) {
                case 1: addCustomer(); break;
                case 2: viewCustomers(); break;
                case 3: viewInventory(); break;
                case 4: createBooking(); break;
                case 5: viewBookings(); break;
                case 6: generateReport(); break;
                case 7: cout << "Goodbye!" << endl; break;
                default: cout << "Invalid!" << endl;
            }
        } while (choice != 7);
    }
};

int main() {
    BusinessSystem system;
    system.run();
    return 0;
}`;

const RealWorldProjects = () => {
  return (
    <CppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Real-World Projects</h1>
          <p className="text-muted-foreground mt-2">
            Complete, production-style systems with full design documentation and implementation.
          </p>
        </div>

        <Tabs defaultValue="homestay">
          <TabsList>
            <TabsTrigger value="homestay">Homestay Management</TabsTrigger>
            <TabsTrigger value="business">Business Management</TabsTrigger>
          </TabsList>

          <TabsContent value="homestay" className="space-y-6 mt-4">
            <h2 className="text-2xl font-bold">Homestay Management System</h2>

            <Card>
              <CardHeader><CardTitle className="text-base">📋 Features</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Room booking (Single, Double, Suite) with guest details and night count</p>
                <p>• Hall booking (Ballroom, Conference, Meeting) with hourly pricing</p>
                <p>• Food ordering from a preset menu (breakfast, lunch items)</p>
                <p>• Customer records — view all rooms, halls, and orders</p>
                <p>• Automated billing with tax calculation (10%)</p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible>
              <AccordionItem value="design">
                <AccordionTrigger>🏗️ System Design & Class Diagram</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre overflow-x-auto">{`HomestaySystem
├── Room (roomNo, type, price, isBooked, guestName, nights)
│   ├── book(guest, nights)
│   ├── checkout()
│   └── display()
├── Hall (name, capacity, pricePerHour, isBooked, bookedBy, hours)
│   ├── book(client, hours)
│   ├── release()
│   └── display()
├── FoodItem (name, price)
├── FoodOrder (guestName, items[])
│   ├── addItem()
│   ├── getTotal()
│   └── display()
└── HomestaySystem
    ├── rooms[], halls[], foodOrders[], menu[]
    ├── bookRoom(), bookHall(), orderFood()
    ├── viewRecords(), generateBill()
    └── run()`}</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="files">
                <AccordionTrigger>📁 File Structure</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre">{`homestay_system/
├── main.cpp          — Entry point, main menu loop
├── Room.h/.cpp       — Room class
├── Hall.h/.cpp       — Hall class
├── FoodOrder.h/.cpp  — Food ordering
├── HomestaySystem.h/.cpp — Main controller
├── rooms.txt         — Room booking data
├── halls.txt         — Hall booking data
└── orders.txt        — Food order data`}</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="plan">
                <AccordionTrigger>📝 Development Plan</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li><strong>Day 1:</strong> Create Room class with book/checkout/display methods</li>
                    <li><strong>Day 2:</strong> Create Hall class with book/release methods</li>
                    <li><strong>Day 3:</strong> Create FoodItem struct and FoodOrder class with menu</li>
                    <li><strong>Day 4:</strong> Build HomestaySystem controller — wire up all modules</li>
                    <li><strong>Day 5:</strong> Add billing with tax calculation and formatted output</li>
                    <li><strong>Day 6:</strong> Add file persistence — save/load all data</li>
                    <li><strong>Day 7:</strong> Testing, edge cases, and polishing output formatting</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <h3 className="text-lg font-semibold mb-2">💻 Full Implementation</h3>
              <CodeBlock code={homestayCode} title="homestay_system.cpp" />
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6 mt-4">
            <h2 className="text-2xl font-bold">Business Management System</h2>

            <Card>
              <CardHeader><CardTitle className="text-base">📋 Features</CardTitle></CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p>• Customer management — add, view, search customers</p>
                <p>• Inventory/services — products with stock tracking, services with no stock limit</p>
                <p>• Booking system — create bookings with multiple items, link to customers</p>
                <p>• Billing — formatted invoices with tax (8%)</p>
                <p>• Reports — revenue summary, paid/unpaid tracking, inventory status</p>
              </CardContent>
            </Card>

            <Accordion type="single" collapsible>
              <AccordionItem value="design">
                <AccordionTrigger>🏗️ System Design & Class Diagram</AccordionTrigger>
                <AccordionContent>
                  <pre className="text-sm font-mono text-muted-foreground whitespace-pre overflow-x-auto">{`BusinessSystem
├── Customer (id, name, phone, email)
│   ├── display(), toFile()
├── Service (code, name, price, stock)
│   ├── isAvailable(), reduceStock(), addStock()
│   └── display()
├── Booking (bookingId, customerId, customerName, items[], date, isPaid)
│   ├── addItem(), getTotal()
│   ├── display(), printBill()
│   └── markPaid()
└── BusinessSystem
    ├── customers[], services[], bookings[]
    ├── addCustomer(), viewCustomers()
    ├── viewInventory(), createBooking()
    ├── viewBookings(), generateReport()
    └── run()`}</pre>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="plan">
                <AccordionTrigger>📝 Development Plan</AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li><strong>Day 1:</strong> Create Customer class with CRUD operations</li>
                    <li><strong>Day 2:</strong> Create Service class with stock management</li>
                    <li><strong>Day 3:</strong> Create Booking class with item management</li>
                    <li><strong>Day 4:</strong> Build BusinessSystem controller — wire up modules</li>
                    <li><strong>Day 5:</strong> Add formatted billing with tax calculation</li>
                    <li><strong>Day 6:</strong> Add reporting — revenue, paid/unpaid, inventory status</li>
                    <li><strong>Day 7:</strong> Add file persistence and testing</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div>
              <h3 className="text-lg font-semibold mb-2">💻 Full Implementation</h3>
              <CodeBlock code={businessCode} title="business_system.cpp" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CppLayout>
  );
};

export default RealWorldProjects;
