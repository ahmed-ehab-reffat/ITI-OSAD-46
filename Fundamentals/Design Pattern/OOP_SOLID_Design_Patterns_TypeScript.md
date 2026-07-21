# OOP Mastery in TypeScript — Full Guide
> A complete step-by-step guide covering everything you need to master Object-Oriented Programming in TypeScript, adapted from Java with TypeScript-specific patterns and idioms.

---

## Table of Contents
1. [OOP Mastery Roadmap](#roadmap)
2. [Step 1 — Classes & Objects Internals](#step-1)
3. [Step 2 — Access Modifiers & Encapsulation](#step-2)
4. [Step 3 — The `readonly` Keyword](#step-3)
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
16. [Step 15 — Advanced TypeScript OOP Features](#step-15)
17. [Step 16 — Functional Patterns & Lambdas in OOP](#step-16)

---

## OOP Mastery Roadmap <a name="roadmap"></a>

Here's everything you need to master OOP in TypeScript, beyond the 4 pillars:

### 🧱 Foundation (Deeper than basics)
1. Classes & Objects internals — `this`, constructors, parameter properties, static vs instance
2. Access modifiers & encapsulation done right
3. The `readonly` keyword — fields and parameters

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

### ⚙️ TypeScript-Specific OOP
13. Generics with OOP
14. Enums as objects
15. Advanced features — Mixins, Declaration Merging, Index Signatures
16. Functional patterns & arrow functions in OOP context

---

## Step 1 — Classes & Objects Internals <a name="step-1"></a>

### 🔹 The `this` Keyword

`this` refers to **the current object**. It has the same uses as Java, but with one important TypeScript gotcha.

**Use 1 — Resolve naming conflicts**
```typescript
class Person {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name; // "this.name" = field, "name" = parameter
    this.age = age;
  }
}
```

**TypeScript Shorthand — Parameter Properties**

TypeScript lets you declare and assign fields directly in the constructor parameters:
```typescript
class Person {
  constructor(
    private name: string,
    private age: number,
    public country: string = "Unknown"
  ) {}
  // TypeScript auto-creates: this.name, this.age, this.country

  describe(): string {
    return `${this.name}, age ${this.age}, from ${this.country}`;
  }
}

const p1 = new Person("Ali", 25);
const p2 = new Person("Sara", 30, "Egypt");
console.log(p1.describe()); // Ali, age 25, from Unknown
console.log(p2.describe()); // Sara, age 30, from Egypt
```

**Use 2 — Pass the current object to another method**
```typescript
class Person {
  constructor(private name: string) {}

  register(): void {
    Database.save(this); // passing itself
  }
}
```

**⚠️ The `this` Binding Problem (TypeScript-specific)**

Unlike Java, TypeScript `this` can be lost when passing methods as callbacks:
```typescript
class Timer {
  private count = 0;

  // ❌ Regular method loses `this` in callbacks
  increment(): void {
    this.count++;
  }

  // ✅ Arrow function preserves `this` via closure
  incrementArrow = (): void => {
    this.count++;
  };
}

const t = new Timer();

// ❌ `this` is lost — count won't increment
setTimeout(t.increment, 1000);

// ✅ `this` is preserved
setTimeout(t.incrementArrow, 1000);

// ✅ Or bind explicitly
setTimeout(t.increment.bind(t), 1000);
```

> 🧠 **Rule:** If a method will be used as a callback or event handler, use an arrow function property.

---

### 🔹 Static vs Instance

| | **Instance** | **Static** |
|---|---|---|
| Belongs to | Each object | The class itself |
| Access via | `object.method()` | `ClassName.method()` |
| Can access | instance + static members | static members **only** |

```typescript
class Counter {
  private count: number = 0;        // instance — each object has its own
  private static total: number = 0; // static — shared across ALL objects

  constructor() {
    Counter.total++; // every time a new Counter is created
  }

  increment(): void {
    this.count++; // only this object's count
  }

  getCount(): number { return this.count; }
  static getTotal(): number { return Counter.total; }
}

const c1 = new Counter();
const c2 = new Counter();
c1.increment();
c1.increment();
c2.increment();

console.log(c1.getCount());      // 2
console.log(c2.getCount());      // 1
console.log(Counter.getTotal()); // 2 (two objects were created)
```

---

### 🔹 Constructor Chaining with `super()`

When a child class is instantiated, **the parent constructor always runs first**.

```typescript
class Animal {
  constructor(private name: string) {
    console.log(`Animal created: ${name}`);
  }
}

class Dog extends Animal {
  constructor(name: string, private breed: string) {
    super(name); // MUST be called before accessing `this`
    console.log(`Dog created: ${breed}`);
  }
}

new Dog("Rex", "Husky");
// Animal created: Rex
// Dog created: Husky
```

> ⚠️ In TypeScript, you **must** call `super()` before accessing `this` in a derived class constructor. The compiler enforces this.

---

## Step 2 — Access Modifiers & Encapsulation Done Right <a name="step-2"></a>

### 🔹 TypeScript's Access Modifiers

| Modifier | Same Class | Subclass | Everywhere |
|---|---|---|---|
| `private` | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ❌ |
| `public` *(default)* | ✅ | ✅ | ✅ |

> 🧠 **TypeScript also has `#` for true private fields** (ECMAScript private), which are enforced at runtime, not just compile-time. `private` keyword is TypeScript-only and erased at runtime.

```typescript
class Secret {
  private tsPrivate = "TS only";   // Erased at runtime — not truly private in JS
  #jsPrivate = "Truly private";    // ECMAScript private — enforced at runtime

  getTs(): string { return this.tsPrivate; }
  getJs(): string { return this.#jsPrivate; }
}

const s = new Secret();
// (s as any).tsPrivate  → accessible at runtime! (TS doesn't stop JS)
// s.#jsPrivate          → SyntaxError at runtime ✅
```

---

### 🔹 Encapsulation — Beyond Getters & Setters

**Bad encapsulation (mechanical, pointless):**
```typescript
class BankAccount {
  private balance: number = 0;

  getBalance(): number { return this.balance; }

  // This setter provides zero protection
  setBalance(balance: number): void {
    this.balance = balance; // anyone can set balance to -99999
  }
}
```

**Real encapsulation — the class protects its own state:**
```typescript
class BankAccount {
  private balance: number;

  constructor(private owner: string, initialDeposit: number) {
    if (initialDeposit < 0) throw new Error("Initial deposit can't be negative");
    this.balance = initialDeposit;
  }

  // No setter for balance — only valid operations allowed
  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error("Amount must be positive");
    if (amount > this.balance) throw new Error("Insufficient funds");
    this.balance -= amount;
  }

  getBalance(): number { return this.balance; }
}
```

---

### 🔹 TypeScript Getters & Setters (Property Accessors)

TypeScript has a cleaner syntax for getters and setters than Java:

```typescript
class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  // Getter — accessed like a property: temp.fahrenheit
  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }

  // Setter — with validation
  set celsius(value: number) {
    if (value < -273.15) throw new Error("Temperature below absolute zero!");
    this._celsius = value;
  }

  get celsius(): number {
    return this._celsius;
  }
}

const temp = new Temperature(100);
console.log(temp.fahrenheit); // 212
temp.celsius = 0;
console.log(temp.fahrenheit); // 32
```

---

### 🔹 Immutability in TypeScript

```typescript
// Immutable Point using readonly
class Point {
  constructor(
    readonly x: number,
    readonly y: number
  ) {}

  // Instead of mutating, return a NEW object
  translate(dx: number, dy: number): Point {
    return new Point(this.x + dx, this.y + dy);
  }

  toString(): string {
    return `Point(${this.x}, ${this.y})`;
  }
}

const p1 = new Point(2, 3);
const p2 = p1.translate(1, 1); // p1 is untouched
// p1.x = 5; ❌ compile error

console.log(p1.toString()); // Point(2, 3)
console.log(p2.toString()); // Point(3, 4)
```

**Readonly arrays (equivalent to Java's unmodifiable list):**
```typescript
class Classroom {
  private readonly students: ReadonlyArray<string>;

  constructor(students: string[]) {
    this.students = [...students]; // store a copy
  }

  getStudents(): ReadonlyArray<string> {
    return this.students; // ReadonlyArray prevents mutations
  }
}

const classroom = new Classroom(["Ali", "Sara"]);
// classroom.getStudents().push("Hacker"); ❌ compile error
```

---

## Step 3 — The `readonly` Keyword <a name="step-3"></a>

`readonly` in TypeScript is the equivalent of Java's `final` for fields. TypeScript doesn't have `final` classes or methods, but achieves similar effects differently.

### 🔹 `readonly` Fields

```typescript
class Circle {
  static readonly PI = 3.14159265; // constant — class-level
  readonly radius: number;         // set once in constructor

  constructor(radius: number) {
    if (radius <= 0) throw new Error("Radius must be positive");
    this.radius = radius;
    // this.radius = 5; ❌ compile error after initial assignment
  }

  area(): number {
    return Circle.PI * this.radius * this.radius;
  }

  circumference(): number {
    return 2 * Circle.PI * this.radius;
  }
}
```

> 🧠 Like Java's `final`, `readonly` locks the **reference**, not the object. A `readonly` array can still have its contents mutated unless you use `ReadonlyArray<T>`.

---

### 🔹 Preventing Extension — TypeScript Alternatives

TypeScript doesn't have a `final` class keyword. Instead:

```typescript
// Option 1: Use a class with a private constructor (can't be new'd or extended)
class Token {
  private constructor(
    readonly value: string,
    readonly expiresAt: number
  ) {}

  static create(value: string, ttlMs: number): Token {
    return new Token(value, Date.now() + ttlMs);
  }

  isExpired(): boolean {
    return Date.now() > this.expiresAt;
  }
}

// Option 2: Declare intent with a comment + lint rules
/** @sealed */
class Config {
  static readonly MAX_RETRIES = 3;
  static readonly DEFAULT_LANGUAGE = "EN";
  static readonly TAX_RATE = 0.14;
}
```

---

### 🔹 `as const` — Deep Immutability

TypeScript's `as const` makes objects fully immutable at the type level:

```typescript
const CONFIG = {
  MAX_RETRIES: 3,
  DEFAULT_LANGUAGE: "EN",
  TAX_RATE: 0.14,
} as const;

// CONFIG.MAX_RETRIES = 5; ❌ compile error
// Type is: { readonly MAX_RETRIES: 3; readonly DEFAULT_LANGUAGE: "EN"; readonly TAX_RATE: 0.14 }
```

---

## Step 4 — Association, Aggregation & Composition (HAS-A) <a name="step-4"></a>

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

### 🔹 1. Association — "Uses A"

```typescript
class Teacher {
  constructor(private name: string) {}

  teach(student: Student): void {
    console.log(`${this.name} is teaching ${student.getName()}`);
  }
}

class Student {
  constructor(private name: string) {}
  getName(): string { return this.name; }
}

const teacher = new Teacher("Mr. Hassan");
const student = new Student("Ali");
teacher.teach(student); // they interact, neither owns the other
```

### 🔹 2. Aggregation — "Has A" (weak ownership)

```typescript
class Professor {
  constructor(
    private name: string,
    private specialty: string
  ) {}

  getName(): string { return this.name; }
  getSpecialty(): string { return this.specialty; }
}

class Department {
  private professors: Professor[] = [];

  constructor(private name: string) {}

  addProfessor(p: Professor): void {
    this.professors.push(p);
  }

  listProfessors(): void {
    console.log(`Department: ${this.name}`);
    this.professors.forEach(p =>
      console.log(`  - ${p.getName()} (${p.getSpecialty()})`)
    );
  }
}

const p1 = new Professor("Dr. Mona", "AI");
const p2 = new Professor("Dr. Karim", "Security");

const cs = new Department("Computer Science");
cs.addProfessor(p1);
cs.addProfessor(p2);
cs.listProfessors();

// If 'cs' is gone, p1 and p2 still exist independently ✅
```

### 🔹 3. Composition — "Owns A" (strong ownership)

```typescript
class Room {
  constructor(
    private type: string,
    private size: number
  ) {}

  describe(): string {
    return `${this.type} (${this.size} sqm)`;
  }
}

class House {
  private rooms: Room[];

  constructor(private address: string) {
    // House creates its own rooms — not passed in from outside
    this.rooms = [
      new Room("Living Room", 40),
      new Room("Kitchen", 20),
      new Room("Bedroom", 30),
    ];
  }

  describe(): void {
    console.log(`House at: ${this.address}`);
    this.rooms.forEach(r => console.log(`  - ${r.describe()}`));
  }
}

const house = new House("123 Nile St, Cairo");
house.describe();
// When 'house' is gone, all its rooms are gone too
```

---

## Step 5 — Inheritance Deep Dive <a name="step-5"></a>

### 🔹 Method Overriding

TypeScript uses the `override` keyword (TypeScript 4.3+) to make overriding explicit:

```typescript
class Animal {
  constructor(protected name: string, protected age: number) {}

  describe(): string {
    return `I am an animal named ${this.name}`;
  }

  makeSound(): string {
    return "...";
  }
}

class Dog extends Animal {
  constructor(name: string, age: number, private breed: string) {
    super(name, age);
  }

  override describe(): string {
    return `${super.describe()}, specifically a ${this.breed} dog`;
  }

  override makeSound(): string {
    return "Woof!";
  }
}

const d = new Dog("Rex", 3, "Husky");
console.log(d.describe()); // I am an animal named Rex, specifically a Husky dog
```

> ✅ The `override` keyword makes TypeScript throw an error if you try to override a method that doesn't exist in the parent. This catches typos like `maakeSound()`.

---

### 🔹 Constructor Chaining Across a Full Hierarchy

```typescript
class LivingThing {
  protected alive: boolean = true;

  constructor() {
    console.log("1. LivingThing constructor");
  }
}

class Animal extends LivingThing {
  constructor(protected name: string) {
    super();
    console.log(`2. Animal constructor: ${name}`);
  }
}

class Dog extends Animal {
  constructor(name: string, private breed: string) {
    super(name);
    console.log(`3. Dog constructor: ${breed}`);
  }

  toString(): string {
    return `${this.name} | ${this.breed} | alive: ${this.alive}`;
  }
}

const d = new Dog("Rex", "Husky");
console.log(d.toString());
// 1. LivingThing constructor
// 2. Animal constructor: Rex
// 3. Dog constructor: Husky
// Rex | Husky | alive: true
```

---

### 🔹 Overriding in a Real System

```typescript
class Payment {
  constructor(
    protected amount: number,
    protected currency: string
  ) {}

  validate(): boolean {
    return this.amount > 0;
  }

  process(): string {
    return `Processing ${this.amount} ${this.currency}`;
  }
}

class CreditCardPayment extends Payment {
  constructor(
    amount: number,
    currency: string,
    private cardNumber: string,
    private cvv: string
  ) {
    super(amount, currency);
  }

  override validate(): boolean {
    return super.validate()
      && this.cardNumber.length === 16
      && this.cvv.length === 3;
  }

  override process(): string {
    if (!this.validate()) throw new Error("Invalid payment");
    return `${super.process()} via Credit Card ending in ${this.cardNumber.slice(-4)}`;
  }
}
```

---

## Step 6 — Interfaces vs Abstract Classes <a name="step-6"></a>

> **Abstract class** = what an object **IS**
> **Interface** = what an object **CAN DO** (or the shape of its data)

### 🔹 Abstract Classes

```typescript
abstract class Animal {
  constructor(
    private name: string,
    private age: number
  ) {}

  // Abstract method — no body, MUST be implemented by subclass
  abstract makeSound(): string;

  // Concrete method — inherited as-is
  describe(): string {
    return `${this.name} (age ${this.age}) says: ${this.makeSound()}`;
  }

  getName(): string { return this.name; }
  getAge(): number { return this.age; }
}

class Dog extends Animal {
  override makeSound(): string { return "Woof!"; }
}

class Cat extends Animal {
  override makeSound(): string { return "Meow!"; }
}

const a: Animal = new Dog("Rex", 3);
console.log(a.describe()); // Rex (age 3) says: Woof!
```

---

### 🔹 Interfaces

TypeScript interfaces are more powerful than Java's — they describe the **shape** of any object (not just class instances):

```typescript
interface Playable {
  play(): void;
  pause(): void;
  stop(): void;
}

interface Downloadable {
  download(destination: string): void;
  getFileSizeMB(): number;
}

interface Streamable {
  stream(url: string): void;
  getBitrate(): number;
}

// A class can implement multiple interfaces
abstract class MediaFile {
  constructor(
    private title: string,
    private filePath: string,
    private durationSeconds: number
  ) {}

  abstract load(): void;

  getInfo(): string {
    return `${this.title} [${this.durationSeconds}s] @ ${this.filePath}`;
  }

  getTitle(): string { return this.title; }
}

class VideoFile extends MediaFile implements Playable, Downloadable, Streamable {
  constructor(
    title: string, path: string, duration: number,
    private bitrate: number, private fileSizeMB: number
  ) {
    super(title, path, duration);
  }

  load(): void { console.log(`Loading video: ${this.getTitle()}`); }
  play(): void { console.log(`▶ Playing: ${this.getTitle()}`); }
  pause(): void { console.log(`⏸ Paused: ${this.getTitle()}`); }
  stop(): void { console.log(`⏹ Stopped: ${this.getTitle()}`); }
  download(dest: string): void { console.log(`⬇ Downloading to ${dest}`); }
  getFileSizeMB(): number { return this.fileSizeMB; }
  stream(url: string): void { console.log(`📡 Streaming from ${url}`); }
  getBitrate(): number { return this.bitrate; }
}
```

---

### 🔹 Key TypeScript Difference — Interfaces Describe Data Too

Unlike Java, TypeScript interfaces can describe plain objects, not just class contracts:

```typescript
// Describing data shape (no Java equivalent)
interface User {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "user"; // optional field
}

// Both a class instance AND a plain object satisfy the interface
const userObj: User = { id: 1, name: "Ali", email: "ali@email.com" };
```

---

### 🔹 When to Use Which

```
Abstract Class                    Interface
──────────────                    ─────────
"I am a type of..."               "I am capable of..." or "I have this shape"
Dog IS-A Animal                   Duck CAN swim, fly, run
Shared fields & logic             Pure capability / data contract
Single inheritance only           Mix and match freely — implement many
Use when IS-A is true             Use when CAN-DO or data shape is true
```

---

## Step 7 — SOLID Principles <a name="step-7"></a>

```
S — Single Responsibility Principle (SRP)
O — Open/Closed Principle (OCP)
L — Liskov Substitution Principle (LSP)
I — Interface Segregation Principle (ISP)
D — Dependency Inversion Principle (DIP)
```

### S — Single Responsibility Principle

> **A class should have only ONE reason to change.**

```typescript
// ❌ Bad — one class doing everything
class Employee {
  constructor(private name: string, private salary: number) {}

  getName(): string { return this.name; }
  getSalary(): number { return this.salary; }

  saveToDatabase(): void {
    console.log(`Saving ${this.name} to DB...`); // reason 1: persistence logic
  }

  generatePayslip(): string {
    return `Payslip for: ${this.name} | Salary: ${this.salary}`; // reason 2: reporting
  }

  sendPayslipEmail(): void {
    console.log(`Sending email to ${this.name}`); // reason 3: communication
  }
}

// ✅ Good — each class has one job
class Employee {
  constructor(readonly name: string, readonly salary: number) {}
}

class EmployeeRepository {
  save(e: Employee): void {
    console.log(`Saving ${e.name} to DB...`);
  }
}

class PayslipGenerator {
  generate(e: Employee): string {
    return `Payslip for: ${e.name} | Salary: ${e.salary}`;
  }
}

class EmailService {
  sendPayslip(e: Employee, payslip: string): void {
    console.log(`Sending to ${e.name}: ${payslip}`);
  }
}
```

---

### O — Open/Closed Principle

> **A class should be OPEN for extension, but CLOSED for modification.**

```typescript
// ❌ Bad — adding a new shape means editing existing class
class AreaCalculator {
  calculate(shape: any): number {
    if (shape instanceof Circle) {
      return Math.PI * shape.radius * shape.radius;
    } else if (shape instanceof Rectangle) {
      return shape.width * shape.height;
    }
    // Adding a Pentagon? Edit this file again. ❌
    return 0;
  }
}

// ✅ Good — new shapes extend without touching calculator
interface Shape {
  area(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}
  area(): number { return Math.PI * this.radius * this.radius; }
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }
}

// Pentagon, Triangle, etc. just implement Shape — no changes needed
class AreaCalculator {
  calculate(shape: Shape): number {
    return shape.area(); // works for any Shape, forever ✅
  }
}
```

---

### L — Liskov Substitution Principle

> **Subclasses must be usable wherever the parent is used, without breaking things.**

```typescript
// ❌ Bad — Square violates Rectangle's contract
class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(w: number): void { this.width = w; }
  setHeight(h: number): void { this.height = h; }
  area(): number { return this.width * this.height; }
}

class Square extends Rectangle {
  override setWidth(w: number): void {
    this.width = w;
    this.height = w; // breaks Rectangle's contract!
  }

  override setHeight(h: number): void {
    this.height = h;
    this.width = h; // breaks Rectangle's contract!
  }
}

// This function breaks with Square ❌
function testRectangle(r: Rectangle): void {
  r.setWidth(5);
  r.setHeight(3);
  console.log(r.area()); // expects 15, gets 9 for Square
}

// ✅ Good — model it correctly with interfaces
interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}
  area(): number { return this.width * this.height; }
}

class Square implements Shape {
  constructor(private side: number) {}
  area(): number { return this.side * this.side; }
}
```

---

### I — Interface Segregation Principle

> **Clients shouldn't be forced to depend on methods they don't use.**

```typescript
// ❌ Bad — one fat interface forces unnecessary implementations
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Robot implements Worker {
  work(): void { console.log("Robot working"); }
  eat(): void { throw new Error("Robots don't eat!"); } // forced ❌
  sleep(): void { throw new Error("Robots don't sleep!"); } // forced ❌
}

// ✅ Good — small, focused interfaces
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
}

interface Restable {
  sleep(): void;
}

class Human implements Workable, Feedable, Restable {
  work(): void { console.log("Human working"); }
  eat(): void { console.log("Human eating"); }
  sleep(): void { console.log("Human sleeping"); }
}

class Robot implements Workable {
  work(): void { console.log("Robot working"); } // only what it needs ✅
}
```

---

### D — Dependency Inversion Principle

> **Depend on abstractions, not concrete implementations.**

```typescript
// ❌ Bad — high-level class depends on low-level concrete class
class MySQLDatabase {
  save(data: string): void {
    console.log(`MySQL: saving ${data}`);
  }
}

class UserService {
  private db = new MySQLDatabase(); // tightly coupled ❌

  saveUser(name: string): void {
    this.db.save(name);
  }
}

// ✅ Good — depend on an abstraction
interface Database {
  save(data: string): void;
  find(id: number): string | null;
}

class MySQLDatabase implements Database {
  save(data: string): void { console.log(`MySQL: saving ${data}`); }
  find(id: number): string | null { return `MySQL result for ${id}`; }
}

class MongoDatabase implements Database {
  save(data: string): void { console.log(`MongoDB: saving ${data}`); }
  find(id: number): string | null { return `Mongo result for ${id}`; }
}

class UserService {
  constructor(private db: Database) {} // inject abstraction ✅

  saveUser(name: string): void {
    this.db.save(name);
  }
}

// Usage — swap database without changing UserService
const service1 = new UserService(new MySQLDatabase());
const service2 = new UserService(new MongoDatabase());
```

---

## Step 8 — Favor Composition over Inheritance <a name="step-8"></a>

> **"Has a" is usually better than "Is a".**

```typescript
// ❌ Inheritance — trying to extend a class just to get behavior
class Animal {
  eat(): void { console.log("Eating..."); }
}

class FlyingAnimal extends Animal {
  fly(): void { console.log("Flying..."); }
}

class SwimmingAnimal extends Animal {
  swim(): void { console.log("Swimming..."); }
}

// What about a duck? It eats, flies, AND swims. Impossible with single inheritance.

// ✅ Composition — mix behaviors freely
type Behavior = () => void;

const canEat = (): { eat: Behavior } => ({
  eat: () => console.log("Eating..."),
});

const canFly = (): { fly: Behavior } => ({
  fly: () => console.log("Flying..."),
});

const canSwim = (): { swim: Behavior } => ({
  swim: () => console.log("Swimming..."),
});

// Duck gets all three behaviors via composition
function createDuck(name: string) {
  return {
    name,
    ...canEat(),
    ...canFly(),
    ...canSwim(),
    toString() { return `Duck: ${this.name}`; },
  };
}

const duck = createDuck("Donald");
duck.eat();
duck.fly();
duck.swim();
```

---

## Step 9 — Dependency Injection <a name="step-9"></a>

Dependency Injection (DI) means providing a class's dependencies from outside rather than creating them internally.

```typescript
// Interfaces for abstraction
interface Logger {
  log(message: string): void;
}

interface EmailSender {
  send(to: string, subject: string, body: string): void;
}

// Concrete implementations
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

class SMTPEmailSender implements EmailSender {
  send(to: string, subject: string, body: string): void {
    console.log(`Sending email to ${to}: ${subject}`);
  }
}

// High-level class depends ONLY on abstractions
class OrderService {
  constructor(
    private logger: Logger,
    private emailSender: EmailSender
  ) {}

  placeOrder(userId: string, productId: string): void {
    this.logger.log(`Order placed: user=${userId}, product=${productId}`);
    this.emailSender.send(userId, "Order Confirmed", `Your order for ${productId} is confirmed!`);
  }
}

// Wire up dependencies at the top level
const logger = new ConsoleLogger();
const emailSender = new SMTPEmailSender();
const orderService = new OrderService(logger, emailSender);

orderService.placeOrder("user123", "product456");

// For testing — swap in fake implementations easily
class MockLogger implements Logger {
  logs: string[] = [];
  log(message: string): void { this.logs.push(message); }
}

class MockEmailSender implements EmailSender {
  sentEmails: { to: string; subject: string }[] = [];
  send(to: string, subject: string): void {
    this.sentEmails.push({ to, subject });
  }
}

const mockLogger = new MockLogger();
const mockEmail = new MockEmailSender();
const testService = new OrderService(mockLogger, mockEmail);
testService.placeOrder("u1", "p1");
console.log(mockLogger.logs);     // ["Order placed: user=u1, product=p1"]
console.log(mockEmail.sentEmails); // [{ to: "u1", subject: "Order Confirmed" }]
```

---

## Step 10 — Creational Patterns <a name="step-10"></a>

### 🔹 1. Singleton

Ensures only **one instance** of a class exists.

```typescript
class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private connectionCount = 0;

  private constructor(private url: string) {
    console.log(`Connected to: ${url}`);
  }

  static getInstance(url: string = "default-db"): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection(url);
    }
    return DatabaseConnection.instance;
  }

  query(sql: string): string {
    this.connectionCount++;
    return `Result of [${sql}] (query #${this.connectionCount})`;
  }
}

const db1 = DatabaseConnection.getInstance("postgres://localhost/mydb");
const db2 = DatabaseConnection.getInstance();

console.log(db1 === db2); // true — same instance
console.log(db1.query("SELECT * FROM users"));
console.log(db2.query("SELECT * FROM orders"));
```

> ⚠️ Use Singletons carefully — they make testing harder and can be hidden dependencies. Prefer DI containers in large apps.

---

### 🔹 2. Factory Method

Defines an interface for creating objects, but lets subclasses decide which class to instantiate.

```typescript
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  constructor(private email: string) {}
  send(message: string): void {
    console.log(`📧 Email to ${this.email}: ${message}`);
  }
}

class SMSNotification implements Notification {
  constructor(private phone: string) {}
  send(message: string): void {
    console.log(`📱 SMS to ${this.phone}: ${message}`);
  }
}

class PushNotification implements Notification {
  constructor(private deviceId: string) {}
  send(message: string): void {
    console.log(`🔔 Push to device ${this.deviceId}: ${message}`);
  }
}

// Factory — centralizes creation logic
class NotificationFactory {
  static create(
    type: "email" | "sms" | "push",
    target: string
  ): Notification {
    switch (type) {
      case "email": return new EmailNotification(target);
      case "sms":   return new SMSNotification(target);
      case "push":  return new PushNotification(target);
      default:      throw new Error(`Unknown notification type: ${type}`);
    }
  }
}

// Usage — caller doesn't need to know which class to instantiate
const n1 = NotificationFactory.create("email", "ali@example.com");
const n2 = NotificationFactory.create("sms", "+201012345678");
const n3 = NotificationFactory.create("push", "device-abc-123");

n1.send("Welcome!");
n2.send("Your OTP is 1234");
n3.send("New message from Sara");
```

---

### 🔹 3. Builder

Constructs complex objects step by step.

```typescript
class QueryBuilder {
  private table: string = "";
  private conditions: string[] = [];
  private columns: string[] = ["*"];
  private limitValue: number | null = null;
  private orderByColumn: string | null = null;
  private orderDirection: "ASC" | "DESC" = "ASC";

  from(table: string): this {
    this.table = table;
    return this;
  }

  select(...columns: string[]): this {
    this.columns = columns;
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  limit(n: number): this {
    this.limitValue = n;
    return this;
  }

  orderBy(column: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderByColumn = column;
    this.orderDirection = direction;
    return this;
  }

  build(): string {
    if (!this.table) throw new Error("Table is required");

    let query = `SELECT ${this.columns.join(", ")} FROM ${this.table}`;

    if (this.conditions.length > 0) {
      query += ` WHERE ${this.conditions.join(" AND ")}`;
    }
    if (this.orderByColumn) {
      query += ` ORDER BY ${this.orderByColumn} ${this.orderDirection}`;
    }
    if (this.limitValue !== null) {
      query += ` LIMIT ${this.limitValue}`;
    }

    return query;
  }
}

const query = new QueryBuilder()
  .from("users")
  .select("id", "name", "email")
  .where("age > 18")
  .where("active = true")
  .orderBy("name", "ASC")
  .limit(10)
  .build();

console.log(query);
// SELECT id, name, email FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10
```

---

## Step 11 — Structural Patterns <a name="step-11"></a>

### 🔹 1. Adapter

Makes incompatible interfaces work together.

```typescript
// Third-party logger with a different interface
class ThirdPartyLogger {
  writeLog(level: string, msg: string, timestamp: Date): void {
    console.log(`[${timestamp.toISOString()}] ${level.toUpperCase()}: ${msg}`);
  }
}

// Your app's expected interface
interface AppLogger {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

// Adapter — wraps the third-party logger to match your interface
class LoggerAdapter implements AppLogger {
  constructor(private thirdParty: ThirdPartyLogger) {}

  info(message: string): void {
    this.thirdParty.writeLog("info", message, new Date());
  }

  error(message: string): void {
    this.thirdParty.writeLog("error", message, new Date());
  }

  warn(message: string): void {
    this.thirdParty.writeLog("warn", message, new Date());
  }
}

// Usage — your app only knows about AppLogger
const logger: AppLogger = new LoggerAdapter(new ThirdPartyLogger());
logger.info("Application started");
logger.error("Something went wrong");
```

---

### 🔹 2. Decorator

Adds responsibilities to objects dynamically **without modifying the original class**.

```typescript
interface TextProcessor {
  process(text: string): string;
}

class PlainTextProcessor implements TextProcessor {
  process(text: string): string {
    return text;
  }
}

// Base decorator
abstract class TextProcessorDecorator implements TextProcessor {
  constructor(protected processor: TextProcessor) {}
  abstract process(text: string): string;
}

class TrimDecorator extends TextProcessorDecorator {
  process(text: string): string {
    return this.processor.process(text.trim());
  }
}

class LowercaseDecorator extends TextProcessorDecorator {
  process(text: string): string {
    return this.processor.process(text).toLowerCase();
  }
}

class PrefixDecorator extends TextProcessorDecorator {
  constructor(processor: TextProcessor, private prefix: string) {
    super(processor);
  }

  process(text: string): string {
    return `${this.prefix}${this.processor.process(text)}`;
  }
}

// Compose decorators — wrap in any order
const processor = new PrefixDecorator(
  new LowercaseDecorator(
    new TrimDecorator(
      new PlainTextProcessor()
    )
  ),
  "user_"
);

console.log(processor.process("  Ali Hassan  ")); // user_ali hassan
```

---

### 🔹 3. Facade

Provides a **simple interface** to a complex subsystem.

```typescript
// Complex subsystems
class VideoEncoder {
  encode(file: string, format: string): string {
    console.log(`Encoding ${file} to ${format}`);
    return `${file}.${format}`;
  }
}

class ThumbnailGenerator {
  generate(file: string): string {
    console.log(`Generating thumbnail for ${file}`);
    return `${file}_thumb.jpg`;
  }
}

class StorageService {
  upload(file: string, destination: string): string {
    console.log(`Uploading ${file} to ${destination}`);
    return `https://cdn.example.com/${destination}/${file}`;
  }
}

class NotificationService {
  notify(userId: string, message: string): void {
    console.log(`Notifying user ${userId}: ${message}`);
  }
}

// Facade — simple interface to the whole process
class VideoUploadFacade {
  private encoder = new VideoEncoder();
  private thumbnailGen = new ThumbnailGenerator();
  private storage = new StorageService();
  private notifier = new NotificationService();

  uploadVideo(userId: string, filePath: string): string {
    console.log("=== Starting upload process ===");
    const encoded = this.encoder.encode(filePath, "mp4");
    const thumbnail = this.thumbnailGen.generate(encoded);
    const videoUrl = this.storage.upload(encoded, "videos");
    this.storage.upload(thumbnail, "thumbnails");
    this.notifier.notify(userId, `Your video is ready: ${videoUrl}`);
    console.log("=== Upload complete ===");
    return videoUrl;
  }
}

// Caller only deals with the Facade ✅
const uploader = new VideoUploadFacade();
const url = uploader.uploadVideo("user123", "my_video.mov");
```

---

## Step 12 — Behavioral Patterns <a name="step-12"></a>

### 🔹 1. Strategy

Defines a family of algorithms, puts each in a class, and makes them interchangeable.

```typescript
interface SortStrategy<T> {
  sort(data: T[]): T[];
}

class BubbleSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    return arr;
  }
}

class QuickSort<T> implements SortStrategy<T> {
  sort(data: T[]): T[] {
    if (data.length <= 1) return data;
    const pivot = data[Math.floor(data.length / 2)];
    const left = data.filter(x => x < pivot);
    const middle = data.filter(x => x === pivot);
    const right = data.filter(x => x > pivot);
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class Sorter<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>): void {
    this.strategy = strategy;
  }

  sort(data: T[]): T[] {
    return this.strategy.sort(data);
  }
}

const sorter = new Sorter(new BubbleSort<number>());
console.log(sorter.sort([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]

sorter.setStrategy(new QuickSort<number>());
console.log(sorter.sort([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]
```

---

### 🔹 2. Observer

Defines a one-to-many dependency — when one object changes, all its dependents are notified.

```typescript
type EventHandler<T> = (data: T) => void;

class EventBus {
  private listeners: Map<string, EventHandler<any>[]> = new Map();

  on<T>(event: string, handler: EventHandler<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(handler);
  }

  off<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(event) ?? [];
    this.listeners.set(event, handlers.filter(h => h !== handler));
  }

  emit<T>(event: string, data: T): void {
    const handlers = this.listeners.get(event) ?? [];
    handlers.forEach(handler => handler(data));
  }
}

// Usage
const bus = new EventBus();

bus.on("user.login", (email: string) => console.log(`🔐 Login: ${email}`));
bus.on("user.login", (email: string) => console.log(`📝 Audit: ${email}`));
bus.on("order.placed", (amount: number) => console.log(`💰 Sale: $${amount}`));

bus.emit("user.login", "ali@example.com");
// 🔐 Login: ali@example.com
// 📝 Audit: ali@example.com

bus.emit("order.placed", 150.00);
// 💰 Sale: $150
```

---

### 🔹 3. Command

Encapsulates a request as an object, enabling undo/redo, queuing, and logging.

```typescript
interface Command {
  execute(): void;
  undo(): void;
}

class TextEditor {
  private text: string = "";

  getText(): string { return this.text; }
  insertText(text: string, position: number): void {
    this.text = this.text.slice(0, position) + text + this.text.slice(position);
  }
  deleteText(start: number, length: number): void {
    this.text = this.text.slice(0, start) + this.text.slice(start + length);
  }
}

class InsertCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string,
    private position: number
  ) {}

  execute(): void {
    this.editor.insertText(this.text, this.position);
  }

  undo(): void {
    this.editor.deleteText(this.position, this.text.length);
  }
}

class CommandHistory {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();
    this.history.push(command);
    this.redoStack = []; // clear redo stack on new command
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}

const editor = new TextEditor();
const history = new CommandHistory();

history.execute(new InsertCommand(editor, "Hello", 0));
history.execute(new InsertCommand(editor, " World", 5));
console.log(editor.getText()); // Hello World

history.undo();
console.log(editor.getText()); // Hello

history.redo();
console.log(editor.getText()); // Hello World
```

---

## Step 13 — Generics with OOP <a name="step-13"></a>

TypeScript generics are more powerful than Java's — they have better type inference and can constrain with `extends`.

### 🔹 Generic Classes

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  get size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.peek()); // "world"
```

---

### 🔹 Generic Constraints

```typescript
interface Identifiable {
  id: number;
}

// T must have an `id` property
class Repository<T extends Identifiable> {
  private items: Map<number, T> = new Map();

  save(item: T): void {
    this.items.set(item.id, item);
  }

  findById(id: number): T | undefined {
    return this.items.get(id);
  }

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: number): boolean {
    return this.items.delete(id);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const userRepo = new Repository<User>();
userRepo.save({ id: 1, name: "Ali", email: "ali@example.com" });
userRepo.save({ id: 2, name: "Sara", email: "sara@example.com" });

console.log(userRepo.findById(1)); // { id: 1, name: "Ali", ... }
console.log(userRepo.findAll().length); // 2

const productRepo = new Repository<Product>();
productRepo.save({ id: 1, name: "Laptop", price: 999 });
```

---

### 🔹 Generic Pipeline

```typescript
class Pipeline<T> {
  private steps: Array<{ name: string; fn: (value: T) => T }> = [];

  addStep(name: string, fn: (value: T) => T): this {
    this.steps.push({ name, fn });
    return this;
  }

  execute(input: T): T {
    return this.steps.reduce((value, step) => {
      const result = step.fn(value);
      console.log(`  [${step.name}]: ${JSON.stringify(value)} → ${JSON.stringify(result)}`);
      return result;
    }, input);
  }
}

const stringPipeline = new Pipeline<string>()
  .addStep("Trim", s => s.trim())
  .addStep("Lowercase", s => s.toLowerCase())
  .addStep("Sanitize", s => s.replace(/[^a-z0-9]/g, "_"))
  .addStep("Prefix", s => `usr_${s}`);

console.log(stringPipeline.execute("  Ali Hassan!  "));
// usr_ali_hassan_
```

---

## Step 14 — Enums as Objects <a name="step-14"></a>

TypeScript enums are more flexible than Java's — you can use `const enum`, string enums, or plain objects.

### 🔹 String Enums (Most Common)

```typescript
enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

class Order {
  private status: OrderStatus = OrderStatus.PENDING;

  constructor(readonly id: string) {}

  confirm(): void {
    if (this.status !== OrderStatus.PENDING) {
      throw new Error(`Cannot confirm order in ${this.status} state`);
    }
    this.status = OrderStatus.CONFIRMED;
  }

  ship(): void {
    if (this.status !== OrderStatus.CONFIRMED) {
      throw new Error(`Cannot ship order in ${this.status} state`);
    }
    this.status = OrderStatus.SHIPPED;
  }

  getStatus(): OrderStatus { return this.status; }

  describe(): string {
    return `Order ${this.id} is ${this.status}`;
  }
}

const order = new Order("ORD-001");
order.confirm();
order.ship();
console.log(order.describe()); // Order ORD-001 is SHIPPED
```

---

### 🔹 Enums with Methods — Using a Class Pattern

TypeScript enums can't have methods like Java's, but you can achieve the same with a class pattern:

```typescript
class Direction {
  static readonly NORTH = new Direction("NORTH", 0, 1);
  static readonly SOUTH = new Direction("SOUTH", 0, -1);
  static readonly EAST  = new Direction("EAST",  1, 0);
  static readonly WEST  = new Direction("WEST", -1, 0);

  private constructor(
    readonly name: string,
    readonly dx: number,
    readonly dy: number
  ) {}

  opposite(): Direction {
    switch (this) {
      case Direction.NORTH: return Direction.SOUTH;
      case Direction.SOUTH: return Direction.NORTH;
      case Direction.EAST:  return Direction.WEST;
      case Direction.WEST:  return Direction.EAST;
    }
    throw new Error("Unknown direction");
  }

  toString(): string {
    return `Direction.${this.name}(dx=${this.dx}, dy=${this.dy})`;
  }
}

console.log(Direction.NORTH.opposite()); // Direction.SOUTH(dx=0, dy=-1)
console.log(Direction.EAST.dx);          // 1
```

---

## Step 15 — Advanced TypeScript OOP Features <a name="step-15"></a>

### 🔹 Mixins — Composing Behaviors

TypeScript Mixins let you mix behaviors from multiple sources (like multiple inheritance, but cleaner):

```typescript
// Mixin constructor type
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin 1 — adds timestamp behavior
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    updatedAt = new Date();

    touch(): void {
      this.updatedAt = new Date();
    }
  };
}

// Mixin 2 — adds soft-delete behavior
function SoftDeletable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    deletedAt: Date | null = null;

    softDelete(): void {
      this.deletedAt = new Date();
    }

    isDeleted(): boolean {
      return this.deletedAt !== null;
    }

    restore(): void {
      this.deletedAt = null;
    }
  };
}

// Base class
class Entity {
  constructor(public id: number) {}
}

// Compose: Entity + Timestamped + SoftDeletable
const TimestampedEntity = Timestamped(Entity);
const AuditableEntity = SoftDeletable(TimestampedEntity);

class User extends AuditableEntity {
  constructor(id: number, public name: string) {
    super(id);
  }
}

const user = new User(1, "Ali");
console.log(user.createdAt); // current date
user.softDelete();
console.log(user.isDeleted()); // true
user.restore();
console.log(user.isDeleted()); // false
```

---

### 🔹 Index Signatures

```typescript
// Dynamic key-value storage with type safety
class TypedStorage<T> {
  private store: { [key: string]: T } = {};

  set(key: string, value: T): void {
    this.store[key] = value;
  }

  get(key: string): T | undefined {
    return this.store[key];
  }

  has(key: string): boolean {
    return key in this.store;
  }

  keys(): string[] {
    return Object.keys(this.store);
  }
}

const cache = new TypedStorage<number>();
cache.set("score", 95);
cache.set("level", 3);
console.log(cache.get("score")); // 95
```

---

### 🔹 Declaration Merging with Interfaces

TypeScript interfaces can be merged — multiple declarations of the same interface are combined:

```typescript
interface Plugin {
  name: string;
}

// Later, another file adds to the same interface
interface Plugin {
  version: string;
  execute(): void;
}

// Now Plugin requires all three
class MyPlugin implements Plugin {
  name = "MyPlugin";
  version = "1.0.0";
  execute(): void { console.log(`${this.name} v${this.version} running`); }
}
```

---

## Step 16 — Functional Patterns & Lambdas in OOP <a name="step-16"></a>

### 🔹 Arrow Functions as Callbacks (vs Java Lambdas)

```typescript
// These are ALL equivalent in TypeScript:
type Transformer = (input: string) => string;

const upper1: Transformer = function(input: string): string { return input.toUpperCase(); };
const upper2: Transformer = (input: string): string => input.toUpperCase();
const upper3: Transformer = (input) => input.toUpperCase();
const upper4: Transformer = input => input.toUpperCase();
const upper5: Transformer = String.prototype.toUpperCase.bind(""); // method reference-like
```

---

### 🔹 Strategy Pattern Simplified with Functions

```typescript
type ValidationRule<T> = {
  message: string;
  validate: (value: T) => boolean;
};

class Validator<T> {
  private rules: ValidationRule<T>[] = [];

  addRule(message: string, validate: (value: T) => boolean): this {
    this.rules.push({ message, validate });
    return this;
  }

  validate(value: T): { valid: boolean; errors: string[] } {
    const errors = this.rules
      .filter(rule => !rule.validate(value))
      .map(rule => rule.message);

    return { valid: errors.length === 0, errors };
  }
}

const passwordValidator = new Validator<string>()
  .addRule("Must be at least 8 characters", s => s.length >= 8)
  .addRule("Must contain uppercase letter", s => /[A-Z]/.test(s))
  .addRule("Must contain a digit", s => /\d/.test(s))
  .addRule("Must contain a special character", s => /[!@#$%^&*]/.test(s))
  .addRule("Must not contain spaces", s => !s.includes(" "));

console.log(passwordValidator.validate("weak"));
// { valid: false, errors: ["Must be at least 8 characters", "Must contain uppercase letter", ...] }

console.log(passwordValidator.validate("Strong1!"));
// { valid: true, errors: [] }
```

---

### 🔹 Function Composition — Building Pipelines

```typescript
type Transform<T> = (value: T) => T;

function compose<T>(...fns: Transform<T>[]): Transform<T> {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}

const trim: Transform<string> = s => s.trim();
const lower: Transform<string> = s => s.toLowerCase();
const removeDots: Transform<string> = s => s.replace(/\./g, "");
const addPrefix: Transform<string> = s => `user_${s}`;

const normalize = compose(trim, lower, removeDots, addPrefix);

console.log(normalize("  Ali.Hassan  ")); // user_alihassan
```

---

### 🔹 Observer Pattern Simplified with Functions

```typescript
class EventEmitter<Events extends Record<string, any>> {
  private listeners = new Map<keyof Events, Array<(data: any) => void>>();

  on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(listener);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    this.listeners.get(event)?.forEach(listener => listener(data));
  }
}

// Type-safe event bus
type AppEvents = {
  "user.login": { email: string; timestamp: Date };
  "order.placed": { orderId: string; amount: number };
};

const bus = new EventEmitter<AppEvents>();

bus.on("user.login", ({ email, timestamp }) =>
  console.log(`🔐 Login: ${email} at ${timestamp.toISOString()}`)
);

bus.on("order.placed", ({ orderId, amount }) =>
  console.log(`💰 Order ${orderId}: $${amount}`)
);

bus.emit("user.login", { email: "ali@example.com", timestamp: new Date() });
bus.emit("order.placed", { orderId: "ORD-001", amount: 299.99 });
```

---

### 🔹 When to Use Functions vs Classes

```
USE A FUNCTION / ARROW FUNCTION WHEN:    USE A CLASS WHEN:
──────────────────────────────────────   ──────────────────────────────
Single, focused operation                Multiple related methods needed
No internal state needed                 Needs to maintain state (fields)
Used as a callback / strategy            Part of a class hierarchy (IS-A)
Data transformation pipeline             Needs constructor logic
Simple, one-off behavior                 Reused as a type/contract
```

---

## ✅ Complete OOP Mastery Roadmap — All Steps Done!

```
✅ Step 1  — Classes & Objects Internals (this, parameter properties, static)
✅ Step 2  — Access Modifiers & Encapsulation (private, protected, getters/setters)
✅ Step 3  — readonly Keyword & Immutability
✅ Step 4  — Association, Aggregation & Composition
✅ Step 5  — Inheritance Deep Dive (override, super, chaining)
✅ Step 6  — Interfaces vs Abstract Classes
✅ Step 7  — SOLID Principles
✅ Step 8  — Favor Composition over Inheritance
✅ Step 9  — Dependency Injection
✅ Step 10 — Creational Patterns (Singleton, Factory, Builder)
✅ Step 11 — Structural Patterns (Adapter, Decorator, Facade)
✅ Step 12 — Behavioral Patterns (Strategy, Observer, Command)
✅ Step 13 — Generics with OOP
✅ Step 14 — Enums as Objects
✅ Step 15 — Advanced TypeScript (Mixins, Index Signatures, Declaration Merging)
✅ Step 16 — Functional Patterns & Lambdas in OOP
```

---

## Key TypeScript vs Java Differences — Quick Reference

| Concept | Java | TypeScript |
|---|---|---|
| Private fields | `private` (runtime) | `private` (compile only) or `#` (runtime) |
| Immutable field | `final` | `readonly` |
| Prevent extension | `final class` | No direct equivalent (`private constructor`) |
| Constructor shorthand | No | Parameter properties |
| Multiple inheritance | Interfaces only | Interfaces + Mixins |
| `this` binding | Always safe | Can be lost — use arrow functions |
| Generics erasure | Yes (runtime) | Yes (TypeScript types erased) |
| Enums with methods | Yes | Class pattern or use plain objects |
| Null safety | Optional (nullable types) | `strictNullChecks` in tsconfig |
| Data shapes | Classes/Interfaces only | Interfaces describe any object |

---

## What's Next — Where to Go From Here

### PRACTICE
1. Build a project from scratch applying SOLID
2. Refactor old code — spot SRP/OCP violations
3. Implement every design pattern from memory
4. Read source code — TypeScript's lib, popular open-source TS projects

### DEEPEN
1. Utility Types — `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`, `Record<K,V>`
2. Conditional Types — `T extends U ? X : Y`
3. Mapped Types — transform interfaces programmatically
4. Decorators — class-level metadata (used heavily in NestJS, Angular)
5. NestJS — DI at scale with TypeScript
6. Domain-Driven Design (DDD) in TypeScript

### CHALLENGE YOURSELF
Build these from scratch:
- A generic type-safe event bus (fully typed events)
- A mini dependency injection container
- A simple ORM with generic repositories
- A plugin system using interfaces and dynamic imports
- A state machine with TypeScript discriminated unions
