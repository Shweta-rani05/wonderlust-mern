# 🌍 Wonderlust

### AI-Powered Full-Stack Hotel Booking Platform

A scalable, production-ready **MERN** stack application for exploring, creating, and managing hotel/property listings — featuring secure authentication, cloud image storage, interactive maps, and an integrated **AI Travel Assistant**.

[**🌐 Live Demo**](https://wonderlust-mern-kj89.onrender.com/) · [**💻 Source Code**](https://github.com/Shweta-rani05/wonderlust-mern)

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=Cloudinary&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=for-the-badge&logo=mapbox&logoColor=white)

---

## ✨ Overview

Wonderlust goes beyond a traditional hotel-booking clone by integrating a **Smart AI Travel Assistant** powered by **Google Gemini**. Users can browse and manage property listings while generating personalized, budget-aware travel itineraries — all wrapped in a secure, RESTful MVC architecture built for real-world extensibility.

This project is intentionally structured to demonstrate:
- Clean separation of concerns (MVC)
- Secure, session-based authentication
- Practical LLM integration inside a production web app
- A foundation designed to evolve from single-shot GenAI calls into a **tool-using, multi-agent system**

---

## 🚀 Key Features

### 🤖 Smart AI Travel Assistant
- **Personalized Itineraries** — day-wise trip plans generated via Google Gemini AI
- **Budget-Aware & Type-Specific** — recommendations tailored to budget and travel style
- **Local Insights** — nearby attractions, food recommendations, and travel tips
- **Export & Share** — download itineraries as PDF or copy to clipboard
- **Conversational UI** — smooth, chat-style AI interaction

### 🏨 Comprehensive Hotel Listings
- Full CRUD for property listings (create, edit, delete)
- Real-time location integration via **Mapbox**
- Optimized image storage & management via **Cloudinary**
- Destination search and category-based dynamic filtering

### 🔐 Security & Authentication
- Session-based authentication with **Passport.js**
- Secure password hashing and route-level authorization
- Server-side input validation via **Joi**

### ⭐ User Engagement
- Ratings and reviews on listings
- Ownership-based authorization (only authors can edit/delete their own content)

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Cloud & Storage** | Cloudinary |
| **AI / LLM** | Google Gemini AI |
| **Maps** | Mapbox API |
| **Auth** | Passport.js, express-session |
| **Validation** | Joi |

---

## 📂 Architecture & Design

The application follows the **MVC (Model–View–Controller)** pattern:

```
wonderlust-mern/
├── controllers/     # Business logic — data flow between models and views
├── models/          # Mongoose schemas (Listing, Review, User)
├── views/           # EJS templates for server-rendered UI
├── routes/          # RESTful endpoints grouped by feature
├── middleware/       # Auth, validation, error handling
├── services/        # External API integrations (Gemini AI, Mapbox, Cloudinary)
├── utils/           # Shared helpers (ExpressError, wrapAsync, etc.)
├── init/            # DB seed scripts
├── app.js           # App entry point
└── cloudConfig.js   # Cloudinary configuration
```

- **Models** → Mongoose schemas defining MongoDB collections
- **Views** → EJS templates for dynamic server-side rendering
- **Controllers** → Business logic handling data flow between Models and Views
- **Routes** → RESTful endpoints logically grouped by feature
- **Middleware** → Reusable logic for authentication, validation, and error handling
- **Services** → Dedicated modules for external API integrations (currently: Gemini AI)

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- Cloudinary account
- Mapbox account
- Google Gemini API key

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Shweta-rani05/wonderlust-mern.git
cd wonderlust-mern

# 2. Install dependencies
npm install
```

Create a `.env` file in the root directory:

```env
ATLASDB_URL=<your-mongodb-connection-string>
SECRET=<your-session-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-api-secret>
MAP_TOKEN=<your-mapbox-api-key>
GEMINI_API_KEY=<your-google-gemini-api-key>
```

```bash
# 3. Run the app
npm run dev     # development mode (nodemon)
npm start        # production mode
```

Visit **http://localhost:8080** in your browser.

---

## 🧠 Roadmap: Toward a Multi-Agent Architecture

The current AI Travel Assistant is a single-shot LLM integration. The next phase evolves it into a **tool-calling, multi-agent system** grounded in the app's own data — moving from "AI that generates text" to "AI that takes actions":

| Planned Agent | Role | Tools it would call |
|---|---|---|
| **Trip Planning Agent** | Generates itineraries grounded in *real* listings instead of generic AI text | `searchListings()`, `getListingDetails()`, `getNearbyAttractions()` |
| **Listing Assistant Agent** | Auto-drafts titles/descriptions from uploaded images & location; flags incomplete listings before submission | `analyzeImage()`, `geocodeAddress()`, `checkListingCompleteness()` |
| **Concierge Search Agent** | Conversational, natural-language search with fallback reasoning (e.g., relaxing a filter when zero results are found) | `filterListings()`, `relaxConstraint()` |

All three will share a common tool registry (`services/agents/tools.js`) and route through a lightweight orchestrator, so the system is a coordinated multi-agent architecture rather than three disconnected AI features.

---

## 🔮 Future Enhancements

- Multi-agent AI system (see Roadmap above)
- Full booking & payment gateway (Stripe/Razorpay)
- Date availability calendar
- User wishlists
- Real-time email & in-app notifications

---

## 👩‍💻 Author

**Shweta Rani**
B.Tech Computer Science Engineering
GitHub: [@Shweta-rani05](https://github.com/Shweta-rani05)

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!
