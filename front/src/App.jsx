import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./routes/Login/Login";
import SignUp from "./routes/SignUp/SignUp";
import EnterChat from "./routes/EnterChat/EnterChat";
import Home from "./routes/Home";
import UserContextProvider from "./components/UserContextProvider";
import Chat from "./routes/Chat/Chat";
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
        // {
        //   path: "/home",
        //   element: (
        //     <RequireAuth>
        //       <Home />
        //     </RequireAuth>
        //   ),
        // },
        {
          path: "/chat",
          element: (
            <RequireAuth>
              <Chat />
            </RequireAuth>
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
