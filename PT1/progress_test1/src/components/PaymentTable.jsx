//PaymentTable.jsx hiển thị danh sách thanh toán và tổng số tiền
import React, { useState } from 'react';
import { Table, Card, Badge, Spinner, Button, ButtonGroup } from 'react-bootstrap';
import { usePayment } from '../contexts/PaymentContext';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PaymentTable = () => {
    // Use allPayments for debugging to show every record from db.json
    const { allPayments, totalAmount, isLoading, deletePayment } = usePayment();
    const payments = allPayments || [];
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Format số tiền
    const formatAmount = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    // Format ngày
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    // Xử lý View Details
    const handleViewDetails = (paymentId) => {
        navigate(`/payment/${paymentId}`);
    };

    // Xử lý Edit
    const handleEdit = (paymentId) => {
        navigate(`/payment/${paymentId}/edit`);
    };

    // Xử lý Delete
    const handleDeleteClick = (payment) => {
        setSelectedPayment(payment);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedPayment) {
            const result = await deletePayment(selectedPayment.id);
            if (result.success) {
                setShowDeleteModal(false);
                setSelectedPayment(null);
            }
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setSelectedPayment(null);
    };

    if (isLoading) {
        return (
            <Card className="mb-4 shadow-sm">
                <Card.Body>
                    <div className="text-center">
                        <Spinner animation="border" role="status" className="me-2" />
                        Loading...
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <>
            <Card className="mb-4 shadow-sm">
                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                    <span>Payment List</span>
                    <Button 
                        variant="success" 
                        size="sm"
                        className="rounded-pill px-3"
                        onClick={() => navigate('/payment/add')}
                    >
                        + Add Payment
                    </Button>
                </Card.Header>
                <Card.Body>
                    {payments.length === 0 ? (
                        <div className="text-center text-muted py-4">
                            No payments found
                        </div>
                    ) : (
                        <>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Semester</th>
                                        <th>Course</th>
                                        <th>Amount</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((payment, index) => (
                                        <tr key={payment.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <Badge bg="info">{payment.semester}</Badge>
                                            </td>
                                            <td>{payment.courseName}</td>
                                            <td className="text-end fw-bold">
                                                {formatAmount(payment.amount)}
                                            </td>
                                            <td>
                                                <ButtonGroup size="sm">
                                                    <Button
                                                        variant="primary"
                                                        className="rounded-pill px-3 me-1"
                                                        onClick={() => handleViewDetails(payment.id)}
                                                        title="View Details"
                                                    >
                                                        <FaEye className="me-1" /> View
                                                    </Button>
                                                    <Button
                                                        variant="warning"
                                                        className="rounded-pill px-3 me-1"
                                                        onClick={() => handleEdit(payment.id)}
                                                        title="Edit"
                                                    >
                                                        <FaEdit className="me-1" /> Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        className="rounded-pill px-3"
                                                        onClick={() => handleDeleteClick(payment)}
                                                        title="Delete"
                                                    >
                                                        <FaTrash className="me-1" /> Delete
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="table-primary">
                                        <td colSpan="3" className="text-end fw-bold">
                                            Total Amount:
                                        </td>
                                        <td className="text-end fw-bold fs-5">
                                            {formatAmount(payments.reduce((s, p) => s + (Number(p.amount) || 0), 0))}
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </>
                    )}
                </Card.Body>
            </Card>

            {/* Delete Confirmation Modal */}
            <ConfirmModal
                show={showDeleteModal}
                title="Confirm Delete"
                message={`Are you sure you want to delete payment for "${selectedPayment?.courseName}"?`}
                onConfirm={handleConfirmDelete}
                onHide={handleCancelDelete}
                confirmText="Delete"
                confirmVariant="danger"
            />
        </>
    );
};

export default PaymentTable;
