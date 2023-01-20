import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./components/Navigation";
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
          <Navigation />
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
        // {
        //   path: "/profile",
        //   element: <Profile />,
        // },
        // {
        //   path: "/alluser",
        //   element: <Alluser />,
        // },
        // {
        //   path: "/myfavorite",
        //   element: <MyFavorite />,
        // },
        // {
        //   path: "/foodedit",
        //   element: <FoodEdit />,
        // },
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