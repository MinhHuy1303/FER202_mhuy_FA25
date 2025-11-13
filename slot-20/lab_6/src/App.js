import React from "react";
import UsersList from "./components/UsersList";
import PaymentsList from "./components/PaymentsList";

export default function App() {
  return (
    <div style={{ margin: "20px" }}>
      <h1>Redux Toolkit Demo 💫</h1>
      <UsersList />
      <hr />
      <PaymentsList />
    </div>
  );
}
