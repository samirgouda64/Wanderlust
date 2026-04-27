import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  let getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/currentUser", {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (error) {
      setUserData(null);
      console.log(error);
    }finally {
  setLoading(false);
}
  };

  useEffect(() => {
    getCurrentUser();
  },[]);

  let value = {
    userData,
    setUserData,
    getCurrentUser,
    loading
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
