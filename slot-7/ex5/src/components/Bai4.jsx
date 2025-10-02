import React from "react";  

export function Bai4() {
  return (
    <div>
      {/* Header with Logo */}
      <div className="bg-warning text-center p-3">
        <img
          src="https://i.pinimg.com/736x/e2/6f/21/e26f21bb42a8278e6b2890d43364591c.jpg"
          alt="FPT University"
          style={{ maxHeight: "80px" }}
        />
      </div>

      {/* Navigation */}
      <nav className="text-center bg-warning">
        <a href="#home" className="mx-2 text-dark text-decoration-none">
          Home
        </a>
        <a href="#about" className="mx-2 text-dark text-decoration-none">
          About
        </a>
        <a href="#contact" className="mx-2 text-dark text-decoration-none">
          Contact
        </a>
      </nav>

      {/* Content */}
      <div className="container text-center my-5">
        <section id="about" className="mb-5">
          <h4 className="fw-bold">About</h4>
          <p>This is the about section of the website.</p>
        </section>

        <section id="contact">
          <h4 className="fw-bold">Contact</h4>
          <p>
            For any inquiries, please contact us at{" "}
            <a href="mailto:example@example.com">example@example.com</a>.
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer
  className="text-center p-3"
  style={{ backgroundColor: "rgba(255,193,7,0.6)", color: "white" }}
>
  <small>© 2023 Website. All rights reserved.</small>
</footer>
    </div>
  );
}

export default Bai4;
