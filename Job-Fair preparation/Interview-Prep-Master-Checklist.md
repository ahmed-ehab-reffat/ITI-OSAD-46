# Interview Prep Master Checklist (Backend-leaning Full-Stack)

This is a complete topic checklist, not a schedule. Every section is split into:
- **Must Know** — high-frequency, asked constantly, ordered highest-priority first.
- **Good to Know** — less common but still comes up, ordered highest-priority first.

Check items off as you cover them. Build your own daily plan from this by picking however much fits your available time — Must Know first, always, across every section, before touching any section's Good to Know.

---

## 1. Data Structures & Algorithms

### Must Know
- [ ] **Time & space complexity (Big-O)** — analyzing any solution, common classes (O(1)/O(log n)/O(n)/O(n log n)/O(n²)), the tradeoff you'll be asked to state on every problem
- [ ] **Big-O vs. Theta vs. Big-Omega** — upper vs. tight vs. lower bound (the notation distinction)
- [ ] **Structure comparisons** — Stack vs. Queue, Array vs. Linked List, types of linked lists (singly/doubly/circular), BST operations incl. removing the root
- [ ] **Arrays** — traversal, in-place manipulation, common patterns
- [ ] **Strings** — manipulation, comparison, common patterns
- [ ] **Two Pointers** — converging/diverging pointers on sorted/unsorted arrays
- [ ] **Sliding Window** — fixed and variable window size problems
- [ ] **Sorting** — how merge sort/quick sort work, stability, when each is used
- [ ] **Searching** — linear search, general search patterns
- [ ] **Binary Search** — classic + on rotated arrays + search-space reduction
- [ ] **Hashmaps / Hash Tables** — collision handling, frequency counting, two-sum family
- [ ] **Linked List** — reversal, cycle detection (fast/slow pointers), merging
- [ ] **Prefix Sum** — range sum queries, subarray sum problems
- [ ] **Queue** — FIFO usage, BFS support
- [ ] **Stack** — LIFO usage, parentheses/expression validation
- [ ] **Bit Manipulation** — XOR tricks, bit masks, common interview shortcuts
- [ ] **Recursion** — base case/recursive case design, recursion tree thinking
- [ ] **Trees** — traversals (in/pre/post-order), BFS/DFS, BST properties

### Good to Know
- [ ] **Graphs** — BFS/DFS, what a shortest-path problem looks like
- [ ] **Tries** — prefix matching, autocomplete use case
- [ ] **Dynamic Programming** — memoization vs. tabulation, recognizing DP problems
- [ ] **Monotonic Stack** — next-greater-element style problems
- [ ] **Priority Queue / Heap** — top-K problems, scheduling

---

## 2. Object-Oriented Programming & SOLID

### Must Know
- [ ] **Four OOP pillars** — encapsulation, inheritance, polymorphism, abstraction
- [ ] **Why use OOP / what it solves** — the problem OOP addresses vs. procedural
- [ ] **Class vs. Instance/Object** — the blueprint-vs-instance distinction
- [ ] **Composition vs. Aggregation vs. Association vs. Inheritance** — the four relationship types and how they differ
- [ ] **Overloading vs. Overriding** — compile-time vs. runtime, signature vs. behavior
- [ ] **Types of Inheritance** — single, multiple, multilevel, hierarchical, hybrid
- [ ] **Types of Polymorphism** — compile-time (overloading) vs. runtime (overriding)
- [ ] **Interfaces vs. Abstract Classes** — when to use which
- [ ] **Diamond Problem** — multiple-inheritance ambiguity and how languages resolve it
- [ ] **Constructor vs. Destructor + constructor types** — default/parameterized/copy
- [ ] **Access modifiers** — public/private/protected and their scope
- [ ] **`final` vs. `static`** — and the aim of `this`/`self`
- [ ] **Composition vs. Inheritance** — "favor composition over inheritance," why
- [ ] **Is everything in Python an object?** — the "yes, including functions/classes" answer
- [ ] **Single Responsibility Principle** — one reason to change
- [ ] **Open/Closed Principle** — open for extension, closed for modification
- [ ] **Liskov Substitution Principle** — subtypes must be substitutable for base types
- [ ] **Interface Segregation Principle** — many specific interfaces over one general one
- [ ] **Dependency Inversion Principle** — depend on abstractions, not concretions
- [ ] **Dependency Inversion vs. Dependency Injection** — the principle vs. the technique (commonly confused)

### Good to Know
- [ ] **Object vs. Struct** — behavior + data vs. plain data
- [ ] **Data hiding vs. data binding** — the distinction
- [ ] **Private constructors** — use cases (Singleton, factory-only creation)
- [ ] **Coupling & Cohesion** — high cohesion, low coupling as a design goal
- [ ] **DRY / KISS / YAGNI** — as design heuristics, not just acronyms
- [ ] **Law of Demeter** — "don't talk to strangers" object interaction rule
- [ ] **Object-Oriented Design (OOD) process** — basic UML familiarity
- [ ] **Mixins / Traits** — language-specific composition mechanisms

---

## 3. Design Patterns

### Must Know
- [ ] **Singleton** (Creational) — single instance, when it's an anti-pattern
- [ ] **Factory Method** (Creational) — delegate object creation to subclasses
- [ ] **Builder** (Creational) — step-by-step construction of complex objects
- [ ] **Observer** (Behavioral) — subscribe/notify, event systems
- [ ] **Strategy** (Behavioral) — interchangeable algorithms behind one interface
- [ ] **Adapter** (Structural) — making incompatible interfaces work together
- [ ] **Decorator** (Structural) — adding behavior without subclassing
- [ ] **Facade** (Structural) — simplified interface over a complex subsystem
- [ ] **Repository** (Architectural) — abstraction over data access, works with domain objects
- [ ] **DAO (Data Access Object)** (Architectural) — abstraction over raw queries; how it differs from Repository
- [ ] **MVC** (Architectural) — Model/View/Controller separation

### Good to Know
- [ ] **Abstract Factory** (Creational) — families of related objects, vs. plain Factory
- [ ] **Prototype** (Creational) — cloning existing objects
- [ ] **Proxy** (Structural) — placeholder controlling access to another object
- [ ] **Composite** (Structural) — tree structures of objects treated uniformly
- [ ] **Bridge** (Structural) — decoupling abstraction from implementation
- [ ] **Flyweight** (Structural) — sharing to minimize memory use
- [ ] **Command** (Behavioral) — encapsulating a request as an object
- [ ] **Chain of Responsibility** (Behavioral) — passing a request along a handler chain
- [ ] **Iterator** (Behavioral) — sequential access without exposing structure
- [ ] **Template Method** (Behavioral) — skeleton algorithm, subclasses fill in steps
- [ ] **State** (Behavioral) — behavior changes based on internal state
- [ ] **Mediator** (Behavioral) — centralizing complex communication between objects
- [ ] **Memento** (Behavioral) — capturing/restoring object state (undo functionality)
- [ ] **Visitor** (Behavioral) — separating an algorithm from the objects it operates on

