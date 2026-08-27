# 📮 Postman

**Postman** is an API platform used by developers to design, test, document, and share APIs — without writing extra code just to check if an endpoint works.

---

## 📌 Table of Contents

- [What is Postman?](#what-is-postman)
- [Why Use Postman?](#why-use-postman)
- [Core Features](#core-features)
- [How Postman Works](#how-postman-works)
- [Basic Workflow](#basic-workflow)
- [Common HTTP Methods](#common-http-methods)
- [Collections](#collections)
- [Environments & Variables](#environments--variables)
- [Testing & Automation](#testing--automation)
- [Installation](#installation)

---

## 🤔 What is Postman?

Postman is a **GUI-based HTTP client** — a tool that lets you send requests to an API (GET, POST, PUT, PATCH, DELETE, etc.) and instantly see the response, without building a frontend or writing request-sending code yourself.

Think of it as a **middleman** between you and a server: you type in a URL, choose a method, hit **Send**, and Postman shows you exactly what the server replies with.

---

## 🎯 Why Use Postman?

| Problem | How Postman Solves It |
|---|---|
| Testing an API without a frontend | Send requests directly, see raw JSON response |
| Debugging broken endpoints | Inspect status codes, headers, response time |
| Documenting APIs for a team | Auto-generate shareable docs from your requests |
| Repeating the same tests | Save requests in Collections and reuse them |
| Working across environments (dev/staging/prod) | Switch base URLs instantly using Environments |
| Automating regression tests | Write test scripts, run via Collection Runner / CI-CD |

---

## 🧩 Core Features

- **Request Builder** — Send GET, POST, PUT, PATCH, DELETE requests
- **Collections** — Organize related requests into folders
- **Environments & Variables** — Reusable values like `{{base_url}}`, `{{token}}`
- **Authorization** — Built-in support for Bearer Token, API Key, Basic Auth, OAuth 2.0, etc.
- **Pre-request Scripts** — Run JS code before sending a request (e.g., generate a timestamp)
- **Tests / Post-response Scripts** — Validate responses automatically
- **Mock Servers** — Simulate an API before the backend is built
- **Monitors** — Schedule requests to run automatically (e.g., check uptime)
- **Documentation Generator** — Auto-create shareable API docs
- **Newman** — CLI tool to run Postman collections in CI/CD pipelines

---

## ⚙️ How Postman Works

Postman doesn't know or care what your backend code looks like — it just sends **standard HTTP requests** to a given URL, the same way a browser or `curl` would.

```
[ Postman ]  --->  HTTP Request (method + URL + headers + body)  --->  [ Your Server ]
[ Postman ]  <---  HTTP Response (status code + data)             <---  [ Your Server ]
```

If your server is running locally, Postman connects to it via:

```
http://localhost:3000/your-endpoint
```

If deployed, you'd use the live URL instead:

```
https://your-app.onrender.com/your-endpoint
```

---

## 🚀 Basic Workflow

1. Open Postman → Click **New Request**
2. Select the **HTTP Method** (GET, POST, PATCH, DELETE, etc.)
3. Enter the **URL** (e.g., `http://localhost:3000/notes`)
4. (If needed) Go to the **Body** tab → select **raw** → **JSON** → enter your payload
5. (If needed) Add **Headers** (e.g., `Content-Type: application/json`, `Authorization: Bearer <token>`)
6. Click **Send**
7. View the response — status code, response body, time taken, headers

---

## 🔀 Common HTTP Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `GET` | Fetch/read data | Get all notes |
| `POST` | Create new data | Add a new note |
| `PUT` | Replace existing data entirely | Overwrite a note |
| `PATCH` | Update part of existing data | Update a note's description |
| `DELETE` | Remove data | Delete a note |

---

## 📁 Collections

A **Collection** is a folder of related API requests, grouped together for a project.

```
📁 Notes API Collection
 ├── GET    /notes           → Fetch all notes
 ├── POST   /notes           → Create a note
 ├── PATCH  /notes/:index    → Update a note
 └── DELETE /notes/:index    → Delete a note
```

Collections make it easy to:
- Reuse requests without rewriting them
- Share the whole API setup with teammates (export/import as JSON)
- Run all requests together (Collection Runner)

---

## 🌍 Environments & Variables

Instead of hardcoding URLs, use variables like:

```
{{base_url}}/notes
```

Then define `base_url` differently per environment:

| Environment | `base_url` value |
|---|---|
| Development | `http://localhost:3000` |
| Staging | `https://staging.myapp.com` |
| Production | `https://myapp.com` |

Switch environments with one click — no need to edit every request manually.

---

## ✅ Testing & Automation

Postman lets you write simple JavaScript test scripts that run after each request:

```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has notes array", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.notes).to.be.an('array');
});
```

These tests can be run:
- Manually, per request
- In bulk, via **Collection Runner**
- Automatically, via **Newman** (CLI) in CI/CD pipelines (GitHub Actions, Jenkins, etc.)

---

## 💻 Installation

Postman is available as:

- **Desktop App** — Windows, macOS, Linux → [postman.com/downloads](https://www.postman.com/downloads/)
- **Web Version** — usable directly in browser (limited features without the desktop agent)
- **CLI (Newman)** — for automated/CI testing:

```bash
npm install -g newman
newman run your-collection.json
```

---

## 📄 Summary

> Postman is not part of your code — it's an external tool that sends the same kind of HTTP requests your browser or frontend would. It just gives developers a fast, visual way to build, test, and document APIs before (or instead of) building a full frontend.