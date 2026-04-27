import React, { useContext } from "react";
import { userDataContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const { userData, loading } = useContext(userDataContext);
  //   console.log(userData);

  if (loading) {
    return null;
  }

  if (!userData) {
    return <Navigate to={"/login"} />;
  }
  if (allowedRole.length > 0 && !allowedRole.includes(userData.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
