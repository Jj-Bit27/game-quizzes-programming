import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/authContext.jsx";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const data = { email, password };
      signin(data);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Bienvenido de Nuevo</h2>
        <p className="text-slate-400">
          Inicia sesión en tu cuenta de QuizMaster
        </p>
      </div>
      {loginErrors.map((error, i) => (
        <p className="text-sm text-red-500 mt-2" key={i}>
          {error}
        </p>
      ))}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-400 mb-1"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.email ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="tu@ejemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-400"
            >
              Contraseña
            </label>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.password ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}
