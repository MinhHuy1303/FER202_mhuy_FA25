import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, toggleAdminStatus, updateUser } from "../features/users/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <p>Đang tải danh sách...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>👤 Danh sách người dùng</h2>
      <ul>
        {list.map((user) => (
          <li key={user.id}>
            {user.name} — {user.isAdmin ? "Admin" : "User"}{" "}
            <button
              onClick={() => dispatch(updateUser({ id: user.id, isAdmin: !user.isAdmin }))}
              disabled={isLoading}
            >
              Toggle Admin
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
