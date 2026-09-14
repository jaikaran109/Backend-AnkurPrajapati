# 🧪 Automated API Testing with Jest & Supertest

A complete, beginner-to-advanced guide and reference implementation for testing **Node.js & Express REST APIs** using **Jest** and **Supertest**, following the backend engineering principles taught by **Ankur Prajapati**.

---

## 🎯 What is Jest & Supertest?

### 1. **Jest**
- **Jest** is a delightful JavaScript Testing Framework maintained by Meta (Facebook).
- It provides a complete testing solution: test runner, assertion library (`expect`), mocking tools, and code coverage reporting out of the box.
- It tests your application logic and checks whether your code returns the expected outputs.

### 2. **Supertest**
- **Supertest** is an HTTP assertion library built on top of `SuperAgent`.
- It allows you to simulate HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) to your Express application **without manually starting the HTTP server on a port**.
- Together with Jest, you can test status codes, response headers, response bodies, and error handling seamlessly.

---

## 🏗️ The Golden Rule: App vs Server Separation

When writing tests for Express applications, **never put `app.listen()` inside `app.js`**. 

Instead, split your setup into two files:

```
├── src/
│   └── app.js       # Defines Express app, middlewares, and routes (Exports `app`)
└── server.js        # Imports `app`, connects DB, and calls `app.listen(PORT)`
```

### 💡 Why is this crucial?
- When running tests with **Supertest**, it takes the `app` object and simulates HTTP requests in memory without binding to a physical network port (e.g. `3000`).
- If `app.listen()` was inside `app.js`, running tests would launch real HTTP listeners, causing `EADDRINUSE: address already in use` errors and blocking test execution.

---

## 📁 Directory Structure

```text
jest/
├── server.js               # Starts the live HTTP server
├── package.json            # Scripts & test dependencies
├── README.md               # Documentation & testing guide
└── src/
    ├── app.js              # Express application setup
    └── test/
        └── __app.test.js   # Unit & Integration tests for API routes
```

---

## 🔍 Code Walkthrough

### 1. The Express App (`src/app.js`)
```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Sample Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello World !" });
});

module.exports = app;
```

### 2. The Test Suite (`src/test/__app.test.js`)
```javascript
const request = require('supertest');
const app = require('../app');

describe("GET /", () => {
    it("should return 200 OK and greeting message", async () => {
        // Send a simulated GET request to the Express app
        const res = await request(app).get('/');

        // Assert HTTP Status Code
        expect(res.statusCode).toBe(200);

        // Assert JSON Response Body
        expect(res.body).toEqual({ message: "Hello World !" });
    });
});
```

---

## 🧠 Key Jest & Supertest Building Blocks

| Function / Matcher | Purpose | Example |
|---|---|---|
| `describe(name, fn)` | Groups related tests into a test suite. | `describe("Auth API", () => { ... })` |
| `it(name, fn)` / `test()` | Defines an individual test case. | `it("should register user", async () => { ... })` |
| `request(app)` | Initializes Supertest with the Express app. | `request(app).post('/api/auth/login')` |
| `expect(value)` | Asserts that a value meets certain criteria. | `expect(res.statusCode).toBe(200)` |
| `.toBe(val)` | Strict equality (`===`) check for primitives. | `expect(res.statusCode).toBe(200)` |
| `.toEqual(val)` | Deep equality check for objects and arrays. | `expect(res.body).toEqual({ success: true })` |
| `.toHaveProperty(key)` | Checks if an object contains a specific key. | `expect(res.body).toHaveProperty("token")` |

---

## 🚀 How to Run Tests

### 1. Run all tests once
```bash
npm test
```

### 2. Run tests in Watch Mode (automatically re-runs on file save)
```bash
npm run test:watch
```

### 3. Generate Code Coverage Report
```bash
npm run test:coverage
```

---

## 📊 Sample Test Output
```text
 PASS  src/test/__app.test.js
  GET /
    ✓ should return 200 OK and greeting message (26 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.506 s
Ran all test suites.
```

---

## 🛡️ Best Practices for API Testing
1. **Isolate Database Tests**: Use a separate test database (e.g., `mongodb-memory-server` or a dedicated test DB instance) so production/development data is not affected.
2. **Clean State**: Use Jest hooks like `beforeEach()` and `afterEach()` to clear mock data or reset database collections.
3. **Test Edge Cases**: Always test both happy paths (`200 OK`, `201 Created`) and error paths (`400 Bad Request`, `401 Unauthorized`, `404 Not Found`, `403 Forbidden`).

---

## 👨‍💻 Credits
Tutorial by **Ankur Prajapati** — Master Backend Engineering with Node.js, Express & Testing.