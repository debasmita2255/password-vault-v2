# Password Vault

A highly secure, full-stack password management application built with the MERN stack (MongoDB, Express, React, Node.js). Password Vault implements a strict Zero-Knowledge architecture, ensuring that all cryptographic operations occur purely on the client-side. The server only ever receives and stores unreadable ciphertext, meaning the user's data remains private even in the event of a database breach.

## Features

- **Zero-Knowledge Architecture:** Cryptographic keys are generated and held strictly in the browser's volatile memory (RAM). While the Master Password is required for login, it is never stored in plain text. The moment it reaches the server, it is scrambled by a one-way, irreversible hashing algorithm (bcrypt).
- **Client-Side Encryption:** Utilizes `crypto-js` to encrypt all credentials directly on the device using AES (Advanced Encryption Standard) in CBC mode with a randomly generated 16-byte IV for each entry.
- **Hardware-Resistant Key Derivation:** The decryption key is derived from the Master Password and the user's email (acting as a cryptographic salt) via the PBKDF2 function running 100,000 mathematical iterations, defending against GPU brute-force attacks.
- **Vault Rollover & Export:** Users can securely change their Master Password (triggering a full RAM-based decryption and re-encryption cycle of the entire vault) and export their decrypted data to a local CSV file.
- **Strict Security Policies:** Enforces rigorous password entropy rules (12+ characters, mixed casing, numbers, symbols) and requires Master Password verification for destructive actions like account deletion.
- **Secure Session Management:** Authentication is handled via JWTs stored in strict, secure, `httpOnly` cross-site cookies, preventing XSS token theft.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, CryptoJS, Axios, React Hot Toast
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Security:** CryptoJS (Client-side AES/PBKDF2), bcryptjs (Server-side password hashing), jsonwebtoken (Auth), cookie-parser

## Setting up on local machine

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js installed on your computer.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/debasmita2255/password-vault-v2.git Password-Vault
   ```

2. **Install Backend Dependencies:**
   Navigate into the server folder and install packages:

   ```bash
   cd Password-Vault/server
   npm install
   ```

3. **Install Frontend Dependencies:**
   Open a new terminal, navigate to the client folder, and install packages:

   ```bash
   cd Password-Vault/client
   npm install
   ```

4. **Environment Variables:**
   You will need to create two separate `.env` files, one for the backend and one for the frontend.

   **Backend (`server/.env`):**
   Create a `.env` file in your `server` folder and add your specific configuration:

   ```env
   PORT=1000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

   **Frontend (`client/.env`):**
   Create a `.env` file in your `client` folder to connect to your backend API:

   ```env
   VITE_BACKEND_URL=http://localhost:1000/api/v1
   ```

5. **Run the Application:**
   Start the backend (from the `server` folder):

   ```bash
   npm run dev
   ```

   Start the frontend (from the `client` folder):

   ```bash
   npm run dev
   ```
