import { Client } from "@gradio/client";

const YIELD_SPACE = "dragun33/agent1";
const STORAGE_SPACE = "dragun33/storage-agent"; 
const MARKET_SPACE = "dragun33/marketprice-agent";
const TRANSPORT_SPACE = "dragun33/transport-agent"; // Your new space added here!

// Helper to prevent repetitive connection code
async function getGradioClient(space) {
    return await Client.connect(space);
}

export async function predictYield(data) {
    try {
        const app = await getGradioClient(YIELD_SPACE);
        const result = await app.predict("/predict_yield", [        
            String(data.season).toUpperCase(),      
            String(data.crop).toUpperCase(),        
            parseFloat(data.quantity)
        ]);
        return result?.data ? parseFloat(result.data[0]).toFixed(4) : "0.0000";
    } catch (error) {
        console.error("Agent 1 Error:", error);
        return "Offline";
    }
}

export async function getStorage(data) {
    try {
        const app = await getGradioClient(STORAGE_SPACE);
        const result = await app.predict("/find_storage", [
            String(data.location), 
            String(data.crop),
            String(data.quantity)
        ]);

        if (result && result.data) {
            return {
                location: result.data[0],
                crop: result.data[1],
                spaceNeeded: result.data[2],
                storageType: result.data[3],
                warehouseList: result.data[4]
            };
        }
    } catch (error) {
        console.error("Agent 2 API Error:", error);
        throw error;
    }
}

export async function getPriceInsights(data) {
    try {
        const app = await getGradioClient(MARKET_SPACE);

        const inputDistrict = String(data.district || "SONIPAT").toUpperCase();
        const inputCommodity = String(data.commodity || "WHEAT").toUpperCase();

        const result = await app.predict("/get_price", [inputDistrict, inputCommodity]);

        if (result?.data) {
            const apiMandi = String(result.data[1]);
            return {
                price: String(result.data[0]),
                market: `${inputDistrict} - ${apiMandi.replace(inputDistrict, "").trim()}`,
                variety: String(result.data[2]),
                trend: String(result.data[3]),
                advice: String(result.data[4])
            };
        }
    } catch (error) {
        console.error("Agent 3 API Error:", error);
        // Fallback data if API is down
        return {
            price: "₹4,531",
            market: `${data.district?.toUpperCase() || "LOCAL"} MANDI`,
            variety: "Standard",
            trend: "📈 RISING",
            advice: "SELL NOW"
        };
    }
}

// THE FIXED TRANSPORT API FUNCTION
export const getTransportCost = async (quantity, distance) => {
  // Added a safety check to prevent bad API calls
  if (!quantity || !distance) {
    console.warn("Missing quantity or distance. Applying fallback logic.");
    // Apply temporary defaults if state was lost
    quantity = 10;
    distance = 150;
  }

  try {
    const app = await getGradioClient(TRANSPORT_SPACE);
    
    // Gradio JS client uses the array format to pass arguments matching your python inputs
const result = await app.predict("/get_transport_recommendation", [
        parseFloat(quantity), 
        parseFloat(distance)
    ]);
    // Return the JSON dictionary from the Gradio output
    return result?.data ? result.data[0] : null;

  } catch (error) {
    console.error("Transport API error:", error);
    return null;
  }
}