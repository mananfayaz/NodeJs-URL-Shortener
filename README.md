# URL Shortener with Authentication

A simple URL shortener application that allows users to shorten URLs after logging in. The application includes user authentication and session management using cookies. It is built with **Node.js**, **Express**, and **MongoDB**.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- User Registration & Login
- URL shortening
- Session management using cookies
- Access protection for authenticated routes
- URL redirection tracking with timestamp history
- Simple and clean user interface

## Installation

### Prerequisites

- **Node.js** installed on your system.
- **MongoDB** installed and running (either locally or using a cloud service like MongoDB Atlas).

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener-auth.git
    cd url-shortener-auth
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory with the following content:

    ```bash
    MONGODB_URI=mongodb://127.0.0.1:27017/short-url
    PORT=8001
    ```

4. Start the MongoDB server:

    ```bash
    mongod
    ```

5. Start the application:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:8001`.

## Usage

### Registering a User

1. Navigate to the `/user/register` route to create an account.
2. After registration, login via `/user/login` route.

### Creating a Short URL

1. Once logged in, go to the `/url` route.
2. Submit a long URL, and the application will return a shortened version.

### Accessing a Short URL

1. Navigate to `http://localhost:8001/:shortId` where `shortId` is the generated short identifier.
2. The original URL will be opened, and the visit will be logged with a timestamp.

### Authentication

Uses JWT tokens for authentication.
