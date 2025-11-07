import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const UserFilter = ({ onChange }) => {
  const [q, setQ] = useState('');
  const [role, setRole] = useState('all');
  const [status, setStatus] = useState('all');
  const [sortBy, setSortBy] = useState('username');

  const emit = () => {
    onChange({ q, role, status, sortBy });
  };

  const handleClear = () => {
    setQ('');
    setRole('all');
    setStatus('all');
    setSortBy('username');
    onChange({ q: '', role: 'all', status: 'all', sortBy: 'username' });
  };

  return (
    <Form className="mb-3">
      <Row className="g-2 align-items-center">
        <Col xs={12} md={4}>
          <Form.Control
            placeholder="Search username or full name"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onBlur={emit}
            onKeyDown={(e) => e.key === 'Enter' && emit()}
          />
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={role} onChange={(e) => { setRole(e.target.value); }} onBlur={emit}>
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={status} onChange={(e) => { setStatus(e.target.value); }} onBlur={emit}>
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
            <option value="locked">Locked</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2}>
          <Form.Select value={sortBy} onChange={(e) => { setSortBy(e.target.value); emit(); }}>
            <option value="username">Sort: Username</option>
            <option value="role">Sort: Role</option>
            <option value="status">Sort: Status</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={2} className="d-flex gap-2">
          <Button variant="primary" onClick={emit}>Apply</Button>
          <Button variant="secondary" onClick={handleClear}>Clear</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserFilter;
