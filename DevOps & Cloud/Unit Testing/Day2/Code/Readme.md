# Unit Testing — Session Project

This project matches the examples used in Session 1 & Session 2 material exactly.
Use it to follow along, run the tests, and experiment.

---

## Project structure

```
unit-testing-project/
│
├── src/
│   ├── db/
│   │   └── db.js               # Simulated DB connection (in-memory)
│   │
│   ├── repository/
│   │   └── userRepository.js   # DB layer — all queries live here
│   │
│   ├── service/
│   │   ├── userService.js      # Business logic — uses the repository
│   │   └── emailService.js     # Email sending (will be mocked in tests)
│   │
│   ├── controller/
│       └── userController.js   # Orchestrates service calls
│   
│
└── tests/
    ├── userService.test.js
    ├── userController.test.js
    └── api.test.js
```

---

## Setup

```bash
npm install
npm test              # run all tests
npm run test:watch    # re-run on file save
npm run test:coverage # see coverage report
```

---

## Running a single test file

```bash
npx jest tests/userService.test.js
```