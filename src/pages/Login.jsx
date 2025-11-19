// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { login, register, resetPassword, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
        navigate("/dashboard");
      } else if (mode === "register") {
        await register({
          email: form.email,
          password: form.password,
          displayName: form.displayName,
        });
        navigate("/dashboard");
      } else if (mode === "reset") {
        await resetPassword(form.email);
        alert("Se ha enviado un correo para restablecer tu contraseña.");
      }
    } catch (err) {
      console.error(err);
      let msg = "Ocurrió un error. Verifica tus datos.";

      if (err.code === "auth/user-not-found") {
        msg = "No existe una cuenta con ese correo.";
      } else if (err.code === "auth/wrong-password") {
        msg = "Contraseña incorrecta.";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "Este correo ya está registrado.";
      } else if (err.code === "auth/invalid-email") {
        msg = "El correo no es válido.";
      } else if (err.code === "auth/weak-password") {
        msg = "La contraseña es demasiado débil.";
      }

      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión con Google.");
    } finally {
      setSubmitting(false);
    }
  };

  console.log("LOGIN SE ESTÁ RENDERIZANDO");

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-md border border-slate-100 p-6">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Acceso a panel administrativo
        </h1>
        <p className="text-xs text-slate-500 mb-4">
          Inicia sesión para gestionar los cursos del catálogo público.
        </p>

        <div className="flex gap-2 mb-6 text-xs">
          <button
            className={`flex-1 py-2 rounded-full border text-center ${
              mode === "login"
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setMode("login")}
          >
            Entrar
          </button>
          <button
            className={`flex-1 py-2 rounded-full border text-center ${
              mode === "register"
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setMode("register")}
          >
            Crear cuenta
          </button>
          <button
            className={`flex-1 py-2 rounded-full border text-center ${
              mode === "reset"
                ? "bg-slate-900 text-white border-slate-900"
                : "border-slate-300 text-slate-600"
            }`}
            onClick={() => setMode("reset")}
          >
            Recuperar
          </button>
        </div>

        {error && (
          <p className="mb-4 text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Nombre
              </label>
              <input
                name="displayName"
                value={form.displayName}
                onChange={onChange}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Correo
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {mode !== "reset" && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
                required
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting
              ? "Procesando…"
              : mode === "login"
              ? "Entrar"
              : mode === "register"
              ? "Crear cuenta"
              : "Enviar enlace de recuperación"}
          </button>
        </form>

        <button
          type="button"
          disabled={submitting}
          onClick={handleGoogleLogin}
          className="w-full py-2.5 rounded-md border border-slate-300 mt-4 flex items-center justify-center gap-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt=""
          />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}
