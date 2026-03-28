 Wonderlust — Full-Stack MERN Hotel Booking Application

Wonderlust is a comprehensive full-stack hotel booking web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js).
The application is designed to deliver a seamless and user-friendly experience for discovering, booking, and managing hotel reservations.
The project incorporates industry-standard development practices such as secure authentication, protected routes, modular code architecture, and responsive design.
It effectively demonstrates practical frontend and backend engineering skills and is well-suited for academic evaluation, internships, and professional recruitment purposes.

 Key Features :

 Authentication & Authorization

Secure user registration and login
JWT-based authentication
Password encryption using bcrypt
Route protection to restrict access to authenticated users only

 Dashboard & User Functionality :

Personalized user profile dashboard
Browse available hotels
Perform CRUD operations on hotel bookings
Search and filter hotels based on user preferences
Secure logout functionality

Backend & API Development :

Backend developed using Node.js and Express.js 
MongoDB used as the primary database with Mongoose ORM
RESTful APIs implemented for:
User authentication and authorization
Profile retrieval and updates
Hotel data management (CRUD)
Booking management

Responsive & User-Friendly Interface :

Frontend built with React.js
Fully responsive layout for desktop and mobile devices
Client-side and server-side form validations

Technology Stack :

Layer	                                               Technologies Used
Frontend	                                           React.js
UI & Styling	                                       Tailwind CSS / Bootstrap / EJS Templates
Backend	                                             Node.js, Express.js
Database                                             MongoDB (Mongoose ODM)
Authentication                                     	 JSON Web Tokens (JWT), bcrypt
API Testing & Documentation                        	 Postman

Wonderlust/
│
├── models/                     # Database schemas (Mongoose)
│   ├── listing.js              # Hotel/Listing schema
│   ├── review.js               # Review schema
│   └── user.js                 # User schema
│
├── routes/                     # Express routes (API & views handling)
│   ├── listing.js              # Listing-related routes
│   ├── reviews.js              # Review-related routes
│   ├── user.js                 # User authentication routes
│   └── posts.js                # Additional routes (if used)
│
├── views/                      # EJS Templates (Frontend rendering)
│   ├── includes/               # Reusable components
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs     # Main layout template
│   │
│   ├── listings/               # Listing pages
│   │   ├── index.ejs           # Show all listings
│   │   ├── show.ejs            # Single listing details
│   │   ├── new.ejs             # Create new listing
│   │   └── edit.ejs            # Edit listing
│   │
│   ├── home.ejs                # Homepage
│   ├── error.ejs               # Error page
│   └── page.ejs                # Additional page
│
├── init/                       # Initial data setup
│   ├── data.js                 # Seed data
│   └── index.js                # Database initialization script
│
├── utils/                      # Utility functions
│   ├── ExpressError.js         # Custom error class
│   └── wrapAsync.js            # Async error handler
│
├── public/                     # Static assets (CSS, JS, images)
│
├── node_modules/               # Dependencies
│
├── app.js                      # Main Express app configuration
├── server.js                   # Server entry point
├── schema.js                   # Validation schemas (Joi or similar)
├── package.json                # Project metadata & dependencies
├── package-lock.json
├── .gitignore
└── README.md
