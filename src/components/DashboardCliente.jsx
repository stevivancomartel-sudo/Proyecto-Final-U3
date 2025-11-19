import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useCourses } from "../hooks/useCourses";  // Hook que ya tienes para traer testimonios
import {
  createCourse,
  updateCourse,
  deleteCourseById,
} from "../services/courseService";
import { FaHeart, FaBookOpen, FaPlusCircle, FaFilter } from "react-icons/fa";

export default function Dashboard() {
  const { user } = useAuth();

  // FORM DATA
  const [autor, setAutor] = useState("");
  const [testimonio, setTestimonio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tipo, setTipo] = useState("Corto");
  const [editingId, setEditingId] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  // FETCH DATA
  const { cursos: testimonios, loadingCursos } = useCourses(user?.uid);

  // RESET FORM
  const resetForm = () => {
    setAutor("");
    setTestimonio("");
    setCategoria("");
    setTipo("Corto");
    setEditingId(null);
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!autor.trim() || !testimonio.trim() || !categoria.trim()) {
      alert("Todos los campos son obligatorios 🌸");
      return;
    }

    try {
      if (editingId) {
        await updateCourse(editingId, {
          nombre: autor,
          descripcion: testimonio,
          precio: categoria,
          nivel: tipo,
        });
      } else {
        await createCourse(user.uid, {
          nombre: autor,
          descripcion: testimonio,
          precio: categoria,
          nivel: tipo,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar testimonio:", error);
      alert("Ocurrió un error al guardar el testimonio 💔");
    }
  };

  // EDIT HANDLER
  const handleEdit = (t) => {
    setAutor(t.nombre);
    setTestimonio(t.descripcion);
    setCategoria(t.precio);
    setTipo(t.nivel);
    setEditingId(t.id);
  };

  // DELETE HANDLER
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "¿Seguro que deseas eliminar este testimonio? 🐾"
    );
    if (!confirmDelete) return;

    try {
      await deleteCourseById(id);
    } catch (error) {
      console.error("Error al eliminar testimonio:", error);
      alert("Ocurrió un error al eliminar el testimonio 💔");
    }
  };

  // FILTERED DATA
  const testimoniosFiltrados =
    filtroTipo === "Todos"
      ? testimonios
      : testimonios.filter((t) => t.nivel === filtroTipo);

  return (
    <div className="min-h-screen bg-pink-50 py-16">
      {/* HEADER */}
      <section className="bg-pink-300 text-white py-20 text-center shadow-md">
        <h1 className="text-4xl font-bold mb-4">🎀 Kitty Code Testimonials</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Administra los testimonios que dan magia, confianza y encanto a tu marca ✨
        </p>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 mt-12">
        
        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-8 hover:-translate-y-2 hover:scale-105 transition-all">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
            {editingId ? "🌷 Editar testimonio" : "💖 Nuevo testimonio"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* AUTOR */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Autor del testimonio *
              </label>
              <input
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-pink-300"
                placeholder="Ej. Ana Pérez"
              />
            </div>

            {/* TESTIMONIO */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Testimonio *
              </label>
              <textarea
                value={testimonio}
                onChange={(e) => setTestimonio(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-pink-300 resize-none"
                placeholder="Escribe aquí el testimonio..."
              ></textarea>
            </div>

            {/* CATEGORÍA */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categoría (Clienta, Estudiante…) *
              </label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-pink-300"
                placeholder="Ej. Estudiante"
              />
            </div>

            {/* TIPO */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de testimonio *
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-pink-300"
              >
                <option value="Corto">Corto</option>
                <option value="Medio">Medio</option>
                <option value="Largo">Largo</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all flex justify-center items-center gap-2"
              >
                <FaPlusCircle />
                {editingId ? "Actualizar testimonio" : "Guardar testimonio"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-white border border-pink-200 text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-all"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LISTADO */}
        <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-8 hover:-translate-y-2 hover:scale-105 transition-all">
          <h2 className="text-2xl font-semibold text-pink-600 mb-3 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
            📚 Mis testimonios
          </h2>

          {/* FILTRO */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-pink-500 flex items-center gap-2">
              <FaFilter />
              Filtrar por tipo
            </div>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-pink-300 text-sm"
            >
              <option value="Todos">Todos</option>
              <option value="Corto">Corto</option>
              <option value="Medio">Medio</option>
              <option value="Largo">Largo</option>
            </select>
          </div>

          {/* LISTA */}
          {loadingCursos ? (
            <p className="text-gray-500 text-center mt-6">Cargando testimonios… ⏳</p>
          ) : testimoniosFiltrados.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">Aún no tienes testimonios registrados 🌸</p>
          ) : (
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {testimoniosFiltrados.map((t) => (
                <div
                  key={t.id}
                  className="border border-pink-100 bg-pink-50 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-pink-700 flex items-center gap-2">
                        <FaBookOpen /> {t.nombre}
                      </h3>

                      <p className="text-sm text-gray-600">{t.descripcion}</p>

                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs">
                          Tipo: {t.nivel}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs">
                          Categoría: {t.precio}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(t)}
                        className="px-3 py-2 bg-pink-300 text-pink-900 rounded-lg text-sm font-semibold hover:bg-pink-400"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="px-3 py-2 bg-rose-500 text-white rounded-lg text-sm font-semibold hover:bg-rose-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-pink-500 mt-12">
        <FaHeart className="inline mr-1" /> Hecho con amor por{" "}
        <span className="font-semibold text-pink-600">Kitty Code</span>
      </footer>
    </div>
  );
}
