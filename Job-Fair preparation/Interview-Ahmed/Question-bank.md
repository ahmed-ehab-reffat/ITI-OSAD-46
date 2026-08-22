# Web Development Mock Interview – Question Bank

Consolidated from all sources, deduplicated, Arabic translated to English, organized by topic.

---

## 1. Web Fundamentals & Security

1. What happens when you type a URL into the browser and press Enter?
2. What is DNS, and how does it resolve a domain name to an IP address?
3. Client-server architecture – how do a browser and a server communicate?
4. The HTTP request/response cycle; common HTTP headers
5. HTTP vs HTTPS; what do SSL/TLS do?
6. What is XSS (Cross-Site Scripting), and how do you prevent it?
7. What is CSRF (Cross-Site Request Forgery), and how do you prevent it?
8. What is SQL injection, and how do you prevent it?
9. How should passwords be stored? (hashing + salting, e.g., bcrypt) – why never store them in plain text?
10. Environment variables and secrets management (e.g., `.env` files) – why keep secrets out of source code?
11. Input validation vs sanitization – why validate on both the client and the server?
12. What does it mean for an API endpoint to be idempotent? Which HTTP methods are idempotent?
13. Authentication vs authorization – what's the difference?
14. How do you authenticate a user end-to-end? (credentials verified, token issued, token sent on future requests)
15. How do you handle authorization for users with different roles/permissions?
16. JWT vs session tokens – stateless vs stateful, and how each is revoked
17. Full JWT auth flow: hashing the password at signup, verifying at login, issuing and storing the token
18. API versioning – how do you add a breaking change without breaking existing clients?
19. How do you secure a login-based application end-to-end?

---

## 2. HTML & CSS

1. Semantic tags – what are they and why use them?
2. Flex vs Grid
3. px vs rem vs em – when to use each
4. Inline vs block vs inline-block
5. Absolute vs relative vs fixed vs sticky positioning
6. z-index vs stacking context
7. Aim of the `alt` attribute in HTML
8. Inline styles vs `<style>` tags vs external CSS files – which is fastest for performance?
9. How does the Critical Rendering Path affect page load speed?
10. What are Paint & Layout in the rendering engine, and how do you reduce their performance impact?
11. How do you avoid Cumulative Layout Shift (CLS) and improve UX?
12. How do you ensure a site is responsive across all screen sizes?
13. Should a `<script>` tag go above or below the page content, and why?
14. Transition vs animation
15. The CSS box model (content, padding, border, margin)
16. CSS specificity and the cascade – how does the browser decide which rule wins?
17. Media queries and mobile-first responsive design
18. Purpose of the viewport meta tag
19. Basic accessibility (a11y) – ARIA roles/attributes, using semantic HTML for screen readers
20. SEO basics – what helps a page rank well?
21. HTML4 vs HTML5 – what did HTML5 add?
22. Flexbox: justify-content vs align-items
23. What is lazy loading?

---

## 3. JavaScript

