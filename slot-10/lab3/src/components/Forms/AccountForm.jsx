import React from 'react';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Lock, Person } from 'react-bootstrap-icons';

export default function AccountForm({ formData, errors, touched, onChange }) {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Lock className="me-2" size={24} />
        <h4 className="mb-0">Account Security</h4>
      </div>

      <Form>
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Username <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Person />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username || ''}
                  onChange={(e) => onChange('username', e.target.value)}
                  isInvalid={errors.username && touched.username}
                />
                {errors.username && touched.username && (
                  <Form.Control.Feedback type="invalid">
                    Username is required and must be at least 3 characters
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Lock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password || ''}
                  onChange={(e) => onChange('password', e.target.value)}
                  isInvalid={errors.password && touched.password}
                />
                {errors.password && touched.password && (
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters long
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Lock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword || ''}
                  onChange={(e) => onChange('confirmPassword', e.target.value)}
                  isInvalid={errors.confirmPassword && touched.confirmPassword}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Form.Control.Feedback type="invalid">
                    Passwords do not match
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Security Question <span className="text-danger">*</span></Form.Label>
              <Form.Select 
                value={formData.secretQuestion || ''}
                onChange={(e) => onChange('secretQuestion', e.target.value)}
                isInvalid={errors.secretQuestion && touched.secretQuestion}
              >
                <option value="">Choose a security question...</option>
                <option value="pet">What was the name of your first pet?</option>
                <option value="school">What was the name of your elementary school?</option>
                <option value="mother">What is your mother's maiden name?</option>
                <option value="city">In what city were you born?</option>
                <option value="friend">What was the name of your best friend in childhood?</option>
              </Form.Select>
              {errors.secretQuestion && touched.secretQuestion && (
                <Form.Control.Feedback type="invalid">
                  Please select a security question
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Answer <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your answer"
                value={formData.answer || ''}
                onChange={(e) => onChange('answer', e.target.value)}
                isInvalid={errors.answer && touched.answer}
              />
              {errors.answer && touched.answer && (
                <Form.Control.Feedback type="invalid">
                  Answer is required
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}