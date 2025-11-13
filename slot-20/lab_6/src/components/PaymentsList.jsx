import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, fetchPayments } from "../features/payments/paymentsSlice";
import { selectSuccessfulPayments } from "../features/payments/selectors";

export default function PaymentsList() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const { isLoading, error } = useSelector((state) => state.payments);
  const successfulPayments = useSelector(selectSuccessfulPayments);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    dispatch(createPayment({ amount: Number(amount) }));
    setAmount("");
  };

  return (
    <div>
      <h2>💳 Quản lý Thanh toán</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          placeholder="Nhập số tiền"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Tạo thanh toán"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>✅ Thanh toán thành công:</h3>
      <ul>
        {successfulPayments.map((p) => (
          <li key={p.id}>ID: {p.id} — {p.amount}đ</li>
        ))}
      </ul>
    </div>
  );
}
