// Tạo 1 ToastCoponent dùng chung cho LoginForm và SignUpForm hiện ở giữa khi scroll lên trên cùng
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function ToastComponent({ show, message, handleClose }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={handleClose}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
// Make the ToastContainer fixed to the viewport so it stays visible while scrolling
if (typeof window !== 'undefined') {
    const STYLE_ID = 'toast-fixed-style';
    if (!document.getElementById(STYLE_ID)) {
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.innerHTML = `
            .toast-container {
                position: fixed !important;
                top: 1rem !important;
                right: 1rem !important;
                left: auto !important;
                z-index: 9999 !important;
                pointer-events: none;
            }
            .toast-container .toast {
                pointer-events: auto;
            }
        `;
        document.head.appendChild(style);
    }
}
export default ToastComponent;