1. var vs let vs const (scope & hoisting)
2. What features did ES6 add to JS?
3. Spread vs rest operator, and the aim of each
4. What are promises? What are their states?
5. What problem do promises solve? What is callback hell, and how is it solved (promises → async/await)?
6. Promise vs async/await – when to use each
7. null vs undefined vs "not defined" vs ReferenceError
8. Temporal Dead Zone (TDZ)
9. JS data types
10. call vs apply vs bind
11. Object.create() vs Object.assign()
12. Object.freeze() vs Object.seal() (how to make object attributes unchangeable)
13. Event bubbling – what is it, and how do you stop/solve it?
14. Event delegation – what is it and why use it?
15. Promise.all() vs Promise.allSettled()
16. Types of functions
17. Higher-order functions
18. Currying function
19. Self-invoking (IIFE) functions
20. Filter vs map vs reduce/forEach; for loop vs forEach
21. for...of vs for...in
22. Closures (explain simply) – which OOP pillar does it relate to? (Encapsulation)
23. Callback with closure
24. Shallow copy vs deep copy
25. == vs ===
26. Coercion vs casting
27. Pass by value vs pass by reference (primitive vs non-primitive)
28. Hoisting
29. The `this` keyword
30. Prototype and the prototype chain
31. prototype vs `__proto__`
32. Scope chain
33. How does JS run under the hood? (execution context)
34. Event loop – how it works, and why is it important to understand?
35. Microtask vs macrotask (order of setTimeout vs Promise vs process.nextTick vs setImmediate)
36. Synchronous vs asynchronous – how does JS handle async code?
37. `await` inside `forEach` vs `await` inside `for...of` – why does the former cause problems?
38. Debouncing vs throttling
39. Local storage vs session storage vs cookies
40. How do you write performant JavaScript code?
41. npm vs npx, and what does `package.json` include?
42. Global vs function vs block scope
43. Truthy vs falsy values
44. Common array methods: slice vs splice, push/pop vs shift/unshift
45. JSON.parse() vs JSON.stringify()
46. Basic DOM manipulation: querySelector, addEventListener, createElement
47. CommonJS (`require`/`module.exports`) vs ES Modules (`import`/`export`)
48. Strict mode – what does `'use strict'` change?
49. Arrow functions vs regular functions – how does `this` binding differ?
50. Template literals
51. Garbage collection – how does JS manage memory, and what can cause a memory leak?
52. Ways to clone an object (spread/Object.assign vs structuredClone/JSON.parse+stringify vs a deep-clone library)
53. JavaScript primitive data types
54. Lexical scope
55. First-class functions
56. How does JS implement inheritance under the hood? (prototype chain, not classical classes)
57. WeakMap vs WeakSet
58. Function vs method
59. Different ways to create a function in JavaScript
60. Different ways to create an object in JavaScript
61. Different ways to create a class in JavaScript
62. Generator functions (`function*`, `yield`)
63. Compiled vs interpreted languages

**Code snippets / tricky questions**
- `function f(...a, b) { console.log(b) }` – is this valid, and what happens?
- `var x = 9; x = undefined;` – is this valid?
- `const obj1 = {name:"MO", age:23}; const obj2 = Object.create(obj1); console.log(obj1, obj2);` – explain the output.
- `const a = 2; const b = new Number(5); console.log(a === b);` – true or false, why?
- Compare two arrays by reference vs by value.
- Trace the execution order of a Promise nested inside a `setTimeout` and vice versa, with several `console.log`s.
- `JSON.stringify()` only serializes own properties, not properties inherited via `__proto__` – why?
- `"1" + 1` – what does this evaluate to, and why?

---

## 4. TypeScript

1. What is TypeScript, and what does it add to JS?
2. What is static typing?
3. How is TypeScript compiled? (tsc, tsconfig.json, npm vs npx for compiling)
4. type vs interface
5. any vs unknown – can `unknown` be used without type narrowing?
6. Union vs intersection types
7. `||` vs `??` (logical OR vs nullish coalescing)
8. Optional operator (`?`)
9. How do you make an attribute required in TS?
10. Generics – what problem do they solve?
11. Enums
12. Tuples
13. Type assertion (casting)

---

## 5. Node.js

