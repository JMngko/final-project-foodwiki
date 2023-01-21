import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Rating from "./components/Rating";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      errorElement: <p>Page Not Found</p>,
      children: [
        {
          path: "/",
          element: localStorage.getItem("token") ? <Home /> : <Login />,
        },
        {
          path: "/Register",
          element: <Register />,
        },
        {
          path: "/rating/:foodID",
          element: <Rating />,
        },
      ],
    },
  ]);
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<RouterProvider router={router} />);
  
  reportWebVitals();
}

export default App;