---

## 4. Databases (SQL & NoSQL)

### Must Know
- [ ] **SQL fundamentals (RDBMS)** — SELECT, WHERE, GROUP BY, HAVING, ORDER BY, subqueries
- [ ] **Joins** — INNER, LEFT, RIGHT, FULL, SELF, CROSS, with concrete examples
- [ ] **Keys** — primary key, foreign key, unique key, composite key
- [ ] **ACID properties** — Atomicity, Consistency, Isolation, Durability, each defined individually
- [ ] **Normalization** — 1NF, 2NF, 3NF, and why/when you'd denormalize
- [ ] **Indexing** — how a B-tree index works, when to add one, composite/covering indexes, the write-cost tradeoff
- [ ] **Index types** — primary vs. clustered vs. non-clustered, composite index column order
- [ ] **Validations vs. constraints** — application-level vs. database-level enforcement
- [ ] **Transactions & isolation levels** — Read Uncommitted / Read Committed / Repeatable Read / Serializable, plus dirty reads, non-repeatable reads, phantom reads
- [ ] **SQL vs. NoSQL** — when to choose which, concrete decision criteria
- [ ] **NoSQL document model (MongoDB)** — collections/documents, BSON, schema flexibility
- [ ] **ORM vs. ODM** — Sequelize/Mongoose/Eloquent/Active Record/Django ORM/SQLAlchemy
- [ ] **N+1 query problem** — what causes it, how to avoid it (eager loading)
- [ ] **Query optimization basics** — reading an EXPLAIN/query plan
- [ ] **Connection pooling** — why it matters, how it works

### Good to Know
- [ ] **Window functions & CTEs** — the WITH clause, ranking/running-total style queries
- [ ] **Aggregate vs. window functions** — collapsing rows vs. keeping them
- [ ] **LIKE vs. ILIKE** — case-sensitive vs. case-insensitive pattern matching
- [ ] **Solutions to speed up DB retrieval** — indexing, caching, denormalization, query tuning, read replicas
- [ ] **Data warehousing** — OLTP vs. OLAP, what a warehouse is for
- [ ] **MongoDB operations** — `.explain()`, index types, aggregation pipeline, pagination, upsert, `updateOne` vs. `findOneAndUpdate`, `$set` vs. `$unset`, embedding vs. referencing, `.populate()`, projection, cursor, ObjectID structure
- [ ] **BASE vs. ACID** — NoSQL's eventual-consistency model vs. relational guarantees
- [ ] **Primary vs. secondary node; replication vs. sharding** — MongoDB cluster concepts
- [ ] **BCNF and higher normal forms** — beyond 3NF
- [ ] **Locking** — optimistic vs. pessimistic, what causes deadlocks
- [ ] **Replication** — primary-replica setup, read replicas
- [ ] **Sharding / horizontal partitioning** — strategies and tradeoffs
- [ ] **Redis & key-value stores** — caching patterns, TTL, common data structures
- [ ] **Other NoSQL categories** — column-family (Cassandra), graph databases (Neo4j) at awareness level
- [ ] **Stored procedures, triggers, views** — what they're for
- [ ] **Database migrations / schema versioning** — tooling concept (Flyway, Liquibase, framework-native migrations)
- [ ] **Full-text search indexing** — concept level
- [ ] **Referential integrity & cascading deletes**
- [ ] **Backup & recovery basics**
- [ ] **CAP theorem as it applies to database choice** — cross-reference with System Design
- [ ] **PostgreSQL-specific features** — JSONB, array/composite types, full-text search (tsvector), extensions

---

## 5. System Design

### Must Know
- [ ] **Client-server model & REST API design principles**
- [ ] **Caching strategies** — cache-aside, write-through, write-back, TTL, invalidation
- [ ] **Horizontal vs. vertical scaling**
- [ ] **Load balancing** — round robin, least connections, IP hash
- [ ] **CAP theorem** — Consistency, Availability, Partition tolerance tradeoffs
- [ ] **MVC architecture**
- [ ] **Database choice in system design** — SQL vs. NoSQL tradeoffs in context
- [ ] **API design essentials** — pagination, rate limiting, versioning
- [ ] **Microservices vs. monolith** — tradeoffs, when to pick which
- [ ] **Message queues / brokers** — what problem Kafka/RabbitMQ solve
- [ ] **CDN basics** — what it caches and why
- [ ] **Back-of-envelope capacity estimation** — basic requests/sec and storage math

### Good to Know
- [ ] **API Gateway** — single entry point pattern
- [ ] **GraphQL vs. REST** — tradeoffs
- [ ] **WebSockets vs. polling**
- [ ] **Service discovery**
- [ ] **Consistent hashing**
- [ ] **Leader election**
- [ ] **Distributed locking**
- [ ] **Event-driven architecture**
- [ ] **CQRS pattern**
- [ ] **Saga pattern** — distributed transactions
- [ ] **Circuit breaker pattern**
- [ ] **Idempotency in API design**
- [ ] **Eventual consistency vs. strong consistency**
- [ ] **Rate limiting algorithms** — token bucket, leaky bucket, sliding window
- [ ] **Optimizing a slow endpoint** — profiling, caching, query tuning, N+1, pagination
- [ ] **Handling DB/API bottlenecks** — indexing, connection pooling, caching, async processing
- [ ] **Dev vs. prod environments** — config, debugging, feature flags, why "works on my machine" happens
- [ ] **Clustering** — running multiple process instances, load distribution
- [ ] **Cross-browser / cross-device debugging** — feature detection, dev tools, responsive testing
- [ ] **JIT vs. AOT compilation** — just-in-time vs. ahead-of-time, tradeoffs (Angular, JVM, V8)
- [ ] **Practice designs** — URL shortener, rate limiter, chat system, news feed, notification system

---

## 6. Networking, OS & Linux

### Must Know
- [ ] **HTTP** — methods, status codes, headers
- [ ] **TCP vs. UDP** — reliability vs. speed tradeoff
- [ ] **DNS resolution flow**
- [ ] **OSI model layers**
- [ ] **HTTPS/TLS basics** — what the handshake accomplishes
- [ ] **Processes vs. Threads**
- [ ] **Concurrency vs. Parallelism**
- [ ] **Basic Linux commands & file permissions** — chmod/chown, navigation

