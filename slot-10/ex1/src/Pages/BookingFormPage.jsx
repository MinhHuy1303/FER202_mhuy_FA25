import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BookingForm from "../Forms/BookingForm";

export default function BookingFormPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Row>
        <Col>
          <BookingForm />
        </Col>
      </Row>
    </Container>
  );
}
