# Acadex - E-Learning Platform

## Project Overview

Acadex is a comprehensive e-learning platform designed to connect educators and learners. Inspired by platforms like Udemy and Coursera, Acadex offers a space for instructors to publish courses and for students to discover and enroll in them. The platform supports user authentication, course browsing, detailed course information, a shopping cart and payment integration via Stripe, and dedicated dashboards for educators.

## 1. Tech Stack

### A. Frontend (`client`)

1.  React: A JavaScript library for building user interfaces.
2.  React Router DOM: For managing navigation within the application.
3.  Clerk: For user authentication and management.
4.  Axios: For making HTTP requests to the backend API.
5.  Humanize Duration: To display time durations in a user-friendly format.
6.  Quill: A rich text editor for course descriptions (likely used by educators).
7.  rc-progress: For displaying progress indicators.
8.  React Toastify: For displaying notification messages.
9.  React YouTube: To embed YouTube videos for course content.
10. uniqid: For generating unique IDs.
11. CSS: For styling (you might be using plain CSS, or a framework like Tailwind CSS which seems to be configured in `tailwind.config.js`).

### B. Backend (`server`)

* Node.js: A JavaScript runtime environment.
* Express: A minimalist web application framework for Node.js.
* Mongoose: An Object Data Modeling (ODM) library for MongoDB.
* @clerk/clerk-sdk-node & @clerk/express: Clerk's backend SDK for user authentication and management.
* Cloudinary: For storing and managing uploaded course thumbnail images.
* cors: For enabling Cross-Origin Resource Sharing.
* dotenv: To load environment variables from a `.env` file.
* Multer: For handling file uploads (course thumbnails).
* Stripe: For handling payment processing.
* svix: For verifying Clerk webhook signatures.

### C. Database

* MongoDB: A NoSQL database to store course data, user enrollments, purchase history, etc.

## 2. Setup Instructions

Follow these steps to set up the Acadex project locally:

### A. Backend Setup (`server`)

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file:
    Copy the `.env.example` file (if you have one) or create a new file named `.env` in the `server` directory.
    * Add the following environment variables (replace with your actual values):
        ```env
        MONGODB_URI=your_mongodb_connection_string
        CLERK_SECRET_KEY=your_clerk_backend_secret_key
        CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
        STRIPE_SECRET_KEY=your_stripe_secret_key
        STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        PORT=5000 # Or your preferred backend port
        FRONTEND_URL=http://localhost:3000 # Or your frontend development URL
        ```
4.  Run the backend development server:
    ```bash
    npm run dev # Or your backend start script (check package.json)
    ```
    The backend should now be running on `http://localhost:5000` (or the port specified in your `.env` file).

### B. Frontend Setup (`client`)

1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file:
    * Copy the `.env.example` file (if you have one) or create a new file named `.env` in the `client` directory.
    * Add the following environment variables (replace with your actual Clerk Frontend API Key):
        ```env
        VITE_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_api_key
        VITE_BACKEND_URL=http://localhost:5000/api # Or your backend API URL
        VITE_CURRENCY=USD # Or your preferred currency
        ```
4.  Run the frontend development server:
    ```bash
    npm run dev # Or your frontend start script (check package.json - likely uses Vite)
    ```
    The frontend should now be running on `http://localhost:3000` (or the default Vite development server port).

### C. Accessing the Application

* Open your browser and navigate to the frontend URL (e.g., `http://localhost:3000`).

## 3. Backend API Endpoints (Illustrative - Refer to your `routes` directory)

* `/api/educator/update-role`: Updates a user's role to "educator".
* `/api/educator/add-course`: Adds a new course (requires authentication and educator role).
* `/api/educator/courses`: Retrieves courses created by the logged-in educator (requires authentication and educator role).
* `/api/educator/dashboard`: Retrieves dashboard data for the logged-in educator (requires authentication and educator role).
* `/api/educator/enrolled-students`: Retrieves a list of students enrolled in the educator's courses (requires authentication and educator role).
* `/api/course/all`: Retrieves all published courses.
* `/api/course/:courseId`: Retrieves details for a specific course.
* `/api/user/data`: Retrieves user-specific data (requires authentication).
* `/api/user/enrolled-courses`: Retrieves courses the logged-in user is enrolled in (requires authentication).
* `/api/user/purchase`: Handles course enrollment and redirects to Stripe.
* `/api/webhooks/clerk`: Handles Clerk webhook events (e.g., user creation).
* `/api/webhooks/stripe`: Handles Stripe webhook events (e.g., successful payments).

## 4. Screenshots

Include several screenshots showcasing the key features of your application:

* Homepage: Showing the initial landing page with the Acadex introduction and navigation.
* Course Listing Page: Displaying a variety of available courses.
* Course Details Page: Showing detailed information about a specific course, including the enroll button.
* Login/Signup Modal: Showing the login/signup interface.
* Student Dashboard (My Enrollments): Showing the list of courses a student has enrolled in.
* Educator Dashboard: Displaying key metrics like total enrollments, total courses, and total earnings.
* Add Course Form (Educator): Showing the interface for educators to create new courses.
* Payment Gateway (Stripe): A screenshot of the Stripe checkout page.

## 5. Demo (Short Screen Recording with Explanation)

Screen recording demonstration Link: https://drive.google.com/file/d/19fEtD5hH2sh66kRdayF_6AuYehxg3zTK/view?usp=drivesdk