### Good to Know
- [ ] **TCP three-way handshake** — in detail
- [ ] **HTTP/1.1 vs. HTTP/2 vs. HTTP/3** — what changed and why
- [ ] **WebSockets protocol details**
- [ ] **Sockets & ports**
- [ ] **Load balancer types** — L4 vs. L7
- [ ] **Linux process management** — ps, top, kill
- [ ] **Shell scripting basics**
- [ ] **Cron jobs / task scheduling**
- [ ] **Inter-process communication** — pipes, signals, message queues
- [ ] **OS memory management** — virtual memory, paging

---

## 7. Security

### Must Know
- [ ] **OWASP Top 10:2025** — the current list, finalized January 2026 (first update since 2021)

  | # | Category | What it means |
  |---|---|---|
  | A01 | Broken Access Control | Enforcement of who's allowed to do what fails — users can view/edit others' data or hit admin routes without authorization. Now also absorbs SSRF. |
  | A02 | Security Misconfiguration | Insecure defaults, unnecessary features left on, exposed cloud storage, default credentials. Jumped from #5 to #2. |
  | A03 | Software Supply Chain Failures | **New category.** Risk from third-party dependencies and build/deploy pipelines. |
  | A04 | Cryptographic Failures | Weak, missing, or misused encryption exposing data in transit or at rest. |
  | A05 | Injection | Untrusted input executed as code/commands (SQL injection, etc.). |
  | A06 | Insecure Design | Flaws in architecture/logic itself, not implementation bugs. |
  | A07 | Authentication Failures | Broken login/session/identity mechanisms. |
  | A08 | Software or Data Integrity Failures | Trusting updates/pipelines/serialized data without verifying integrity. |
  | A09 | Security Logging & Alerting Failures | Missing logs AND missing alerts on suspicious events. |
  | A10 | Mishandling of Exceptional Conditions | **New category.** Poor error handling exploited on unexpected states. |

- [ ] **Authentication vs. Authorization** — the distinction, clearly; how to authenticate a user; handling different authorization levels
- [ ] **Sessions vs. JWT vs. OAuth2** — how each works, tradeoffs
- [ ] **Token vs. JWT** — opaque token vs. self-contained signed token
- [ ] **JWT contents & decoding** — header/payload/signature, base64 (not encryption), how it's verified; advantages/disadvantages
- [ ] **Access token vs. refresh token** — short-lived vs. long-lived, the refresh flow
- [ ] **Hash vs. encryption vs. encoding** — one-way vs. reversible-with-key vs. reversible-no-key; types of hashing
- [ ] **Login flow & where to save tokens** — localStorage vs. cookies (httpOnly), the XSS/CSRF tradeoff
- [ ] **Local storage vs. session storage vs. cookies** — persistence, scope, security
- [ ] **XSS (Cross-Site Scripting)** — what it is, how to prevent it
- [ ] **CSRF (Cross-Site Request Forgery)** — what it is, how to prevent it
- [ ] **SQL Injection** — how it works, parameterized queries as the fix
- [ ] **Password hashing** — bcrypt, salting, why plain hashing isn't enough

### Good to Know
- [ ] **CORS in depth** — preflight requests, allowed origins/headers
- [ ] **Content Security Policy (CSP)**
- [ ] **Rate limiting for security** — brute-force protection
- [ ] **Secrets management** — environment variables, vaults
- [ ] **Security headers** — HSTS, X-Frame-Options, etc.
- [ ] **Encryption** — symmetric vs. asymmetric
- [ ] **API security** — API keys, mutual TLS
- [ ] **Webhooks** — what they are, how they differ from polling, securing them
- [ ] **Controlling permissions** — role-based / attribute-based access control
- [ ] **Preventing duplicate payment on double-click** — idempotency keys, debouncing, locking

---

## 8. Programming Language Internals

### JavaScript / TypeScript / Node.js

**Must Know**
- [ ] **Event loop & call stack** — including Node's libuv phases
- [ ] **Closures** — including callbacks that close over variables
- [ ] **Prototypal inheritance** — prototype chain, `prototype` vs. `__proto__`
- [ ] **`this` binding** — rules across contexts
- [ ] **Hoisting** — and the Temporal Dead Zone
- [ ] **`var` vs. `let` vs. `const`** — scope, hoisting, reassignment
- [ ] **Promises & async/await** — states, `Promise.all` vs. `allSettled`, callback hell
- [ ] **`==` vs. `===`** — coercion vs. strict equality; coercion vs. casting
- [ ] **`null` vs. `undefined`** — and undefined vs. not-defined vs. ReferenceError
- [ ] **`for...of` vs. `for...in`** — values vs. keys
- [ ] **Array methods** — `filter` vs. `map` vs. `reduce` vs. `forEach`, and `for` vs. `forEach`
- [ ] **Call vs. Apply vs. Bind** — explicit `this` binding
- [ ] **Higher-order functions & first-class functions**
- [ ] **Scope** — lexical scope, scope chain, function vs. block scope
- [ ] **TypeScript structural typing** — how it sits on top of JS

**Good to Know**
- [ ] **Spread vs. Rest** — same `...` syntax, opposite jobs
- [ ] **Object.create vs. Object.assign; Object.freeze vs. Object.seal**
- [ ] **Arrow functions & IIFE (self-invoked functions)**
- [ ] **Currying**
- [ ] **Event bubbling / delegation**
- [ ] **Axios vs. Fetch**
- [ ] **Debounce/throttle** — implementation, not just definition
- [ ] **WeakMap/WeakSet**
- [ ] **Generators & iterators**
- [ ] **Node streams & buffers; spawn vs. fork; blocking vs. non-blocking; I/O-bound vs. CPU-bound**
- [ ] **CommonJS vs. ESM; module.exports vs. exports**
- [ ] **TypeScript: Any vs. Unknown, Type vs. Interface, Union vs. Intersection, `||` vs. `??`**
- [ ] **V8 garbage collection / memory leaks**

### Python

**Must Know**
- [ ] **GIL (Global Interpreter Lock)**
- [ ] **Memory management** — reference counting
- [ ] **Data types** — the built-in types and their categories
- [ ] **List vs. Tuple** — mutability, use cases, performance
- [ ] **Mutable vs. Immutable** — which types are which, and why it matters
- [ ] **Shallow copy vs. Deep copy** — `copy` vs. `deepcopy`, nested-object behavior
- [ ] **`*args` vs. `**kwargs`** — positional vs. keyword variadic arguments
- [ ] **`==` vs. `is`** — value equality vs. identity
- [ ] **Does Python have `===`?** — no, and why (the `==`/`is` answer)
- [ ] **Pass by value vs. reference vs. object** — Python's "pass by object reference" model
- [ ] **Multithreading vs. Multiprocessing vs. Async** — when each helps, tied to the GIL
- [ ] **Generators**
- [ ] **Decorators**
- [ ] **Closures**
- [ ] **List/dict comprehensions**
- [ ] **Exception handling** — try/except/else/finally, `pass` in except, catching specifics
- [ ] **Mutability gotchas** — the mutable default argument trap
- [ ] **Recursion vs. loop** — tradeoffs, Python's recursion limit

