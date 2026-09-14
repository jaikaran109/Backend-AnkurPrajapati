# 🎵 Spotify Backend Clone REST API

A production-ready, feature-rich Spotify Backend RESTful API built using **Node.js**, **Express.js (v5)**, and **MongoDB (Mongoose)**. This project demonstrates robust **Role-Based Access Control (RBAC)**, secure **JWT Authentication via HTTP-Only Cookies**, **Cloud Audio Storage Integration with ImageKit**, and clean **MVC (Model-View-Controller)** architecture.

---

## 🚀 Key Features

- 🔐 **Authentication & Security**
  - Secure user & artist registration and login.
  - Password hashing with **bcryptjs** (salt rounds = 10).
  - Stateless **JSON Web Tokens (JWT)** delivered in secure `HTTP-Only` cookies.
- 👥 **Role-Based Access Control (RBAC)**
  - `user`: Browse songs, explore albums, view artist metadata.
  - `artist`: All user capabilities + direct track uploading to cloud storage & album creation.
- ☁️ **Media Cloud Storage**
  - Audio file uploads handled via **Multer** memory storage and uploaded to **ImageKit** CDN.
- 💿 **Album & Music Management**
  - Relational mapping between Artists, Tracks, and Albums using Mongoose references (`ref`) and `.populate()`.
- 🏗️ **Clean MVC Architecture**
  - Modular separation of concerns: Models, Controllers, Middlewares, Routes, Services, and DB configuration.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Web Framework** | Express.js v5 |
| **Database** | MongoDB Atlas with Mongoose ODM |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`) & Cookies (`cookie-parser`) |
| **Password Hashing** | `bcryptjs` |
| **File Uploads & CDN** | Multer + ImageKit SDK |
| **Environment Config** | `dotenv` |
| **Dev Tooling** | `nodemon` (Hot reload) |

---

## 📁 Project Structure

```text
Spotify-Clone/
├── server.js                      # Server entry point & DB bootstrap
├── package.json                   # Dependencies and scripts
├── .env                           # Environment variables configuration
└── src/
    ├── app.js                     # Express app initialization & route binding
    ├── db/
    │   └── db.js                  # MongoDB Atlas connection with DNS fallback
    ├── models/
    │   ├── user.model.js          # User schema (roles: 'user' | 'artist')
    │   ├── music.model.js         # Music track schema with user reference
    │   └── album.model.js         # Album schema linking tracks & artist
    ├── controllers/
    │   ├── auth.controller.js     # Register, Login, Logout logic
    │   └── music.controller.js    # Create music, create album, fetch endpoints
    ├── middlewares/
    │   └── auth.middleware.js     # authArtist & authUser RBAC guards
    ├── routes/
    │   ├── auth.routes.js         # /api/auth routes
    │   └── music.routes.js        # /api/music routes
    └── services/
        └── storage.service.js     # ImageKit cloud storage integration
```

---

## 🔑 Role-Based Access Matrix

| Endpoint | Method | Description | Role Required |
|---|---|---|---|
| `/api/auth/register` | `POST` | Register a new user or artist | Public |
| `/api/auth/login` | `POST` | Login user & set JWT cookie | Public |
| `/api/auth/logout` | `POST` | Clear auth token cookie | Public |
| `/api/music/upload` | `POST` | Upload audio file & track details | `artist` |
| `/api/music/album` | `POST` | Create a new music album | `artist` |
| `/api/music/` | `GET` | Get all uploaded music tracks | `user` or `artist` |
| `/api/music/albums` | `GET` | Get all albums with artist details | `user` or `artist` |
| `/api/music/albums/:albumId` | `GET` | Get single album with full tracklist | `user` or `artist` |

---

## 📡 API Reference & Documentation

### 1. Authentication Routes (`/api/auth`)

#### 🔹 Register User / Artist
- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "strongPassword123",
    "role": "artist"
  }
  ```
  *(Note: `role` defaults to `"user"` if omitted. Allowed values: `"user"`, `"artist"`)*

#### 🔹 Login
- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "strongPassword123"
  }
  ```
- **Response:** Sets HTTP-only `token` cookie and returns user profile without sensitive fields.

#### 🔹 Logout
- **URL:** `POST /api/auth/logout`
- **Response:** Clears the `token` cookie.

---

### 2. Music Routes (`/api/music`)

#### 🔹 Upload Track *(Artist Only)*
- **URL:** `POST /api/music/upload`
- **Headers:** `Content-Type: multipart/form-data`
- **Form Data:**
  - `music`: Audio file (mp3, wav, etc.)
  - `title`: Track Title (string)

#### 🔹 Create Album *(Artist Only)*
- **URL:** `POST /api/music/album`
- **Body:**
  ```json
  {
    "title": "Midnight Memories",
    "musics": ["64fa7e8...", "64fa7e9..."]
  }
  ```

#### 🔹 Get All Tracks
- **URL:** `GET /api/music`
- **Access:** Authenticated Users & Artists

#### 🔹 Get Album by ID
- **URL:** `GET /api/music/albums/:albumId`
- **Access:** Authenticated Users & Artists (populates full music tracklist and artist info)

---

## ⚙️ Setup & Installation

### 1. Clone & Navigate
```bash
cd Spotify-Clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of `Spotify-Clone/` with the following keys:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

### 4. Run the Application

#### Development Mode (with hot-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

Server will run at: `http://localhost:3000`

---

## 🛡️ Error Handling & Best Practices
- **Strict Data Validation**: Inputs are verified at both controller and Mongoose schema levels.
- **Robust DNS Fallback**: Configured custom DNS resolvers (`8.8.8.8`) in `db.js` to ensure seamless MongoDB Atlas connection across all ISPs.
- **Secure Cookie Storage**: Tokens are kept out of `localStorage` to guard against XSS attacks.

---

## 🙏 Acknowledgements
Special thanks to **Ankur Prajapati** for the in-depth backend tutorials and structured guidance on scalable Node.js/Express architectures.

---

## 📜 License
This project is licensed under the [ISC License](LICENSE).
