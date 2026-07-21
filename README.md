<div align="center">
  <h1>🌍 Wonderlust</h1>
  <h3>AI-Powered Full-Stack Hotel Booking Platform</h3>
  <p>A scalable, production-ready MERN stack application featuring secure authentication, property management, and an integrated AI Smart Travel Assistant.</p>

  <p>
    <a href="https://wonderlust-mern-kj89.onrender.com/"><strong>🌐 Live Demo</strong></a> ·
    <a href="https://github.com/Shweta-rani05/wonderlust-mern"><strong>💻 Source Code</strong></a>
  </p>
</div>

---

## ✨ Overview

Wonderlust goes beyond a traditional hotel booking site by integrating a **Smart AI Travel Assistant**. Users can explore, manage hotel listings, and seamlessly generate personalized travel itineraries using **Google Gemini AI**. 

Built with modern web development practices, it showcases a robust backend architecture, RESTful API design, secure authentication, and a responsive frontend. This project is designed to be recruiter-friendly, highlighting clean code organization and real-world application workflows.

---

## 🚀 Key Features

### 🤖 Smart AI Travel Assistant (NEW!)
- **Personalized Itineraries:** Generate day-wise trip plans powered by Google Gemini AI.
- **Budget-Aware & Type-Specific:** Get recommendations tailored to your budget and travel style.
- **Local Insights:** Discover nearby attractions, local food recommendations, and travel tips.
- **Export & Share:** Download itineraries as PDFs or copy them to the clipboard effortlessly.
- **Beautiful Responsive UI:** Built to give a smooth AI conversation experience.

### 🏨 Comprehensive Hotel Listings
- **Property Management:** Full CRUD operations for listings (Create, Edit, Delete).
- **Interactive Maps:** Real-time location integration using Mapbox API.
- **Cloud Storage:** Optimized image uploading and management via Cloudinary.
- **Smart Filtering:** Destination search and category-based dynamic filtering.

### 🔐 Security & Authentication
- **Secure Access:** Session-based authentication using Passport.js.
- **Data Protection:** Secure password hashing and route authorization.
- **Validation:** Robust server-side input validation using Joi.

### ⭐ User Engagement
- **Review System:** Users can leave ratings and reviews on properties.
- **Authorization:** Only authorized users can edit their listings or delete their reviews.

---

## 🛠 Tech Stack

**Frontend:**  
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)

**Backend:**  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

**Database & Cloud:**  
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white) 

**APIs:**  
![Google Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google%20gemini&logoColor=white) ![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)

---

## 💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- Cloudinary Account
- Mapbox Account
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shweta-rani05/wonderlust-mern.git
   cd wonderlust-mern
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your credentials:
   ```env
   ATLASDB_URL=<your-mongodb-connection-string>
   SECRET=<your-session-secret>
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_KEY=<your-cloudinary-api-key>
   CLOUDINARY_SECRET=<your-cloudinary-api-secret>
   MAP_TOKEN=<your-mapbox-api-key>
   GEMINI_API_KEY=<your-google-gemini-api-key>
   ```

4. **Run the application:**
   ```bash
   # Development mode (with nodemon)
   npm run dev

   # Or standard execution
   npm start
   ```

5. **Access the app:**
   Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📂 Architecture & Design

The application follows the **MVC (Model-View-Controller)** pattern to ensure clean separation of concerns:
- **Models:** Mongoose schemas defining MongoDB collections.
- **Views:** EJS templates for dynamic frontend rendering.
- **Controllers:** Business logic handling data flow between Models and Views.
- **Routes:** RESTful endpoints logically grouped by feature.
- **Middlewares:** Reusable logic for authentication, validation, and error handling.
- **Services:** Dedicated modules for external API integrations (e.g., Gemini AI).

---

## 🔮 Future Enhancements
- Fully-functional Booking & Payment Gateway (Stripe/Razorpay)
- Date Availability Calendar
- User Wishlists
- Real-time Email & In-App Notifications

---

## 👩‍💻 Author

**Shweta Rani**  
- B.Tech Computer Science Engineering
- GitHub: [@Shweta-rani05](https://github.com/Shweta-rani05)

---

## ⭐ Support

If you found this project helpful or interesting, please consider giving it a ⭐ on GitHub!