**Good to Know**
- [ ] **Object caching / interning** — small-int and string interning behavior
- [ ] **Object chaining & reference sharing** — how assignment shares references
- [ ] **Context managers** — `with` statement mechanics
- [ ] **Static vs. dynamically typed** — where Python sits, type hints
- [ ] **Metaclasses**
- [ ] **Async/await (asyncio)**
- [ ] **Magic/dunder methods**

### Java

**Must Know**
- [ ] **JVM architecture**
- [ ] **Stack vs. heap**
- [ ] **Garbage collection basics**
- [ ] **How OOP dispatch works under the hood** — polymorphism mechanics

**Good to Know**
- [ ] **JIT compilation**
- [ ] **Collections framework internals**
- [ ] **Concurrency** — threads, `synchronized`, Executors
- [ ] **Generics & type erasure**

### C / C++ (with Java comparison)

**Must Know**
- [ ] **Manual memory management** — `malloc`/`free`, `new`/`delete` vs. Java's garbage collector
- [ ] **Pointers vs. references**
- [ ] **Compiled-to-machine-code vs. JIT/bytecode** — the control-vs-safety tradeoff

**Good to Know**
- [ ] **Stack vs. heap allocation in C**
- [ ] **Undefined behavior** — the concept and why it matters
- [ ] **RAII (C++)**
- [ ] **Smart pointers (C++)**
- [ ] **Const-correctness**

### Ruby

**Must Know**
- [ ] **Blocks, procs & lambdas** — the differences between them
- [ ] **Everything-is-an-object model** — including numbers and nil
- [ ] **Duck typing** — Ruby's dynamic typing philosophy
- [ ] **Mixins (modules)** — Ruby's alternative to multiple inheritance

**Good to Know**
- [ ] **Metaprogramming** — `method_missing`, `define_method`
- [ ] **Symbols vs. strings** — why symbols exist
- [ ] **Ruby's garbage collector**

### PHP

**Must Know**
- [ ] **Request lifecycle** — superglobals, session handling
- [ ] **Type juggling / loose typing** — common gotchas
- [ ] **Arrays as PHP's core structure** — ordered map behavior

**Good to Know**
- [ ] **Shared-nothing architecture** — how PHP-FPM handles each request
- [ ] **Namespaces & autoloading** — PSR-4
- [ ] **Traits** — PHP's mixin mechanism

---

## 9. Backend Frameworks & APIs

### API Fundamentals (Must Know)
- [ ] **HTTP methods & semantics** — GET/POST/PUT/PATCH/DELETE, when each is correct, PUT vs. PATCH (full vs. partial update)
- [ ] **Status code groups** — 2xx success, 3xx redirect, 4xx client error, 5xx server error, and the common specific codes (200/201/204/400/401/403/404/409/422/500)
- [ ] **Idempotency** — which methods are idempotent and why it matters for retries
- [ ] **Request/response structure** — headers, body, query params vs. path params vs. body
- [ ] **REST maturity & conventions** — resource naming, statelessness, HATEOAS awareness
- [ ] **Content negotiation** — `Accept`/`Content-Type` headers, JSON as default
- [ ] **Data serialization** — what serialization/deserialization is, JSON vs. XML, when you'd see each

### Frameworks (Must Know)
- [ ] **Express middleware & routing**
- [ ] **REST implementation details** — pagination, validation, error handling
- [ ] **JWT auth flow** — end to end
- [ ] **Django vs. Flask vs. FastAPI** — architecture differences, when to use which
- [ ] **Laravel vs. Rails** — convention-over-configuration philosophy
- [ ] **ORM usage patterns** — migrations, relationships, eager vs. lazy loading
- [ ] **Error handling & logging** — structured error responses, centralized error handling, what/how to log (and what never to log)
- [ ] **Environment variables & config management** — `.env` files, per-environment config, keeping secrets out of code

### Good to Know
- [ ] **NestJS** — dependency injection, decorators, modules
- [ ] **GraphQL implementation** — resolvers, schema design
- [ ] **WebSockets implementation** — e.g. socket.io
- [ ] **File upload handling**
- [ ] **Background jobs / task queues** — Celery, Bull
- [ ] **API versioning strategies**
- [ ] **Django specifics** — request lifecycle, `select_related` vs. `prefetch_related` (N+1 fix), serialization, types of views, `makemigrations` vs. `migrate` + migration conflicts, CSRF & CORS, signals, ASGI vs. WSGI, Django vs. Express, `manage.py` commands
- [ ] **Stateful vs. stateless** — session state vs. token-based statelessness
- [ ] **Query params vs. route params vs. body** — where data rides on a request

---

## 10. Frontend

### Must Know
- [ ] **HTML fundamentals** — semantic elements, forms, document structure, accessibility basics; HTML4 vs. HTML5, SEO basics
- [ ] **React hooks** — useState/useEffect/useContext/custom hooks; useEffect dependency array
- [ ] **Library or framework?** — what React is and why use it
- [ ] **useState vs. useRef** — re-render vs. no re-render
- [ ] **useMemo vs. useCallback vs. React.memo** — memoizing values vs. functions vs. components
- [ ] **useContext vs. Redux** — when local context is enough vs. global store
- [ ] **State vs. Props** — owned/mutable vs. passed-in/read-only
- [ ] **Props drilling** — the problem and how context solves it
- [ ] **Component lifecycle** — and replicating it with useEffect
- [ ] **JSX** — what it compiles to
- [ ] **Why `key` in lists** — reconciliation and stable identity
- [ ] **Virtual DOM & diffing** — and how React enhances performance
- [ ] **DOM vs. BOM** — document vs. browser object model
- [ ] **State management** — Context API vs. Redux/Zustand
- [ ] **Rendering strategies** — CSR vs. SSR vs. SSG vs. ISR, and hydration
- [ ] **Next.js** — the practical implementation of the above: `getServerSideProps`/`getStaticProps`, App Router, API routes
- [ ] **Core Web Vitals** — FCP, LCP, TTI, TBT, CLS
- [ ] **CSS box model & specificity**
- [ ] **Flex vs. Grid** — one-dimensional vs. two-dimensional layout
- [ ] **px vs. rem vs. em** — absolute vs. relative units
- [ ] **Inline vs. block** — element display behavior
- [ ] **Semantic tags & `alt` attribute** — accessibility and SEO
- [ ] **Script tag placement** — `async`/`defer`, why placement matters
- [ ] **Transition vs. animation** — and CSS performance (inline vs. internal vs. external), lazy loading
- [ ] **Responsive design** — media queries, Flexbox, Grid
- [ ] **Same-Origin Policy & CORS**
- [ ] **DOM manipulation & event handling** — bubbling, delegation

