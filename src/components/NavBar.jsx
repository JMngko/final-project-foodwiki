import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";
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
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <span className="color1 m-1 fw-bold">Food Wiki</span>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            {localStorage.getItem("token") ? (
              <>
                <li className="nav-item ">
                  <Link className="nav-link fw-bold text-dark" to="/">
                    Home
                  </Link>
                </li>
              </>
            ) : null}
          </ul>

          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {localStorage.getItem("token") ? (
                <li className="nav-item dropdown">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    className="nav-link dropdown-toggle fw-bold text-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                  >
                    {name}
                  </a>

                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item fw-bold text-dark"
                        to="#"
                        onClick={() => handleLogout()}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
