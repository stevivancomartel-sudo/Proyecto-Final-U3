import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

const SkillsManager = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [habilidades, setHabilidades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    nivel: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const colRef = collection(db, "skills");
    const unsubscribe = onSnapshot(
      colRef,
      (snap) => {
        const docs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          habilidades: d.data().habilidades || [],
        }));
        docs.sort((a, b) => (a.categoria || "").localeCompare(b.categoria || ""));
        setCategorias(docs);
        setLoading(false);

        if (!selectedCatId && docs.length > 0) {
          setSelectedCatId((prev) => prev ?? docs[0].id);
        }
      },
      (err) => {
        console.error("Error escuchando skills:", err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const cat = categorias.find((c) => c.id === selectedCatId);
    setHabilidades(cat?.habilidades || []);
  }, [selectedCatId, categorias]);

  const handleSelectCategoria = (id) => {
    setSelectedCatId(id);
    setShowForm(false);
    setEditingIndex(null);
    setFormData({ nombre: "", nivel: "", descripcion: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ nombre: "", nivel: "", descripcion: "" });
    setEditingIndex(null);
    setShowForm(false);
  };

  const handleAddOrUpdateSkill = async (e) => {
    e.preventDefault();
    if (!selectedCatId) return alert("Selecciona una categoría primero.");
    if (!formData.nombre.trim()) return alert("Nombre de la habilidad es requerido.");

    const nuevaHabilidades = [...habilidades];

    if (editingIndex !== null) {
      nuevaHabilidades[editingIndex] = { ...formData };
    } else {
      nuevaHabilidades.push({ ...formData });
    }

    try {
      await setDoc(
        doc(db, "skills", selectedCatId),
        { habilidades: nuevaHabilidades },
        { merge: true }
      );
      resetForm();
    } catch (err) {
      console.error("Error guardando habilidad:", err);
      alert("Ocurrió un error al guardar la habilidad.");
    }
  };

  const handleEdit = (index) => {
    const h = habilidades[index];
    setFormData({ ...h });
    setEditingIndex(index);
    setShowForm(true);
  };