### Good to Know
- [ ] **Content Security Policy (CSP)** — cross-ref Security
- [ ] **Service workers / PWA**
- [ ] **Browser storage** — cookies vs. sessionStorage vs. localStorage
- [ ] **Build tools** — Webpack/Vite, tree shaking, code splitting
- [ ] **Angular vs. Vue vs. React** — comparison
- [ ] **Angular specifics** — directives, pipes, interpolation, lifecycle hooks, JIT vs. AOT, component vs. module, template-driven vs. reactive forms
- [ ] **CSS specificity & justify-content vs. align-items** — layout/cascade fundamentals
- [ ] **Accessibility (a11y)** — ARIA roles, semantic HTML, keyboard navigation
- [ ] **Browser rendering pipeline** — critical rendering path
- [ ] **SEO basics for SPAs**
- [ ] **CSS preprocessors & methodologies** — Sass/SCSS, BEM naming convention
- [ ] **CSS-in-JS** — styled-components/Emotion, tradeoffs vs. utility-first CSS
- [ ] **Tailwind CSS** — utility-first approach, tradeoffs vs. traditional/component CSS
- [ ] **Bootstrap** — component-library approach, when it's still a reasonable choice

---

## 11. DevOps

### Must Know
- [ ] **Docker** — image vs. container, Dockerfile, docker-compose
- [ ] **CI/CD pipeline stages** — build → test → deploy
- [ ] **Git workflows** — branching strategies, PR/merge process
- [ ] **AWS core services** — EC2, S3, RDS, Lambda, IAM
- [ ] **Nginx / reverse proxy basics**

### Good to Know
- [ ] **Kubernetes basics** — pods, services, deployments
- [ ] **Infrastructure as Code** — Terraform concept
- [ ] **Monitoring & logging** — Prometheus/Grafana/ELK stack
- [ ] **Load balancer configuration**
- [ ] **Blue-green / canary deployments**
- [ ] **Container orchestration concepts**

---

## 12. AI/ML, Data Science & Data Analysis

### Must Know
- [ ] **Data analysis workflow** — EDA, cleaning, visualization
- [ ] **Core statistics** — mean/median/std dev/correlation
- [ ] **Supervised vs. unsupervised learning**
- [ ] **Common ML algorithms, conceptually** — regression, classification, clustering
- [ ] **What RAG is and why it exists**
- [ ] **Vector databases & embeddings** — concept level (Pinecone/Chroma/pgvector)
- [ ] **Prompt engineering** — zero/few-shot, system prompts, structured output
- [ ] **Open-source models** — awareness of STT (speech-to-text), TTS (text-to-speech), image classification model categories

### Good to Know
- [ ] **LangChain** — chains, agents, orchestration
- [ ] **n8n / workflow automation** — where it fits vs. custom code
- [ ] **Overfitting vs. underfitting**
- [ ] **Train/test/validation split**
- [ ] **Model evaluation metrics** — precision/recall/F1
- [ ] **Pandas/Numpy operations** — the ones you should be able to name
- [ ] **Neural network basics**

---

## 13. Testing

### Must Know
- [ ] **Testing pyramid** — unit / integration / E2E
- [ ] **Mocking & stubbing basics**
- [ ] **JUnit** — Java: `@Test`, `@Before`/`@After`, assertions
- [ ] **Jest/Mocha** — JS/Node
- [ ] **PyTest** — Python

### Good to Know
- [ ] **Test-Driven Development (TDD)**
- [ ] **Code coverage** — what it does and doesn't tell you
- [ ] **E2E tools** — Cypress, Selenium, Playwright
- [ ] **Load/performance testing basics**
- [ ] **Contract testing**

---

## 14. Git & Version Control

### Must Know
- [ ] **Core commands** — clone/add/commit/push/pull
- [ ] **Branching & merging**
- [ ] **Reset vs. revert** — rewriting history vs. a new undo commit
- [ ] **Fetch vs. pull** — download only vs. download + merge
- [ ] **Git stash** — and stash apply vs. pop
- [ ] **Two ways to undo changes** — reset/revert/checkout/restore tradeoffs
- [ ] **Resolving merge conflicts**
- [ ] **`.gitignore`** — what it does, common patterns
- [ ] **Pull request workflow**
- [ ] **Rebase vs. merge** — linear history vs. merge commit

### Good to Know
- [ ] **Branch not found locally / can't checkout to main** — fetching remotes, tracking branches
- [ ] **Git hooks**
- [ ] **Cherry-picking**
- [ ] **Git bisect**

---

## 15. Behavioral & CS Trivia

### Must Know
- [ ] **STAR format** — Situation, Task, Action, Result
- [ ] **Introduce yourself / walk through a project / a problem you faced** — the three near-universal openers, rehearsed
- [ ] **5–6 prepared stories** from your real projects (OasisFund, ITI Grading System, WyrmHole) covering: a technical challenge, a disagreement, a mistake you learned from, a time you took initiative
- [ ] **Warm-up coding problems** — Best Time to Buy and Sell Stock, Maximum Altitude, unique elements of an array (rehearse the approach out loud, not just the code)
- [ ] **SDLC phases**
- [ ] **Agile principles**

### Good to Know
- [ ] **Testing terminology** — alpha vs. beta, black-box vs. white-box
- [ ] **Cohesion vs. coupling** — cross-ref OOP section
- [ ] **Verification vs. validation**
- [ ] **Software estimation techniques** — awareness only (COCOMO, function points)

---

## Backend Framework Comparison (Day 7 — Concept-First)

Worst-case prep: how **all seven** frameworks handle the same core concepts. Read each table down by concept. Frameworks: **Express, NestJS, Django, Flask, FastAPI, Laravel, Rails.**

**One-line identity:**
- **Express** — minimal, unopinionated Node HTTP layer.
- **NestJS** — opinionated TypeScript framework (modules + DI) on top of Express/Fastify.
- **Django** — batteries-included Python; ORM, admin, auth built in.
- **Flask** — minimal Python microframework; add extensions as needed.
- **FastAPI** — modern async Python; type hints drive validation + auto docs.
- **Laravel** — batteries-included PHP; large built-in feature set.
- **Rails** — batteries-included Ruby; convention-over-configuration taken furthest.

