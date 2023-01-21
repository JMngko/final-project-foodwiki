import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [name, setName] = useState();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: "https://api-bootcamp.do.dibimbing.id/api/v1/user",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
        },
      })
        .then((response) => {
          setName(response.data.user.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    axios({
      method: "get",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/logout",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        alert(`${response.data.message}`);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav>
      <h1> FOODWIKI </h1>
      <br></br>

      <ul className="ver">
        {localStorage.getItem("token") ? (
          <li className="items">
              {name}
          </li>
        ) : null}
      </ul>

      <ul className="ver">
        {localStorage.getItem("token") ? (
        <li>
          <Link
            className="items" to="#" onClick={() => handleLogout()}
          >
            Logout
          </Link>
        </li>
        ) : null}
      </ul>

    </nav>
  );
};

export default NavBar;
