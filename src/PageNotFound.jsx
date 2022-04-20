import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page 404</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default PageNotFound;
