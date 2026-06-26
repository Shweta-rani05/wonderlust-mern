/**
 * Controller to handle AI-related operations
 */
const geminiService = require("../services/gemini.js");

/**
 * Handles the generation of trip plan.
 * POST /api/ai/trip-planner
 */
async function getTripPlan(req, res, next) {
  try {
    const {
      destination,
      hotelName,
      hotelPrice,
      hotelLocation,
      hotelDescription,
      days,
      budget,
      travelers,
      travelType,
      preferences
    } = req.body;

    const plan = await geminiService.generateTripPlan({
      destination,
      hotelName,
      hotelPrice,
      hotelLocation,
      hotelDescription,
      days,
      budget,
      travelers,
      travelType,
      preferences
    });

    return res.status(200).json({
      success: true,
      plan
    });
  } catch (error) {
    console.error("AI Trip Planner Controller Error:", error);
    
    // Check if error is due to missing configuration
    if (error.message.includes("Gemini API key is not configured")) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured on the server. Please setup GEMINI_API_KEY in the .env file."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to generate itinerary. Please try again later."
    });
  }
}

/**
 * Renders the standalone AI Travel Guide page.
 * GET /ai-travel-guide
 */
async function renderTravelGuidePage(req, res, next) {
  res.render("ai/travel-guide.ejs");
}

module.exports = {
  getTripPlan,
  renderTravelGuidePage
};
