import React, { createContext, useState } from "react";

export const authDataContext = createContext();

function AuthContext({ children }) {
  //  let serverUrl = "https://wanderlust-backend-1d10.onrender.com" || "http://localhost:8000";
  // let serverUrl = "http://localhost:8000";
let serverUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : "https://wanderlust-backend-1d10.onrender.com";



  let [loading, setLoading] = useState(false);

  let value = {
    serverUrl,
    loading,
    setLoading,
  };

  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