### Routing
| Framework | How routing works |
|---|---|
| Express | Imperative — `app.get('/path', handler)` |
| NestJS | Decorator-based on controllers — `@Get()`, `@Post()` |
| Django | Central `urls.py`; `include()` for app-level routing |
| Flask | Decorator on the view — `@app.route('/path')` |
| FastAPI | Decorator with typed params — `@app.get('/path')` |
| Laravel | Route files; `Route::get()`, resource routes |
| Rails | `config/routes.rb` with `resources :x` |

### Middleware / Request Pipeline
| Framework | Mechanism |
|---|---|
| Express | `app.use()`, ordered chain, `next()` |
| NestJS | Middleware → Guards → Interceptors → Pipes → handler |
| Django | Middleware classes in `MIDDLEWARE` setting |
| Flask | `before_request`/`after_request` hooks |
| FastAPI | Middleware + dependency injection |
| Laravel | Middleware classes, global or per-route |
| Rails | Rack middleware + `before_action`/`after_action` |

### Dependency Injection
| Framework | Approach |
|---|---|
| Express | None built in |
| NestJS | First-class DI container (constructor injection) |
| Django | No formal DI; direct imports |
| Flask | No formal DI; app context |
| FastAPI | Central — `Depends()` |
| Laravel | Service container, automatic constructor injection |
| Rails | No formal DI; convention + Ruby flexibility |

### ORM / ODM & Data Access
| Framework | Default data layer |
|---|---|
| Express | None — Sequelize/Prisma/TypeORM/Mongoose |
| NestJS | None built in; integrations for TypeORM/Prisma/Mongoose |
| Django | Django ORM (built in) |
| Flask | None — usually Flask-SQLAlchemy |
| FastAPI | None — SQLAlchemy/SQLModel/Tortoise |
| Laravel | Eloquent (Active Record) |
| Rails | Active Record |

### Authentication
| Framework | Built-in support |
|---|---|
| Express | None — Passport.js / custom JWT |
| NestJS | Passport + Guards |
| Django | Full built-in auth; DRF adds token/JWT |
| Flask | None core — Flask-Login / Flask-JWT |
| FastAPI | OAuth2 helpers; assemble the flow |
| Laravel | Sanctum / Passport / Breeze |
| Rails | Devise gem; `has_secure_password` built in |

### Validation
| Framework | Mechanism |
|---|---|
| Express | None — express-validator / Joi / Zod |
| NestJS | Pipes + class-validator on DTOs |
| Django | Form/serializer validation (DRF serializers) |
| Flask | None core — Marshmallow / WTForms |
| FastAPI | Pydantic models (from type hints) |
| Laravel | Form Request classes |
| Rails | Model-level validations |

### Configuration
| Framework | Config approach |
|---|---|
| Express | Manual — dotenv + own module |
| NestJS | `@nestjs/config`, typed |
| Django | Central `settings.py` |
| Flask | `app.config` object |
| FastAPI | Pydantic `BaseSettings` (typed) |
| Laravel | `config/*.php` reading `.env` |
| Rails | `config/` + encrypted `credentials.yml.enc` |

### Error Handling
| Framework | Mechanism |
|---|---|
| Express | 4-arg error middleware `(err, req, res, next)` |
| NestJS | Exception filters + `HttpException` |
| Django | Exception middleware; DRF structured handling |
| Flask | `@app.errorhandler(code)` |
| FastAPI | `HTTPException` + handlers |
| Laravel | Central `Handler` class |
| Rails | `rescue_from` in controllers |

### Choosing One Over Another
| Need | Lean toward |
|---|---|
| Maximum control, minimal opinion | Express, Flask |
| Structure & scale in a Node/TS team | NestJS |
| Ship a full product fast, small team | Django, Laravel, Rails |
| Modern async API + auto docs + typing | FastAPI |
| Data-heavy admin/CRUD app | Django |
| PHP shop / rich ecosystem | Laravel |
| Convention over configuration, rapid CRUD | Rails |

**Mental model:** minimal/unopinionated (Express, Flask) → modern middle (NestJS, FastAPI) → batteries-included/opinionated (Django, Laravel, Rails). Place any unfamiliar framework on that spectrum and reason from these concept axes.

---

## Frontend Framework Comparison (Day 8 — Concept-First)

Same approach for the frontend. Read each table down by concept. Frameworks: **React, Angular, Vue** (+ their meta-frameworks **Next.js / Nuxt** where relevant).

**One-line identity:**
- **React** — a library, not a framework; you assemble routing/state/etc. from the ecosystem.
- **Angular** — full opinionated framework; batteries included (DI, router, forms, HTTP).
- **Vue** — progressive framework; approachable core, official libraries for the rest.

### Component Model
| Framework | Approach |
|---|---|
| React | Function components + JSX |
| Angular | Classes + decorators + HTML templates |
| Vue | Single File Components (`.vue`: template/script/style) |

### State (Local)
| Framework | Mechanism |
|---|---|
| React | `useState` / `useReducer` |
| Angular | Class properties |
| Vue | `ref` / `reactive` |

### State (Global)
| Framework | Options |
|---|---|
| React | Context API, Redux, Zustand |
| Angular | Services + RxJS, NgRx |
| Vue | Pinia (Vuex predecessor) |

### Reactivity Model
| Framework | How updates propagate |
|---|---|
| React | Manual re-render via state setters; virtual DOM diffing |
| Angular | Zone.js change detection (or `OnPush`) |
| Vue | Automatic dependency-tracked reactivity |

### Data Binding
| Framework | Mechanism |
|---|---|
| React | One-way; explicit `onChange` handlers |
| Angular | Two-way `[(ngModel)]`, property `[ ]`, event `( )` |
| Vue | `v-model` two-way; `v-bind` / `v-on` |

### Templating
| Framework | Syntax |
|---|---|
| React | JSX (JS-in-markup) |
| Angular | HTML templates + directives (`*ngIf`, `*ngFor`) |
| Vue | HTML templates + directives (`v-if`, `v-for`) |

### Routing
| Framework | Solution |
|---|---|
| React | React Router (external) |
| Angular | Built-in `RouterModule` |
| Vue | Vue Router (official) |

### Dependency Injection
| Framework | Approach |
|---|---|
| React | None — props / context / hooks |
| Angular | First-class DI system |
| Vue | `provide`/`inject` (lightweight) |

### HTTP / Data Fetching
| Framework | Typical approach |
|---|---|
| React | `fetch`/axios in effects; React Query/SWR |
| Angular | Built-in `HttpClient` + RxJS |
| Vue | `fetch`/axios; often with Pinia |

