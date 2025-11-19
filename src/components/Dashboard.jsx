// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { user, userRole, isAdmin } = useAuth();

  const [counts, setCounts] = useState({
    cursos: 0,
    estudiantes: 0,
    comentarios: 0,
  });

  const [loading, setLoading] = useState(true);

  // Animación de tarjetas
  const cardVariant = {
    hidden: { opacity: 0, y: 8 },
    show: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.08 * i },
    }),
  };

  // Obtener datos de Firebase
  useEffect(() => {
    async function fetchCounts() {
      try {
        const cursosSnap = await getDocs(collection(db, "cursos"));
        const usuariosSnap = await getDocs(collection(db, "usuarios"));
        const comentariosSnap = await getDocs(collection(db, "comentarios"));

        setCounts({
          cursos: cursosSnap.size,
          estudiantes: usuariosSnap.size,
          comentarios: comentariosSnap.size,
        });
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ENCABEZADO ESTILO CÓDIGO ROSA */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* LOGO */}
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center mr-3 shadow">
                <span className="text-white text-2xl">🐾</span>
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900">Kitty Code Panel</h1>
                <p className="text-sm text-gray-500">
                  Administración del sistema educativo
                </p>
              </div>
            </div>

            {/* DATOS DEL USUARIO */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName || user?.email}
                </p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Tarjetas de estadísticas */}
        <motion.section
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <motion.div
            variants={cardVariant}
            custom={1}
            className="bg-white rounded-2xl p-6 shadow border border-pink-100"
          >
            <p className="text-sm text-pink-500 font-semibold">Cursos</p>
            <p className="text-3xl font-extrabold mt-3">
              {loading ? "..." : counts.cursos}
            </p>
            <p className="text-xs text-gray-500 mt-2">Cursos publicados</p>
          </motion.div>

          <motion.div
            variants={cardVariant}
            custom={2}
            className="bg-white rounded-2xl p-6 shadow border border-pink-100"
          >
            <p className="text-sm text-pink-500 font-semibold">Estudiantes</p>
            <p className="text-3xl font-extrabold mt-3">
              {loading ? "..." : counts.estudiantes}
            </p>
            <p className="text-xs text-gray-500 mt-2">Usuarios registrados</p>
          </motion.div>

          <motion.div
            variants={cardVariant}
            custom={3}
            className="bg-white rounded-2xl p-6 shadow border border-pink-100"
          >
            <p className="text-sm text-pink-500 font-semibold">Comentarios</p>
            <p className="text-3xl font-extrabold mt-3">
              {loading ? "..." : counts.comentarios}
            </p>
            <p className="text-xs text-gray-500 mt-2">Interacciones recientes</p>
          </motion.div>
        </motion.section>

        {/* Actividad y Acciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividad */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl p-6 shadow border border-pink-100"
          >
            <h3 className="text-lg font-bold text-pink-700 mb-3">
              Actividad reciente
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>🎓 Nuevos estudiantes se registraron en Kitty Code.</li>
              <li>💬 Comentarios añadidos en tus cursos.</li>
              <li>📚 Se actualizó contenido en la plataforma.</li>
            </ul>
          </motion.div>

          {/* Acciones */}
          <motion.aside
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow border border-pink-100"
          >
            <h4 className="text-md font-bold text-pink-700 mb-3">Acciones</h4>

            {isAdmin ? (
              <button className="w-full py-2 rounded-md bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold mb-3">
                🛠 Panel administrativo
              </button>
            ) : (
              <p className="text-sm text-gray-500 mb-3">
                Acceso limitado — rol de equipo
              </p>
            )}

            <a
              href="/"
              className="block text-center py-2 rounded-md border border-pink-200 text-pink-600 font-medium"
            >
              Ver sitio público
            </a>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
