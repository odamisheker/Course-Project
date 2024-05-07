import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import UserContextProvider from "./components/context/UserContextProvider";
import Chat from "./routes/Chat/Chat";
import RequireAuth from "./components/RequireAuth";
import RequireChat from "./components/RequireChat";
import ChatContextProvider from "./components/context/ChatContextProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: <Navigate to="/chat" replace />,
      errorElement: <h1>404040404</h1>,
    },
    {
      path: "/chat",
      element: (
        <RequireAuth>
          <ChatContextProvider>
            <Chat />
          </ChatContextProvider>
        </RequireAuth>
      ),
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