const handleDelete = async (index) => {
  if (!selectedCatId) return;

  // Reemplazo de window.confirm con un modal simple de alerta de Kitty Code
  const confirmed = await new Promise((resolve) => {
    const modal = document.createElement("div");
    modal.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
        z-index: 9999;
      ">
        <div style="
          background: white; padding: 2rem; border-radius: 12px; text-align: center;
          max-width: 300px; width: 100%;
        ">
          <h2 style="color: #ec4899; font-weight: bold; margin-bottom: 1rem;">Kitty Code 🐾</h2>
          <p style="margin-bottom: 1.5rem;">¿Estás segura de eliminar esta habilidad?</p>
          <button id="confirmYes" style="
            background: #f87171; color: white; padding: 0.5rem 1rem; margin-right: 0.5rem; border-radius: 8px;
          ">Eliminar</button>
          <button id="confirmNo" style="
            background: #d1d5db; color: #374151; padding: 0.5rem 1rem; border-radius: 8px;
          ">Cancelar</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#confirmYes").onclick = () => {
      resolve(true);
      document.body.removeChild(modal);
    };
    modal.querySelector("#confirmNo").onclick = () => {
      resolve(false);
      document.body.removeChild(modal);
    };
  });

  if (!confirmed) return;

  // Procede a eliminar
  try {
    const nuevas = habilidades.filter((_, i) => i !== index);
    await setDoc(
      doc(db, "skills", selectedCatId),
      { habilidades: nuevas },
      { merge: true }
    );
  } catch (err) {
    console.error("Error eliminando habilidad:", err);
    alert("No se pudo eliminar la habilidad.");
  }
};



  const handleCreateCategoria = async () => {
    const nombre = window.prompt("Nombre de la nueva categoría:");
    if (!nombre) return;

    try {
      const id = `${nombre.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`;
      await setDoc(doc(db, "skills", id), {
        categoria: nombre.trim(),
        habilidades: [],
      });
      setSelectedCatId(id);
    } catch (err) {
      console.error("Error creando categoría:", err);
      alert("No se pudo crear la categoría.");
    }
  };

  const handleDeleteCategoria = async (catId) => {
    if (!window.confirm("¿Eliminar categoría y todas sus habilidades?")) return;
    try {
      await deleteDoc(doc(db, "skills", catId));
      if (catId === selectedCatId) {
        setSelectedCatId(null);
        setHabilidades([]);
      }
    } catch (err) {
      console.error("Error borrando categoría:", err);
      alert("No se pudo eliminar la categoría.");
    }
  };

  return (
    <motion.div
      {...fadeIn}
      className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          {...fadeIn}
          className="text-2xl font-bold text-pink-600"
        >
          🛠️ Gestión de Habilidades
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleCreateCategoria}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-md font-medium"
        >
          Nueva Categoría
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* CATEGORÍAS */}
        <motion.div
          {...fadeIn}
          className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm"
        >
          <h3 className="font-semibold mb-3">Categorías</h3>

          {loading ? (
            <p className="text-sm text-gray-500">Cargando...</p>
          ) : categorias.length === 0 ? (
            <p className="text-sm text-gray-500">Aún no hay categorías.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {categorias.map((cat) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                    selectedCatId === cat.id
                      ? "bg-pink-50 border border-pink-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    onClick={() => handleSelectCategoria(cat.id)}
                    className="flex-1"
                  >
                    <p className="font-medium text-sm text-gray-800">
                      {cat.categoria}
                    </p>
                    <p className="text-xs text-gray-500">
                      {cat.habilidades.length} habilidades
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      if (window.confirm("¿Eliminar categoría?")) {
                        handleDeleteCategoria(cat.id);
                      }
                    }}
                    className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-50"
                  >
                    Eliminar
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* PANEL DE HABILIDADES */}
        <div>
          <motion.div
            {...fadeIn}
            className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm mb-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {categorias.find((c) => c.id === selectedCatId)?.categoria ||
                    "Sin categoría seleccionada"}
                </h3>
                <p className="text-sm text-gray-500">
                  Administra las habilidades de la categoría seleccionada.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={() => {
                  setShowForm(true);
                  setEditingIndex(null);
                  setFormData({ nombre: "", nivel: "", descripcion: "" });
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md text-sm"
              >
                + Agregar Habilidad
              </motion.button>
            </div>

            {/* FORMULARIO */}
            {showForm && (
              <motion.form
                {...fadeIn}
                onSubmit={handleAddOrUpdateSkill}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre de la habilidad"
                  className="p-2 rounded border border-pink-200"
                  required
                />

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  placeholder="Nivel"
                  className="p-2 rounded border border-pink-200"
                />

                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción breve"
                  className="p-2 rounded border border-pink-200"
                />

                <div className="md:col-span-3 flex gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="flex-1 bg-pink-500 text-white py-2 rounded"
                  >
                    {editingIndex !== null ? "Actualizar" : "Agregar"}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 text-black py-2 rounded"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>

          {/* LISTA DE HABILIDADES */}
          <div className="space-y-4">
            {habilidades.length === 0 ? (
              <motion.div
                {...fadeIn}
                className="bg-white p-6 rounded-xl border border-pink-100 text-center text-sm text-gray-500"
              >
                No hay habilidades en esta categoría.
              </motion.div>
            ) : (
              habilidades.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}
                  className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm flex justify-between"
                >
                  <div>
                    <p className="font-semibold text-pink-600">{h.nombre}</p>
                    <p className="text-xs text-gray-500">{h.descripcion}</p>
                    <p className="text-xs text-gray-700 mt-1">Nivel: {h.nivel}</p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(i)}
                      className="px-3 py-1 bg-yellow-400 rounded text-sm"
                    >
                      Editar
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDelete(i)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Eliminar
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsManager;
