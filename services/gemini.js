/**
 * Service to interface with Google's Gemini API
 */

/**
 * Generates a structured travel plan based on property and traveler details.
 * @param {Object} data - Contains hotel details and user planning preferences.
 * @returns {Promise<string>} Generated itinerary markdown.
 */
async function generateTripPlan(data) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY") {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your .env file.");
  }

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
  } = data;

  const prompt = `You are an experienced travel planner.
A user is planning a trip.

Hotel:
${hotelName}

Location:
${hotelLocation}

Price:
${hotelPrice}

Description:
${hotelDescription}

User Details:
Destination:
${destination}

Days:
${days}

Budget:
${budget}

Travelers:
${travelers}

Travel Type:
${travelType}

Additional Preferences:
${preferences || "None"}

Generate a well-formatted travel plan.
Include:
1. Summary
2. Day-wise itinerary
3. Nearby attractions
4. Recommended local food
5. Travel tips
6. Estimated spending
7. Best time to visit
8. Things to avoid

Keep the answer concise, practical, and easy to read.
Use markdown headings and bullet points.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API Error Response:", errText);
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  
  if (
    result.candidates &&
    result.candidates[0] &&
    result.candidates[0].content &&
    result.candidates[0].content.parts &&
    result.candidates[0].content.parts[0]
  ) {
    return result.candidates[0].content.parts[0].text;
  }

  throw new Error("Invalid response format received from Gemini API.");
}

module.exports = {
  generateTripPlan
};
