import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default function FavouriteToast({ show, onClose, movieTitle }) {
  return (
    <ToastContainer 
      position="top-end" 
      className="p-3" 
      style={{ 
        zIndex: 10000,
        position: 'fixed',
        top: '20px',
        right: '20px'
      }}
    >
      <Toast 
        show={show} 
        onClose={onClose} 
        autohide 
        delay={3000}
        style={{
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          color: '#155724'
        }}
      >
        <Toast.Header 
          style={{
            backgroundColor: '#d1ecf1',
            borderBottomColor: '#bee5eb'
          }}
        >
          <strong className="me-auto text-success">✓ Success!</strong>
        </Toast.Header>
        <Toast.Body className="fw-bold">
          "{movieTitle}" has been added to favourites!
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}