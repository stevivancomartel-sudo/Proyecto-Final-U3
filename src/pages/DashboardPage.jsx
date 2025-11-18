import React from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthForm from "../components/AuthForm";
import Dashboard from "../components/Dashboard";

const DashboardPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
        <div className="text-center">
          {/* Loader rosadito */}
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-pink-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-pink-700 font-medium text-lg">
            Cargando Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-10">
      {/* Si hay usuario -> Dashboard. Si no -> formulario de login */}
      {user ? (
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-pink-200">
          <Dashboard />
        </div>
      ) : (
        <div className="w-full max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 sm:p-10 border border-pink-200">
          <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
            Bienvenida a Kitty Code 💖
          </h2>
          <p className="text-center text-pink-500 mb-6">
            Inicia sesión para acceder a tu panel
          </p>
          <AuthForm />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
