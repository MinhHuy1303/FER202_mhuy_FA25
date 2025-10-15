import React, { useState } from 'react';

function RegisterForm() {
  // State cho form data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // State cho errors
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State cho toast và modal
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Validation functions
  const validateUsername = (username) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername.length < 3) {
      return 'Username phải có ít nhất 3 ký tự';
    }
    if (trimmedUsername !== username) {
      return 'Username không được có khoảng trắng ở đầu hoặc cuối';
    }
    if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
      return 'Username chỉ được chứa chữ cái, số, dấu gạch dưới (_) hoặc dấu chấm (.)';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Email không đúng định dạng';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password phải có ít nhất 8 ký tự';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password phải có ít nhất 1 chữ cái viết hoa';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password phải có ít nhất 1 chữ cái viết thường';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password phải có ít nhất 1 chữ số';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password phải có ít nhất 1 ký tự đặc biệt';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      return 'Confirm password không khớp với password';
    }
    return '';
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error khi user bắt đầu sửa
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Validate username
    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;

    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validate confirm password
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    return newErrors;
  };

  // Check if form is valid
  const isFormValid = () => {
    const currentErrors = validateForm();
    return Object.keys(currentErrors).length === 0 && 
           formData.username.trim() && 
           formData.email.trim() && 
           formData.password.trim() && 
           formData.confirmPassword.trim();
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      
      // Lưu dữ liệu đã submit
      setSubmittedData({
        username: formData.username,
        email: formData.email,
        submittedAt: new Date().toLocaleString('vi-VN')
      });
      
      // Show toast
      setShowToast(true);
      
      // Show modal sau 1 giây
      setTimeout(() => {
        setShowModal(true);
      }, 1000);
      
      // Tự động ẩn toast sau 3 giây
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setShowToast(false);
    setShowModal(false);
    setSubmittedData(null);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form khi đóng modal
    handleCancel();
  };

  // Get password strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return { level: 'Weak', color: '#ff4444', width: '33%' };
    if (strength <= 3) return { level: 'Medium', color: '#ffaa00', width: '66%' };
    return { level: 'Strong', color: '#00aa00', width: '100%' };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      padding: '30px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
        fontSize: '28px'
      }}>
        📝 Đăng ký tài khoản
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Username Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 'bold',
            color: '#333'
          }}>
            Username *
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Nhập username (ít nhất 3 ký tự)"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.username ? '#ff4444' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
          />
          {errors.username && (
            <p style={{ color: '#ff4444', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.username}
            </p>
          )}
          
          {/* Username Requirements */}
          <div style={{ marginTop: 6, fontSize: '12px', color: '#666' }}>
            <p style={{ margin: '2px 0' }}>Username phải có:</p>
            <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
              <li style={{ 
                color: formData.username.trim().length >= 3 ? '#00aa00' : '#999',
                fontWeight: formData.username.trim().length >= 3 ? 'bold' : 'normal'
              }}>
                Ít nhất 3 ký tự
              </li>
              <li style={{ 
                color: /^[a-zA-Z0-9_.]+$/.test(formData.username) && formData.username ? '#00aa00' : '#999',
                fontWeight: /^[a-zA-Z0-9_.]+$/.test(formData.username) && formData.username ? 'bold' : 'normal'
              }}>
                Chỉ chữ cái, số, _ hoặc .
              </li>
              <li style={{ 
                color: formData.username.trim() === formData.username && formData.username ? '#00aa00' : '#999',
                fontWeight: formData.username.trim() === formData.username && formData.username ? 'bold' : 'normal'
              }}>
                Không khoảng trắng đầu/cuối
              </li>
            </ul>
          </div>
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 'bold',
            color: '#333'
          }}>
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email của bạn"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.email ? '#ff4444' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
          />
          {errors.email && (
            <p style={{ color: '#ff4444', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div style={{ marginBottom: 20 }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 'bold',
            color: '#333'
          }}>
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Nhập password (ít nhất 8 ký tự)"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.password ? '#ff4444' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
          />
          
          {/* Password Strength Indicator */}
          {formData.password && passwordStrength && (
            <div style={{ marginTop: 8 }}>
              <div style={{
                width: '100%',
                height: 4,
                backgroundColor: '#f0f0f0',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <div style={{
                  width: passwordStrength.width,
                  height: '100%',
                  backgroundColor: passwordStrength.color,
                  transition: 'all 0.3s'
                }}></div>
              </div>
              <p style={{
                fontSize: '12px',
                color: passwordStrength.color,
                margin: '4px 0 0 0',
                fontWeight: 'bold'
              }}>
                Độ mạnh: {passwordStrength.level}
              </p>
            </div>
          )}
          
          {errors.password && (
            <p style={{ color: '#ff4444', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.password}
            </p>
          )}
          
          {/* Password Requirements */}
          <div style={{ marginTop: 8, fontSize: '12px', color: '#666' }}>
            <p style={{ margin: '2px 0' }}>Password phải có:</p>
            <ul style={{ margin: '4px 0', paddingLeft: 16 }}>
              <li style={{ color: formData.password.length >= 8 ? '#00aa00' : '#999' }}>
                Ít nhất 8 ký tự
              </li>
              <li style={{ color: /[A-Z]/.test(formData.password) ? '#00aa00' : '#999' }}>
                Có chữ hoa
              </li>
              <li style={{ color: /[a-z]/.test(formData.password) ? '#00aa00' : '#999' }}>
                Có chữ thường
              </li>
              <li style={{ color: /[0-9]/.test(formData.password) ? '#00aa00' : '#999' }}>
                Có chữ số
              </li>
              <li style={{ color: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? '#00aa00' : '#999' }}>
                Có ký tự đặc biệt
              </li>
            </ul>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div style={{ marginBottom: 30 }}>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 'bold',
            color: '#333'
          }}>
            Confirm Password *
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Nhập lại password"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: `2px solid ${errors.confirmPassword ? '#ff4444' : '#ddd'}`,
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.3s'
            }}
          />
          {errors.confirmPassword && (
            <p style={{ color: '#ff4444', fontSize: '14px', margin: '5px 0 0 0' }}>
              {errors.confirmPassword}
            </p>
          )}
          {formData.confirmPassword && formData.password === formData.confirmPassword && (
            <p style={{ color: '#00aa00', fontSize: '14px', margin: '5px 0 0 0' }}>
              ✓ Password khớp
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            style={{
              flex: 1,
              padding: '14px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            ❌ Cancel
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            style={{
              flex: 2,
              padding: '14px',
              backgroundColor: isFormValid() ? '#28a745' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.3s',
              opacity: isFormValid() ? 1 : 0.6
            }}
            onMouseOver={(e) => {
              if (isFormValid()) {
                e.target.style.backgroundColor = '#218838';
              }
            }}
            onMouseOut={(e) => {
              if (isFormValid()) {
                e.target.style.backgroundColor = '#28a745';
              }
            }}
          >
            🚀 Submit
          </button>
        </div>
      </form>

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#28a745',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: '20px' }}>✅</span>
          <span style={{ fontWeight: 'bold' }}>Submitted successfully!</span>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '0',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              color: 'white',
              padding: '24px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: '24px' }}>Đăng ký thành công!</h2>
            </div>

            {/* Card Content */}
            <div style={{
              padding: '32px',
              background: '#f8f9fa'
            }}>
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  color: '#333',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontSize: '18px'
                }}>
                  Thông tin tài khoản
                </h3>

                {submittedData && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: '#e3f2fd',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px solid #90caf9'
                    }}>
                      <strong style={{ color: '#1976d2' }}>Username:</strong>
                      <span style={{ color: '#333', fontWeight: '600' }}>
                        {submittedData.username}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: '#f3e5f5',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      border: '1px solid #ce93d8'
                    }}>
                      <strong style={{ color: '#7b1fa2' }}>Email:</strong>
                      <span style={{ color: '#333', fontWeight: '600' }}>
                        {submittedData.email}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      background: '#e8f5e8',
                      borderRadius: '8px',
                      border: '1px solid #a5d6a7'
                    }}>
                      <strong style={{ color: '#388e3c' }}>Thời gian:</strong>
                      <span style={{ color: '#333', fontWeight: '600' }}>
                        {submittedData.submittedAt}
                      </span>
                    </div>
                  </div>
                )}

                <div style={{
                  textAlign: 'center',
                  color: '#666',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  marginBottom: '20px'
                }}>
                  Tài khoản đã được tạo thành công và sẵn sàng sử dụng!
                </div>

                <button
                  onClick={handleCloseModal}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Đóng và tạo tài khoản mới
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default RegisterForm;