import React from "react";

export default function Hero() {
  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicators (chấm tròn nhỏ) */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="4"></button>
      </div>

      {/* Ảnh trong carousel */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="banner.png" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} alt="Pizza Banner" />
          <div className="carousel-caption d-none d-md-block">
            <h2>Neapolitan Pizza</h2>
            <p>If you are looking for traditional Italian pizza, the Neapolitan is the best option!</p>
          </div>
        </div>

        <div className="carousel-item">
          <img src="banner1.png" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} alt="Pizza 1" />
        </div>

        <div className="carousel-item">
          <img src="banner2.png" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} alt="Pizza 2" />
        </div>

        <div className="carousel-item">
          <img src="banner3.png" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} alt="Pizza 3" />
        </div>

        <div className="carousel-item">
          <img src="banner4.png" className="d-block w-100" style={{ height: "400px", objectFit: "cover" }} alt="Pizza 4" />
        </div>
      </div>

      {/* Nút mũi tên trái phải */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
}
