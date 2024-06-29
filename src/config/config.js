export let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "https://node-backend-jcdp.onrender.com";
} else if (process.env.NODE_ENV === "production") {
  API_URL = "https://node-backend-jcdp.onrender.com";
} else if (process.env.NODE_ENV === "staging") {
  API_URL = "https://node-backend-jcdp.onrender.com";
} else {
  API_URL = "https://node-backend-jcdp.onrender.com";
}
// API_URL = "https://node-backend-jcdp.onrender.com";
API_URL = "http://localhost:8000";

API_URL = `${API_URL}/api/v1`;
