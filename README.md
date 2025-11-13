# Blog Public - Front End

## Description

This project is the **public-facing blog website** where users can browse published posts, read articles, and leave comments.  
It consumes the [Blog API](https://github.com/josednl/blog-backend) and displays all publicly available content.

Admins and editors use a separate dashboard ([Admin Frontend](https://github.com/josednl/blog-author-frontend)) for content management.

---

## Features

- View all **published** blog posts.
- Read individual posts with formatted content.
- Comment on posts (requires login).
- User registration and authentication.
- Responsive design with **dark mode**.
- Loading states, error handling, and toast notifications.

---

## Technologies Used

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Auth**: JWT with cookies
- **HTTP Client**: Axios
- **Utilities**: React Router, Prettier, dotenv

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://docs.npmjs.com/)

---

### Installation

1. Clone the repository

```bash
git clone https://github.com/josednl/blog-frontend.git
cd blog-frontend
```

2. Install dependencies

```bash
npm install
```

3. Create a .env file in the root directory with the following variables:

```bash
VITE_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

6. Open the app:

```bash
Open http://localhost:5173
```
