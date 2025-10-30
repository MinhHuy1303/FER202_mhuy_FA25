import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MovieProvider } from "./contexts/MovieContext";
import MovieManager from "./pages/MovieManager";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <MovieProvider>
                  <MovieManager />
                </MovieProvider>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
