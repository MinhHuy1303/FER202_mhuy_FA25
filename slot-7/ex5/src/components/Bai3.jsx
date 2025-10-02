import React from "react";

export function Bai3() {
  return (
    <div>
      {/* Header */}
      <div className="p-3 mb-2 bg-light">
        <h3>Let's test the grid!</h3>
      </div>

      {/* Navigation links */}
      <ul className="nav mb-3">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Active
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">
            Disabled
          </a>
        </li>
      </ul>

      {/* Grid system */}
      <div className="container">
        {/* Row 1 */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white border p-3">First col</div>
          <div className="col bg-secondary text-white border p-3">Second col</div>
        </div>

        {/* Row 2 */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white border p-3">col</div>
          <div className="col bg-secondary text-white border p-3">col</div>
          <div className="col bg-secondary text-white border p-3">col</div>
        </div>

        {/* Row 3 */}
        <div className="row mb-2">
          <div className="col bg-secondary text-white border p-3">col</div>
          <div className="col bg-secondary text-white border p-3">col</div>
          <div className="col bg-secondary text-white border p-3">col</div>
          <div className="col bg-secondary text-white border p-3">col</div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 mt-3 bg-danger bg-opacity-25 text-black text-center fs-4">
        Created by ABC!
      </div>
    </div>
  );
}

export default Bai3;
