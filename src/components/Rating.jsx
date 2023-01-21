import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";

const Rating = () => {
  let { foodID } = useParams();

  const [data, setData] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/foods/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [foodID]);

  const getRating = () => {
    axios({
      method: "get",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/food-rating/${foodID}`,
      headers: {
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
    })
      .then((response) => {
        setRating(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRating();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodID]);

  const onSubmit = (values) => {
    console.log(values);
    axios({
      method: "post",
      url: `https://api-bootcamp.do.dibimbing.id/api/v1/rate-food/${foodID}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        apiKey: `${"w05KkI9AWhKxzvPFtXotUva-"}`,
      },
      data: {
        rating: values.rating,
        review: values.review,
      },
    })
      .then((response) => {
        console.log(response);
        getRating();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MyTextInput = ({ label, ...props }) => {
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
      <div className="container-md mt-3">
      <h1 className="text-dark text-center mt-4 fw-bolder">
            <span className="color1">Food Rating</span>
          </h1>
        <div
          className="card mb-3 mx-auto food-card shadow"
          style={{ maxWidth: `540px` }}
        >
          <div className="row g-0">
            <div className="bg1 col-md-4">
              <img
                src={data && data.data.imageUrl}
                className="img-fluid m-2 food-card-image"
                style={{ borderRadius: `50%` }}
                alt={data && data.data.name}
              />
            </div>
            <div className="col-md-8">
              <div className="bg1 card-body">
                <h5 className="card-title">{data && data.data.name}</h5>
                <p className="card-text">{data && data.data.description}</p>
                <p className="card-text">
                  <i >
                    {data &&
                      data.data.ingredients.map((m, index) => {
                        return (
                          <span key={index}>{(index ? ", " : "") + m}</span>
                        );
                      })}
                  </i>
                </p>
                <p className="card-text">
                  <i
                    className="fa-solid fa-star m-1"
                    style={{ color: `green` }}
                  ></i>
                  {data && data.data.rating}
                </p>
              </div>
            </div>
            <div className="bg3 card-footer">
              <small className="tc1 m-1">
                Created at: {data && data.data.createdAt}
              </small>
              <small className="tc1 m-1">
                Updated at: {data && data.data.updatedAt}
              </small>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn bg4 text-light btn-dark shadow"
            data-bs-toggle="modal"
            data-bs-target={`#staticBackdrop_${data && data.data.id}`}
          >
            Rate Food
          </button>
        </div>
        <div
          className="modal fade"
          id={`staticBackdrop_${data && data.data.id}`}
          tabIndex="-1"
          aria-labelledby="modal-title"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="bg1 modal-body">
                <Formik
                  initialValues={{
                    rating: "",
                    review: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    rating: Yup.string().required("Required"),
                    review: Yup.string().required("Required"),
                  })}
                  onSubmit={onSubmit}
                >
                  <div className="container-md my-3">
                    <div className="text-center">
                      <h2>Rating The Food</h2>
                      <h4 className="color1 fw-bolder">
                        {data && data.data.name}
                      </h4>
                    </div>
                    <div className="row justify-content-center my-3">
                      <div className="col-md-12">
                        <img
                          src={data && data.data.imageUrl}
                          className="img-fluid food-card-image mx-auto d-block mb-3"
                          alt=""
                        />
                        <Form>
                          <MyTextInput
                            label="Rating"
                            name="rating"
                            type="number"
                            placeholder="Rate the food on a scale of 1-5"
                          />

                          <MyTextInput
                            label="Review"
                            name="review"
                            type="text"
                            placeholder="Write a review"
                          />

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn bg4 text-light btn-dark shadow"
                            >
                              Add
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Formik>
              </div>
            </div>
          </div>
        </div>
        {rating &&
          rating.data.map((r) => {
            return (
              <div key={r.id}>
                <ul
                  className="list-group mt-3 mx-auto"
                  style={{
                    maxWidth: `50%`,
                  }}
                >
                  <li className="bg1 list-group-item d-flex justify-content-between align-items-start food-card shadow">
                    <img
                      src={r.user.profilePicture}
                      className="img-fluid"
                      style={{
                        borderRadius: `50%`,
                        width: `70px`,
                        height: `70px`,
                        border: `2px solid #ea345a `,
                        background: `white`
                      }}
                      alt={r.user.name}
                    />
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{r.user.name}</div>
                      {r.review}
                    </div>
                    <span className="badge bg-dark  border rounded-pill">
                      <i
                        className="fa-solid fa-star m-1"
                        style={{ color: `green` }}
                      ></i>
                      {r.rating}
                    </span>
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Rating;
