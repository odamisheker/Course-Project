import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
