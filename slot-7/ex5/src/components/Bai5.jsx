import React from "react";

export function Bai5() {
  return (
    <div>
      {/* Header */}
      <header className="bg-warning p-2">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2021/10/Logo-Dai-hoc-FPT.png"
              alt="FPT Logo"
              style={{ maxHeight: "50px" }}
            />
            {/* Navigation Menu */}
            <nav className="ms-4">
  <a href="#home" className="ms-3 fw-bold text-dark text-decoration-none">
    <i className="bi bi-house-door-fill me-1"></i> Trang chủ
  </a>
  <a href="#majors" className="ms-3 fw-bold text-dark text-decoration-none">
    <i className="bi bi-journal-bookmark-fill me-1"></i> Ngành học
  </a>
  <a href="#admission" className="ms-3 fw-bold text-dark text-decoration-none">
    <i className="bi bi-person-check-fill me-1"></i> Tuyển sinh
  </a>
  <a href="#students" className="ms-3 fw-bold text-dark text-decoration-none">
    <i className="bi bi-people-fill me-1"></i> Sinh viên
  </a>
</nav>
          </div>
          <div>
            <input type="text" placeholder="Search" className="form-control" />
          </div>
        </div>
      </header>

      {/* Banner */}
      <div>
        <img
          src="https://cafefcdn.com/203337114487263232/2024/6/17/dai-hoc-fpt-1-1659081213-910x607-17186174834081817111070.jpg"
          alt="Students"
          className="img-fluid w-100"
        />
      </div>

      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-warning">
        <ol className="breadcrumb container py-2 mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Students
          </li>
        </ol>
      </nav>

      {/* Students Detail */}
      <div className="container my-4" id="students">
        <h3 className="text-center mb-4">Students Detail</h3>
        <div className="row g-4">
          {/* Student Card 1 */}
          <div className="col-md-6">
            <div className="card text-center">
              <img
                src="https://fap.fpt.edu.vn/temp/ImageRollNumber/DN/c8444a59-a537-4b91-9357-b01a3b23ddf3.jpg"
                className="card-img-top"
                alt="Student"
              />
              <div className="card-body">
                <h5 className="card-title">Nguyễn Hồ Quốc Oánh</h5>
                <p className="card-text">DE160162</p>
                <div>
                  <label className="me-2">
                    <input type="radio" name="student1" /> Absent
                  </label>
                  <label>
                    <input type="radio" name="student1" /> Present
                  </label>
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
              </div>
            </div>
          </div>

          {/* Student Card 2 */}
          <div className="col-md-6">
            <div className="card text-center">
              <img
                src="https://fap.fpt.edu.vn/temp/ImageRollNumber/DN/f1fc5d17-392d-4f91-9544-8028f9653d88.jpg"
                className="card-img-top"
                alt="Student"
              />
              <div className="card-body">
                <h5 className="card-title">Choy Vinh Thinh</h5>
                <p className="card-text">DE160377</p>
                <div>
                  <label className="me-2">
                    <input type="radio" name="student2" /> Absent
                  </label>
                  <label>
                    <input type="radio" name="student2" /> Present
                  </label>
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
              </div>
            </div>
          </div>

          {/* Student Card 3 */}
          <div className="col-md-6">
            <div className="card text-center">
              <img
                src="https://fap.fpt.edu.vn/temp/ImageRollNumber/DN/e9edb451-901b-4d53-bd30-c92c6fd36a3f.jpg"
                className="card-img-top"
                alt="Student"
              />
              <div className="card-body">
                <h5 className="card-title">Đỗ Nguyên Phúc</h5>
                <p className="card-text">DE160547</p>
                <div>
                  <label className="me-2">
                    <input type="radio" name="student3" /> Absent
                  </label>
                  <label>
                    <input type="radio" name="student3" /> Present
                  </label>
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
              </div>
            </div>
          </div>

          {/* Student Card 4 */}
          <div className="col-md-6">
            <div className="card text-center">
              <img
                src="https://fap.fpt.edu.vn/temp/ImageRollNumber/DN/d5593137-5636-4862-8fcf-e39f5a458691.jpg"
                className="card-img-top"
                alt="Student"
              />
              <div className="card-body">
                <h5 className="card-title">Lê Hoàng Minh</h5>
                <p className="card-text">DE170049</p>
                <div>
                  <label className="me-2">
                    <input type="radio" name="student4" /> Absent
                  </label>
                  <label>
                    <input type="radio" name="student4" /> Present
                  </label>
                </div>
                <button className="btn btn-warning mt-2">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-warning p-4 mt-4">
        <div className="container">
          <div className="row">
            {/* Address */}
            <div className="col-md-6">
              <h6>Our Address</h6>
              <p>
                Khu Giáo dục và Đào tạo – Khu CNC Hòa Lạc
                <br /> Km29 Đại lộ Thăng Long, Thạch Thất, Hà Nội
              </p>
              <p>📞 Phone: 0123 456 789</p>
              <p>📧 Email: info@fpt.edu.vn</p>
            </div>

            {/* Social + Copyright */}
            <div className="col-md-6 text-end">
              <div className="mb-2">
                <i className="bi bi-google mx-1"></i>
                <i className="bi bi-facebook mx-1"></i>
                <i className="bi bi-linkedin mx-1"></i>
                <i className="bi bi-envelope mx-1"></i>
              </div>
              <small>© Copyright 2023</small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bai5;
