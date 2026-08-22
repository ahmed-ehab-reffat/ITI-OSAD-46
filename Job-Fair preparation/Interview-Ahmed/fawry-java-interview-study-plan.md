# Fawry — Associate Software Engineer (Java) — Study Plan

**Context:** Strong in JS/React/Node, near-zero Java, good OOP/SOLID/design patterns already.
**Goal:** Cover everything a Java interviewer could reasonably ask an Associate-level candidate at a large fintech.

## Confirmed interview structure (from a friend who went through it + Glassdoor reviews from other candidates)

- **Round 1:** Core Java (OOP, Collections, Lambdas, Functional Interfaces, Multithreading) + Database design scenario (design tables for Users/Orders/Order Items/Transactions, normalized, with PK/FK) + a Spring Boot code refactor scenario (spot SOLID violations, fix with Factory/Strategy/Singleton patterns). **This matches almost word-for-word across multiple independent Glassdoor reviews** — treat this round's structure as very reliable.
- **Round 2:** Software engineering fundamentals, Java core, OOP, problem solving, Spring Boot (MVC, Data, Security).
- **Round 3 ("harder junior"):** Deep Core Java — JVM internals, memory model, OOP mechanics, all the way down to gotchas like `final` vs immutability. One Glassdoor reviewer described a similar late-stage round as "somewhat difficult... medium to difficult questions" conducted by a senior engineer — so don't assume "junior role" means easy questions once you're past Round 1.
- **Language:** Introduce yourself in **English**; rest of the interview is usually in **Arabic** — practice explaining these concepts out loud in Arabic too, not just English, so you're not translating on the spot.
- **If asked to refactor code:** 1) identify the SOLID violation → 2) explain why it's wrong → 3) apply the right design pattern → 4) explain the improvement. This exact 4-step structure is worth memorizing as a template.
- **⚠️ ERD expectations vary by interviewer.** Your friend's round explicitly said "no ERD drawing required, focus on tables." A separate Glassdoor reviewer's round asked directly to "design an ERD for a BE system." Prepare for **both**: be ready to just list tables/columns/PK/FK in words or a simple text layout, AND be ready to actually sketch a basic ERD (boxes for entities, lines for relationships with cardinality like 1-to-many) in case you get an interviewer who wants the diagram.
- **New confirmed scenario: "Design an OTP system."** This is a practical system-design question, not a Core Java trivia question — see the new dedicated section below.
- **If unsure about a question:** talk through your thought process instead of going silent — partial reasoning is scored better than silence.

---

## How to use this file

- Study in the order given — later sections build on earlier ones.
- Each topic has a checkbox `[ ]`. Mark it `[x]` once you can explain it out loud without notes AND write a small code snippet for it.
- "🔥" = very commonly asked / high interview yield. "⭐" = good to know, lower probability but easy points if it comes up.
- Where relevant, a **JS bridge** note tells you how to map the concept to something you already know, so you learn faster.
- Don't skip the Collections/HashMap/Exceptions sections — these get asked more often than JVM internals at Associate level, even though JVM internals feel more "impressive."

---

## Day-by-day plan (14-day version — compress/expand as needed)

| Day | Focus |
|---|---|
| 1 | JVM, memory model, class loading, GC basics |
| 2 | Parameter passing, access modifiers, static/final/this/super |
| 3 | Constructors, inheritance, polymorphism, method overloading |
| 4 | Primitive conversions, wrapper classes, Object class (equals/hashCode) |
| 5 | String internals, Collections Framework part 1 (List/Set) |
| 6 | Collections Framework part 2 (Map/HashMap internals), Generics |
| 7 | Exceptions (checked/unchecked, throw vs throws, try-with-resources) |
| 8 | Java 8+ (Streams/Lambdas/Optional/Functional Interfaces) |
| 9 | Multithreading & Concurrency (full section — this is a big one now) |
| 10 | Design Patterns in Java (quick pass, you know these) + SOLID refactor practice |
| 11 | Spring / Spring Boot deep dive (IoC, Beans, MVC, Data JPA, Security) |
| 12 | Web layer basics: Servlets, JSP, HTTP, Tomcat, JSON, Serialization, Reflection |
| 13 | JDBC/JPA/ORM, database design scenario practice, SQL brush-up, **ERD + OTP system design practice (new, confirmed real scenarios)** |
| 14 | Mock interview: run through the "Mock Interview Questions" section cold, rapid-fire review of weak spots |

If you have less time, sections marked 🔥 across Days 1–9 are non-negotiable — this is what all three interview rounds draw from most heavily. Days 10–14 content is still commonly asked (Round 1 and Round 2 explicitly mention Spring Boot, database design, and design pattern refactoring), so don't skip it — just go faster.

---

## 1. Java Execution & JVM

- [ ] 🔥 Why Java: "Write Once, Run Anywhere"
- [ ] JDK vs JRE vs JVM (what each contains, how they relate)
- [ ] `javac` → bytecode → `.class` files
- [ ] Platform independence — how bytecode achieves this
- [ ] JVM responsibilities (loading, verifying, executing, memory management)
- [ ] Class loading and the 3 loaders: Bootstrap, Platform, Application
- [ ] Bytecode verifier (why it exists — security/safety)
- [ ] Interpreter vs JIT Compiler
- [ ] "Hot methods" and JIT optimization
- [ ] Full flow: `.java` → `javac` → `.class` (bytecode) → JVM interprets/JIT-compiles → machine code

