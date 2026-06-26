/**
 * Middleware to validate inputs for the AI Travel Guide request
 */

function validateTripPlannerInputs(req, res, next) {
  const {
    destination,
    hotelName,
    hotelPrice,
    hotelLocation,
    hotelDescription,
    days,
    budget,
    travelers,
    travelType
  } = req.body;

  const errors = [];

  if (!destination || typeof destination !== "string" || destination.trim() === "") {
    errors.push("Destination is required and must be a string.");
  }
  if (!hotelName || typeof hotelName !== "string" || hotelName.trim() === "") {
    errors.push("Hotel name is required.");
  }
  if (hotelPrice === undefined || isNaN(Number(hotelPrice))) {
    errors.push("Hotel price is required and must be a number.");
  }
  if (!hotelLocation || typeof hotelLocation !== "string" || hotelLocation.trim() === "") {
    errors.push("Hotel location is required.");
  }
  if (!hotelDescription || typeof hotelDescription !== "string") {
    errors.push("Hotel description must be a string.");
  }

  const parsedDays = parseInt(days, 10);
  if (isNaN(parsedDays) || parsedDays <= 0 || parsedDays > 30) {
    errors.push("Days must be a valid number between 1 and 30.");
  }

  if (!budget || budget.toString().trim() === "") {
    errors.push("Budget is required.");
  }

  const parsedTravelers = parseInt(travelers, 10);
  if (isNaN(parsedTravelers) || parsedTravelers <= 0) {
    errors.push("Travelers must be a positive number.");
  }

  const validTravelTypes = ["Solo", "Couple", "Family", "Friends", "Business"];
  if (!travelType || !validTravelTypes.includes(travelType)) {
    errors.push(`Travel type must be one of: ${validTravelTypes.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  // Update req.body with parsed values
  req.body.days = parsedDays;
  req.body.travelers = parsedTravelers;

  next();
}

module.exports = {
  validateTripPlannerInputs
};
