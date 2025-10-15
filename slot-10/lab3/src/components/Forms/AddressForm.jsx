import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { GeoAlt } from 'react-bootstrap-icons';

export default function AddressForm({ formData, errors, touched, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <GeoAlt className="me-2" size={24} />
        <h4 className="mb-0">Address Information</h4>
      </div>

      <Form>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Street Address <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your street address"
                value={formData.street || ''}
                onChange={(e) => onChange('street', e.target.value)}
                isInvalid={errors.street && touched.street}
              />
              {errors.street && touched.street && (
                <Form.Control.Feedback type="invalid">
                  Street address is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={formData.city || ''}
                onChange={(e) => onChange('city', e.target.value)}
                isInvalid={errors.city && touched.city}
              />
              {errors.city && touched.city && (
                <Form.Control.Feedback type="invalid">
                  City is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your zip code"
                value={formData.zipCode || ''}
                onChange={(e) => onChange('zipCode', e.target.value)}
                isInvalid={errors.zipCode && touched.zipCode}
              />
              {errors.zipCode && touched.zipCode && (
                <Form.Control.Feedback type="invalid">
                  Zip code is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Country <span className="text-danger">*</span></Form.Label>
              <Form.Select 
                value={formData.country || ''}
                onChange={(e) => onChange('country', e.target.value)}
                isInvalid={errors.country && touched.country}
              >
                <option value="">Select your country...</option>
                <option value="US">United States</option>
                <option value="VN">Vietnam</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="KR">South Korea</option>
                <option value="SG">Singapore</option>
                <option value="TH">Thailand</option>
                <option value="MY">Malaysia</option>
              </Form.Select>
              {errors.country && touched.country && (
                <Form.Control.Feedback type="invalid">
                  Please select a country
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}