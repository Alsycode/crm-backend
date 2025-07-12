CRM Backend - Entri Elevate Full Stack Development

Module End Assignment: 03

This project implements a backend for a Customer Relationship Management (CRM) system using Express.js, Mongoose, and MongoDB, as part of the Entri Elevate Full Stack Development course. It provides RESTful APIs for user authentication, customer management, and case management, with a modular structure and secure configuration.

Objective

To build a robust, scalable, and secure backend supporting CRM functionalities, including user authentication (JWT-based), customer CRUD operations, and case management, with proper error handling and documentation.

Project Structure

backend-summative-assesment/
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── customerController.js  # Customer CRUD logic
│   └── caseController.js      # Case management logic
├── models/
│   ├── User.js               # User schema
│   ├── Customer.js           # Customer schema
│   └── Case.js               # Case schema
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── customerRoutes.js     # Customer routes
│   └── caseRoutes.js         # Case routes
├── .env                      # Environment variables (not committed)
├── .gitignore                # Excludes node_modules, .env
├── package.json              # Project metadata and dependencies
├── server.js                 # Main server file
└── README.md                 # Project documentation

Prerequisites----------
Node.js: Version 14.x or higher
MongoDB: Local MongoDB server or MongoDB Atlas
Postman: For testing API endpoints
Git: For version control

Setup Instructions-----
Clone the Repository:
Install Dependencies:
Configure Environment Variables:
Run the Application: