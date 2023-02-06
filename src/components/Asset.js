import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner }) => {
  return (
    <div className={`p-4`}>{spinner && <Spinner animation="border" />}</div>
  );
};

export default Asset;
