// src/services/auth.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

/**
 * Registra un usuario con email+password y añade displayName si viene
 */
export async function signUpWithEmail(email, password, displayName) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    try {
      await updateProfile(cred.user, { displayName });
    } catch (e) {
      console.warn("No se pudo actualizar displayName:", e);
    }
  }
  return cred;
}

/** Inicia sesión con email/password */
export async function signInWithEmail(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

/** Inicia sesión con Google (popup) */
export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

/** Cerrar sesión */
export async function logoutUser() {
  return await signOut(auth);
}

/** Listener simple (no es obligatorio usarlo, pero lo exporto por si lo necesitas) */
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}
