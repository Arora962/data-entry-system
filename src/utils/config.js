// utils/config.js
const backendUrl = process.env.NODE_ENV === "production"
  ? "https://data-entry-system-alpha.vercel.app/"  
  : "http://localhost:3001";

export default backendUrl;
