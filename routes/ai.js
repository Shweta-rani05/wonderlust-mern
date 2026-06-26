const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai.js");
const { validateTripPlannerInputs } = require("../middleware/ai.js");
const { isLoggedIn } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");

// GET /ai-travel-guide
router.get("/ai-travel-guide", wrapAsync(aiController.renderTravelGuidePage));

// POST /api/ai/trip-planner
router.post("/api/ai/trip-planner", validateTripPlannerInputs, wrapAsync(aiController.getTripPlan));

module.exports = router;
