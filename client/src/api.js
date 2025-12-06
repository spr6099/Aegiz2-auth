import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3100",
});

// auto attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- NEW CODE: Response വരുമ്പോൾ Check ചെയ്യാൻ ---
api.interceptors.response.use(
  (response) => response, // കുഴപ്പമൊന്നുമില്ലെങ്കിൽ response തിരിച്ചയക്കുക
  (error) => {
    // Error വന്നാൽ Check ചെയ്യുക
    if (error.response && error.response.status === 401) {
      console.log("Session Expired! Logging out...");

      // 1. Token ഡിലീറ്റ് ചെയ്യുക
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // User details ഉണ്ടെങ്കിൽ അതും കളയുക

      // 2. Login പേജിലേക്ക് നിർബന്ധപൂർവ്വം മാറ്റുക
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
