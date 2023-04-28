import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  let message = "Something Went Wrong";
  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }
  return (
    <>
      <h1>An Error Occured...</h1>
      <p>{message}</p>
    </>
  );
};

export default ErrorPage;
