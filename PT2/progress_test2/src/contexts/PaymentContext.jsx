//PaymentContext.jsx quản lý thanh toán bằng Context API và useReducer
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import * as api from '../services/api';
import { useAuth } from './AuthContext';

// 1. Tạo Context
const PaymentContext = createContext();

// 2. Khai báo Trạng thái khởi tạo Initial State
const initialPaymentState = {
    payments: [],
    filteredPayments: [],
    isLoading: false,
    error: null,
    filters: {
        search: '',
        semester: '',
        course: '',
    },
        sortBy: 'none',
    // 'none' means preserve DB order
    // available values: 'none', 'course_asc', 'course_desc', 'date_asc', 'date_desc', 'amount_asc', 'amount_desc'
    totalAmount: 0,
};

// 3. Tạo hàm reducer để quản lý các hành động liên quan đến payments
const paymentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return { 
                ...state, 
                isLoading: false, 
                payments: action.payload,
                error: null,
            };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, error: action.payload };
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.field]: action.value,
                },
            };
        case 'SET_SORT':
            return { ...state, sortBy: action.value };
        case 'APPLY_FILTERS_AND_SORT':
            // Logic filter và sort sẽ được áp dụng ở đây
            return { ...state, filteredPayments: action.payload.filtered, totalAmount: action.payload.total };
        case 'ADD_PAYMENT':
            return {
                ...state,
                payments: [...state.payments, action.payload],
            };
        case 'UPDATE_PAYMENT':
            return {
                ...state,
                payments: state.payments.map(p => 
                    p.id === action.payload.id ? action.payload : p
                ),
            };
        case 'DELETE_PAYMENT':
            return {
                ...state,
                payments: state.payments.filter(p => p.id !== action.payload),
            };
        default:
            return state;
    }
};

// Helper function để filter và sort payments
const applyFiltersAndSort = (payments, filters, sortBy) => {
    // Start with all payments (do not filter by user)
    let filtered = Array.isArray(payments) ? [...payments] : [];

    // Lọc theo search (semester hoặc course name)
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(payment =>
            payment.semester.toLowerCase().includes(searchLower) ||
            payment.courseName.toLowerCase().includes(searchLower)
        );
    }

    // Lọc theo semester
    if (filters.semester) {
        filtered = filtered.filter(payment => payment.semester === filters.semester);
    }

    // Lọc theo course
    if (filters.course) {
        filtered = filtered.filter(payment => payment.courseName === filters.course);
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
            if (sortBy === 'none') {
                // preserve DB order (do not sort)
                return 0;
            }
            switch (sortBy) {
                case 'course_asc':
                    return a.courseName.localeCompare(b.courseName);
                case 'course_desc':
                    return b.courseName.localeCompare(a.courseName);
                case 'date_asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date_desc':
                    return new Date(b.date) - new Date(a.date);
                case 'amount_asc':
                    return a.amount - b.amount;
                case 'amount_desc':
                    return b.amount - a.amount;
                default:
                    return 0;
            }
    });

    // Tính total amount
    const total = filtered.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);

    return { filtered, total };
};

// 4. Tạo PaymentProvider để cung cấp Context cho các component con
export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initialPaymentState);
    const { user } = useAuth();

    // Lấy payments từ API
    const fetchPayments = async () => {
        dispatch({ type: 'FETCH_START' });
        try {
            const payments = await api.getPayments();
            dispatch({ type: 'FETCH_SUCCESS', payload: payments });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE', payload: error.message });
        }
    };

    // Fetch payments on mount (show all payments regardless of logged-in user)
    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Áp dụng filters và sort khi payments, filters, hoặc sortBy thay đổi
    useEffect(() => {
        if (state.payments.length > 0) {
            const result = applyFiltersAndSort(state.payments, state.filters, state.sortBy);
            dispatch({ type: 'APPLY_FILTERS_AND_SORT', payload: result });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.payments, state.filters, state.sortBy]);

    // Add payment
    const addPayment = async (payment) => {
        try {
            // Tính toán ID tuần tự: chọn số nguyên dương nhỏ nhất chưa được sử dụng
            const existingIds = state.payments.map(p => Number(p.id)).filter(n => !Number.isNaN(n));
            const idSet = new Set(existingIds);
            let nextId = 1;
            while (idSet.has(nextId)) nextId += 1;

            const payload = {
                ...payment,
                userId: user?.id,
                id: nextId,
            };

            const newPayment = await api.addPayment(payload);
            dispatch({ type: 'ADD_PAYMENT', payload: newPayment });
            return { success: true, payment: newPayment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Update payment
    const updatePayment = async (id, payment) => {
        try {
            const updatedPayment = await api.updatePayment(id, payment);
            dispatch({ type: 'UPDATE_PAYMENT', payload: updatedPayment });
            return { success: true, payment: updatedPayment };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Delete payment
    const deletePayment = async (id) => {
        try {
            await api.deletePayment(id);
            dispatch({ type: 'DELETE_PAYMENT', payload: id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Set filter
    const setFilter = (field, value) => {
        dispatch({ type: 'SET_FILTER', field, value });
    };

    // Set sort
    const setSort = (sortBy) => {
        dispatch({ type: 'SET_SORT', value: sortBy });
    };

    // Get unique semesters và courses từ payments
    const getUniqueSemesters = () => {
        const semesters = state.payments.map(p => p.semester);
        return [...new Set(semesters)].sort();
    };

    const getUniqueCourses = () => {
        const courses = state.payments.map(p => p.courseName);
        return [...new Set(courses)].sort();
    };

    const contextValue = {
        // State
        payments: state.filteredPayments,
        allPayments: state.payments,
        isLoading: state.isLoading,
        error: state.error,
        filters: state.filters,
        sortBy: state.sortBy,
        totalAmount: state.totalAmount,

        // Actions
        fetchPayments,
        addPayment,
        updatePayment,
        deletePayment,
        setFilter,
        setSort,
        getUniqueSemesters,
        getUniqueCourses,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );
};

// 5. Tạo custom hook để sử dụng PaymentContext dễ dàng hơn
export const usePayment = () => {
    const context = useContext(PaymentContext);
    if (!context) {
        throw new Error('usePayment must be used within PaymentProvider');
    }
    return context;
};
