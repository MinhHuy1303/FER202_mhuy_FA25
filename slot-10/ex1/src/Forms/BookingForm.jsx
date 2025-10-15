import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./BookingForm.css";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    from: "Hà Nội",
    to: "Hà Nội",
    direction: "Đi",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thông tin đặt vé:\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="booking-form-container p-4 shadow rounded bg-white">
      <h3 className="mb-4 fw-bold text-dark">Form đặt vé máy bay</h3>

      <Form onSubmit={handleSubmit}>
        {/* Họ tên */}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Phải nhập 5 ký tự, in hoa..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Địa chỉ */}
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Đi từ - Đến */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="from">
              <Form.Label>Đi từ</Form.Label>
              <Form.Select
                name="from"
                value={formData.from}
                onChange={handleChange}
              >
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>TP. Hồ Chí Minh</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="to">
              <Form.Label>Đến</Form.Label>
              <Form.Select
                name="to"
                value={formData.to}
                onChange={handleChange}
              >
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
                <option>TP. Hồ Chí Minh</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Chọn chiều đi */}
        <Form.Group className="mb-3">
          <Form.Label>Chọn chiều đi (Khứ hồi)</Form.Label>
          <div>
            <Form.Check
              inline
              label="Đi"
              name="direction"
              type="radio"
              value="Đi"
              checked={formData.direction === "Đi"}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Về"
              name="direction"
              type="radio"
              value="Về"
              checked={formData.direction === "Về"}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        {/* Nút đặt vé */}
        <Button type="submit" className="w-100 btn-primary">
          Đặt vé
        </Button>
      </Form>
    </div>
  );
}
