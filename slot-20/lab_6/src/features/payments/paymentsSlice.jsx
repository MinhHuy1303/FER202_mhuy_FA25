import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      // Simulate insufficient funds before creating the payment
      if (paymentData.amount > 1000000) {
        return rejectWithValue("Tài khoản không đủ tiền");
      }

      // Add a default success status for payments within limit
      // Determine next sequential numeric id based on existing payments
      let nextId = 1;
      try {
        const listRes = await fetch("http://localhost:3001/payments");
        if (listRes && listRes.ok) {
          const list = await listRes.json();
          const numericIds = list
            .map((p) => {
              const n = Number(p.id);
              return Number.isFinite(n) ? n : null;
            })
            .filter((n) => n != null);
          if (numericIds.length > 0) {
            nextId = Math.max(...numericIds) + 1;
          }
        }
      } catch (err) {
        // If we fail to get list for any reason, fall back to timestamp-based id
        nextId = Date.now();
      }

      const payload = { ...paymentData, status: "SUCCESS", id: String(nextId) };

      const res = await fetch("http://localhost:3001/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Không thể tạo thanh toán");

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPayments = createAsyncThunk("payments/fetchPayments", async () => {
  try {
    const res = await fetch("http://localhost:3001/payments");
    if (!res.ok) throw new Error("Không thể tải danh sách thanh toán");
    const data = await res.json();
    return data;
  } catch (error) {
    // Let the thunk reject so extraReducers can handle it
    throw error;
  }
});

const paymentsSlice = createSlice({
  name: "payments",
  initialState: { payments: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => { state.isLoading = true; })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.payments.push(action.payload);
      });
  },
});

export default paymentsSlice.reducer;
