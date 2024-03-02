import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp";
import EnterChat from "./routes/EnterChat";
import Home from "./routes/Home";
import UserContextProvider from "./components/UserContextProvider";
import Chat from "./routes/Chat";
import RequireAuth from "./components/RequireAuth";
import RequireChat from "./components/RequireChat";
import Layout from "./routes/Layout";

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
      path: "/enterChat",
      element: <EnterChat />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/home",
          element: (
            <RequireAuth>
              <Home />
            </RequireAuth>
          ),
        },
        {
          path: "/chat",
          element: (
            <RequireChat>
              <Chat />
            </RequireChat>
          ),
        },
      ],
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
