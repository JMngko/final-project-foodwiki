import React from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const onSubmit = (values, { resetForm }) => {
    axios({
      method: "post",
      url: "https://api-bootcamp.do.dibimbing.id/api/v1/login",
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
  
    })
      .then((response) => {
        const token = response.data.token;
        const role = response.data.user.role;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        resetForm({ values: "" });
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        alert(`${error.response.data.message}`);
      });
  };

  const TextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="mb-3">
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input form-control" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };

  return (
    <section>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={onSubmit}
      >
        <div className="login-border">
          <div className="login">
            <div className="bg1 col-md-4 border rounded p-4 shadow">
              <div className="text-center">
              <h1 className="text-dark text-center mt-4 fw-bolder">
                <span className="color1 lt-1">Log-In</span>
              </h1>
                <p>
                  Don't have an account?
                  <Link className="text-decoration-none m-1 color2" to="/Register">
                  <div>
                    <button type="submit" className="btn bg4 text-light btn-dark shadow"> Register</button>
                  </div>
                  </Link>
                </p>
              </div>
              <Form>
                <TextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />

                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn bg4 text-light btn-dark shadow"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Formik>
    </section>
  );
};

export default Login;


