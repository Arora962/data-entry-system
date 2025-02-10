// utils/config.js
const backendUrl = process.env.NODE_ENV === "production"
  ? "https://my-backend-url.app"  
  : "http://localhost:3001";

export default backendUrl;
