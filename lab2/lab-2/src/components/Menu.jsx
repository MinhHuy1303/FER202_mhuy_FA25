import React from "react";

export default function Menu() {
  const pizzas = [
    { name: "Margherita Pizza", price: 20, oldPrice: 40, img: "option1.png", tag: "SALE" },
    { name: "Mushroom Pizza", price: 25, img: "option2.png" },
    { name: "Hawaiian Pizza", price: 10, img: "option3.png", tag: "NEW" },
    { name: "Pesto Pizza", price: 30, oldPrice: 60, img: "option4.png", tag: "SALE" }, // 👈 ảnh dọc
  ];

  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Our Menu</h2>
        <div className="row">
          {pizzas.map((pizza, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 position-relative">
                {pizza.tag && (
                  <span
                    className="badge bg-warning text-dark position-absolute"
                    style={{ top: "10px", left: "10px" }}
                  >
                    {pizza.tag}
                  </span>
                )}
                <img
                  src={pizza.img}
                  className="card-img-top"
                  alt={pizza.name}
                  style={{ height: "200px", objectFit: "cover" }} // 👈 đồng bộ ảnh ngang
                />
                <div className="card-body text-dark">
                  <h5 className="card-title">{pizza.name}</h5>
                  {pizza.oldPrice ? (
                    <p>
                      <span className="text-decoration-line-through me-2">
                        ${pizza.oldPrice}
                      </span>
                      <span className="text-danger fw-bold">${pizza.price}</span>
                    </p>
                  ) : (
                    <p>${pizza.price}</p>
                  )}
                  <button className="btn btn-dark w-100">Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
