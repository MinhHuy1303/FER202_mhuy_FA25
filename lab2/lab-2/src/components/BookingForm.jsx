import React from "react";

export default function BookingForm() {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Book Your Table</h2>
      <form>
        <div className="row mb-3">
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Your Name *" required />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Your Email *" required />
          </div>
          <div className="col-md-4">
            <select className="form-control" required>
              <option>Select a Service</option>
              <option>Dine In</option>
              <option>Take Away</option>
              <option>Delivery</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <textarea className="form-control" rows="4" placeholder="Please write your comment"></textarea>
        </div>
        <button className="btn btn-warning text-white">Send Message</button>
      </form>
    </div>
  );
}
