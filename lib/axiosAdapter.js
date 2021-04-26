// Import HTTP client.
const axios = require("axios");

async function axiosAdapter(config) {
  try {
    // Make the asynchronous request using axios.
    const { data } = await axios(config);

    // Return the data.
    return data;

    // Catch an eventual error.
  } catch (error) {
    // Log the error to the console.
    console.error("Request Error:", error.response.data);
  }
}

// Expose the `axiosAdapter` function.
exports.axiosAdapter = axiosAdapter;