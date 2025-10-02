import React from "react";

function Bai2() {
  return (
    <div>
      {/* Header */}
      <div className="p-3 mb-4 bg-light text-center">
        <h3>My First Bootstrap Page</h3>
      </div>

      {/* 3 images in a row */}
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
              alt="HTML5"
              className="img-fluid"
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div className="col">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
              alt="CSS3"
              className="img-fluid"
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div className="col">
            <img
              src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png"
              alt="Bootstrap"
              className="img-fluid"
              style={{ maxHeight: "200px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bai2;
