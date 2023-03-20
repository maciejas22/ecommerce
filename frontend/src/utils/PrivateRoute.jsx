import { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const PrivateRoute = ({ permissions, children }) => {
  const { authTokens } = useContext(AuthContext);
  if (permissions === "authUser") {
    if (authTokens) return children;
    else return <Navigate to="/login" />;
  } else if (permissions === "anonymousUser") {
    if (authTokens) return <Navigate to="/" />;
    else return children;
  }

  return children;
};

export default PrivateRoute;
