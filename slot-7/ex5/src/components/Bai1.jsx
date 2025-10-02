import React from "react";

function Bai1() {
  return (
    <div>
      {/* Header */}
      <div className="p-3 mb-2 bg-light">
        <h3>Let's test the grid!</h3>
      </div>

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
      <div className="p-3 mt-3 bg-secondary text-white text-center fs-4">
        Created by ABC!
      </div>
    </div>
  );
}

export default Bai1;