1. What is Node.js? What is Express?
2. module.exports vs exports
3. What is JWT? Explain its structure/components in detail.
4. Access token vs refresh token
5. Advantages & disadvantages of JWT
6. Can a JWT payload be decoded?
7. Use case for having more than one access token
8. JWT vs OAuth
9. Hashing vs encryption (+ types of hashing methods)
10. What is middleware? What happens if a middleware doesn't call `next()`?
11. What is CORS?
12. Stateful vs stateless
13. PUT vs PATCH
14. What is a webhook?
15. Explain a RESTful API; HTTP methods
16. Is Node.js single-threaded or multi-threaded?
17. V8 vs libuv – role of each
18. Node.js event loop – phases, priorities (setImmediate vs process.nextTick vs Promises)
19. Thread pool – default worker count, and is it configurable?
20. Parallelism vs concurrency
21. What is an EventEmitter? Which design pattern does it implement? (Observer / Pub-Sub)
22. Aim of bindings in Node.js
23. Clustering in Node.js
24. What is the `fork` module in Node.js?
25. Piping in Node.js
26. npm scripts; `package.json` vs `package-lock.json`
27. Environment variables in Node (`process.env`, `.env` files, dotenv)
28. Basic use of the file system (`fs`) module
29. Error-handling middleware in Express
30. Building a simple REST API with basic CRUD endpoints
31. spawn vs fork (child processes)
32. Stream vs Buffer
33. Blocking vs non-blocking code
34. Route params vs query params
35. What do the `req` and `res` objects carry?
36. Node.js and I/O-bound vs CPU-intensive tasks – where does it excel or struggle?
37. Can you make Node.js multi-threaded? (`worker_threads`, the `cluster` module)

---

## 6. React

1. Class components vs functional components
2. State vs props
3. useState vs useReducer – when to use each
4. useState vs useRef
5. useEffect vs useLayoutEffect
6. useMemo vs useCallback vs React.memo
7. Custom hooks
8. Component lifecycle
9. Context API vs Redux/Zustand – what problem does Context API have that Redux solves?
10. Props drilling
11. Controlled vs uncontrolled components
12. DOM vs BOM vs Virtual DOM
13. Virtual DOM & reconciliation – what problems can the Virtual DOM cause?
14. CSR vs SSR vs SSG vs ISG vs SPA
15. Error boundaries and error handling
16. How do you handle memory leaks in React?
17. How do you optimize performance in a React app? (code splitting, lazy loading, memoization, bundle optimization)
18. Testing: Jest / React Testing Library, unit vs snapshot vs integration testing, mocking APIs
19. Why do list items need a unique `key` prop?
20. React Fragments – what problem do they solve?
21. Client-side routing with React Router
22. Rules of Hooks – why can't hooks be called conditionally or in loops?
23. Handling forms in React; prop validation (PropTypes)
24. What is React, and why use it?
25. Is React a library or a framework?
26. The dependency array in `useEffect` – how do `[]`, `[value]`, and no array differ?
27. How do you replicate class lifecycle methods with `useEffect`?
28. What is JSX?
29. Can you return a function from `useEffect`? (cleanup function)
30. What is Redux, and how does it work? (store, actions, reducers)
31. React class component lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, `componentDidCatch`)
32. Hook-to-class-component equivalents (useState, useEffect, useContext, useRef, useReducer)

---

## 7. Testing Fundamentals

1. Unit testing vs integration testing vs end-to-end (E2E) testing
2. What is Test-Driven Development (TDD)?
3. Mocking vs stubbing – why fake external dependencies in tests?
4. What makes a good unit test? (isolated, repeatable, fast)
5. Common testing tools per stack (Jest / Mocha+Chai for JS/Node, Pytest/unittest for Python, JUnit for Java)

---

## 8. Next.js

1. getStaticProps vs getServerSideProps
2. Incremental Static Regeneration (ISR)
3. Server components vs client components (Next.js 13+)
4. Pages Router vs App Router
5. Middleware in Next.js
6. Handling authentication in Next.js
7. Dynamic routing – `[id].js` vs `[[...slug]].js`
8. Image optimization in Next.js
9. API routes in Next.js
10. `next.config.js` – purpose and common uses
11. Hydration issues – how do you handle them?

---

## 9. Angular

