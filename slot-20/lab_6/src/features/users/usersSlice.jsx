import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🧠 Gọi API lấy danh sách người dùng từ db.json
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // json-server in this project runs on port 3001 (see package.json "server" entry)
      const res = await fetch("http://localhost:3001/users");
      if (!res.ok) throw new Error("Không thể tải danh sách người dùng");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Persist user changes (toggle admin) to the backend
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, isAdmin }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin }),
      });

      if (!res.ok) throw new Error("Không thể cập nhật người dùng");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], isLoading: false, error: null },
  reducers: {
    toggleAdminStatus: (state, action) => {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) user.isAdmin = !user.isAdmin;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // handle updateUser lifecycle
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleAdminStatus } = usersSlice.actions;
export default usersSlice.reducer;
