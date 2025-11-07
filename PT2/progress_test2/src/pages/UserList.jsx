import React, { useEffect, useState } from 'react';
import { Card, Spinner, Alert } from 'react-bootstrap';
import * as api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import UserFilter from '../components/UserFilter';
import UserTable from '../components/UserTable';
import ConfirmModal from '../components/ConfirmModal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState({ show: false, user: null });
  const { user: currentUser } = useAuth();

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data || []);
      setFiltered(data || []);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleFilterChange = ({ q, role, status, sortBy }) => {
    let list = [...users];
    if (q && q.trim()) {
      const qq = q.trim().toLowerCase();
      list = list.filter((u) => (u.username || '').toLowerCase().includes(qq) || (u.fullName || '').toLowerCase().includes(qq));
    }
    if (role && role !== 'all') {
      list = list.filter((u) => u.role === role);
    }
    if (status && status !== 'all') {
      list = list.filter((u) => u.status === status);
    }
    if (sortBy) {
      list.sort((a, b) => {
        const A = (a[sortBy] || '').toString().toLowerCase();
        const B = (b[sortBy] || '').toString().toLowerCase();
        if (A < B) return -1;
        if (A > B) return 1;
        return 0;
      });
    }
    setFiltered(list);
  };

  const handleView = (user) => {
    // No-op (UserTable shows modal)
  };

  const handleBanRequest = (user) => {
    // Prevent admin from banning their own account
    if (currentUser && currentUser.id === user.id) {
      setError('You cannot ban your own account.');
      // clear error after a short timeout
      setTimeout(() => setError(null), 3000);
      return;
    }
    setConfirm({ show: true, user });
  };

  const handleConfirmBan = async () => {
    const u = confirm.user;
    if (!u) return;
    try {
      // mark banned
      const updated = { ...u, status: 'banned' };
      await api.updateUser(u.id, updated);
      // update local state
      const newUsers = users.map((it) => (it.id === u.id ? updated : it));
      setUsers(newUsers);
      setFiltered((prev) => prev.map((it) => (it.id === u.id ? updated : it)));
    } catch (err) {
      setError('Failed to ban user');
    } finally {
      setConfirm({ show: false, user: null });
    }
  };

  const handleCancelBan = () => setConfirm({ show: false, user: null });

  if (loading) {
    return (
      <Card className="mb-4 shadow-sm">
        <Card.Body className="text-center">
          <Spinner animation="border" role="status" className="me-2" /> Loading users...
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">User Management</Card.Header>
      <Card.Body>
        <UserFilter onChange={handleFilterChange} />
        <UserTable users={filtered} onView={handleView} onBan={handleBanRequest} />

        <ConfirmModal
          show={confirm.show}
          title="Confirm Ban"
          message={`Are you sure you want to ban account "${confirm.user?.username}"?`}
          onConfirm={handleConfirmBan}
          onHide={handleCancelBan}
        />
      </Card.Body>
    </Card>
  );
};

export default UserList;
