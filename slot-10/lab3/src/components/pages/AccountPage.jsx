import React, { useState } from 'react';
import { Container, Card, ProgressBar, Button, Nav, Row, Col } from 'react-bootstrap';
import { PersonCircle, Lock, GeoAlt } from 'react-bootstrap-icons';
import AboutForm from '../Forms/AboutForm';
import AccountForm from '../Forms/AccountForm';
import AddressForm from '../Forms/AddressForm';
import './AccountPage.css';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    // About form data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    // Account form data
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: '',
    // Address form data
    street: '',
    city: '',
    zipCode: '',
    country: ''
  });
  
  const [errors, setErrors] = useState({
    // About form errors
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    age: false,
    // Account form errors
    username: false,
    password: false,
    confirmPassword: false,
    secretQuestion: false,
    answer: false,
    // Address form errors
    street: false,
    city: false,
    zipCode: false,
    country: false
  });

  const [touched, setTouched] = useState({
    // Track which fields have been interacted with
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    age: false,
    username: false,
    password: false,
    confirmPassword: false,
    secretQuestion: false,
    answer: false,
    street: false,
    city: false,
    zipCode: false,
    country: false
  });

  const tabs = [
    {
      key: 'about',
      title: 'About',
      icon: PersonCircle,
      component: AboutForm
    },
    {
      key: 'account',
      title: 'Account',
      icon: Lock,
      component: AccountForm
    },
    {
      key: 'address',
      title: 'Address',
      icon: GeoAlt,
      component: AddressForm
    }
  ];

  const getProgressPercentage = () => {
    switch (activeTab) {
      case 0: return 33;
      case 1: return 67;
      case 2: return 100;
      default: return 33;
    }
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    
    // Real-time validation for touched fields
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let isValid = true;
    
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'answer':
      case 'street':
      case 'city':
      case 'zipCode':
        isValid = value.trim() !== '';
        break;
      case 'email':
        isValid = value.trim() !== '' && /\S+@\S+\.\S+/.test(value);
        break;
      case 'age':
        isValid = value && value >= 18 && value <= 120;
        break;
      case 'username':
        isValid = value.trim() !== '' && value.length >= 3;
        break;
      case 'password':
        isValid = value.length >= 8;
        break;
      case 'confirmPassword':
        isValid = value !== '' && value === formData.password;
        break;
      case 'secretQuestion':
      case 'country':
        isValid = value !== '';
        break;
      default:
        isValid = true;
    }
    
    setErrors(prev => ({
      ...prev,
      [field]: !isValid
    }));
  };

  const validateAboutForm = (markAllTouched = false) => {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'age'];
    const newErrors = {
      firstName: !formData.firstName.trim(),
      lastName: !formData.lastName.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      phone: !formData.phone.trim(),
      age: !formData.age || formData.age < 18 || formData.age > 120
    };
    
    if (markAllTouched) {
      const newTouched = {};
      fields.forEach(field => {
        newTouched[field] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error);
  };

  const validateAccountForm = (markAllTouched = false) => {
    const fields = ['username', 'password', 'confirmPassword', 'secretQuestion', 'answer'];
    const newErrors = {
      username: !formData.username.trim() || formData.username.length < 3,
      password: !formData.password || formData.password.length < 8,
      confirmPassword: !formData.confirmPassword || formData.password !== formData.confirmPassword,
      secretQuestion: !formData.secretQuestion,
      answer: !formData.answer.trim()
    };
    
    if (markAllTouched) {
      const newTouched = {};
      fields.forEach(field => {
        newTouched[field] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error);
  };

  const validateAddressForm = (markAllTouched = false) => {
    const fields = ['street', 'city', 'zipCode', 'country'];
    const newErrors = {
      street: !formData.street.trim(),
      city: !formData.city.trim(),
      zipCode: !formData.zipCode.trim(),
      country: !formData.country
    };
    
    if (markAllTouched) {
      const newTouched = {};
      fields.forEach(field => {
        newTouched[field] = true;
      });
      setTouched(prev => ({ ...prev, ...newTouched }));
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).some(error => error);
  };

  const handleNext = () => {
    let isValid = false;
    
    switch (activeTab) {
      case 0:
        isValid = validateAboutForm(true); // Mark all fields as touched
        break;
      case 1:
        isValid = validateAccountForm(true);
        break;
      case 2:
        isValid = validateAddressForm(true);
        break;
      default:
        isValid = false;
    }
    
    if (isValid && activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevious = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleFinish = () => {
    const isValid = validateAddressForm(true); // Mark all fields as touched
    if (isValid) {
      alert('Profile setup completed successfully!');
      console.log('Form data:', formData);
      // Here you would typically submit the form data
    }
  };

  const ActiveFormComponent = tabs[activeTab].component;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <Card className="account-wizard-card">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0 text-center">Build Your Profile</h3>
              <p className="mb-0 text-center opacity-75">Complete your profile in 3 easy steps</p>
            </Card.Header>

            <Card.Body className="p-4">
              {/* Back to Home Button */}
              <div className="mb-3">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => window.location.hash = '#'}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">←</span>
                  Back to Home
                </Button>
              </div>
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">Progress</span>
                  <span className="fw-bold">{getProgressPercentage()}%</span>
                </div>
                <ProgressBar 
                  now={getProgressPercentage()} 
                  variant={activeTab === 2 ? "success" : "primary"}
                  style={{ height: '8px' }}
                />
              </div>

              {/* Tab Navigation */}
              <Nav variant="pills" className="nav-wizard mb-4">
                {tabs.map((tab, index) => {
                  const IconComponent = tab.icon;
                  return (
                    <Nav.Item key={tab.key} className="flex-fill">
                      <Nav.Link
                        active={activeTab === index}
                        disabled={index > activeTab}
                        onClick={() => index <= activeTab && setActiveTab(index)}
                        className={`text-center nav-wizard-link ${
                          index <= activeTab ? '' : 'disabled'
                        }`}
                      >
                        <IconComponent className="d-block mx-auto mb-1" size={24} />
                        {tab.title}
                      </Nav.Link>
                    </Nav.Item>
                  );
                })}
              </Nav>

              {/* Form Content */}
              <div className="form-content">
                <ActiveFormComponent 
                  formData={formData} 
                  errors={errors}
                  touched={touched}
                  onChange={handleFormChange}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={handlePrevious}
                  disabled={activeTab === 0}
                >
                  Previous
                </Button>

                {activeTab < tabs.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={handleFinish}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}