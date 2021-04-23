import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center w-100">
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
