import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) navigate("/movies");
  };

  return (
    <Container className="mt-5" style={{ maxWidth: 400 }}>
      <h2 className="text-center mb-4">Đăng Nhập Hệ Thống</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control type="text" name="username" value={form.username} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" name="password" value={form.password} onChange={handleChange} required />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Đăng nhập
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
