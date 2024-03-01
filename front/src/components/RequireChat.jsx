import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";

export default function RequireChat({ children }) {
  const { id } = useContext(UserContext);

  if (!id) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
