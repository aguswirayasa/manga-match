
# Manga Match

**Manga Match** is a social platform for manga, manhwa, and manhua enthusiasts. It allows users to share, discover, and recommend their favorite titles to a like-minded community.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview
Manga Match provides a dedicated space for fans of manga, manhwa, and manhua to interact. With features like post creation, liking, favoriting, and user profile management, the platform encourages discovery and community engagement.

## Features
- **Account Registration & Authentication**: Secure sign-up and sign-in process using NextAuth.
- **Create Post**: Users can create posts to share their favorite manga or recommendations.
- **Manage Posts**: Edit or delete previously created posts.
- **Favorites & Likes**: Mark and like posts to save or show appreciation.
- **Profile Updates**: Update personal information, including profile picture and bio.

## Tech Stack
- **Frontend**: TypeScript, Next.js 13, Tailwind CSS, ShadCN UI
- **Authentication**: NextAuth for user registration and login
- **Backend**: Prisma with MySQL for data storage and ORM
- **Database**: MySQL

## Getting Started
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/mangamatch.git
   cd mangamatch
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the environment variables**:
   Create a `.env` file in the root directory and add the following:

   ```plaintext
   DATABASE_URL="mysql://root:admin@localhost:3306/mangamatch"
   NEXTAUTH_SECRET="supersecret"
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the application**:
   Visit `http://localhost:3000` in your browser to start using Manga Match.

## Environment Variables
- `DATABASE_URL`: URL to connect to the MySQL database.
- `NEXTAUTH_SECRET`: Secret key for NextAuth session encryption.

## Project Structure
```plaintext
├── components          # UI components (Avatar, Button, etc.)
├── lib                 # Utility functions and helper files
├── pages               # Next.js pages and routing
├── prisma              # Prisma schema and migrations
├── public              # Static assets (images, etc.)
├── styles              # Global styles and Tailwind configuration
└── .env                # Environment variables
```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
This project is licensed under the MIT License.
