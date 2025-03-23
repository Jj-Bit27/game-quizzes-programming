import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white flex flex-col">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-10 bg-cover bg-center pointer-events-none"></div>

      <main className="flex-1 flex items-center justify-center relative z-10 px-4 py-12">
        <RegisterForm />
      </main>

      <footer className="py-6 border-t border-slate-800 relative z-10">
        <div className="container mx-auto px-4">
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} QuizMaster. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
