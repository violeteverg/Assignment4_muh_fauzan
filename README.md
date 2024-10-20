# Assignment 4 Phincon Academy

## Course Management Backend

This project is a backend service for managing Courses with full CRUD functionality (Create, Read, Update, Delete). It is built using **Node.js**, **Express**, **Prisma**, and **TypeScript**, connected to a **Neon** database.

Additionally, it includes a frontend that integrates seamlessly with the backend to provide a complete user interface for managing courses. You can find the frontend project [https://github.com/violeteverg/Assignment4_fe_muh_fauzan](#).

## Features

- **Create** a new Course
- **Read** Course (both single course and list of courses)
- **Update** existing course information
- **Delete** a course (soft delete)


## Technologies Used

- **Node.js**: JavaScript runtime for backend.
- **Express**: Web framework for Node.js.
- **Prisma**: ORM for database operations.
- **TypeScript**: Typed superset of JavaScript.
- **Neon**: Fully managed serverless PostgreSQL database.


## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or later) installed.
- **npm** (v6 or later) installed.
- Access to a **Neon** PostgreSQL database.

## Getting Started

1. Clone the repository by running `git clone https://github.com/your-username/your-repo.git` and navigate into the directory with `cd your-repo`.
2. Install the necessary dependencies by executing `npm install`.

3. Create a `.env` file in the root of your project with the following content:

   ```env
   DATABASE_URL="postgresql://username:password@ep-neon-database-url/neondb"
   PORT=3000
   secret_key=your_secret_key
4. genereate prisma with command `npx prisma generate`
5. run the project with `npm run dev`

## API Documentation

here the link for api documentation using postman collection

```bash
https://www.postman.com/supply-operator-89145472/workspace/phincon-academy/collection/28734905-bac8ebdd-4d79-49a2-a548-56b3e54e1188?action=share&creator=28734905
