export let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "https://node-backend-live.onrender.com";
} else if (process.env.NODE_ENV === "production") {
  API_URL = "https://node-backend-live.onrender.com";
} else if (process.env.NODE_ENV === "staging") {
  API_URL = "https://node-backend-live.onrender.com";
} else {
  API_URL = "https://node-backend-live.onrender.com";
}
// API_URL = "https://node-backend-live.onrender.com";
API_URL = "https://node-backend-live.onrender.com";

API_URL = `${API_URL}/api/v1`;
   