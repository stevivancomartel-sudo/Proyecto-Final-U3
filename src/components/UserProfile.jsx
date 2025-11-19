import React from "react";
import { useAuth } from "../contexts/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>No hay usuario.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Perfil</h2>

      <p><strong>Nombre:</strong> {user.displayName || "Sin nombre"}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <p className="mt-4 text-sm text-gray-500">
        Información básica del usuario actual.
      </p>
    </div>
  );
};

export default UserProfile;
