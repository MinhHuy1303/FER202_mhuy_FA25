import React, { useState } from 'react';
import { Table, Button, ButtonGroup, Modal } from 'react-bootstrap';
import { FaEye, FaBan } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const UserTable = ({ users, onBan, onView }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [detailUser, setDetailUser] = useState(null);

  const handleView = (u) => {
    setDetailUser(u);
    setShowDetails(true);
    onView && onView(u);
  };

  const handleClose = () => {
    setShowDetails(false);
    setDetailUser(null);
  };

  const { user: currentUser } = useAuth();

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Full name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td className="text-center">
                <img
                  src={u.avatar || 'https://via.placeholder.com/40?text=U'}
                  alt={u.username}
                  width={40}
                  height={40}
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40?text=U'; }}
                />
              </td>
              <td>{u.username}</td>
              <td>{u.fullName || '-'}</td>
              <td>{u.role || '-'}</td>
              <td>{u.status || '-'}</td>
              <td>
                <ButtonGroup size="sm">
                  <Button variant="primary" onClick={() => handleView(u)} title="View Details">
                    <FaEye className="me-1" /> View
                  </Button>
                  {/* Disable Ban for the logged-in admin (cannot ban self) */}
                  <Button
                    variant="danger"
                    onClick={() => onBan(u)}
                    title={currentUser?.id === u.id ? "Cannot ban your own account" : "Ban Account"}
                    disabled={currentUser?.id === u.id}
                  >
                    <FaBan className="me-1" /> Ban
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showDetails} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailUser ? (
            <div className="text-center">
              <img
                src={detailUser.avatar || 'https://via.placeholder.com/100?text=U'}
                alt={detailUser.username}
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '50%', marginBottom: 12 }}
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/100?text=U'; }}
              />
              <div className="text-start">
                <p><strong>ID:</strong> {detailUser.id}</p>
                <p><strong>Username:</strong> {detailUser.username}</p>
                <p><strong>Full name:</strong> {detailUser.fullName || '-'}</p>
                <p><strong>Role:</strong> {detailUser.role || '-'}</p>
                <p><strong>Status:</strong> {detailUser.status || '-'}</p>
              </div>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserTable;