### Forms
| Framework | Mechanism |
|---|---|
| React | Controlled/uncontrolled inputs; libraries (React Hook Form) |
| Angular | Reactive Forms vs. Template-driven Forms |
| Vue | `v-model` binding; VeeValidate for complex cases |

### SSR / Meta-Framework
| Framework | Meta-framework |
|---|---|
| React | Next.js |
| Angular | Angular Universal (built-in SSR) |
| Vue | Nuxt |

### Choosing One Over Another
| Need | Lean toward |
|---|---|
| Flexibility, huge ecosystem, hiring pool | React |
| Large enterprise app, structure enforced | Angular |
| Gentle learning curve, progressive adoption | Vue |

**Mental model:** library-you-assemble (React) → progressive middle (Vue) → full opinionated framework (Angular). Same spectrum logic as backend — place an unfamiliar frontend tool on it and reason from these concept axes.

---

## Suggested 12-Day Schedule

One way to sequence the checklist above — 9 full days + 3 half days. Must Know items first on each day; Good to Know only if time remains.

| Day | Length | Focus | Pattern | DSA |
|---|---|---|---|---|
| 1 | Full | §2 OOP & SOLID | Singleton | Arrays + Two Pointers |
| 2 | Full | §4 Databases | Factory | Strings + Sliding Window |
| 3 | Full | §5 System Design (part 1) | Builder | Sorting + Searching |
| 4 | Full | §5 System Design (part 2) | Observer | Binary Search |
| 5 | Full | §6 Networking/OS/Linux + §7 Security | Strategy | Hashmaps |
| 6 | Full | §8 Language Internals | Decorator | Linked List + Prefix Sum |
| 7 | Full | Backend Framework Comparison (concept-first — all 7 frameworks) | Adapter | Queue + Stack |
| 8 | Full | §10 Frontend | Facade | Bit Manipulation + Recursion |
| 9 | Full | §11 DevOps + §12 AI/ML/Data Science | DAO / Repository | Trees |
| 10 | Half | §13 Testing + §14 Git | Abstract Factory | *Awareness:* Graphs + Tries |
| 11 | Half | Good-to-Know sweep (leftovers from §4, §5, §7, §10) + full pattern quiz | — | *Awareness:* DP + Monotonic Stack + Priority Queue |
| 12 | Half | §15 Behavioral & CS Trivia + full Must Know review | — | Cumulative review (Must Know only) |

---

## Using the 2-week interview period (2–3 days per company)

- **T-3 days:** Research their actual tech stack. Re-check the Must Know items for whichever backend/frontend framework they use.
- **T-2 days:** One full mock interview. Re-drill DSA from your weakest Must Know pattern.
- **T-1 day:** Light review only — behavioral stories, questions to ask them, sleep well.

---

## Stack-Specific Revision (T-3 Days)

Split by individual framework — pull up the two relevant to your target company (one backend, one frontend), then check the **Pairing Notes** at the end for how they specifically connect. React/Next.js fundamentals already in §10 aren't repeated here; this adds the implementation-level depth §9/§10 didn't cover.

### Backend Frameworks

#### Django

**Must Know**
- [ ] Django REST Framework — serializers (`ModelSerializer` vs. `Serializer`), ViewSets & Routers, generic views
- [ ] Django ORM — QuerySet laziness, `select_related` vs. `prefetch_related` (the N+1 fix), FK/M2M/O2O relationships
- [ ] Migrations — `makemigrations`/`migrate` workflow, what a migration file contains
- [ ] URL routing — `urls.py`, path converters, `include()` for app-level routing
- [ ] Middleware — the request/response processing chain, where auth/CORS middleware sits
- [ ] Authentication — built-in User model, session auth vs. token auth (djangorestframework-simplejwt)
- [ ] Settings structure — `INSTALLED_APPS`, environment-based config
- [ ] Django forms — `ModelForm`, validation, `clean()` methods

**Good to Know**
- [ ] Django admin — auto-generated CRUD, customizing `ModelAdmin`
- [ ] Signals — `pre_save`/`post_save`, why they can complicate debugging
- [ ] DRF permissions & throttling classes
- [ ] Django Channels — WebSockets/async support
- [ ] Celery — background task integration
- [ ] Class-based vs. function-based views — tradeoffs
- [ ] Django's built-in caching framework

#### Laravel

**Must Know**
- [ ] Eloquent ORM — relationships (`hasMany`, `belongsTo`, `belongsToMany`), eager loading with `with()` to avoid N+1
- [ ] Migrations & seeders — schema versioning, `php artisan migrate`
- [ ] Routing & controllers — `routes/web.php` vs. `routes/api.php`, resource controllers
- [ ] API Resources — transforming models into JSON responses
- [ ] Sanctum/Passport — token-based API auth, SPA authentication
- [ ] Middleware — `auth`, `throttle`, registering custom middleware
- [ ] Service container & dependency injection — Laravel's IoC container

