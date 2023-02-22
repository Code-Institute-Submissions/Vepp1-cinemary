import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner, message }) => {
  return (
    <div className={`p-4`}>
      {spinner && <Spinner animation="border" />}
      {message && <h2 className="mt-4">No Results Found!</h2>}
    </div>
  );
};

export default Asset;
