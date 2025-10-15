import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

export default function AboutForm({ formData, errors, touched, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <PersonCircle className="me-2" size={24} />
        <h4 className="mb-0">About Information</h4>
      </div>

      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={formData.firstName || ''}
                onChange={(e) => onChange('firstName', e.target.value)}
                isInvalid={errors.firstName && touched.firstName}
              />
              {errors.firstName && touched.firstName && (
                <Form.Control.Feedback type="invalid">
                  First name is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={formData.lastName || ''}
                onChange={(e) => onChange('lastName', e.target.value)}
                isInvalid={errors.lastName && touched.lastName}
              />
              {errors.lastName && touched.lastName && (
                <Form.Control.Feedback type="invalid">
                  Last name is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email || ''}
                onChange={(e) => onChange('email', e.target.value)}
                isInvalid={errors.email && touched.email}
              />
              {errors.email && touched.email && (
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone || ''}
                onChange={(e) => onChange('phone', e.target.value)}
                isInvalid={errors.phone && touched.phone}
              />
              {errors.phone && touched.phone && (
                <Form.Control.Feedback type="invalid">
                  Phone number is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Age <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                min="18"
                max="120"
                value={formData.age || ''}
                onChange={(e) => onChange('age', e.target.value)}
                isInvalid={errors.age && touched.age}
              />
              {errors.age && touched.age && (
                <Form.Control.Feedback type="invalid">
                  Age must be between 18 and 120
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
              />
              <Form.Text className="text-muted">
                Optional: Upload your profile picture
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}