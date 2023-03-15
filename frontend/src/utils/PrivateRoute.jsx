import { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  user
    ? console.log("user is logged in")
    : console.log("user is not logged in");
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
