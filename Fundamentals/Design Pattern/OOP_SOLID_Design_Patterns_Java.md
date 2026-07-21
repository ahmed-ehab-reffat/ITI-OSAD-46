# OOP Mastery in Java — Full Guide
> A complete step-by-step conversation covering everything you need to master Object-Oriented Programming in Java.

---

## Table of Contents
1. [OOP Mastery Roadmap](#roadmap)
2. [Step 1 — Classes & Objects Internals](#step-1)
3. [Step 2 — Access Modifiers & Encapsulation](#step-2)
4. [Step 3 — The `final` Keyword](#step-3)
5. [Step 4 — Association, Aggregation & Composition](#step-4)
6. [Step 5 — Inheritance Deep Dive](#step-5)
7. [Step 6 — Interfaces vs Abstract Classes](#step-6)
8. [Step 7 — SOLID Principles](#step-7)
9. [Step 8 — Favor Composition over Inheritance](#step-8)
10. [Step 9 — Dependency Injection](#step-9)
11. [Step 10 — Creational Patterns](#step-10)
12. [Step 11 — Structural Patterns](#step-11)
13. [Step 12 — Behavioral Patterns](#step-12)
14. [Step 13 — Generics with OOP](#step-13)
15. [Step 14 — Enums as Objects](#step-14)
16. [Step 15 — Inner Classes & Anonymous Classes](#step-15)
17. [Step 16 — Functional Interfaces & Lambdas](#step-16)

---

## OOP Mastery Roadmap <a name="roadmap"></a>

> **User:** I want to learn OOP. I know the basics (4 pillars) but didn't dive deep. First make a list of things I need to learn to master OOP, then start teaching me them. Use Java and teach me in steps (not everything at once).

Here's everything you need to master OOP, beyond the 4 pillars:

### 🧱 Foundation (Deeper than basics)
1. Classes & Objects internals — `this`, constructors chaining, static vs instance
2. Access modifiers & encapsulation done right
3. The `final` keyword — variables, methods, classes

### 🔗 Relationships Between Classes
4. Association, Aggregation & Composition (HAS-A)
5. Inheritance deep dive — method overriding, `super`, constructor chaining
6. Interfaces vs Abstract Classes — when to use which

### 🎨 Design Thinking
7. SOLID Principles
8. Favor Composition over Inheritance
9. Dependency Injection

### 📐 Design Patterns
10. Creational — Singleton, Factory, Builder
11. Structural — Adapter, Decorator, Facade
12. Behavioral — Strategy, Observer, Command

### ⚙️ Java-Specific OOP
13. Generics with OOP
14. Enums as objects
15. Inner classes & anonymous classes
16. Functional interfaces & lambdas in OOP context

---

## Step 1 — Classes & Objects Internals <a name="step-1"></a>

> **User:** move on to step 1 (included in initial request)

### 🔹 The `this` Keyword

`this` refers to **the current object**. It has 3 main uses:

**Use 1 — Resolve naming conflicts**
```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name; // "this.name" = field, "name" = parameter
        this.age = age;
    }
}
```

**Use 2 — Pass the current object to another method**
```java
public class Person {
    public void register() {
        Database.save(this); // passing itself
    }
}
```

**Use 3 — Constructor chaining with `this()`**
```java
public class Person {
    private String name;
    private int age;
    private String country;

    // Master constructor
    public Person(String name, int age, String country) {
        this.name = name;
        this.age = age;
        this.country = country;
    }

    // Delegates to master constructor
    public Person(String name, int age) {
        this(name, age, "Unknown"); // calls the 3-arg constructor
    }

    // Delegates further
    public Person(String name) {
        this(name, 0); // calls the 2-arg constructor
    }
}
```
> ✅ This avoids duplicating initialization logic. Always delegate to the **most complete** constructor.

---

### 🔹 Static vs Instance

| | **Instance** | **Static** |
|---|---|---|
| Belongs to | Each object | The class itself |
| Access via | `object.method()` | `ClassName.method()` |
| Can access | instance + static members | static members **only** |

```java
public class Counter {
    private int count;           // instance — each object has its own
    private static int total;    // static — shared across ALL objects

    public Counter() {
        total++; // every time a new Counter is created
    }

    public void increment() {
        count++;  // only this object's count
    }

    public int getCount() { return count; }
    public static int getTotal() { return total; }
}

// Usage
Counter c1 = new Counter();
Counter c2 = new Counter();
c1.increment();
c1.increment();
c2.increment();

System.out.println(c1.getCount());      // 2
System.out.println(c2.getCount());      // 1
System.out.println(Counter.getTotal()); // 2 (two objects were created)
```

---

### 🔹 Constructor Chaining with `super()`

When a child class is instantiated, **the parent constructor always runs first**.

```java
public class Animal {
    private String name;

    public Animal(String name) {
        this.name = name;
        System.out.println("Animal created: " + name);
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name); // MUST be the first line — calls Animal's constructor
        this.breed = breed;
        System.out.println("Dog created: " + breed);
    }
}

// new Dog("Rex", "Husky") prints:
// Animal created: Rex
// Dog created: Husky
```

> ⚠️ If you don't call `super()` explicitly, Java calls the **no-arg** `super()` automatically. If the parent has no no-arg constructor, you'll get a **compile error**.

---

### 🔹 Quick Mental Model

```
new Dog("Rex", "Husky")
        │
        ▼
  Dog constructor runs
        │
        └──► super(name) ──► Animal constructor runs first
                                      │
                                      ▼
                               Object constructor runs (always the root)
```

---

## Step 2 — Access Modifiers & Encapsulation Done Right <a name="step-2"></a>

> **User:** move on to step 2

### 🔹 The 4 Access Modifiers

| Modifier | Same Class | Same Package | Subclass | Everywhere |
|---|---|---|---|---|
| `private` | ✅ | ❌ | ❌ | ❌ |
| `default` *(no keyword)* | ✅ | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ | ✅ |

> 🧠 **Rule of thumb:** Always use the **most restrictive** modifier possible. Start with `private`, loosen only when needed.

---

### 🔹 Encapsulation — Beyond Getters & Setters

Most beginners think encapsulation = making fields private + adding getters/setters. That's the **wrong** mental model.

**Bad encapsulation (mechanical, pointless):**
```java
public class BankAccount {
    private double balance;

    public double getBalance() { return balance; }

    // This setter makes the field private... but provides zero protection
    public void setBalance(double balance) {
        this.balance = balance; // anyone can set balance to -99999
    }
}
```

**Real encapsulation — the class protects its own state:**
```java
public class BankAccount {
    private double balance;
    private String owner;

    public BankAccount(String owner, double initialDeposit) {
        if (initialDeposit < 0) throw new IllegalArgumentException("Initial deposit can't be negative");
        this.owner = owner;
        this.balance = initialDeposit;
    }

    // No setter for balance — you can only change it through valid operations
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit must be positive");
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Amount must be positive");
        if (amount > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amount;
    }

    public double getBalance() { return balance; }
}
```

> ✅ The object **controls** how its data changes. No one outside can put it in an invalid state.

---

### 🔹 `protected` — The Tricky One

`protected` is often misunderstood. Use it when a field or method is **internal to a class hierarchy** but shouldn't be public.

```java
public class Shape {
    protected String color; // subclasses can access this directly

    public Shape(String color) {
        this.color = color;
    }

    protected double calculateArea() { // meant to be overridden, not called publicly
        return 0;
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    protected double calculateArea() {
        return Math.PI * radius * radius;
    }

    public String describe() {
        // Can access 'color' because it's protected and we're a subclass
        return color + " circle with area: " + calculateArea();
    }
}
```

> ⚠️ Don't overuse `protected` on fields — it breaks encapsulation across the hierarchy. Prefer `private` fields with `protected` methods when needed.

---

### 🔹 Immutability — The Strongest Form of Encapsulation

Rules to make a class immutable:
1. Make all fields `private final`
2. No setters
3. Set everything in the constructor
4. If a field is a mutable object (like a List), return a **copy** of it, not the original

```java
public final class Point {  // 'final' prevents subclassing
    private final int x;
    private final double y;

    public Point(int x, double y) {
        this.x = x;
        this.y = y;
    }

    public int getX() { return x; }
    public double getY() { return y; }

    // Instead of mutating, return a NEW object
    public Point translate(int dx, double dy) {
        return new Point(x + dx, y + dy);
    }

    @Override
    public String toString() {
        return "Point(" + x + ", " + y + ")";
    }
}

// Usage
Point p1 = new Point(2, 3);
Point p2 = p1.translate(1, 1); // p1 is untouched

System.out.println(p1); // Point(2, 3.0)
System.out.println(p2); // Point(3, 4.0)
```

> 🧠 `String` in Java is immutable — that's why `"hello".toUpperCase()` returns a **new** string instead of modifying the original.

---

### 🔹 The Mutable List Trap

```java
public class Classroom {
    private final List<String> students;

    public Classroom(List<String> students) {
        // Store a copy, not the original reference
        this.students = new ArrayList<>(students);
    }

    // BAD — leaks internal list, caller can mutate it
    public List<String> getStudentsBad() {
        return students;
    }

    // GOOD — return an unmodifiable view
    public List<String> getStudents() {
        return Collections.unmodifiableList(students);
    }
}

// With the bad getter:
classroom.getStudentsBad().add("Hacker"); // corrupts internal state!

// With the good getter:
classroom.getStudents().add("Hacker"); // throws UnsupportedOperationException ✅
```

---

### 🔹 Quick Summary

```
Encapsulation is NOT:         Encapsulation IS:
─────────────────────         ──────────────────
private field + getter        Controlling HOW state changes
private field + setter        Validating all inputs
Hiding for the sake of it     Making invalid state unrepresentable
                              Exposing behavior, not raw data
```

---

## Step 3 — The `final` Keyword <a name="step-3"></a>

> **User:** yes, let's begin step 3

`final` is one keyword with three different meanings depending on where you use it.

### 🔹 1. `final` Variables

A `final` variable can only be **assigned once**. After that, it's locked.

**Primitive `final` variables:**
```java
public class Circle {
    public static final double PI = 3.14159; // constant — never changes

    public double area(double radius) {
        final double result = PI * radius * radius; // set once, never reassigned
        // result = 0; ❌ compile error
        return result;
    }
}
```

**`final` with objects — the tricky part:**

`final` on an object means the **reference** can't change, not the object itself.

```java
final List<String> names = new ArrayList<>();

names.add("Ali");    // ✅ modifying the object is fine
names.add("Sara");   // ✅

names = new ArrayList<>(); // ❌ compile error — can't reassign the reference
```

> 🧠 Think of `final` as locking the **arrow** pointing to the object, not the object itself.

```
final List<String> names
        │
        ▼
   [ArrayList]  ← you can change what's inside
        │
   (arrow is locked — can't point elsewhere)
```

---

### 🔹 `static final` — Constants

```java
public class Config {
    public static final int MAX_RETRIES = 3;
    public static final String DEFAULT_LANGUAGE = "EN";
    public static final double TAX_RATE = 0.14;
}

// Usage anywhere in the codebase:
if (retries > Config.MAX_RETRIES) { ... }
```

> ✅ Convention: `static final` constants are named in `UPPER_SNAKE_CASE`.

---

### 🔹 2. `final` Methods

A `final` method **cannot be overridden** by subclasses.

```java
public class BankAccount {
    private double balance;

    public void deposit(double amount) {
        balance += amount;
    }

    // No subclass can change how interest is calculated
    public final double calculateInterest() {
        return balance * 0.05;
    }
}

public class SavingsAccount extends BankAccount {

    @Override
    public void deposit(double amount) { ... } // ✅ allowed

    @Override
    public double calculateInterest() { ... }  // ❌ compile error
}
```

Use `final` on a method when it defines **critical or security-sensitive behavior** that must stay consistent across all subclasses.

---

### 🔹 3. `final` Classes

A `final` class **cannot be extended at all**. No subclasses allowed.

```java
public final class Token {
    private final String value;
    private final long expiresAt;

    public Token(String value, long expiresAt) {
        this.value = value;
        this.expiresAt = expiresAt;
    }

    public boolean isExpired() {
        return System.currentTimeMillis() > expiresAt;
    }

    public String getValue() { return value; }
}

// No one can extend Token and mess with its behavior
public class WeakToken extends Token { ... } // ❌ compile error
```

---

### 🔹 Putting It All Together

```java
public final class Circle {                        // final class — no subclassing

    public static final double PI = 3.14159265;    // final variable — constant

    private final double radius;                   // final field — set once

    public Circle(double radius) {
        if (radius <= 0) throw new IllegalArgumentException("Radius must be positive");
        this.radius = radius;
    }

    public final double area() {                   // final method — can't be overridden
        return PI * radius * radius;
    }

    public final double circumference() {
        return 2 * PI * radius;
    }

    public double getRadius() { return radius; }
}
```

---

### 🔹 Quick Reference

| Where | What it prevents |
|---|---|
| `final` variable | Re-assigning the variable |
| `final` field | Re-assigning after construction |
| `static final` | Ever changing a constant |
| `final` method | Subclass overriding it |
| `final` class | Anyone extending it |

---

### 🔹 A Common Interview Trap

```java
final int x = 10;
final int y = 20;
final int z = x + y; // ✅ fine — computed from other finals, resolved at compile time

final List<Integer> nums = new ArrayList<>();
nums.add(1);
nums.add(2);
// nums is "final" but its contents changed — final ≠ immutable!
```

> 🧠 **`final` ≠ immutable.** `final` is about the **reference/variable**. Immutability is about the **object's state**. They work together but are not the same thing.

---

## Step 4 — Association, Aggregation & Composition (HAS-A) <a name="step-4"></a>

> **User:** start step 4

You know **IS-A** (inheritance). Now let's master **HAS-A** — how objects **relate to and own each other**.

### 🔹 The Big Picture

```
Association          Aggregation           Composition
─────────────        ───────────           ───────────
"uses"               "has"                 "owns"
Weakest              Medium                Strongest
Independent          Independent           Dependent
lives               lives                 lives/dies
                                          together
```

---

### 🔹 1. Association — "Uses A"

Two objects know about each other but **neither owns the other**. They exist completely independently.

```java
public class Teacher {
    private String name;

    public Teacher(String name) {
        this.name = name;
    }

    public void teach(Student student) {   // Teacher "uses" a Student
        System.out.println(name + " is teaching " + student.getName());
    }
}

public class Student {
    private String name;

    public Student(String name) {
        this.name = name;
    }

    public String getName() { return name; }
}

// Usage
Teacher teacher = new Teacher("Mr. Hassan");
Student student = new Student("Ali");

teacher.teach(student); // they interact, but neither owns the other
```

> ✅ If the `Teacher` is deleted, `Student` still exists. If `Student` is deleted, `Teacher` still exists. Completely independent.

---

### 🔹 2. Aggregation — "Has A" (weak ownership)

One object **holds a reference** to another, but the **contained object can exist on its own**.

```java
public class Professor {
    private String name;
    private String specialty;

    public Professor(String name, String specialty) {
        this.name = name;
        this.specialty = specialty;
    }

    public String getName() { return name; }
    public String getSpecialty() { return specialty; }
}

public class Department {
    private String name;
    private List<Professor> professors; // HAS professors, but doesn't own their existence

    public Department(String name) {
        this.name = name;
        this.professors = new ArrayList<>();
    }

    public void addProfessor(Professor p) {
        professors.add(p);
    }

    public void listProfessors() {
        System.out.println("Department: " + name);
        for (Professor p : professors) {
            System.out.println("  - " + p.getName() + " (" + p.getSpecialty() + ")");
        }
    }
}

// Usage
Professor p1 = new Professor("Dr. Mona", "AI");
Professor p2 = new Professor("Dr. Karim", "Security");

Department cs = new Department("Computer Science");
cs.addProfessor(p1);
cs.addProfessor(p2);

cs.listProfessors();

// If 'cs' is gone, p1 and p2 still exist independently ✅
```

> 🧠 Key signal: the `Professor` objects are **created outside** the `Department` and **passed in**.

---

### 🔹 3. Composition — "Owns A" (strong ownership)

One object **creates and fully owns** another. The child **cannot exist** without the parent.

```java
public class Room {
    private String type;
    private double size;

    // Package-private constructor — only classes in same package (like House) can create it
    Room(String type, double size) {
        this.type = type;
        this.size = size;
    }

    public String describe() {
        return type + " (" + size + " sqm)";
    }
}

public class House {
    private String address;
    private List<Room> rooms; // House OWNS its rooms

    public House(String address) {
        this.address = address;
        this.rooms = new ArrayList<>();

        // House creates its own rooms — not passed in from outside
        rooms.add(new Room("Living Room", 40));
        rooms.add(new Room("Kitchen", 20));
        rooms.add(new Room("Bedroom", 30));
    }

    public void describe() {
        System.out.println("House at: " + address);
        for (Room room : rooms) {
            System.out.println("  - " + room.describe());
        }
    }
}

// Usage
House house = new House("123 Nile St, Cairo");
house.describe();

// When 'house' is gone, all its rooms are gone too
// You can't create a Room independently — it belongs to a House
```

---

### 🔹 Side-by-Side Comparison

```java
// ASSOCIATION — passed in, used temporarily
public void teach(Student student) { ... }

// AGGREGATION — passed in, stored as reference
public void addProfessor(Professor p) {
    professors.add(p); // p was created outside
}

// COMPOSITION — created internally, fully owned
public House(String address) {
    rooms.add(new Room("Kitchen", 20)); // created inside
}
```

---

### 🔹 Real-World Analogy

| Relationship | Real Example | Object Example |
|---|---|---|
| Association | A driver uses a car (rents it) | `Teacher` uses `Student` |
| Aggregation | A playlist has songs (song exists elsewhere) | `Department` has `Professor` |
| Composition | A body has a heart (heart can't live alone) | `House` has `Room` |

---

### 🔹 A Realistic Combined Example

```java
public class Engine {
    private int horsepower;

    // Created inside Car — composition
    Engine(int horsepower) {
        this.horsepower = horsepower;
    }

    public int getHorsepower() { return horsepower; }
}

public class Driver {
    private String name;

    public Driver(String name) { this.name = name; }
    public String getName() { return name; }
}

public class Car {
    private String model;
    private Engine engine;      // COMPOSITION — Car owns Engine
    private Driver driver;      // AGGREGATION — Car has a Driver (driver exists independently)

    public Car(String model, int hp) {
        this.model = model;
        this.engine = new Engine(hp); // Car creates the engine
    }

    public void assignDriver(Driver driver) {
        this.driver = driver; // driver created outside and passed in
    }

    public void drive() {
        if (driver == null) throw new IllegalStateException("No driver assigned!");
        System.out.println(driver.getName() + " drives " + model +
                           " with " + engine.getHorsepower() + "hp");
    }
}

// Usage
Driver d = new Driver("Omar");    // exists independently
Car car = new Car("BMW M3", 500); // engine created inside

car.assignDriver(d);   // aggregation
car.drive();           // Omar drives BMW M3 with 500hp
```

---

### 🔹 How to Identify Which to Use

```
Ask yourself:
─────────────────────────────────────────────────
"Can object B exist without object A?"
    │
    ├── NO, never → COMPOSITION
    │   (Room without House? Heart without Body?)
    │
    ├── YES, it was created elsewhere → AGGREGATION
    │   (Professor without Department? Song without Playlist?)
    │
    └── YES, and they just interact briefly → ASSOCIATION
        (Student without Teacher? Customer without Cashier?)
```

---

## Step 5 — Inheritance Deep Dive <a name="step-5"></a>

> **User:** start step 5

### 🔹 1. Method Overriding — The Full Rules

| Rule | Explanation |
|---|---|
| Same method signature | Same name, same parameters |
| Same or wider access | Can't override `public` with `private` |
| Same or narrower return type | Called **covariant return type** |
| Can't override `static` | Static methods are **hidden**, not overridden |
| Can't override `final` | Compile error (Step 3) |
| Can't override `private` | Parent's private methods are invisible to child |

---

### 🔹 Covariant Return Type

```java
public class AnimalFactory {
    public Animal create() {
        return new Animal();
    }
}

public class DogFactory extends AnimalFactory {
    @Override
    public Dog create() {       // Dog IS-A Animal — this is valid ✅
        return new Dog();
    }
}
```

---

### 🔹 Static Methods — Hidden, Not Overridden

```java
public class Parent {
    public static void staticMethod() {
        System.out.println("Parent static");
    }

    public void instanceMethod() {
        System.out.println("Parent instance");
    }
}

public class Child extends Parent {
    public static void staticMethod() {   // this HIDES, not overrides
        System.out.println("Child static");
    }

    @Override
    public void instanceMethod() {        // this truly OVERRIDES
        System.out.println("Child instance");
    }
}

// Usage
Parent obj = new Child();

obj.staticMethod();   // "Parent static"  ← decided at COMPILE time (the reference type)
obj.instanceMethod(); // "Child instance" ← decided at RUNTIME (the actual object)
```

> 🧠 This is **polymorphism** — instance methods are resolved at runtime. Static methods are resolved at compile time.

---

### 🔹 2. `super` — All Three Uses

**Use 1 — Call parent's overridden method**
```java
public class Animal {
    public String describe() {
        return "I am an animal";
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String breed) {
        this.breed = breed;
    }

    @Override
    public String describe() {
        return super.describe() + ", specifically a " + breed + " dog";
    }
}

Dog d = new Dog("Husky");
System.out.println(d.describe());
// "I am an animal, specifically a Husky dog"
```

**Use 2 — Access parent's field (when hidden by child)**
```java
public class Vehicle {
    protected String type = "Vehicle";
}

public class Car extends Vehicle {
    protected String type = "Car";    // hides parent's field

    public void printTypes() {
        System.out.println(type);       // "Car"
        System.out.println(super.type); // "Vehicle"
    }
}
```

**Use 3 — Call parent's constructor**
```java
public class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getInfo() {
        return name + " (age " + age + ")";
    }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age);   // must be FIRST line
        this.breed = breed;
    }

    @Override
    public String getInfo() {
        return super.getInfo() + " - " + breed;
    }
}

Dog d = new Dog("Rex", 3, "Husky");
System.out.println(d.getInfo()); // "Rex (age 3) - Husky"
```

---

### 🔹 3. Constructor Chaining Across a Full Hierarchy

```java
public class LivingThing {
    private boolean alive;

    public LivingThing() {
        this.alive = true;
        System.out.println("1. LivingThing constructor");
    }

    public boolean isAlive() { return alive; }
}

public class Animal extends LivingThing {
    private String name;

    public Animal(String name) {
        super();
        this.name = name;
        System.out.println("2. Animal constructor: " + name);
    }

    public String getName() { return name; }
}

public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);
        this.breed = breed;
        System.out.println("3. Dog constructor: " + breed);
    }

    @Override
    public String toString() {
        return getName() + " | " + breed + " | alive: " + isAlive();
    }
}

// Usage
Dog d = new Dog("Rex", "Husky");
System.out.println(d);
```

**Output:**
```
1. LivingThing constructor
2. Animal constructor: Rex
3. Dog constructor: Husky
Rex | Husky | alive: true
```

**The chain always flows top-down:**
```
new Dog("Rex", "Husky")
        │
        ▼
  Dog constructor
        │ super(name)
        ▼
  Animal constructor
        │ super()
        ▼
  LivingThing constructor
        │ super() (implicit)
        ▼
  Object constructor  ← root of ALL Java classes
```

---

### 🔹 4. Overriding + `super` in a Real System

```java
public class Payment {
    private double amount;
    private String currency;

    public Payment(double amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public boolean validate() {
        return amount > 0;
    }

    public String process() {
        return "Processing " + amount + " " + currency;
    }

    public double getAmount() { return amount; }
    public String getCurrency() { return currency; }
}

public class CreditCardPayment extends Payment {
    private String cardNumber;
    private String cvv;

    public CreditCardPayment(double amount, String currency,
                             String cardNumber, String cvv) {
        super(amount, currency);
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public boolean validate() {
        return super.validate()
            && cardNumber.length() == 16
            && cvv.length() == 3;
    }

    @Override
    public String process() {
        if (!validate()) throw new IllegalStateException("Invalid payment");
        return super.process() + " via Credit Card ending in "
               + cardNumber.substring(12);
    }
}
```

---

### 🔹 Common Mistakes to Avoid

```java
// ❌ MISTAKE 1 — Forgetting @Override (silent bug)
public class Dog extends Animal {
    public String makesound() { // typo! Java treats this as a NEW method
        return "Woof";
    }
}

// ✅ With @Override — compiler catches the typo immediately
@Override
public String makesound() { } // ❌ compile error: method doesn't match parent

// ❌ MISTAKE 2 — Calling overridden method in parent constructor
public class Animal {
    public Animal() {
        System.out.println(describe()); // dangerous! calls CHILD's version
    }
    public String describe() { return "Animal"; }
}
public class Dog extends Animal {
    private String breed = "Husky";
    @Override
    public String describe() { return "Dog: " + breed; }
}

new Dog(); // prints "Dog: null" — breed isn't initialized yet!

// ✅ Never call overridable methods in constructors
```

---

### 🔹 Quick Mental Model

```
Inheritance rules to remember:
───────────────────────────────────────────────
✅ Always use @Override when overriding
✅ super() must be the FIRST line in constructor
✅ super.method() can be called anywhere
✅ Constructors chain TOP → DOWN
✅ Method calls resolve BOTTOM → UP (most specific first)
❌ Never override static methods (you hide them)
❌ Never call overridable methods in constructors
```

---

## Step 6 — Interfaces vs Abstract Classes <a name="step-6"></a>

> **User:** start step 6

> **Abstract class** = what an object **IS**
> **Interface** = what an object **CAN DO**

### 🔹 1. Abstract Classes

```java
public abstract class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Abstract method — no body, MUST be overridden by subclass
    public abstract String makeSound();

    // Concrete method — fully implemented, inherited as-is
    public String describe() {
        return name + " (age " + age + ") says: " + makeSound();
    }

    public String getName() { return name; }
    public int getAge() { return age; }
}

public class Dog extends Animal {
    public Dog(String name, int age) { super(name, age); }

    @Override
    public String makeSound() { return "Woof!"; }
}

public class Cat extends Animal {
    public Cat(String name, int age) { super(name, age); }

    @Override
    public String makeSound() { return "Meow!"; }
}

Animal a = new Dog("Rex", 3);
System.out.println(a.describe()); // Rex (age 3) says: Woof!
```

**What abstract classes can have:**

| Feature | Abstract Class |
|---|---|
| Constructors | ✅ |
| Instance fields | ✅ |
| Concrete methods | ✅ |
| Abstract methods | ✅ |
| `static` methods | ✅ |
| Access modifiers | Any (`private`, `protected`, `public`) |

---

### 🔹 2. Interfaces

```java
public interface Swimmable {
    void swim();   // implicitly public abstract
}

public interface Flyable {
    void fly();
}

public interface Runnable {
    void run();
}

// A Duck can do all three
public class Duck extends Animal implements Swimmable, Flyable, Runnable {

    public Duck(String name, int age) { super(name, age); }

    @Override public String makeSound() { return "Quack!"; }
    @Override public void swim() { System.out.println(getName() + " is swimming"); }
    @Override public void fly()  { System.out.println(getName() + " is flying"); }
    @Override public void run()  { System.out.println(getName() + " is running"); }
}
```

---

### 🔹 Interface Default Methods (Java 8+)

```java
public interface Printable {

    void print();   // must be implemented

    // Default method — optional to override
    default void printTwice() {
        print();
        print();
    }

    // Static utility method on the interface itself
    static void printSeparator() {
        System.out.println("─────────────────");
    }
}

public class Report implements Printable {
    private String content;

    public Report(String content) { this.content = content; }

    @Override
    public void print() {
        System.out.println(content);
    }
}

Report r = new Report("Q4 Sales Report");
r.print();
r.printTwice();
Printable.printSeparator();
```

---

### 🔹 3. The Diamond Problem

Java avoids the diamond problem by only allowing **single class inheritance**. But interfaces solve it cleanly:

```java
interface B { default void hello() { System.out.println("B"); } }
interface C { default void hello() { System.out.println("C"); } }

class D implements B, C {
    @Override
    public void hello() {
        B.super.hello(); // you choose which one, or write your own
    }
}
```

---

### 🔹 4. Side-by-Side Comparison

| | **Abstract Class** | **Interface** |
|---|---|---|
| Instantiate | ❌ | ❌ |
| Multiple inheritance | ❌ (one only) | ✅ (many) |
| Constructors | ✅ | ❌ |
| Instance fields | ✅ | ❌ (only `static final`) |
| Concrete methods | ✅ | ✅ (`default`) |
| Abstract methods | ✅ | ✅ (all non-default) |
| Access modifiers | Any | `public` only |
| Models | What it **IS** | What it **CAN DO** |

---

### 🔹 5. When to Use Which — The Decision Tree

```
Is there shared STATE (fields) or shared
constructor logic between related classes?
            │
           YES → Abstract Class
            │
            NO
            │
            ▼
Are these classes from UNRELATED hierarchies
that need the same capability?
            │
           YES → Interface
            │
            NO
            │
            ▼
Do you need MULTIPLE behaviors mixed together?
            │
           YES → Interface (can implement many)
            │
            NO
            │
            ▼
           Both could work — prefer Interface
           for flexibility
```

---

### 🔹 6. A Real-World System Using Both

```java
// Abstract class — shared state & logic for all media types
public abstract class MediaFile {
    private String title;
    private String filePath;
    private int durationSeconds;

    public MediaFile(String title, String filePath, int durationSeconds) {
        this.title = title;
        this.filePath = filePath;
        this.durationSeconds = durationSeconds;
    }

    public abstract void load();

    public String getInfo() {
        return title + " [" + durationSeconds + "s] @ " + filePath;
    }

    public String getTitle() { return title; }
    public int getDuration() { return durationSeconds; }
}

// Interfaces — capabilities that vary across types
public interface Playable {
    void play();
    void pause();
    void stop();
}

public interface Downloadable {
    void download(String destination);
    int getFileSizeMB();
}

public interface Streamable {
    void stream(String url);
    int getBitrate();
}

// VideoFile IS-A MediaFile, CAN play, download, and stream
public class VideoFile extends MediaFile implements Playable, Downloadable, Streamable {
    private int bitrate;
    private int fileSizeMB;

    public VideoFile(String title, String path, int duration, int bitrate, int sizeMB) {
        super(title, path, duration);
        this.bitrate = bitrate;
        this.fileSizeMB = sizeMB;
    }

    @Override public void load()  { System.out.println("Loading video: " + getTitle()); }
    @Override public void play()  { System.out.println("▶ Playing: "  + getTitle()); }
    @Override public void pause() { System.out.println("⏸ Paused: "   + getTitle()); }
    @Override public void stop()  { System.out.println("⏹ Stopped: "  + getTitle()); }

    @Override
    public void download(String dest) {
        System.out.println("⬇ Downloading " + getTitle() + " to " + dest);
    }

    @Override public int getFileSizeMB() { return fileSizeMB; }

    @Override
    public void stream(String url) {
        System.out.println("📡 Streaming " + getTitle() + " from " + url);
    }

    @Override public int getBitrate() { return bitrate; }
}

// AudioFile IS-A MediaFile, CAN play and download, but NOT stream
public class AudioFile extends MediaFile implements Playable, Downloadable {
    private int fileSizeMB;

    public AudioFile(String title, String path, int duration, int sizeMB) {
        super(title, path, duration);
        this.fileSizeMB = sizeMB;
    }

    @Override public void load()  { System.out.println("Loading audio: " + getTitle()); }
    @Override public void play()  { System.out.println("▶ Playing audio: "  + getTitle()); }
    @Override public void pause() { System.out.println("⏸ Paused audio: "   + getTitle()); }
    @Override public void stop()  { System.out.println("⏹ Stopped audio: "  + getTitle()); }

    @Override
    public void download(String dest) {
        System.out.println("⬇ Downloading audio " + getTitle() + " to " + dest);
    }

    @Override public int getFileSizeMB() { return fileSizeMB; }
}
```

### 🔹 Quick Mental Model

```
Abstract Class                    Interface
──────────────                    ─────────
"I am a type of..."               "I am capable of..."
Dog IS-A Animal                   Duck CAN swim, fly, run
Shared fields & logic             Pure capability contract
Single inheritance only           Mix and match freely
Use when IS-A is true             Use when CAN-DO is true
```

---

## Step 7 — SOLID Principles <a name="step-7"></a>

> **User:** start step 7

```
S — Single Responsibility Principle (SRP)
O — Open/Closed Principle (OCP)
L — Liskov Substitution Principle (LSP)
I — Interface Segregation Principle (ISP)
D — Dependency Inversion Principle (DIP)
```

---

### S — Single Responsibility Principle

> **A class should have only ONE reason to change.**

**❌ Bad — one class doing everything:**
```java
public class Employee {
    private String name;
    private double salary;

    public String getName() { return name; }
    public double getSalary() { return salary; }

    public void saveToDatabase() {
        System.out.println("Saving " + name + " to DB...");
    }

    public String generatePayslip() {
        return "Payslip for: " + name + " | Salary: " + salary;
    }

    public void sendPayslipEmail() {
        System.out.println("Sending email to " + name);
    }
}
```

**✅ Good — each class has one job:**
```java
public class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getName() { return name; }
    public double getSalary() { return salary; }
}

public class EmployeeRepository {
    public void save(Employee e) {
        System.out.println("Saving " + e.getName() + " to DB...");
    }
}

public class PayslipGenerator {
    public String generate(Employee e) {
        return "Payslip for: " + e.getName() + " | Salary: " + e.getSalary();
    }
}

public class EmailService {
    public void sendPayslip(Employee e, String payslip) {
        System.out.println("Sending to " + e.getName() + ": " + payslip);
    }
}
```

---

### O — Open/Closed Principle

> **A class should be OPEN for extension, but CLOSED for modification.**

**❌ Bad — adding a new shape means editing existing class:**
```java
public class AreaCalculator {
    public double calculate(Object shape) {
        if (shape instanceof Circle c) {
            return Math.PI * c.getRadius() * c.getRadius();
        } else if (shape instanceof Rectangle r) {
            return r.getWidth() * r.getHeight();
        }
        // Adding a Pentagon? Edit this file again. ❌
        return 0;
    }
}
```

**✅ Good — new shapes extend without touching calculator:**
```java
public interface Shape {
    double area();
}

public class Circle implements Shape {
    private double radius;
    public Circle(double radius) { this.radius = radius; }

    @Override
    public double area() { return Math.PI * radius * radius; }
}

public class Rectangle implements Shape {
    private double width, height;
    public Rectangle(double w, double h) { this.width = w; this.height = h; }

    @Override
    public double area() { return width * height; }
}

// Adding Pentagon? Just create a new class — touch NOTHING existing ✅
public class Pentagon implements Shape {
    private double side;
    public Pentagon(double side) { this.side = side; }

    @Override
    public double area() { return (Math.sqrt(25 + 10 * Math.sqrt(5)) / 4) * side * side; }
}

// Closed for modification — this never changes no matter how many shapes you add
public class AreaCalculator {
    public double calculate(Shape shape) {
        return shape.area();
    }

    public double calculateAll(List<Shape> shapes) {
        return shapes.stream().mapToDouble(Shape::area).sum();
    }
}
```

---

### L — Liskov Substitution Principle

> **A subclass should be usable wherever its parent is used, without breaking the program.**

**❌ Bad — subclass breaks parent's contract:**
```java
public class Bird {
    public void fly() {
        System.out.println("Flying...");
    }
}

public class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!"); // 💥
    }
}
```

**✅ Good — restructure the hierarchy to reflect reality:**
```java
public abstract class Bird {
    protected String name;
    public Bird(String name) { this.name = name; }
    public abstract void move();
    public String getName() { return name; }
}

public interface Flyable {
    void fly();
}

public class Eagle extends Bird implements Flyable {
    public Eagle(String name) { super(name); }

    @Override
    public void move() { fly(); }

    @Override
    public void fly() { System.out.println(name + " soars through the sky"); }
}

public class Penguin extends Bird {
    public Penguin(String name) { super(name); }

    @Override
    public void move() { System.out.println(name + " waddles and swims"); }
}
```

> 🧠 **LSP rule of thumb:** If you're throwing `UnsupportedOperationException` in a subclass, you're violating LSP. Redesign the hierarchy.

---

### I — Interface Segregation Principle

> **Don't force a class to implement methods it doesn't need.**

**❌ Bad — one fat interface:**
```java
public interface Worker {
    void work();
    void eat();
    void sleep();
    void attendMeeting();
}

public class RobotWorker implements Worker {
    @Override public void work() { System.out.println("Robot working"); }
    @Override public void eat() { throw new UnsupportedOperationException(); }   // ❌
    @Override public void sleep() { throw new UnsupportedOperationException(); } // ❌
    @Override public void attendMeeting() { throw new UnsupportedOperationException(); } // ❌
}
```

**✅ Good — split into focused interfaces:**
```java
public interface Workable        { void work(); }
public interface Eatable         { void eat(); }
public interface Sleepable       { void sleep(); }
public interface MeetingAttendable { void attendMeeting(); }

public class HumanWorker implements Workable, Eatable, Sleepable, MeetingAttendable {
    @Override public void work()          { System.out.println("Human working"); }
    @Override public void eat()           { System.out.println("Human eating"); }
    @Override public void sleep()         { System.out.println("Human sleeping"); }
    @Override public void attendMeeting() { System.out.println("Human in meeting"); }
}

public class RobotWorker implements Workable {
    @Override public void work() { System.out.println("Robot working 24/7"); }
}
```

---

### D — Dependency Inversion Principle

> **Depend on abstractions, not concrete implementations.**

**❌ Bad:**
```java
public class UserService {
    private MySQLDatabase database; // tightly coupled to MySQL ❌

    public UserService() {
        this.database = new MySQLDatabase(); // creates its own dependency ❌
    }
}
```

**✅ Good:**
```java
public interface Database {
    void save(String data);
    String find(String id);
}

public class MySQLDatabase implements Database {
    @Override public void save(String data) { System.out.println("MySQL saving: " + data); }
    @Override public String find(String id) { return "MySQL result for: " + id; }
}

public class MongoDatabase implements Database {
    @Override public void save(String data) { System.out.println("MongoDB saving: " + data); }
    @Override public String find(String id) { return "MongoDB result for: " + id; }
}

public class UserService {
    private final Database database; // depends on interface ✅

    public UserService(Database database) {
        this.database = database;
    }
}

// Swap databases with zero code changes in UserService ✅
UserService mysqlService = new UserService(new MySQLDatabase());
UserService mongoService = new UserService(new MongoDatabase());
```

---

### 🔹 Quick Cheat Sheet

```
S — One class, one job. One reason to change.
O — Add features by adding code, not editing it.
L — Subclasses must honor the parent's contract.
I — Small interfaces over one fat interface.
D — Depend on interfaces, inject implementations.
```

---

## Step 8 — Favor Composition over Inheritance <a name="step-8"></a>

> **User:** start step 8

> *"Favor object composition over class inheritance."* — Gang of Four

### 🔹 The Problem with Inheritance

With inheritance, adding new types causes a **class explosion** and a **fragile base class problem**.

### 🔹 The Composition Solution

```java
// Strategy interfaces
public interface FlyBehavior  { void fly(); }
public interface EatBehavior  { void eat(); }

// Concrete behaviors
public class CanFly    implements FlyBehavior { @Override public void fly() { System.out.println("Flying with wings!"); } }
public class CannotFly implements FlyBehavior { @Override public void fly() { System.out.println("I can't fly."); } }
public class RocketFly implements FlyBehavior { @Override public void fly() { System.out.println("Flying with rocket boosters! 🚀"); } }

public class EatsNormally implements EatBehavior { @Override public void eat() { System.out.println("Eating food."); } }
public class DoesNotEat   implements EatBehavior { @Override public void eat() { System.out.println("I don't eat."); } }

public class Bird {
    private String name;
    private FlyBehavior flyBehavior;
    private EatBehavior eatBehavior;

    public Bird(String name, FlyBehavior flyBehavior, EatBehavior eatBehavior) {
        this.name = name;
        this.flyBehavior = flyBehavior;
        this.eatBehavior = eatBehavior;
    }

    public void fly() { flyBehavior.fly(); }
    public void eat() { eatBehavior.eat(); }

    // Behaviors can even be swapped at RUNTIME
    public void setFlyBehavior(FlyBehavior fb) { this.flyBehavior = fb; }
    public void setEatBehavior(EatBehavior eb) { this.eatBehavior = eb; }
}

// Build any bird by composing behaviors
Bird duck    = new Bird("Duck",     new CanFly(),    new EatsNormally());
Bird penguin = new Bird("Penguin",  new CannotFly(), new EatsNormally());
Bird robot   = new Bird("RobotBird",new RocketFly(), new DoesNotEat());

duck.fly();    // Flying with wings!
penguin.fly(); // I can't fly.
robot.fly();   // Flying with rocket boosters! 🚀

// Swap behavior at RUNTIME
duck.setFlyBehavior(new RocketFly());
duck.fly();    // Flying with rocket boosters! 🚀
```

---

### 🔹 The Fragile Base Class Problem

```java
public class Counter {
    protected int count = 0;

    public void add(int value) { count += value; }

    public void addAll(List<Integer> values) {
        for (int v : values) {
            add(v); // calls add() internally
        }
    }
}

public class InstrumentedCounter extends Counter {
    private int addCount = 0;

    @Override
    public void add(int value) {
        addCount++;
        super.add(value);
    }

    @Override
    public void addAll(List<Integer> values) {
        addCount += values.size();
        super.addAll(values); // delegates to parent's addAll — which calls add() again!
    }

    public int getAddCount() { return addCount; }
}

InstrumentedCounter counter = new InstrumentedCounter();
counter.addAll(List.of(1, 2, 3));
System.out.println(counter.getAddCount()); // Expected: 3, Actual: 6 ❌
```

**✅ Fixed with composition:**
```java
public class InstrumentedCounter {
    private final Counter counter = new Counter();
    private int addCount = 0;

    public void add(int value) {
        addCount++;
        counter.add(value);
    }

    public void addAll(List<Integer> values) {
        addCount += values.size();
        counter.addAll(values);
    }

    public int getAddCount() { return addCount; }
}

InstrumentedCounter counter = new InstrumentedCounter();
counter.addAll(List.of(1, 2, 3));
System.out.println(counter.getAddCount()); // 3 ✅
```

---

### 🔹 When to Use Inheritance vs Composition

```
Use INHERITANCE when:                Use COMPOSITION when:
─────────────────────                ────────────────────
IS-A is genuinely true               HAS-A or CAN-DO is true
Subclass uses MOST of parent         Subclass would override most of parent
Hierarchy is STABLE                  Hierarchy might grow or change
You want shared implementation       You want flexible, swappable behavior
```

---

## Step 9 — Dependency Injection <a name="step-9"></a>

> **User:** start step 9

### 🔹 The Problem — Creating Your Own Dependencies

**❌ Bad:**
```java
public class OrderService {
    private PaymentProcessor processor;

    public OrderService() {
        this.processor = new StripePaymentProcessor(); // hardcoded ❌
    }
}
```

**✅ Good:**
```java
public class OrderService {
    private final PaymentProcessor processor;

    public OrderService(PaymentProcessor processor) {
        this.processor = processor; // injected ✅
    }
}
```

---

### 🔹 The 3 Types of Dependency Injection

### 1. Constructor Injection ✅ (Preferred)

```java
public interface MessageSender {
    void send(String to, String message);
}

public class EmailSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("📧 Email → " + to + ": " + message);
    }
}

public class SMSSender implements MessageSender {
    @Override
    public void send(String to, String message) {
        System.out.println("📱 SMS → " + to + ": " + message);
    }
}

public class NotificationService {
    private final MessageSender sender;

    public NotificationService(MessageSender sender) {
        this.sender = sender;
    }

    public void notifyUser(String user, String message) {
        sender.send(user, message);
    }
}

NotificationService emailService = new NotificationService(new EmailSender());
NotificationService smsService   = new NotificationService(new SMSSender());
```

**Why constructor injection is preferred:**
```
✅ Dependencies are visible and required upfront
✅ Object is always in a valid state after construction
✅ Fields can be final — immutability
✅ Easy to see what a class needs just by looking at its constructor
✅ Easiest to test
```

### 2. Setter Injection ⚠️ (Use Sparingly)

```java
public class ReportGenerator {
    private DataSource dataSource;
    private Formatter formatter;

    public void setDataSource(DataSource dataSource) { this.dataSource = dataSource; }
    public void setFormatter(Formatter formatter)     { this.formatter = formatter; }

    public String generate() {
        if (dataSource == null) throw new IllegalStateException("DataSource not set!");
        if (formatter == null)  throw new IllegalStateException("Formatter not set!");
        return formatter.format(dataSource.fetchData());
    }
}
```

### 3. Interface Injection (Rare)

```java
public interface DataSourceInjectable {
    void injectDataSource(DataSource dataSource);
}

public class AnalyticsService implements DataSourceInjectable {
    private DataSource dataSource;

    @Override
    public void injectDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }
}
```

---

### 🔹 The Real Power — Testability

```java
public class FakePaymentGateway implements PaymentGateway {
    private boolean shouldSucceed;
    public FakePaymentGateway(boolean shouldSucceed) { this.shouldSucceed = shouldSucceed; }

    @Override
    public boolean charge(String userId, double amount) {
        System.out.println("[TEST] Fake charge: " + amount);
        return shouldSucceed;
    }
}

// Test — fast, isolated, no external systems needed
OrderService service = new OrderService(
    new FakePaymentGateway(true),
    new FakeInventory(),
    new FakeNotifier(),
    new FakeRepository()
);
```

---

### 🔹 Quick Mental Model

```
WITHOUT DI                        WITH DI
───────────                       ────────
Class creates its own deps        Deps pushed in from outside
Tightly coupled                   Loosely coupled
Hard to test                      Easy to test with fakes
Hard to swap implementations      Swap by changing one line

The 3 types:
──────────────────────────────────────────
Constructor injection  → required deps, preferred ✅
Setter injection       → optional deps, use sparingly ⚠️
Interface injection    → framework-driven, rare 🔧
```

---

## Step 10 — Creational Design Patterns <a name="step-10"></a>

> **User:** start step 10

```
Singleton  — ensure only ONE instance exists
Factory    — let a method decide which object to create
Builder    — construct complex objects step by step
```

---

## 🔹 1. Singleton Pattern

```java
public class AppConfig {
    private static volatile AppConfig instance;

    private AppConfig() {
        System.out.println("Loading config...");
    }

    public static AppConfig getInstance() {
        if (instance == null) {
            synchronized (AppConfig.class) {
                if (instance == null) {
                    instance = new AppConfig();
                }
            }
        }
        return instance;
    }
}

AppConfig c1 = AppConfig.getInstance();
AppConfig c2 = AppConfig.getInstance();
System.out.println(c1 == c2); // true ✅
```

**Cleanest Singleton — Enum:**
```java
public enum DatabaseConnection {
    INSTANCE;

    DatabaseConnection() {
        System.out.println("DB connection pool initialized");
    }

    public void connect() { System.out.println("Connected"); }
}

DatabaseConnection.INSTANCE.connect();
```

---

## 🔹 2. Factory Pattern

**Simple Factory:**
```java
public interface Notification {
    void send(String recipient, String message);
}

public class EmailNotification implements Notification {
    @Override public void send(String r, String m) { System.out.println("📧 Email → " + r + ": " + m); }
}

public class SMSNotification implements Notification {
    @Override public void send(String r, String m) { System.out.println("📱 SMS → " + r + ": " + m); }
}

public class PushNotification implements Notification {
    @Override public void send(String r, String m) { System.out.println("🔔 Push → " + r + ": " + m); }
}

public class NotificationFactory {
    public static Notification create(String type) {
        return switch (type.toUpperCase()) {
            case "EMAIL" -> new EmailNotification();
            case "SMS"   -> new SMSNotification();
            case "PUSH"  -> new PushNotification();
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }
}

Notification n1 = NotificationFactory.create("EMAIL");
n1.send("ali@example.com", "Welcome!");
```

---

## 🔹 3. Builder Pattern

```java
public class User {
    private final String firstName;
    private final String lastName;
    private final String email;
    private final String phone;
    private final int age;
    private final String city;
    private final boolean emailVerified;
    private final String role;

    private User(Builder builder) {
        this.firstName     = builder.firstName;
        this.lastName      = builder.lastName;
        this.email         = builder.email;
        this.phone         = builder.phone;
        this.age           = builder.age;
        this.city          = builder.city;
        this.emailVerified = builder.emailVerified;
        this.role          = builder.role;
    }

    public static class Builder {
        private final String firstName;
        private final String lastName;
        private final String email;

        private String phone          = null;
        private int age               = 0;
        private String city           = "Unknown";
        private boolean emailVerified = false;
        private String role           = "USER";

        public Builder(String firstName, String lastName, String email) {
            this.firstName = firstName;
            this.lastName  = lastName;
            this.email     = email;
        }

        public Builder phone(String phone)               { this.phone = phone; return this; }
        public Builder age(int age)                      { this.age = age; return this; }
        public Builder city(String city)                 { this.city = city; return this; }
        public Builder emailVerified(boolean v)          { this.emailVerified = v; return this; }
        public Builder role(String role)                 { this.role = role; return this; }

        public User build() {
            if (firstName.isBlank() || email.isBlank())
                throw new IllegalStateException("Name and email are required");
            return new User(this);
        }
    }
}

// Usage
User admin = new User.Builder("Ali", "Hassan", "ali@example.com")
    .phone("+201234567890")
    .age(28)
    .city("Cairo")
    .emailVerified(true)
    .role("ADMIN")
    .build();

User guest = new User.Builder("Sara", "Ahmed", "sara@example.com")
    .build();
```

---

### 🔹 Quick Cheat Sheet

```
SINGLETON                 FACTORY                   BUILDER
─────────                 ───────                   ───────
One instance only         Centralize 'new'           Step-by-step construction
Private constructor       Caller picks type          Many optional fields
Static getInstance()      Factory picks class        Method chaining
                                                     .build() at the end
```

---

## Step 11 — Structural Design Patterns <a name="step-11"></a>

> **User:** start step 11

```
Adapter   — make incompatible interfaces work together
Decorator — add behavior to objects without changing their class
Facade    — provide a simple interface to a complex subsystem
```

---

## 🔹 1. Adapter Pattern

```java
// Your system expects this interface
public interface MediaPlayer {
    void play(String filename);
    void pause();
    void stop();
}

// Third-party library — you can't change this
public class ThirdPartyAudioLib {
    public void startAudio(String path)  { System.out.println("🎵 ThirdParty: starting " + path); }
    public void suspendAudio()           { System.out.println("⏸ ThirdParty: suspended"); }
    public void terminateAudio()         { System.out.println("⏹ ThirdParty: terminated"); }
}

// Adapter bridges the gap
public class AudioLibAdapter implements MediaPlayer {
    private final ThirdPartyAudioLib library;

    public AudioLibAdapter(ThirdPartyAudioLib library) { this.library = library; }

    @Override public void play(String filename) { library.startAudio(filename); }
    @Override public void pause()               { library.suspendAudio(); }
    @Override public void stop()                { library.terminateAudio(); }
}

MediaPlayer player = new AudioLibAdapter(new ThirdPartyAudioLib());
player.play("song.mp3");
player.pause();
player.stop();
```

---

## 🔹 2. Decorator Pattern

```java
public interface Coffee {
    String getDescription();
    double getCost();
}

public class SimpleCoffee implements Coffee {
    @Override public String getDescription() { return "Coffee"; }
    @Override public double getCost()        { return 10.0; }
}

public abstract class CoffeeDecorator implements Coffee {
    protected final Coffee coffee;
    public CoffeeDecorator(Coffee coffee) { this.coffee = coffee; }
    @Override public String getDescription() { return coffee.getDescription(); }
    @Override public double getCost()        { return coffee.getCost(); }
}

public class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) { super(coffee); }
    @Override public String getDescription() { return coffee.getDescription() + ", Milk"; }
    @Override public double getCost()        { return coffee.getCost() + 2.0; }
}

public class CaramelDecorator extends CoffeeDecorator {
    public CaramelDecorator(Coffee coffee) { super(coffee); }
    @Override public String getDescription() { return coffee.getDescription() + ", Caramel"; }
    @Override public double getCost()        { return coffee.getCost() + 5.0; }
}

// Stack decorators in any order, any combination
Coffee fancy = new CaramelDecorator(new MilkDecorator(new SimpleCoffee()));
System.out.println(fancy.getDescription() + " → $" + fancy.getCost());
// Coffee, Milk, Caramel → $17.0
```

---

## 🔹 3. Facade Pattern

```java
public class HomeTheaterFacade {
    private final VideoDecoder   video;
    private final AudioProcessor audio;
    private final StreamManager  stream;
    private final SubtitleEngine subtitles;

    public HomeTheaterFacade() {
        this.video     = new VideoDecoder();
        this.audio     = new AudioProcessor();
        this.stream    = new StreamManager();
        this.subtitles = new SubtitleEngine();
    }

    public void watchMovie(String url, boolean withSubtitles) {
        System.out.println("🎬 Starting movie...");
        video.initialize();
        video.setResolution(1920, 1080);
        audio.initialize();
        audio.setVolume(60);
        audio.enableSurroundSound();
        subtitles.loadLanguage("EN");
        if (withSubtitles) subtitles.enable();
        stream.connect(url);
        stream.startBuffering();
        stream.startPlayback();
        video.decode(url);
        System.out.println("✅ Enjoy your movie!");
    }

    public void stopMovie() {
        stream.stopPlayback();
        stream.disconnect();
        audio.shutdown();
        video.shutdown();
        subtitles.disable();
    }
}

// Simple to use — all complexity hidden
HomeTheaterFacade theater = new HomeTheaterFacade();
theater.watchMovie("https://cdn.example.com/inception.mp4", true);
theater.stopMovie();
```

---

### 🔹 All 3 Patterns — Side by Side

```
ADAPTER                   DECORATOR                  FACADE
───────                   ─────────                  ──────
Converts an interface     Adds behavior              Simplifies a
to another interface      to an object               complex system

"Make it compatible"      "Give it new powers"       "Make it simple"

Use when:                 Use when:                  Use when:
Working with              Adding optional            Complex subsystem
incompatible APIs         features at runtime        with many moving parts
Third-party libraries     Avoiding class explosion   Providing a clean API
```

---

## Step 12 — Behavioral Design Patterns <a name="step-12"></a>

> **User:** start step 12

```
Strategy  — swap algorithms at runtime
Observer  — notify many objects when something changes
Command   — wrap actions as objects
```

---

## 🔹 1. Strategy Pattern

```java
@FunctionalInterface
public interface SortStrategy {
    void sort(int[] data);
}

public class BubbleSort implements SortStrategy {
    @Override public void sort(int[] data) {
        System.out.println("🫧 Bubble sorting...");
        for (int i = 0; i < data.length - 1; i++)
            for (int j = 0; j < data.length - i - 1; j++)
                if (data[j] > data[j+1]) {
                    int temp = data[j]; data[j] = data[j+1]; data[j+1] = temp;
                }
    }
}

public class QuickSort implements SortStrategy {
    @Override public void sort(int[] data) { System.out.println("⚡ Quick sorting..."); /* ... */ }
}

public class MergeSort implements SortStrategy {
    @Override public void sort(int[] data) { System.out.println("🔀 Merge sorting..."); /* ... */ }
}

public class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) { this.strategy = strategy; }

    public void setStrategy(SortStrategy strategy) { this.strategy = strategy; }

    public void sort(int[] data) { strategy.sort(data); }
}

int[] data = {5, 2, 8, 1, 9, 3};
Sorter sorter = new Sorter(new BubbleSort());
sorter.sort(data);

sorter.setStrategy(new QuickSort()); // swap at runtime
sorter.sort(data);
```

---

## 🔹 2. Observer Pattern

```java
public interface Observer {
    void update(String event, Object data);
}

public class EmailNotificationObserver implements Observer {
    private final String customerEmail;

    public EmailNotificationObserver(String email) { this.customerEmail = email; }

    @Override
    public void update(String event, Object data) {
        Order order = (Order) data;
        System.out.println("  📧 Email → " + customerEmail + ": Order " + order.getOrderId());
    }
}

public class InventoryObserver implements Observer {
    @Override
    public void update(String event, Object data) {
        Order order = (Order) data;
        if (event.equals("ORDER_CONFIRMED"))
            System.out.println("  📦 Inventory: reserving items for " + order.getOrderId());
        else if (event.equals("ORDER_CANCELLED"))
            System.out.println("  📦 Inventory: releasing items for " + order.getOrderId());
    }
}

// Subscribe observers to events
EventManager events = order.getEvents();
events.subscribe("ORDER_CONFIRMED", new EmailNotificationObserver("ali@example.com"));
events.subscribe("ORDER_CONFIRMED", new InventoryObserver());

order.confirm(); // notifies all subscribed observers
```

---

## 🔹 3. Command Pattern

```java
public interface Command {
    void execute();
    void undo();
    String getDescription();
}

public class InsertCommand implements Command {
    private final TextEditor editor;
    private final String text;
    private final int position;

    public InsertCommand(TextEditor editor, String text, int position) {
        this.editor = editor; this.text = text; this.position = position;
    }

    @Override public void execute() { editor.insertText(text, position); }
    @Override public void undo()    { editor.deleteText(position, text.length()); }
    @Override public String getDescription() { return "Insert \"" + text + "\" at position " + position; }
}

public class CommandHistory {
    private final Deque<Command> history  = new ArrayDeque<>();
    private final Deque<Command> redoStack = new ArrayDeque<>();

    public void execute(Command command) {
        command.execute();
        history.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (history.isEmpty()) return;
        Command command = history.pop();
        command.undo();
        redoStack.push(command);
    }

    public void redo() {
        if (redoStack.isEmpty()) return;
        Command command = redoStack.pop();
        command.execute();
        history.push(command);
    }
}
```

---

### 🔹 All 3 Patterns — Side by Side

```
STRATEGY               OBSERVER                COMMAND
────────               ────────                ───────
Swap algorithms        Notify many objects     Wrap requests as
at runtime             when state changes      objects

Use when:              Use when:               Use when:
Multiple ways to       Event-driven systems    Undo/redo needed
do the same thing      Loose coupling          Queue/schedule actions
User picks behavior    UI frameworks           Logging operations
```

---

## Step 13 — Generics with OOP <a name="step-13"></a>

> **User:** start step 13

### 🔹 The Problem Without Generics

```java
public class Box {
    private Object value;
    public void set(Object value) { this.value = value; }
    public Object get() { return value; }
}

Box box = new Box();
box.set("Hello");
Integer num = (Integer) box.get(); // ❌ ClassCastException at RUNTIME
```

### 🔹 The Solution — Generic Class

```java
public class Box<T> {
    private T value;
    public void set(T value) { this.value = value; }
    public T get() { return value; }
}

Box<String>  stringBox = new Box<>();
Box<Integer> intBox    = new Box<>();

stringBox.set("Hello");
intBox.set(42);

String  s = stringBox.get(); // ✅ no cast needed
stringBox.set(123);          // ❌ compile error
```

---

### 🔹 Multiple Type Parameters

```java
public class Pair<K, V> {
    private final K key;
    private final V value;

    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey()   { return key; }
    public V getValue() { return value; }

    public static <K, V> Pair<K, V> of(K key, V value) { return new Pair<>(key, value); }
}

Pair<String, Integer> nameAge = Pair.of("Ali", 28);
Pair<String, String>  cityCode = Pair.of("Cairo", "CAI");
```

---

### 🔹 Bounded Type Parameters

```java
public class NumberBox<T extends Number> {
    private T value;
    public NumberBox(T value) { this.value = value; }
    public double doubleValue() { return value.doubleValue(); }
}

NumberBox<Integer> intBox    = new NumberBox<>(42);
NumberBox<Double>  doubleBox = new NumberBox<>(3.14);
// NumberBox<String> ❌ compile error
```

---

### 🔹 Wildcards — PECS Rule

```java
// Producer Extends — you READ from it
public static double sumList(List<? extends Number> list) {
    return list.stream().mapToDouble(Number::doubleValue).sum();
}

// Consumer Super — you WRITE to it
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 5; i++) list.add(i);
}
```

> 🧠 **PECS:** Producer Extends, Consumer Super. Pull data OUT → `extends`. Push data IN → `super`.

---

### 🔹 Generic Repository Pattern

```java
public interface Repository<T, ID> {
    void save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    void delete(ID id);
    boolean exists(ID id);
}

public abstract class InMemoryRepository<T, ID> implements Repository<T, ID> {
    protected final Map<ID, T> store = new HashMap<>();
    protected abstract ID getId(T entity);

    @Override public void save(T entity)                    { store.put(getId(entity), entity); }
    @Override public Optional<T> findById(ID id)            { return Optional.ofNullable(store.get(id)); }
    @Override public List<T> findAll()                      { return new ArrayList<>(store.values()); }
    @Override public void delete(ID id)                     { store.remove(id); }
    @Override public boolean exists(ID id)                  { return store.containsKey(id); }
}

public class UserRepository extends InMemoryRepository<User, Integer> {
    @Override protected Integer getId(User user) { return user.getId(); }

    public Optional<User> findByEmail(String email) {
        return store.values().stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst();
    }
}
```

---

### 🔹 Type Erasure

```java
Box<String>  stringBox = new Box<>();
Box<Integer> intBox    = new Box<>();

// At RUNTIME — both are just Box
System.out.println(stringBox.getClass() == intBox.getClass()); // true!

// Can't do at runtime:
// new T()               ❌
// new T[]               ❌
// instanceof Box<String> ❌
// T.class               ❌
```

---

## Step 14 — Enums as Objects <a name="step-14"></a>

> **User:** start step 14

### 🔹 Enums Are Full Classes

```java
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS  (4.869e+24, 6.0518e6),
    EARTH  (5.976e+24, 6.37814e6),
    MARS   (6.421e+23, 3.3972e6);

    private final double mass;
    private final double radius;
    static final double G = 6.67300E-11;

    Planet(double mass, double radius) { this.mass = mass; this.radius = radius; }

    public double surfaceGravity() { return G * mass / (radius * radius); }
    public double surfaceWeight(double otherMass) { return otherMass * surfaceGravity(); }
}

double earthWeight = 75.0;
double mass = earthWeight / Planet.EARTH.surfaceGravity();

for (Planet p : Planet.values()) {
    System.out.printf("  %-10s → %.2f kg%n", p, p.surfaceWeight(mass));
}
```

---

### 🔹 Enums With Abstract Methods

```java
public enum Operation {
    ADD("+") {
        @Override public double apply(double x, double y) { return x + y; }
    },
    SUBTRACT("-") {
        @Override public double apply(double x, double y) { return x - y; }
    },
    MULTIPLY("×") {
        @Override public double apply(double x, double y) { return x * y; }
    },
    DIVIDE("÷") {
        @Override public double apply(double x, double y) {
            if (y == 0) throw new ArithmeticException("Cannot divide by zero");
            return x / y;
        }
    };

    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }

    public abstract double apply(double x, double y);
    public String getSymbol() { return symbol; }
}

for (Operation op : Operation.values()) {
    System.out.println(op + ": " + op.apply(10, 3));
}
```

---

### 🔹 Enums Implementing Interfaces

```java
public enum CustomerTier implements Discountable {
    BRONZE("Bronze", 0.0) {
        @Override public double applyDiscount(double price) { return price; }
    },
    SILVER("Silver", 0.10) {
        @Override public double applyDiscount(double price) { return price * 0.90; }
    },
    GOLD("Gold", 0.20) {
        @Override public double applyDiscount(double price) { return price * 0.80; }
    },
    PLATINUM("Platinum", 0.35) {
        @Override public double applyDiscount(double price) { return price * 0.65; }
    };

    private final String label;
    private final double discountRate;

    CustomerTier(String label, double discountRate) {
        this.label = label; this.discountRate = discountRate;
    }

    @Override public String getDescription() {
        return label + " (" + (int)(discountRate * 100) + "% off)";
    }

    public CustomerTier nextTier() {
        CustomerTier[] tiers = values();
        int next = this.ordinal() + 1;
        return (next < tiers.length) ? tiers[next] : this;
    }
}
```

---

### 🔹 EnumMap and EnumSet

```java
EnumMap<Day, String> schedule = new EnumMap<>(Day.class);
schedule.put(Day.MONDAY, "Team standup at 9am");

EnumSet<Day> workdays = EnumSet.range(Day.MONDAY, Day.FRIDAY);
EnumSet<Day> weekend  = EnumSet.of(Day.SATURDAY, Day.SUNDAY);
```

---

### 🔹 Enum as State Machine

```java
public enum OrderStatus {
    PENDING {
        @Override public OrderStatus next() { return CONFIRMED; }
        @Override public boolean canTransitionTo(OrderStatus t) { return t == CONFIRMED || t == CANCELLED; }
    },
    CONFIRMED {
        @Override public OrderStatus next() { return PROCESSING; }
        @Override public boolean canTransitionTo(OrderStatus t) { return t == PROCESSING || t == CANCELLED; }
    },
    SHIPPED {
        @Override public OrderStatus next() { return DELIVERED; }
        @Override public boolean canTransitionTo(OrderStatus t) { return t == DELIVERED; }
    },
    DELIVERED {
        @Override public OrderStatus next() { return this; }
        @Override public boolean canTransitionTo(OrderStatus t) { return false; }
    },
    CANCELLED {
        @Override public OrderStatus next() { return this; }
        @Override public boolean canTransitionTo(OrderStatus t) { return false; }
    };

    public abstract OrderStatus next();
    public abstract boolean canTransitionTo(OrderStatus target);
    public boolean isTerminal() { return this == DELIVERED || this == CANCELLED; }
}
```

---

### 🔹 Built-In Enum Methods

```java
Season.SUMMER.name();       // "SUMMER"
Season.AUTUMN.ordinal();    // 2
Season.valueOf("WINTER");   // Season.WINTER
Season.values();            // all values as array
```

---

## Step 15 — Inner Classes & Anonymous Classes <a name="step-15"></a>

> **User:** start step 15

### 🔹 The 4 Types

```
1. Inner Class (non-static)      — tied to an instance of the outer class
2. Static Nested Class           — lives inside outer class, but independent
3. Local Class                   — defined inside a method
4. Anonymous Class               — defined and instantiated in one expression
```

---

### 🔹 1. Inner Class (Non-Static)

```java
public class BankAccount {
    private String owner;
    private double balance;
    private List<String> transactionLog = new ArrayList<>();

    // Inner class — has full access to BankAccount's private members
    public class Statement {
        private final String period;

        public Statement(String period) { this.period = period; }

        public void print() {
            System.out.println("══ Statement for " + owner + " ══");
            System.out.println("Period:  " + period);
            System.out.println("Balance: $" + balance);
            transactionLog.forEach(t -> System.out.println("  " + t));
        }

        public BankAccount getAccount() {
            return BankAccount.this; // access outer instance explicitly
        }
    }
}

BankAccount account = new BankAccount("Ali Hassan", 1000.0);
BankAccount.Statement stmt = account.generateStatement("April 2026");
stmt.print();
```

---

### 🔹 2. Static Nested Class

```java
public class HttpRequest {
    private final String method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder builder) { /* ... */ }

    // Static nested class — NO outer instance needed
    public static class Builder {
        private String method = "GET";
        private String url;
        private Map<String, String> headers = new HashMap<>();
        private String body;

        public Builder(String url) { this.url = url; }

        public Builder method(String method) { this.method = method; return this; }
        public Builder header(String k, String v) { headers.put(k, v); return this; }
        public Builder body(String body)   { this.method = "POST"; this.body = body; return this; }

        public HttpRequest build() { return new HttpRequest(this); }
    }
}

HttpRequest request = new HttpRequest.Builder("https://api.example.com/users")
    .header("Authorization", "Bearer token123")
    .build();
```

---

### 🔹 3. Local Class

```java
public void generateReport(List<String> data, String format) {

    class Formatter {
        private final String separator;
        Formatter(String separator) { this.separator = separator; }

        String formatLine(String line) {
            return "[" + format + "] " + separator + " " + line + " " + separator;
        }
    }

    new Formatter("▌").printAll(data);
}
```

---

### 🔹 4. Anonymous Classes

```java
Greeting formal = new Greeting() {
    @Override
    public void greet(String name) {
        System.out.println("Good day, " + name + ". How do you do?");
    }
};

// Anonymous class with state
bus.on("user.login", new EventListener() {
    private int loginCount = 0;

    @Override
    public void onEvent(String eventType, Object data) {
        loginCount++;
        System.out.println("  🔐 User logged in: " + data + " (total: " + loginCount + ")");
    }
});
```

---

### 🔹 Anonymous Classes vs Lambdas

```java
// Verbose — anonymous class
Comparator<String> byLength1 = new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return Integer.compare(a.length(), b.length());
    }
};

// Concise — lambda
Comparator<String> byLength2 = (a, b) -> Integer.compare(a.length(), b.length());

// Use anonymous classes when:
// 1. The interface has multiple methods
// 2. You need STATE (fields) in the implementation
// 3. You're extending an abstract CLASS
```

---

### 🔹 The Effectively Final Rule

```java
public void process(String prefix) {
    String separator = "──"; // effectively final

    Greeting g = new Greeting() {
        @Override
        public void greet(String name) {
            System.out.println(separator + " " + prefix + ": " + name); // ✅
        }
    };
}
```

---

### 🔹 All 4 Types — When to Use Which

```
INNER CLASS (non-static)
  ✅ Needs access to outer instance state
  ✅ Tightly coupled helper (Iterator, Statement, View)

STATIC NESTED CLASS
  ✅ Logically grouped but independently usable
  ✅ Builder, Node, Entry, Config classes

LOCAL CLASS
  ✅ Complex one-off logic inside a method

ANONYMOUS CLASS
  ✅ One-off interface/abstract class implementation
  ✅ Event handlers and callbacks with state
  ❌ If it's a functional interface → use lambda
```

---

## Step 16 — Functional Interfaces & Lambdas in OOP <a name="step-16"></a>

> **User:** start step 16

### 🔹 What is a Functional Interface?

```java
@FunctionalInterface
public interface Transformer {
    String transform(String input); // exactly one abstract method

    default Transformer andThen(Transformer next) {
        return input -> next.transform(this.transform(input));
    }
}
```

---

### 🔹 Lambda = Anonymous Class, Simplified

```java
// These are ALL equivalent:
Transformer upper1 = new Transformer() {
    @Override public String transform(String input) { return input.toUpperCase(); }
};

Transformer upper2 = (String input) -> { return input.toUpperCase(); };
Transformer upper3 = (input) -> input.toUpperCase();
Transformer upper4 = input -> input.toUpperCase();
Transformer upper5 = String::toUpperCase; // method reference
```

---

### 🔹 Java's Built-In Functional Interfaces

```java
// Function<T, R> — takes T, returns R
Function<String, Integer> strLength = String::length;

// BiFunction<T, U, R> — takes T and U, returns R
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);

// Predicate<T> — takes T, returns boolean
Predicate<String> isLong      = s -> s.length() > 5;
Predicate<String> startsWithA = s -> s.startsWith("A");
Predicate<String> combined    = isLong.and(startsWithA);

// Consumer<T> — takes T, returns nothing
Consumer<String> printer = System.out::println;
Consumer<String> logger  = s -> System.out.println("[LOG] " + s);
Consumer<String> both    = printer.andThen(logger);

// Supplier<T> — takes nothing, returns T
Supplier<String> greeting = () -> "Hello, World!";

// UnaryOperator<T> — same type in and out
UnaryOperator<String> trim  = String::trim;
UnaryOperator<String> upper = String::toUpperCase;

// BinaryOperator<T>
BinaryOperator<Integer> add = Integer::sum;
```

---

### 🔹 Method References — 4 Types

```java
// Type 1 — Static method reference
Function<String, Integer> parse = Integer::parseInt;

// Type 2 — Instance method on a specific instance
String prefix = "Hello, ";
UnaryOperator<String> greet = prefix::concat;

// Type 3 — Instance method on an arbitrary instance of a type
Function<String, String> upper = String::toUpperCase;

// Type 4 — Constructor reference
Function<String, StringBuilder> sbFactory = StringBuilder::new;
```

---

### 🔹 Function Composition — Building Pipelines

```java
Function<String, String> trim       = String::trim;
Function<String, String> lower      = String::toLowerCase;
Function<String, String> removeDots = s -> s.replace(".", "");
Function<String, String> addPrefix  = s -> "user_" + s;

Function<String, String> normalize = trim
    .andThen(lower)
    .andThen(removeDots)
    .andThen(addPrefix);

System.out.println(normalize.apply("  Ali.Hassan  ")); // user_alihassan
```

---

### 🔹 Lambdas in OOP — Strategy Pattern Simplified

```java
@FunctionalInterface
public interface ValidationRule<T> {
    boolean validate(T value);

    default ValidationRule<T> and(ValidationRule<T> other)  { return value -> this.validate(value) && other.validate(value); }
    default ValidationRule<T> or(ValidationRule<T> other)   { return value -> this.validate(value) || other.validate(value); }
    default ValidationRule<T> negate()                      { return value -> !this.validate(value); }
}

Validator<String> passwordValidator = new Validator<String>()
    .addRule("Must be at least 8 characters",  s -> s.length() >= 8)
    .addRule("Must contain uppercase letter",   s -> s.chars().anyMatch(Character::isUpperCase))
    .addRule("Must contain a digit",            s -> s.chars().anyMatch(Character::isDigit))
    .addRule("Must contain special character",  s -> s.chars().anyMatch(c -> "!@#$%^&*".indexOf(c) >= 0))
    .addRule("Must not contain spaces",         s -> !s.contains(" "));
```

---

### 🔹 Lambdas in OOP — Observer Pattern Simplified

```java
EventBus bus = new EventBus();

// Lambdas replace anonymous classes completely ✅
bus.on("user.login",   (String email)  -> System.out.println("  🔐 Login: " + email));
bus.on("user.login",   (String email)  -> System.out.println("  📝 Audit: " + email));
bus.on("order.placed", (Double amount) -> System.out.println("  💰 Sale: $" + amount));
```

---

### 🔹 Generic Pipeline with Lambdas

```java
public class Pipeline<T> {
    private final List<Function<T, T>> steps = new ArrayList<>();

    public Pipeline<T> addStep(String name, Function<T, T> step) {
        steps.add(value -> {
            T result = step.apply(value);
            System.out.println("  [" + name + "]: " + value + " → " + result);
            return result;
        });
        return this;
    }

    public T execute(T input) {
        T result = input;
        for (Function<T, T> step : steps) result = step.apply(result);
        return result;
    }
}

Pipeline<String> pipeline = new Pipeline<String>()
    .addStep("Trim",      String::trim)
    .addStep("Lowercase", String::toLowerCase)
    .addStep("Sanitize",  s -> s.replaceAll("[^a-z0-9]", "_"))
    .addStep("Prefix",    s -> "usr_" + s);

pipeline.execute("  Ali Hassan! ");
```

---

### 🔹 When to Use Lambdas vs Named Classes

```
USE A LAMBDA WHEN:                 USE A NAMED CLASS WHEN:
──────────────────                 ─────────────────────────
Single abstract method             Multiple methods needed
Simple, one-line logic             Complex logic (10+ lines)
No reuse needed                    Reused in multiple places
No state needed                    Needs its own fields/state
Passed as parameter                Needs a meaningful name
Inline callback                    Part of a class hierarchy
```

---

## ✅ Complete OOP Mastery Roadmap — All Steps Done!

```
✅ Step 1  — Classes & Objects Internals
✅ Step 2  — Access Modifiers & Encapsulation
✅ Step 3  — The final Keyword
✅ Step 4  — Association, Aggregation & Composition
✅ Step 5  — Inheritance Deep Dive
✅ Step 6  — Interfaces vs Abstract Classes
✅ Step 7  — SOLID Principles
✅ Step 8  — Favor Composition over Inheritance
✅ Step 9  — Dependency Injection
✅ Step 10 — Creational Patterns (Singleton, Factory, Builder)
✅ Step 11 — Structural Patterns (Adapter, Decorator, Facade)
✅ Step 12 — Behavioral Patterns (Strategy, Observer, Command)
✅ Step 13 — Generics with OOP
✅ Step 14 — Enums as Objects
✅ Step 15 — Inner Classes & Anonymous Classes
✅ Step 16 — Functional Interfaces & Lambdas in OOP
```

---

## What's Next — Where to Go From Here

### PRACTICE
1. Build a project from scratch applying SOLID
2. Refactor old code — spot SRP/OCP violations
3. Implement every design pattern from memory
4. Read source code — Java's Collections, Spring

### DEEPEN
1. Streams API — map, filter, reduce, collect
2. Optional\<T\> — avoiding null properly
3. Concurrency & OOP — synchronized, locks
4. Spring Framework — DI at scale
5. Domain-Driven Design (DDD)

### CHALLENGE YOURSELF
Build these from scratch:
- A generic type-safe event bus
- A mini dependency injection container
- A simple ORM (Object-Relational Mapper)
- A plugin system using interfaces & reflection