**Good to Know**
- [ ] Artisan CLI — `make:model`, `make:controller`, `tinker`
- [ ] Queues & jobs — dispatching background work
- [ ] Events & listeners — decoupled side effects
- [ ] Form Request validation classes
- [ ] Query builder vs. raw Eloquent
- [ ] Blade templating basics (if the company isn't API-only)

#### Rails + ERB / Hotwire

**Must Know**
- [ ] MVC conventions — convention over configuration, Rails' file/folder structure
- [ ] Active Record — associations (`has_many`, `belongs_to`, `has_and_belongs_to_many`), validations, callbacks
- [ ] Migrations — `rails generate migration`, `schema.rb`
- [ ] ERB templating — `<%= %>` vs. `<% %>`, partials (`render partial:`), layouts
- [ ] Routing — RESTful `resources`, nested routes
- [ ] Form helpers — `form_with`, strong parameters (`params.require().permit()`)
- [ ] Asset pipeline — Sprockets (older) vs. Propshaft (newer Rails)

**Good to Know**
- [ ] Hotwire (Turbo + Stimulus) — Rails' modern SPA-like interactivity without a JS framework; Turbo Drive/Frames/Streams
- [ ] Action Cable — Rails' WebSockets solution
- [ ] Active Job + Sidekiq — background job processing
- [ ] RSpec/Minitest — Rails testing conventions
- [ ] Full callback lifecycle order — common gotchas
- [ ] Concerns — Rails' module-based code reuse pattern

#### NestJS

**Must Know**
- [ ] Modules, Controllers, Providers — Nest's core building blocks
- [ ] Dependency Injection — how Nest's IoC container resolves providers
- [ ] Decorators — `@Injectable()`, `@Controller()`, `@Get()`/`@Post()`/`@Body()`/`@Param()`
- [ ] Guards — route-level authorization (`CanActivate`)
- [ ] Interceptors — wrapping request/response (logging, transformation)
- [ ] Pipes — validation/transformation of incoming data (`ValidationPipe` + class-validator)
- [ ] Request lifecycle order — Guards → Interceptors → Pipes → Handler

**Good to Know**
- [ ] Built-in microservices support — TCP/Redis/Kafka transport layers
- [ ] Nest + TypeORM/Prisma integration patterns
- [ ] Custom decorators
- [ ] Exception filters — centralized error handling
- [ ] Nest CLI & module generation
- [ ] Monorepo tooling (Nx) — common in larger Nest codebases

#### Node.js / Express

**Must Know**
- [ ] Middleware chain — `app.use()`, ordering, `next()`
- [ ] Routing — route params, query params, route-level middleware
- [ ] Error handling — centralized error-handling middleware (4-arg signature)
- [ ] REST implementation — status codes, pagination, request validation
- [ ] JWT auth flow — issuing, verifying, refresh-token pattern
- [ ] Async error handling — why unhandled promise rejections crash naive Express apps

**Good to Know**
- [ ] Express alternatives awareness — Koa, Fastify, and why someone might pick them
- [ ] Clustering / PM2 — scaling a single-threaded Node process across cores
- [ ] Rate limiting middleware (`express-rate-limit`)
- [ ] File uploads — Multer
- [ ] Environment config layering — dotenv and friends

### Frontend Frameworks

#### React
*(core hooks/virtual-DOM/state-management fundamentals are in §10 — not repeated)*

**Must Know**
- [ ] Component composition patterns — container/presentational split, compound components
- [ ] `useEffect` dependency array gotchas — stale closures, infinite loops
- [ ] Controlled vs. uncontrolled form inputs
- [ ] Key prop in lists — why it matters for reconciliation

**Good to Know**
- [ ] React Query/SWR — server-state vs. client-state separation
- [ ] Error boundaries
- [ ] `useReducer` for complex local state
- [ ] React DevTools profiling

#### Vue

**Must Know**
- [ ] Reactivity system — `ref` vs. `reactive`, how Vue tracks dependencies
- [ ] Composition API vs. Options API — structural difference, when each is used
- [ ] Computed properties vs. methods vs. watchers — when to use which
- [ ] Component communication — props down, emits up, `v-model` for two-way binding
- [ ] Directives — `v-if`/`v-for`/`v-bind`/`v-on` shorthand syntax

**Good to Know**
- [ ] Pinia — Vue's current state management (successor to Vuex)
- [ ] Vue Router — navigation guards, dynamic routes
- [ ] Single File Components (`.vue`) — template/script/style structure
- [ ] Nuxt.js — Vue's answer to Next.js (SSR/SSG for Vue)
- [ ] Teleport & Suspense (Vue 3 features)

#### Angular

**Must Know**
- [ ] Architecture — modules (`NgModule`), components, services, dependency injection
- [ ] Data binding — interpolation, property binding `[ ]`, event binding `( )`, two-way binding `[( )]`/`ngModel`
- [ ] RxJS observables — `subscribe`, basic operators (`map`, `filter`, `switchMap`), why Angular leans on RxJS
- [ ] `HttpClient` — API calls, interceptors
- [ ] Routing — `RouterModule`, route guards, lazy-loaded modules
- [ ] Component lifecycle hooks — `ngOnInit`, `ngOnChanges`, `ngOnDestroy`

**Good to Know**
- [ ] Change detection — default (zone.js-driven) vs. `OnPush`
- [ ] NgRx — Redux-style state management for Angular
- [ ] Reactive Forms vs. Template-driven Forms
- [ ] Angular CLI — `ng build`, `ng serve`, schematics
- [ ] Standalone components — modern Angular, moving away from NgModules

#### Next.js
*(rendering-strategy fundamentals are in §10 — not repeated)*

**Must Know**
- [ ] `getServerSideProps` vs. `getStaticProps` vs. client-side fetching — when each runs, what each returns
- [ ] App Router vs. Pages Router — know which one a given codebase uses
- [ ] API routes — building backend endpoints inside a Next.js app
- [ ] Server Components vs. Client Components (App Router) — the `'use client'` boundary

**Good to Know**
- [ ] Incremental Static Regeneration — `revalidate`, on-demand revalidation
- [ ] Middleware — running code before a request completes
- [ ] Image/font optimization built-ins
- [ ] Dynamic imports & code splitting, Next.js-specific patterns

### Pairing Notes — the integration-specific bits that don't belong to either framework alone

- **Django + React:** CORS config (`django-cors-headers`), token auth flow from React's side (storing/refreshing JWTs), separate deployments (Django API + React static build).
- **Laravel + Vue:** confirm whether the company runs API-only (Sanctum + separate Vue SPA) or Inertia.js (server-routed, SPA feel without a separate API) — auth and data flow differ completely between the two.
- **NestJS + Next.js:** shared TypeScript types between backend and frontend (often a shared package in a monorepo); whether Next.js calls the Nest API directly or proxies through its own API routes.
- **Node + Angular:** trace one full request/response cycle — Angular's `HttpClient`+RxJS on the way out, Express middleware chain + JWT verification on the way in.
- **Rails + ERB:** the odd one out — no separate frontend framework, Rails renders HTML directly. Know Hotwire (Turbo + Stimulus) if the company wants SPA-like interactivity without a JS framework — that's modern Rails' answer to "why isn't this React."

---

## Pick your DSA language early

Python, JS, or Java — pick **one** and stick with it. Switching mid-prep slows pattern recognition.

## Key resources referenced

- [Tech Interview Handbook — Algorithms Study Cheatsheet](https://www.techinterviewhandbook.org/algorithms/study-cheatsheet/)
- [Tech Interview Handbook — SWE Interview Guide](https://www.techinterviewhandbook.org/software-engineering-interview-guide/)
- [Grind 75](https://www.techinterviewhandbook.org/grind75/)
- [roadmap.sh — Top 50 Full Stack Interview Questions](https://roadmap.sh/questions/full-stack)
- [roadmap.sh — Top 30 Front End Interview Questions](https://roadmap.sh/questions/frontend)
- [GeeksforGeeks — Full Stack Developer Interview Questions](https://www.geeksforgeeks.org/html/full-stack-developer-interview-questions-and-answers/)
- [GeeksforGeeks — Software Engineering Interview Questions](https://www.geeksforgeeks.org/software-engineering/software-engineering-interview-questions-and-answers/)
- [backend-cheats](https://github.com/cheatsnake/backend-cheats)
- [OWASP Top 10:2025 — official list](https://owasp.org/Top10/2025/) (finalized January 2026)

*DevOps, AI/ML, and Data Science content draws on general industry knowledge rather than the SWE-interview-specific resources above.*
