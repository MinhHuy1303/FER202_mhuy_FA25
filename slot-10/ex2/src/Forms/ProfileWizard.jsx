import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ProgressBar,
  Nav,
} from "react-bootstrap";
import {
  faUser,
  faLock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfileWizard.css";

export default function ProfileWizard() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    avatar: null,
    // Step 2
    username: "",
    password: "",
    confirmPassword: "",
    question: "",
    answer: "",
    // Step 3
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [validated, setValidated] = useState(false);

  const progress = (step / totalSteps) * 100;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      setStep(step + 1);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
    } else {
      setValidated(false);
      alert("✅ Form submitted successfully!\n" + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <Container className="p-4 mt-4 shadow rounded bg-white profile-wizard">
      <h4 className="fw-bold mb-3">
        <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
        Build Your Profile
      </h4>

      <ProgressBar now={progress} className="mb-4" label={`${Math.round(progress)}%`} />

      <Nav variant="tabs" activeKey={step} className="mb-4">
        <Nav.Item><Nav.Link eventKey={1} disabled={step < 1}>About</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey={2} disabled={step < 2}>Account</Nav.Link></Nav.Item>
        <Nav.Item><Nav.Link eventKey={3} disabled={step < 3}>Address</Nav.Link></Nav.Item>
      </Nav>

      <Form
        noValidate
        validated={validated}
        onSubmit={step === totalSteps ? handleSubmit : handleNext}
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h5 className="text-primary mb-3">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              About Information
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                required
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">First name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                required
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Last name is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Phone is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Age *</Form.Label>
              <Form.Control
                required
                type="number"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Age is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar</Form.Label>
              <Form.Control type="file" name="avatar" onChange={handleChange} />
            </Form.Group>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h5 className="text-primary mb-3">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Account Information
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>Username *</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password *</Form.Label>
              <Form.Control
                required
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Confirm password is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Secret Question *</Form.Label>
              <Form.Select
                required
                name="question"
                value={formData.question}
                onChange={handleChange}
              >
                <option value="">Select a question</option>
                <option>What is your first pet's name?</option>
                <option>Where were you born?</option>
                <option>What is your favorite color?</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Question is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Answer *</Form.Label>
              <Form.Control
                required
                type="text"
                name="answer"
                placeholder="Enter your answer"
                value={formData.answer}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Answer is required</Form.Control.Feedback>
            </Form.Group>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h5 className="text-primary mb-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              Address Information
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>Street *</Form.Label>
              <Form.Control
                required
                type="text"
                name="street"
                placeholder="Enter your street"
                value={formData.street}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Street is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City *</Form.Label>
              <Form.Control
                required
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">City is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>State *</Form.Label>
              <Form.Control
                required
                type="text"
                name="state"
                placeholder="Enter your state"
                value={formData.state}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">State is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zip Code *</Form.Label>
              <Form.Control
                required
                type="text"
                name="zip"
                placeholder="Enter your zip code"
                value={formData.zip}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Zip code is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Country *</Form.Label>
              <Form.Select
                required
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select a country</option>
                <option>Vietnam</option>
                <option>USA</option>
                <option>Japan</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Country is required</Form.Control.Feedback>
            </Form.Group>
          </>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          {step > 1 && (
            <Button variant="secondary" onClick={handlePrev}>
              Previous
            </Button>
          )}
          <Button
            type="submit"
            variant={step === totalSteps ? "success" : "primary"}
          >
            {step === totalSteps ? "Finish" : "Next"}
          </Button>
        </div>
      </Form>
    </Container>
  );
}