**JS bridge:** Think of bytecode like how V8 compiles JS to an intermediate representation before optimizing hot functions — same idea (interpret first, then JIT-compile what's hot), different implementation.

---

## 2. JVM Memory Model

- [ ] 🔥 Heap vs Stack — what lives where
- [ ] Stack frames — one per method call, holds local variables + return address
- [ ] Metaspace (replaced PermGen — stores class metadata)
- [ ] GC roots (what counts as a root: local vars, static fields, active threads)
- [ ] Object allocation flow (object created on heap, reference stored on stack)
- [ ] Method call stack push/pop
- [ ] Object lifetime and reachability
- [ ] 🔥 Garbage Collection basics: mark-and-sweep concept
- [ ] "Eligible for GC" vs "actually collected" (GC timing isn't guaranteed/immediate)
- [ ] Common Q: "What makes an object eligible for garbage collection?" (no reachable references to it)

**JS bridge:** Same idea as JS's garbage collector (also mark-and-sweep based) — you don't manually free memory in either language, but Java exposes more of the mental model (heap/stack split) explicitly.

---

## 3. Java Parameter Passing 🔥 (classic trick-question topic)

- [ ] Java is **always** pass-by-value — no exceptions
- [ ] "References are values" — the reference itself is copied, not the object
- [ ] Primitive passing — a true copy of the value
- [ ] Object passing — the reference (pointer-like value) is copied; both point to same object
- [ ] Reassigning a parameter reference inside a method does NOT affect the caller's variable
- [ ] Mutating an object's fields inside a method DOES affect the caller's object (same object, different reference copy pointing to it)
- [ ] Be ready to write a code snippet proving this (swap two objects — doesn't work; mutate a field — does work)

**JS bridge:** Identical to how JS passes objects/arrays (by reference-value) vs primitives (by value). If you understand this in JS, you already understand it in Java — just translate the example.

---

## 4. OOP Fundamentals (you're strong here — quick review only)

- [ ] Class vs Object definitions in Java syntax terms
- [ ] Encapsulation → private fields + public getters/setters
- [ ] Abstraction → abstract classes/interfaces
- [ ] Inheritance → `extends`
- [ ] Polymorphism → overriding + overloading
- [ ] Be ready to give a Java-specific code example for each pillar, not just the concept

---

## 5. Relationships

- [ ] Association, Aggregation, Composition — differences and Java code examples
- [ ] Ownership and lifecycle dependency (composition = child dies with parent)
- [ ] "Has-a" vs "Is-a"
- [ ] Favor composition over inheritance — be ready with a concrete reason (tight coupling, fragile base class problem)
- [ ] Liskov Substitution Principle — Java example of a violation (e.g., `Square extends Rectangle` breaking behavior)

---

## 6. Interfaces & Abstract Classes 🔥

- [ ] Interface vs abstract class — full comparison table (fields, constructors, multiple inheritance)
- [ ] Why interfaces can't have constructors
- [ ] Fields in interfaces are implicitly `public static final`
- [ ] Multiple inheritance of type via interfaces (Java has no multiple class inheritance)
- [ ] Default methods (Java 8+) — why introduced (interface evolution without breaking implementers)
- [ ] Static methods in interfaces
- [ ] Private methods in interfaces (Java 9+, for sharing code between default methods)
- [ ] When to use interface vs abstract class — practical decision rule (interface = capability/contract, abstract class = shared base with some implementation)

---

## 7. Constructors

- [ ] Default vs no-arg vs parameterized vs copy constructors
- [ ] Constructor overloading
- [ ] Constructor chaining with `this()`
- [ ] Calling parent constructor with `super()`
- [ ] Initialization order: static blocks → instance blocks → constructor; parent before child
- [ ] Why constructors cannot be overridden (not inherited, no polymorphic dispatch on constructors)
- [ ] 🔥 Danger of calling overridable methods from constructors (subclass fields not yet initialized when parent constructor runs — common "what's the bug here" question)

---

## 8. Inheritance & Polymorphism

- [ ] Upcasting vs downcasting (with `ClassCastException` risk on bad downcasts)
- [ ] Dynamic dispatch / runtime polymorphism (method overriding resolved at runtime based on actual object type)
- [ ] Compile-time polymorphism (overloading resolved at compile time)
- [ ] Method overriding vs method hiding (hiding applies to static methods — resolved by reference type, not object type)
- [ ] 🔥 Fields are NOT polymorphic in Java (field access resolved by reference type, not object type — big gotcha)
- [ ] Static methods vs instance methods regarding polymorphism
- [ ] Covariant return types (overriding method can return a subtype)
- [ ] `instanceof` vs `getClass()` — when equality checks should use one vs other

---

## 9. Access Modifiers

- [ ] private / package-private (default) / protected / public — full access matrix
- [ ] Protected access across packages (only via inheritance, not via arbitrary reference)
- [ ] Top-level class access modifiers (only public or package-private allowed)
- [ ] Nested class access modifiers (can be private, unlike top-level)
- [ ] 🔥 Overriding rule: subclass method access modifier can only be same or LESS restrictive than parent — never more restrictive. Know why (would break polymorphism / Liskov substitution)

---

## 10. static, final, this, super

- [ ] Static field vs static method vs static nested class
- [ ] Why static context has no `this` (no instance backing it)
- [ ] Why static methods can't access instance members directly
- [ ] Shared state across all instances via static fields
- [ ] Method hiding with static methods
- [ ] `final` class (can't be extended, e.g. `String`)
- [ ] `final` method (can't be overridden)
- [ ] `final` variable (can't be reassigned)
- [ ] 🔥 `final` reference vs mutable object — `final` only locks the reference, not the object's internal state (classic trick question)
- [ ] `this` — current object, current field disambiguation, constructor chaining
- [ ] `super` — parent constructor, parent method, parent field access

---

## 11. Method Overloading

- [ ] Method signature = name + parameter types (NOT return type)
- [ ] Overloading rules — different parameter list required
- [ ] Constructors, static methods, private and final methods can all be overloaded
- [ ] 🔥 Why return type alone isn't enough to distinguish overloads (ambiguous call resolution)
- [ ] Overload resolution happens at compile time based on static (declared) type

---

## 12. Primitive Conversions

- [ ] All 8 primitive types and their sizes
- [ ] Widening (implicit, safe) vs narrowing (explicit cast required)
- [ ] Overflow behavior (wraps around, doesn't throw)
- [ ] Precision loss (float/double narrowing)
- [ ] Constant narrowing (compiler allows `byte b = 100;` without cast if value fits)
- [ ] Numeric promotion — `byte + byte` produces an `int`
- [ ] `++` and `+=` operators performing implicit narrowing casts internally

---

## 13. Wrapper Classes

- [ ] Primitive vs wrapper — why wrappers exist (needed for generics/collections, nullability)
- [ ] Autoboxing / unboxing
- [ ] 🔥 `NullPointerException` risk when unboxing a null wrapper (e.g., `Integer i = null; int x = i;`)
- [ ] When to prefer wrappers (collections, optional/nullable values) vs primitives (performance, no null needed)
- [ ] Integer caching gotcha: `Integer a = 127, b = 127;` → `a == b` true; `Integer a = 200, b = 200;` → `a == b` false (cache range -128 to 127) — good "gotcha" to mention if asked about `==` on wrappers

---

## 14. Object Class 🔥

- [ ] `==` (reference equality) vs `equals()` (logical equality)
- [ ] Default `equals()` from `Object` = reference comparison
- [ ] Why and when to override `equals()` (business/value equality)
- [ ] `hashCode()` — purpose (bucket placement in hash-based collections)
- [ ] **The equals/hashCode contract**: equal objects MUST have equal hash codes; unequal hash codes imply unequal objects; equal hash codes do NOT guarantee equal objects (collisions)
- [ ] Why you must override BOTH together (violating this breaks HashMap/HashSet behavior silently)
- [ ] HashSet/HashMap lookup flow: compute hash → find bucket → compare with `equals()` within bucket
- [ ] Be ready to write a proper `equals()` + `hashCode()` override for a simple class

---

## 15. String

- [ ] String Pool (interned string storage, part of heap since Java 7+)
- [ ] String literal creation (`"abc"`) goes to pool; `new String("abc")` creates a new heap object
- [ ] `intern()` method
- [ ] `==` vs `equals()` on Strings (classic gotcha combining sections 14 & 15)
- [ ] 🔥 Immutability of String — why (security, thread safety, safe use as HashMap keys, string pool reuse)
- [ ] Why immutable Strings are safe as HashMap keys (hashCode cached and stable)
- [ ] `concat()` / `+=` create new objects each time (inefficient in loops)
- [ ] `StringBuilder` (not thread-safe, faster) vs `StringBuffer` (thread-safe, synchronized, slower)
- [ ] 🔥 Why to use `StringBuilder` inside loops instead of `+=` (avoid creating many intermediate String objects)

---

## 16. Collections Framework (NOT in your friend's list — critical addition) 🔥🔥🔥

- [ ] Core interfaces: `List`, `Set`, `Queue`, `Map` (Map is NOT a `Collection`, note this distinction — common trick question)
- [ ] `ArrayList` (backed by array, fast random access, slow insert/delete in middle) vs `LinkedList` (fast insert/delete, slow random access)
- [ ] `HashSet` (no order, no duplicates) vs `LinkedHashSet` (insertion order preserved) vs `TreeSet` (sorted, uses `Comparable`/`Comparator`)
- [ ] 🔥🔥 `HashMap` internals — this WILL likely be asked in some form:
  - [ ] Array of buckets, each bucket a linked list (or tree if bucket gets large, Java 8+ treeification)
  - [ ] Key's `hashCode()` determines bucket index
  - [ ] Collision handling — same bucket, chained, compared with `equals()`
  - [ ] Load factor and resizing (default 0.75, doubles capacity when threshold exceeded)
  - [ ] Why a mutable object used as a key (with changing hashCode) is dangerous
- [ ] `HashMap` vs `LinkedHashMap` vs `TreeMap`
- [ ] `Comparable` (`compareTo`, natural ordering, implemented by the class itself) vs `Comparator` (`compare`, external ordering, multiple strategies possible)
- [ ] Iterating a collection — `Iterator`, enhanced for-loop
- [ ] Fail-fast (`ArrayList`, throws `ConcurrentModificationException` if modified during iteration) vs fail-safe (`CopyOnWriteArrayList`, works on a snapshot) iterators

**JS bridge:** `Map`/`Set` in JS map conceptually to `HashMap`/`HashSet`, but Java gives you way more explicit control over ordering and comparison — worth explicitly contrasting if asked.

---

## 17. Generics (NOT in original list — add this)

- [ ] Why generics exist — compile-time type safety, avoid manual casting
- [ ] Generic classes and methods (`class Box<T>`)
- [ ] Bounded type parameters (`<T extends Number>`)
- [ ] Wildcards: `? extends T` (upper bound, read-only-ish, "producer") vs `? super T` (lower bound, "consumer") — PECS rule (Producer Extends, Consumer Super)
- [ ] Type erasure (generics don't exist at runtime — good to mention as a "gotcha" fact)

---

## 18. Exception Handling 🔥 (confirmed asked in mock interviews)

- [ ] Exception hierarchy: `Throwable` → `Exception` / `Error`
- [ ] 🔥 Checked exceptions (must declare/catch, e.g. `IOException`) vs unchecked (`RuntimeException` and subclasses, e.g. `NullPointerException`) — be ready to explain WHY the split exists (checked = recoverable/expected conditions caller should handle; unchecked = programming errors)
- [ ] `try / catch / finally` — execution order, especially with `return` statements in `finally` (finally runs even if try/catch has a return — know what value actually gets returned)
- [ ] 🔥 **`try/catch` vs declaring `throws`** — handle it here vs push responsibility to the caller; when each is appropriate (checked exceptions you can't meaningfully recover from → declare `throws` and let caller decide)
- [ ] 🔥 **`throw` vs `throws`** — `throw` actually raises a specific exception instance inside a method body; `throws` is a method-signature declaration warning callers "this might happen." Easy to mix up verbally, so rehearse saying this distinction out loud.
- [ ] 🔥 **try-with-resources** — auto-closes any `AutoCloseable`/`Closeable` resource (DB connections, streams, files) even if an exception is thrown; know it's syntactic sugar for a `finally` block that calls `.close()`, and why it's safer than manual `finally` (avoids forgetting to close, handles suppressed exceptions correctly)
- [ ] Custom exceptions — extending `Exception` (checked) or `RuntimeException` (unchecked)
- [ ] Best practices: don't swallow exceptions silently, don't use exceptions for normal control flow, catch specific exceptions not generic `Exception`
- [ ] Multi-catch (`catch (IOException | SQLException e)`)

---

## 19. Java 8+ Features (NOT in original list — add this, will feel easy for you)

- [ ] Lambda expressions — syntax, when usable (functional interfaces only)
- [ ] Functional interfaces — `Runnable`, `Comparator`, `Function<T,R>`, `Predicate<T>`, `Supplier<T>`, `Consumer<T>`
- [ ] Method references (`ClassName::methodName`)
- [ ] Streams API — `.stream().filter().map().collect()` pipeline
- [ ] Intermediate vs terminal operations (streams are lazy until a terminal op runs)
- [ ] `Optional<T>` — avoiding null checks, `.orElse()`, `.isPresent()`, `.map()`

**JS bridge:** This maps almost 1:1 to `.filter().map().reduce()` in JS. Lambdas ≈ arrow functions. `Optional` ≈ optional chaining (`?.`) conceptually. You'll learn this section fastest — don't over-invest time here relative to Collections/Exceptions.

---

## 20. Multithreading & Concurrency 🔥 (upgraded — this is now a full topic on its own, explicitly listed as a Round 1 subject)

This got a lot bigger than "basics" once your friend's list came in — Fawry Round 1 explicitly names Multithreading & Concurrency as a main topic, so treat this section like Collections in terms of priority.

### Threads: creation & lifecycle
- [ ] `Thread` class (extend it) vs `Runnable` interface (implement it, then pass to a `Thread`) — know why implementing `Runnable` is generally preferred (Java has no multiple class inheritance, so extending `Thread` burns your one superclass slot)
- [ ] `Callable<V>` — like `Runnable` but can return a value and throw checked exceptions (`Runnable.run()` can't do either)
- [ ] 🔥 **`start()` vs `run()`** — `start()` creates a new OS thread and eventually calls `run()` on it; calling `run()` directly just executes the method synchronously on the current thread, no new thread is created at all. Classic trick question.
- [ ] **`wait()` vs `sleep()`** — `wait()` (on `Object`, must be inside `synchronized`) releases the lock and pauses until notified; `sleep()` (static on `Thread`) just pauses the current thread and does NOT release any lock it holds
- [ ] **`interrupt()`** — cooperative cancellation signal; doesn't forcibly stop a thread, just sets a flag / wakes it from blocking calls (`sleep`/`wait`) with an `InterruptedException` — the thread's own code has to check and respond to it
- [ ] Thread states: NEW → RUNNABLE → (BLOCKED / WAITING / TIMED_WAITING) → TERMINATED
- [ ] Thread priority, daemon vs non-daemon threads (daemon threads don't prevent JVM shutdown)

### Synchronization
- [ ] 🔥 `synchronized` keyword — method-level vs block-level, and what object it locks on (the instance, or an explicit lock object, or the `Class` object for static synchronized methods)
- [ ] 🔥 `volatile` keyword — guarantees **visibility** across threads (every read sees the latest write), does **NOT** guarantee atomicity of compound operations like `i++` — a very common gotcha to state explicitly
- [ ] `synchronized` vs `Lock` (`ReentrantLock`) — `Lock` gives you `tryLock()`, timed locking, and interruptible locking, which plain `synchronized` can't do
- [ ] Race conditions — concrete example: two threads incrementing a shared non-atomic counter, lost updates
- [ ] Deadlock — classic example: two threads each holding one lock and waiting on the other's lock; how to avoid (consistent lock ordering, timeouts)
- [ ] Atomic classes — `AtomicInteger`, `AtomicLong`, `AtomicReference` — lock-free thread-safe operations via CAS (compare-and-swap), faster than `synchronized` for simple counters

### Higher-level concurrency tools
- [ ] 🔥 **`ExecutorService`** — thread pool abstraction, why you should almost never manually manage `Thread` objects in real code; `submit()` returns a `Future`, `execute()` doesn't
- [ ] `Future<V>` — represents a pending result, `.get()` blocks until done, `.isDone()`, `.cancel()`
- [ ] Common executor types: `Executors.newFixedThreadPool()`, `newCachedThreadPool()`, `newSingleThreadExecutor()`
- [ ] 🔥 **`CountDownLatch`** — one-time gate: threads wait until a counter hits zero (e.g., wait for N worker threads to finish before proceeding); cannot be reset/reused
- [ ] 🔥 **`CyclicBarrier`** — similar to `CountDownLatch` but reusable, and it's the threads themselves that wait for each other to all reach a common barrier point (vs `CountDownLatch` where some threads wait and others count down)
- [ ] 🔥 **`Semaphore`** — controls access to a limited number of permits (e.g., limit concurrent access to a resource pool to N threads); `acquire()`/`release()`. Good talking point: rate-limiting concurrent DB connections in a payment system.
- [ ] Quick memory hook for the three: `CountDownLatch` = "wait for others to finish", `CyclicBarrier` = "wait for each other, then all proceed together, reusable", `Semaphore` = "limit how many can enter at once"

### Concurrent collections
- [ ] `ConcurrentHashMap` — thread-safe map without locking the whole map (segment/bucket-level locking), vs `Collections.synchronizedMap()` which locks everything
- [ ] `CopyOnWriteArrayList` — thread-safe list, good for read-heavy/write-rare scenarios, iterates over a snapshot (fail-safe, not fail-fast)
- [ ] `BlockingQueue` — used in producer-consumer patterns, blocks on `put()`/`take()` when full/empty

### Common interview framing question
- [ ] 🔥 **"Is Java single-threaded or multi-threaded?"** — Java the language fully supports multithreading (unlike JS which is single-threaded with an event loop, though Node adds worker threads/async I/O). Good contrast to draw on given your JS background: JS achieves concurrency via a single-threaded event loop + async callbacks; Java achieves it via real OS-level threads managed by the JVM.
- [ ] Why concurrency matters specifically for a payment company: avoiding double-processing a transaction, consistent balance updates under concurrent requests, idempotency

**JS bridge:** This is one area where Java and Node genuinely diverge in model — Node's concurrency is single-threaded + event loop + async I/O (non-blocking), while Java gives you real preemptive multithreading with shared mutable state (hence needing locks, `volatile`, atomics). Worth explicitly contrasting this if asked "how is this different from what you know in Node?"

---

## 21. Design Patterns — Java/JDK examples (you know the patterns — just map them)

Since you already understand these conceptually, here's where each shows up **in the Java language/JDK itself** — good to mention in an interview to show real familiarity, not textbook knowledge:

| Pattern | Java/JDK example |
|---|---|
| Singleton | `Runtime.getRuntime()`, enum-based singletons (safest form in Java) |
| Factory Method | `Calendar.getInstance()`, `NumberFormat.getInstance()` |
| Abstract Factory | `DocumentBuilderFactory`, `javax.xml.parsers` factories |
| Builder | `StringBuilder`, `StringBuffer`, `java.time.LocalDate` builders via chained methods |
| Prototype | `Object.clone()`, `Cloneable` interface |
| Adapter | `Arrays.asList()` (adapts array to List), `InputStreamReader` (adapts byte stream to char stream) |
| Decorator | `java.io` streams — `BufferedReader(new FileReader(...))`, wrapping stream classes |
| Proxy | `java.lang.reflect.Proxy`, Spring AOP proxies |
| Composite | `java.awt.Container` and `Component` |
| Facade | `javax.faces.context.FacesContext`, JDBC's simplified API over complex driver internals |
| Observer | `java.util.Observer`/`Observable` (legacy), listener patterns like `ActionListener` |
| Strategy | `Comparator` passed into `Collections.sort()`, `Runnable` passed to `Thread` |
| Template Method | `AbstractList`, `HttpServlet` (`doGet`/`doPost` template methods) |
| Iterator | `Iterator` interface itself, used by every Collection |
| Command | `Runnable`, `Callable` |
| Chain of Responsibility | Servlet Filters chain, exception handling chain |

- [ ] Be ready to say: "In Java, I've seen X pattern used in Y class from the JDK" for at least 5–6 of these — this signals real experience, not memorization.

---

## 22. Spring / Spring Boot 🔥 (upgraded — explicitly named in both Round 1 and Round 2)

### Spring vs Spring Boot
- [ ] 🔥 **Spring vs Spring Boot** — Spring is the broader framework (IoC container, DI, MVC, Data, Security modules) that historically needed heavy XML/Java config; Spring Boot is built on top of Spring and adds auto-configuration, an embedded server (Tomcat by default), starter dependencies, and convention-over-configuration so you can get a working app with minimal setup. Spring Boot doesn't replace Spring — it configures it for you.

### Inversion of Control & Dependency Injection
- [ ] 🔥 **Inversion of Control (IoC)** — the framework (not your code) controls object creation and wiring; you describe *what* you need, Spring decides *how/when* to construct and hand it to you
- [ ] Dependency Injection is how IoC is implemented in Spring — constructor injection (preferred, enables immutability + easier testing), setter injection, field injection (`@Autowired` directly on a field — works but harder to test/mock)
- [ ] Why DI matters: loose coupling, easier unit testing (mock the dependency instead of the real implementation)

### Beans & the container
- [ ] 🔥 **Bean** — any object managed by the Spring IoC container (created, configured, and wired by Spring instead of `new`'d manually by you)
- [ ] Bean lifecycle (rough shape): container starts → bean instantiated → dependencies injected → `@PostConstruct` init hook → bean ready for use → `@PreDestroy` hook on shutdown
- [ ] Bean scopes: `singleton` (default, one instance per container) vs `prototype` (new instance every time it's requested)
- [ ] How beans get registered: component scanning (`@ComponentScan` + stereotype annotations) vs explicit `@Bean` methods in a `@Configuration` class

### Key annotations (recognize these on sight)
- [ ] `@Component` / `@Service` / `@Repository` / `@Controller` / `@RestController` — all are stereotypes of `@Component`; differ mainly in intent/semantics (`@Repository` also enables exception translation for persistence errors)
- [ ] `@Autowired` — injects a dependency
- [ ] `@Configuration` + `@Bean` — manual bean definition
- [ ] `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` — HTTP endpoint mapping
- [ ] `@RequestBody` (deserialize JSON request into an object), `@PathVariable` (URL segment), `@RequestParam` (query param), `@ResponseEntity` (full control over status code + body + headers)
- [ ] `@Entity`, `@Id`, `@Table`, `@Column` — JPA annotations (see persistence section)

### Spring MVC
- [ ] Request flow: client → `DispatcherServlet` (front controller) → handler mapping → Controller → Service → Repository → back up through the chain → View/JSON response
- [ ] `@RestController` = `@Controller` + `@ResponseBody` combined (returns data directly, not a view name)

### Spring Data JPA
- [ ] `Repository` — marker interface at the top of Spring Data's repository hierarchy
- [ ] `CrudRepository` — basic CRUD methods (`save`, `findById`, `deleteById`, etc.)
- [ ] `JpaRepository` — extends `CrudRepository`, adds JPA-specific features like batch operations and pagination (`findAll(Pageable)`)
- [ ] Derived query methods — e.g. `findByUsername(String username)` — Spring generates the query from the method name

### Spring Security (Round 2 explicitly mentions this)
- [ ] Authentication (who are you) vs Authorization (what are you allowed to do)
- [ ] Filters — Spring Security is built around a chain of servlet filters that intercept every request before it reaches your controller (ties directly into the Servlet section below)
- [ ] JWT (JSON Web Token) — stateless auth: token issued on login, sent on subsequent requests (usually `Authorization: Bearer <token>` header), validated by a filter without needing a server-side session — very relevant for a payments API
- [ ] Password encoding — never store plaintext passwords; `BCryptPasswordEncoder` is the standard, uses salted hashing

**JS bridge:** Spring's DI/IoC container is conceptually similar to how a Node app might use a DI library or manually wire modules — but Spring makes it a first-class, framework-enforced concept rather than a pattern you opt into. Spring MVC's `DispatcherServlet` → Controller → Service → Repository flow maps well to an Express app's `middleware → route handler → service layer → DB layer` if you want a comparison to draw on.

---

## 22b. Web Layer Basics: Servlets, JSP, HTTP, Tomcat (NOT in original list — add this) ⭐

Spring Boot abstracts most of this away, but interviewers may still probe the underlying layer to see if you understand what Spring is doing for you.

- [ ] **HTTP basics** — request/response structure, common methods (GET/POST/PUT/DELETE/PATCH), status code ranges (2xx success, 3xx redirect, 4xx client error, 5xx server error), headers vs body, statelessness of HTTP
- [ ] **Servlet** — a Java class that handles HTTP requests/responses at a low level (`doGet()`, `doPost()`); Spring's `DispatcherServlet` is itself a servlet — this is the Template Method pattern in action (mentioned earlier in the Design Patterns table)
- [ ] **JSP (JavaServer Pages)** — older technology for generating dynamic HTML server-side by embedding Java in HTML; mostly legacy now, replaced by REST APIs + frontend frameworks (like the React you already know) — just know what it is and that it's largely legacy, no need to write any
- [ ] **Tomcat** — a servlet container / lightweight application server that actually runs your servlets (and Spring Boot apps); Spring Boot embeds Tomcat by default so you don't need to deploy a `.war` to an external Tomcat install
- [ ] Servlet Filters — intercept requests before/after they hit a servlet (this is literally what Spring Security's filter chain is built on)

## 22c. Serialization, JSON, Reflection (NOT in original list — add this) ⭐

- [ ] **Serialization** — converting an object into a byte stream (to save to disk, send over network, or store in cache); `Serializable` marker interface, `serialVersionUID`
- [ ] Why `transient` fields exist (excluded from serialization — e.g., sensitive data like passwords, or non-serializable fields)
- [ ] **JSON** — in Spring Boot, Jackson is the default library that (de)serializes Java objects to/from JSON automatically for `@RequestBody`/`@ResponseBody` — you generally don't hand-write this, but know it's happening
- [ ] **Reflection** — Java's ability to inspect/modify classes, methods, fields at runtime (`Class<?>`, `getDeclaredMethods()`, etc.); mention that Spring itself relies heavily on reflection under the hood to do dependency injection and component scanning — a good "how does Spring actually work" answer if asked

---

## 23. Persistence Basics (JDBC / JPA / ORM) 🔥

- [ ] JDBC basics — `Connection`, `Statement`/`PreparedStatement`, `ResultSet`
- [ ] 🔥 Why `PreparedStatement` prevents SQL injection (parameterized queries — the query structure is compiled first, values are bound afterward, so user input can never change the query's meaning) — good security talking point for a payments company
- [ ] 🔥 **What is ORM, and how do you use it?** — Object-Relational Mapping: maps Java objects/classes to database tables and rows automatically, so you work with objects instead of writing raw SQL for every operation. JPA is the Java specification for this; Hibernate is the most common implementation. You "use" it by annotating classes (`@Entity`, `@Id`, `@Column`, `@OneToMany`, etc.) and letting Spring Data JPA repositories generate the SQL for you.
- [ ] JPA/Hibernate — `@Entity`, `@Id`, `@GeneratedValue`, `@Column`, `@OneToMany`/`@ManyToOne`/`@ManyToMany` relationship annotations
- [ ] Lazy vs eager loading — related entities fetched on-demand vs immediately (relevant for performance discussions)
- [ ] N+1 query problem — a common ORM gotcha worth knowing exists (fetching a list, then triggering one extra query per item for a related entity)

---

## 24. Testing Basics (NOT in original list — add this) ⭐

- [ ] JUnit basics — `@Test`, assertions (`assertEquals`, `assertTrue`)
- [ ] Mockito basics — mocking dependencies, `when().thenReturn()`
- [ ] Why unit testing matters more in a fintech context (correctness of financial calculations)

---

## 25. Build Tools ⭐ (quick recognition only)

- [ ] Maven vs Gradle — just know they manage dependencies and build lifecycle, recognize `pom.xml` structure
- [ ] `dependencies`, `plugins` sections in `pom.xml` at a glance

---

## 26. SQL Refresh (fintech companies often test this separately) 🔥

- [ ] `JOIN` types (INNER, LEFT, RIGHT, FULL)
- [ ] `GROUP BY` + aggregate functions
- [ ] Basic normalization concepts
- [ ] Transactions — ACID properties (very relevant to a payment company)
- [ ] Indexes — what they are, why they speed up reads, tradeoff on writes

---

## 26b. Practical System Design Scenarios (NEW — confirmed from real interview reports) 🔥

These aren't Core Java trivia questions — they're "design something" prompts where the interviewer wants to see how you think, not a memorized answer. Structure your answer out loud: clarify requirements → propose a schema/flow → call out the tricky edge cases → mention security/scale considerations.

### ERD / Database design practice
- [ ] Practice this exact scenario cold: **design tables for Users, Orders, Order Items, Transactions** with proper normalization and PK/FK — this has come up in multiple independent interview reports, so it is very likely to appear in some form.
- [ ] Suggested shape to have ready:
  - `users(id PK, name, email, password_hash, created_at)`
  - `orders(id PK, user_id FK → users.id, status, total_amount, created_at)`
  - `order_items(id PK, order_id FK → orders.id, product_id, quantity, unit_price)` — note why `order_items` is its own table rather than columns on `orders` (an order can have many items → one-to-many, and this is what normalization is testing)
  - `transactions(id PK, order_id FK → orders.id, amount, status, payment_method, created_at)`
- [ ] Be ready to explain *why* each FK exists and what normal form you're satisfying (e.g., avoiding repeating group data, avoiding update anomalies)
- [ ] Practice sketching this as a simple ERD (boxes + crow's foot or simple "1 —< many" notation) since one interviewer asked for the diagram explicitly, even though another said it wasn't required

### 🔥 Design an OTP (One-Time Password) system
This is a new, distinct scenario confirmed from a Glassdoor review — treat it as a real system-design prompt, likely to test both your DB design skills and your security awareness, which is very on-theme for an e-payment company (OTP is almost certainly used for transaction verification, login 2FA, etc.).

Talk through it in this shape:

- [ ] **Requirements clarification (say this out loud first):** What's it for — login, transaction confirmation, password reset? Delivery channel — SMS, email, push? How long should it be valid?
- [ ] **Generation:** Use a cryptographically secure random number generator (e.g., `SecureRandom` in Java, not `Math.random()`) to generate a fixed-length numeric code (commonly 4–6 digits).
- [ ] **🔥 Storage — never store the OTP in plaintext.** Store a hash of it (similar reasoning to password storage), or store it in a fast-expiring cache (like Redis) rather than a long-lived table, so it's naturally gone after use/expiry.
- [ ] **Schema if using a DB table:** `otp(id PK, user_id FK, otp_hash, purpose, expires_at, attempt_count, is_used, created_at)`
- [ ] **Expiry (TTL):** short validity window (commonly 2–5 minutes); check `expires_at` on validation, and/or use Redis's native key expiry instead of manual cleanup.
- [ ] **🔥 One-time use enforcement:** mark `is_used = true` (or delete the record/cache key) immediately once successfully validated, so the same OTP can't be replayed — this is the "one-time" part of OTP and a good thing to explicitly call out.
- [ ] **🔥 Brute-force protection:** limit validation attempts (e.g., lock after 3–5 wrong tries), and rate-limit how often a new OTP can be requested (resend cooldown, e.g., one request per 30–60 seconds) — this is a great place to reference the `Semaphore`/rate-limiting concepts from the Concurrency section if asked how you'd implement the limiting at the application layer.
- [ ] **Concurrency edge case worth mentioning:** what happens if the same OTP is validated by two concurrent requests at the same instant (race condition on `is_used`) — solvable with a DB-level atomic update (`UPDATE ... WHERE is_used = false`) or a distributed lock, which is a nice callback to the Multithreading section.
- [ ] **Delivery:** decouple OTP generation/storage from the actual SMS/email sending — typically done asynchronously via a message queue so the API response isn't blocked waiting on a third-party SMS gateway.
- [ ] **Security details worth mentioning if asked to go deeper:** don't reveal whether a user/account exists based on OTP request behavior (avoid user enumeration), use constant-time comparison when checking the hash to avoid timing attacks, log OTP requests/validations for fraud monitoring (very relevant for a payments company).

---

## 27. Mock Interview Questions — Direct Reference (actual questions people have been asked)

Most of these are already covered in sections above — this is a quick-lookup list so you can rehearse them as standalone rapid-fire answers. A few are genuinely new topics called out separately below.

| Question | Where it's covered |
|---|---|
| Stack vs heap memory | Section 2 (JVM Memory Model) |
| try/catch/finally vs declaring `throws` | Section 18 (Exceptions) |
| `throw` vs `throws` | Section 18 (Exceptions) |
| try-with-resources | Section 18 (Exceptions) |
| StringBuffer vs StringBuilder | Section 15 (String) |
| Handling multiple threads safely | Section 20 (Multithreading & Concurrency) |
| Abstract class vs interface; can an interface have a method with a body? | Section 6 (Interfaces & Abstract Classes — default methods, Java 8+) |
| Functional interfaces | Section 19 (Java 8+ Features) |
| Method overriding vs overloading | Sections 8 & 11 |
| Checked vs unchecked exceptions | Section 18 (Exceptions) |
| Can you override a static method? | Section 8 (Inheritance & Polymorphism — no, it's hidden, not overridden) |
| Is Java single-threaded or multi-threaded? | Section 20 (Multithreading — end of section) |
| Method signature definition | Section 11 (Method Overloading) |
| Same name + params, different return type — valid overloading? | Section 11 — **No.** Return type is not part of the method signature, so this is a compile error (duplicate method), not a valid overload. |
| What is ORM, and how do you use it? | Section 23 (Persistence) |

### New topics from the mock question list (not covered elsewhere — study these directly)

- [ ] 🔥 **Memory leaks in Java — causes and how to fix them.** Java has GC, but leaks still happen when objects stay *reachable* when they shouldn't be. Common causes: unclosed resources (streams/connections not closed — tie this back to try-with-resources), static fields holding references to large objects indefinitely, listener/callback objects never unregistered, inner classes holding implicit references to their outer class, poorly sized/unbounded caches. Fixes: close resources properly (try-with-resources), use weak references (`WeakHashMap`) for caches, unregister listeners, avoid unnecessary static references, use profiling tools (like a heap dump analyzer) to find what's not being collected.
- [ ] 🔥 **What problems did procedural programming have that OOP was meant to solve?** Procedural code tends to separate data from the functions that operate on it, leading to: data being passed around and mutated by many unrelated functions with no ownership/protection (poor encapsulation), difficulty modeling real-world relationships and hierarchies, code duplication across similar procedures with no natural way to share/extend behavior, and fragile large codebases where a change to a data structure can break many unrelated functions. OOP addresses this by bundling data + behavior into objects (encapsulation), allowing hierarchies and code reuse (inheritance), and allowing interchangeable implementations behind a common interface (polymorphism).
- [ ] 🔥 **Ways to make a class immutable besides using `final`.** Marking the class `final` (or fields `final`) is only part of it. Full recipe: (1) make the class itself `final` so it can't be subclassed to add mutability, (2) make all fields `private final`, (3) don't provide setters, (4) if a field is a mutable object (like a `List` or `Date`), don't return the actual reference from a getter — return a defensive copy, and don't accept the caller's reference directly in the constructor without copying it either (otherwise the caller can mutate your "immutable" object's internals from outside).
- [ ] 🔥 **`final` vs immutable — how do they differ?** `final` only prevents *reassignment* of a reference/variable — it says nothing about whether the object that reference points to can be changed internally. Immutability is a property of the *object itself* — none of its internal state can change after construction, no matter how many references point to it. A `final List<String> list` still lets you `list.add(...)` — the list is mutable even though the reference is final. This is one of the most repeated gotchas across your whole list, worth having a crisp one-line answer ready.

---

## Quick "gotcha" cheat sheet (things interviewers love to trap on)

- `final` reference ≠ immutable object
- Fields don't participate in runtime polymorphism, only methods do
- Overriding can't reduce visibility, but overloading has no such restriction
- `==` vs `equals()` for both Strings and wrapper objects (Integer caching -128 to 127)
- Unboxing a null wrapper throws `NullPointerException`
- Calling an overridable method from a constructor can use uninitialized subclass state
- `Map` is not a `Collection`
- `HashMap` iteration order is not guaranteed; `LinkedHashMap` preserves insertion order
- Static methods are hidden, not overridden, in subclasses
- `final` prevents reassignment of a reference, not mutation of the object it points to — `final` ≠ immutable
- Two methods with the same name and parameters but different return types is NOT valid overloading (return type isn't part of the signature) — it's a compile error
- Calling `run()` directly does not start a new thread; only `start()` does
- `volatile` gives visibility, not atomicity — `volatile int i; i++;` is still not thread-safe
- `wait()` releases the lock it's called under; `sleep()` does not release any lock
- A static method cannot be overridden, only hidden — calling it through a reference resolves based on the declared (compile-time) type, not the runtime object

---

## Self-check before the interview

You should be able to, without notes:
1. Write a correct `equals()`/`hashCode()` override for a simple class.
2. Explain why Java is pass-by-value using a code example with a mutable object.
3. Explain the difference between checked and unchecked exceptions with an example of each, and `throw` vs `throws`.
4. Write a basic Stream pipeline (filter + map + collect).
5. Explain HashMap's internal bucket/collision mechanism in under 2 minutes.
6. Name a JDK class that demonstrates each of: Singleton, Builder, Decorator, Strategy, Observer.
7. Explain the difference between `ArrayList` and `LinkedList` and when you'd choose each.
8. Explain `CountDownLatch` vs `CyclicBarrier` vs `Semaphore` with a one-sentence use case for each.
9. Explain the difference between `final` and immutable, and list at least 3 concrete steps to make a class truly immutable.
10. Walk through a Spring Boot request: `DispatcherServlet` → Controller → Service → Repository → response, naming the annotations at each layer.
11. Design a simple normalized schema for Users/Orders/Order Items/Transactions with PKs and FKs, on paper, in under 5 minutes — both as a table list AND as a quick ERD sketch.
12. Take a small piece of Spring Boot code, identify a SOLID violation in it, and explain which design pattern fixes it and why.
13. Walk through designing an OTP system end-to-end out loud in under 3 minutes: generation, storage/hashing, expiry, one-time use, brute-force/rate-limit protection, and the concurrency edge case.

If you can do all 13 confidently — in both English and Arabic — you're in strong shape for all three interview rounds at a company like Fawry.