1. What is Angular? Angular vs React
2. Can you build a single-page app with Angular?
3. What is a component? Component vs module
4. What is an NgModule?
5. Data binding and its types (e.g., interpolation)
6. JIT vs AOT compilation
7. What are services?
8. Angular pipes, the Angular CLI, and how data flows between components
9. Directives – structural (`*ngIf`, `*ngFor`) vs attribute (`ngClass`, `ngStyle`)
10. Lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`)
11. Template-driven vs reactive forms
12. Observables vs Promises
13. Interceptors

---

## 10. OOP

1. What problems does OOP solve? What is OOD?
2. The 4 pillars of OOP – explain each
3. Class vs object vs instance
4. Class vs struct
5. Constructor vs destructor
6. Types of inheritance (single, multilevel, multiple, hierarchical)
7. Composition vs aggregation vs association vs inheritance (+ use cases for each)
8. Why is composition often preferred over inheritance?
9. The diamond problem – its cause, and how interfaces/multiple inheritance rules solve it
10. Types of polymorphism
11. Method overloading vs overriding
    - Must an overriding method keep the same signature and access modifier?
    - `@Override` annotation questions (used to test if a candidate can spot true polymorphism)
    - Code snippet: two `add(int a, int b)` methods with different return types – is this valid overloading?
    - Code snippet: `Parent.display()` (protected) overridden as `public` in `Child` – valid overriding?
    - Code snippet: `Parent.display()` (public) overridden as `private` in `Child` – valid?
12. Interface vs abstract class – when to use each
13. Why would you make a class abstract if all its methods are concrete?
14. Why did Java 9 add private methods to interfaces?
15. Can an abstract class declare non-constant (instance) variables?
16. Access modifiers
17. `final` keyword (on variables, methods, classes) vs `static`
18. Can a constructor be private? Why would you need one? (singleton use case)
19. Data hiding vs data binding
20. What is data hiding, and how is it achieved in OOP? (encapsulation)
21. Tight coupling vs loose coupling
22. What is an immutable class? How do you make a class immutable? Which built-in classes are immutable/mutable?
23. Declarative vs imperative programming – which is OOP?
24. Relationship between the Liskov Substitution Principle and inheritance
25. Difference between a reference type and an object type, e.g. `Parent x = new Child();`
26. Difference between C++ and Java
27. Macros vs functions
28. Constructor types (default, parameterized, copy)

---

## 11. Java

1. Stack vs heap memory
2. Handling exceptions – try/catch/finally vs declaring `throws`
3. throw vs throws
4. try-with-resources
5. StringBuffer vs StringBuilder
6. Handling multiple threads safely (`synchronized`, locks, thread-safe collections)
7. Abstract class vs interface in Java; can an interface have a method with a body? (default methods since Java 8)
8. Functional interfaces
9. What is ORM, and how do you use it?
10. Method overriding vs method overloading in Java
11. Memory leaks in Java – causes and how to fix them
12. Checked vs unchecked exceptions
13. What problems did procedural programming have that OOP was meant to solve?
14. Ways to make a class immutable besides using `final`
15. `final` vs immutable – how do they differ?
16. Can you override a static method?
17. Is Java single-threaded or multi-threaded?
18. What is a method signature? (name + parameter list – the return type is not part of it)
19. Trick: if two methods share a name and parameters but have different return types, is that valid overloading?

---

## 12. SOLID & Design Patterns

1. SOLID principles – explain each with an example
2. Dependency Inversion vs Dependency Injection
3. What is the relationship between design patterns, SOLID, and OOP?
4. Categories of design patterns (creational, structural, behavioral)
5. Singleton pattern – use cases
6. Builder pattern – e.g., constructing complex objects like response DTOs or HTTP clients
7. A class has multiple overloaded constructors for the same fields (telescoping constructor) – what problem does this cause, and which pattern solves it? (Builder)
8. Factory pattern
9. Adapter pattern – which interface gets wrapped, the old or the new one? (e.g., integrating a legacy SOAP service into a REST application)
10. Observer pattern
11. Reactor pattern
12. Is middleware a structural or behavioral pattern? Is it closer to Proxy or Chain of Responsibility?
13. Which design patterns have you seen/used in the frameworks you've worked with?
14. Which pattern fits a single entry point for DB, caching, and messaging layers? (Singleton/Facade)
15. Design a payment feature supporting multiple payment methods (Credit Card, PayPal, Bank Transfer, Apple Pay) – which pattern fits? (Strategy)
16. Which design patterns are commonly used in a service layer?
17. Why is a naive Singleton unsafe with multithreading? (race condition on creation)
18. Types of abstraction – data abstraction vs process/control abstraction
19. Strategy pattern
20. Facade pattern

---

## 13. Data Structures & Algorithms

1. Array vs Linked List
2. Types of linked lists (singly, doubly, circular)
3. Stack vs queue
4. What is a hash map / hash table, and how does it work?
5. Binary Search Tree (BST) – what happens if you remove the root?
6. Recursion vs loop – use cases for each
7. Big O vs Theta (Θ) vs Big Omega (Ω) notation
8. Coding problem: best time to buy and sell a stock
9. Coding problem: maximum height/altitude problem
10. Efficiently remove duplicates from an array
11. Flatten a deeply nested array
12. Why can a hash collision sometimes be useful? (e.g., locality-sensitive hashing)
13. Coding problem: Two Sum
14. Coding problem: reverse a string
15. Coding problem: convert an array to an object
16. Coding problem: count the occurrence of each character in a string
17. Coding problem: get all unique elements of an array
18. Coding problem: find prime numbers from a large array with a custom batching/selection pattern

---

## 14. Databases (SQL, NoSQL & MongoDB)

1. SQL vs NoSQL
2. ACID principles – explain each
3. BASE (used by NoSQL/MongoDB instead of ACID)
4. Normalization vs denormalization – use cases for each
5. Ways to increase the speed of data retrieval from a database
6. Indexing – advantages, disadvantages, and a use case
7. Clustered vs non-clustered index (primary vs secondary index)
8. Does field order matter in a compound/composite index?
9. Why can having too many indexes hurt performance?
10. LIKE vs ILIKE
11. Inner join vs outer join vs cross join (and using WHERE with a cross join)
12. Views vs stored procedures – why use a view instead of a raw query? Views for optimization
13. Triggers, procedures, and functions
14. Scalar vs aggregate functions
15. Aggregation functions vs window functions
16. Isolation levels
17. Given a query, explain its execution steps
18. Why shouldn't you use `SELECT *`?
19. Data warehousing
20. N+1 query problem – causes and solutions
21. select_related vs prefetch_related (and which relationship type – 1:1, 1:M, M:M – each is used for)
22. ORM vs ODM
23. MongoDB: how to create a database in mongosh
24. MongoDB: using `.explain()` to diagnose a slow query
25. MongoDB: types of indexes
26. MongoDB: aggregation methods; pagination methods
27. MongoDB: finding, inserting, and deleting documents
28. MongoDB: upsert
29. updateOne() vs findOneAndUpdate()
30. `$set` vs `$unset`
31. Projection in MongoDB
32. What is a cursor?
33. Structure of an ObjectID; how BSON stores data physically
34. Renaming or removing a field in a document
35. Types of query selectors (comparison, logical, element) – with examples
36. Embedding vs referencing – use cases
37. Vertical vs horizontal scaling; why is MongoDB well-suited to horizontal scaling? (load balancer support)
38. Primary node vs secondary node; replication vs sharding
39. CAP theorem
40. Redis and other database types – what are they used for? (e.g., caching, rate limiting)
41. Solving a slow query – indexing vs caching (e.g., with Redis)
42. Validations vs constraints
43. Primary key vs foreign key
44. One-to-one vs one-to-many vs many-to-many relationships
45. Writing a basic SQL query (SELECT, WHERE, GROUP BY, ORDER BY)
46. What is a database transaction, and why does it matter?
47. Basic CRUD operations in SQL vs in MongoDB
48. What is a database, and what are the main types? (relational vs non-relational)
49. DML vs DDL vs DCL
50. How do you find duplicate rows in a table? (`GROUP BY` + `HAVING COUNT(*) > 1`)
51. HAVING vs WHERE, and which runs first
52. UNION vs UNION ALL
53. DELETE vs TRUNCATE vs DROP
54. Why use joins instead of nested subqueries?
55. Database storage engines (e.g., InnoDB vs MyISAM in MySQL)
56. Cursor count vs total document count in MongoDB
57. Mongoose `.populate()` and virtuals – simulating joins in MongoDB
58. Can you create a view in MongoDB?

---

## 15. Git

1. git merge vs git rebase (impact on commit history)
2. git reset vs git revert
3. git fetch vs git pull
4. What do you do if a branch isn't found locally? (fetch)
5. What would you do if you're on a local branch and can't check out to main?
6. git stash; git stash pop vs git stash apply
7. git cherry-pick
8. git diff
9. Pull request / merge request
10. git reset --hard
11. git branch, git checkout
12. git add, git commit -m, git push
13. Git vs GitHub vs GitLab
14. How do you handle merge conflicts?
15. How do you resolve Django migration conflicts?
16. What are branches in Git, and when should you create a new one?
17. What is a `.gitignore` file for?
18. Commit message conventions (e.g., Conventional Commits – `feat:`, `fix:`, `chore:`)

---

## 16. API Design & HTTP

1. REST vs SOAP vs GraphQL
2. RESTful APIs vs web services in general
3. gRPC vs REST – why can gRPC be faster? (binary protocol)
4. HTTP methods; PUT vs PATCH
5. HTTP status codes: 201, 204, 401 vs 403, 404, 409, 429 (too many requests), 500 – meaning of each
6. CORS
7. Designing an API – must a response always return JSON?
8. Fetch (frontend) vs an HTTP request (backend) – what's the difference?
9. Axios vs fetch – which do you prefer and why?
10. Token storage: cookies vs local storage, and the security risk of each
11. Role-based access control vs attribute-based access control
12. OAuth implicit flow – why it matters
13. Overview of API types
14. MVC vs Web API
15. Designing a REST API for a resource with nested data (e.g., posts and their comments)
16. Why name REST endpoints with plural nouns (e.g., `/users`, not `/clients` or a singular form)?

---

## 17. System Design, Performance & Scalability

1. How would you reduce an endpoint's response time from 6 seconds to 2 seconds?
2. Technical strategies to optimize a high-latency API
3. How do you debug an app that works on some browsers/phones but not others?
4. How do you handle a bottleneck in the database or a slow API?
5. Load balancing strategies
6. Batch operations
7. Async / background jobs
8. Caching (and caching manipulation/abuse)
9. Rate limiting
10. Pagination, and how it can be abused/exploited from the frontend
11. File upload handling (size limits)
12. Search functionality under heavy/repeated use
13. Memory leak identification
14. Payload size considerations
15. Handling images at scale
16. Preventing duplicate payments when a user double-clicks (e.g., using Redis to reject rapid repeat requests)
17. Designing a payment feature end-to-end
18. Design questions: spam detection (e.g., Truecaller), a notification system, a "likes" feature (e.g., Facebook), submitting an order, changing order status, live stock/inventory updates on a homepage
19. Development vs production environment – key differences
20. Clustering
21. Microservices
22. Memory allocation in Python
23. Deployment strategies in detail: rolling vs blue-green vs canary
24. React vs Angular – when would you choose each?
25. Node.js vs Laravel – when would you choose each?
26. Diagnosing a backend that restarts on a recurring schedule (e.g., every 4 hours)
27. The Saga pattern – handling a multi-step transaction (e.g., checkout) that can't be one atomic DB transaction
28. Recovering after a crash mid-order: making order submission idempotent so retries don't duplicate or double-charge
29. A framework for answering "design a fault-tolerant feature": data model, performance, concurrency, and fault tolerance

---

## 18. Docker & DevOps

1. Why use Docker?
2. Docker vs Docker Compose
3. Docker Image vs Docker Container vs Docker Hub
4. Docker vs Virtual Machine (VM)
5. Container vs Pod (Kubernetes)
6. Deployment strategies
7. What is CI/CD, and why is it useful?
8. Managing configuration/secrets differently across dev, staging, and production
9. If the server isn't running, what's the first thing you check? (logs, before restarting blindly)
10. chown vs chmod
11. What does a 405 error after a `chmod` change usually mean?
12. Three-tier architecture (presentation, application/logic, data)
13. Thin client vs thick client
14. What is a Dockerfile?
15. CMD vs ENTRYPOINT in Docker
16. Can you write SQL statements inside MongoDB? (sanity check on query languages)

---

## 19. Python

1. Is everything in Python an object?
2. Immutable vs mutable
3. Python data types
4. List vs tuple (performance, mutability, how each works under the hood)
5. `==` vs `is`
6. Does Python have an equivalent to JS's `===`?
7. `*args` vs `**kwargs`
8. Pass by value vs pass by reference vs pass by object
9. Exception handling; using `pass` in an `except` block to continue execution normally
10. Decorators – do they run before or after the function? (both)
11. Closures
12. Shallow copy vs deep copy
13. Object chaining
14. Reference sharing
15. Object caching
16. The GIL (Global Interpreter Lock)
17. Multithreading vs multiprocessing vs async – deep dive on each
18. JIT vs AOT compilation
19. The 4 pillars of OOP, applied to Python
20. Static vs dynamically typed languages
21. Class methods vs static methods vs instance methods
22. Reference counting – Python's core memory management mechanism
23. Are list comprehensions just syntactic sugar, or are they actually faster than an equivalent loop?
24. If Python has the GIL, why do we still use multithreading at all?
25. OOP in Python vs Java vs C++ – how do they differ?
26. When would you choose Python over Java for a project (and vice versa)?
27. Example of a custom decorator (e.g., a DRF-style permission check)

---

## 20. Django

1. Request/response lifecycle in Django (forward and backward); role of settings.py, urls.py, etc.
2. select_related vs prefetch_related
3. N+1 query problem
4. Serialization in depth (input vs output serialization)
5. Types of views (function-based, class-based, viewsets); `.as_view()`
6. ASGI vs WSGI
7. makemigrations vs migrate
8. How to resolve migration conflicts
9. CSRF tokens
10. Signals in Django
11. Multi-session support in Django
12. Common `python manage.py` CLI commands
13. Django vs Express
14. Django vs FastAPI vs Flask – when would you use each?

---

## 21. AI / ML

1. RAG (Retrieval-Augmented Generation)
2. Vector databases
3. Open-source models for speech-to-text, text-to-speech, and image classification
4. Prompt engineering

---

## 22. Behavioral / General

1. Introduce yourself, a project you've worked on, and a problem you faced
2. Walk through one of your projects in detail
3. Sketch/diagram a project idea
4. Have you had conflicts with teammates? How did you resolve them?
5. How do you design an ERD for your projects?
6. Comparing frameworks you've used – pros and cons of each
7. What are your strengths and weaknesses?
8. Tell me about a time you had a tight deadline – how did you handle it?
9. How do you keep up with and learn new technologies?
10. Why do you want this role / this company?
11. Tell me about a mistake you made and what you learned from it
12. How do you decide where business logic belongs – backend vs frontend?
13. How would you explain ensuring atomicity in a feature like payments?
14. What would you do if you wanted to implement an idea your lead isn't convinced about?
15. How would you handle being asked to work during your vacation?
16. Explaining a career shift into tech (e.g., before a bootcamp)
17. Describing your specific role in a team or graduation project
