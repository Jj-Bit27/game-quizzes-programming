import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/authContext.jsx";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const value = { name, email, password };
      await signup(value);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Crea Tu Cuenta</h2>
        <p className="text-slate-400">
          ¡Únete a miles de jugadores de quizzes!
        </p>
      </div>
      {registerErrors && (
        <p className="text-sm text-red-500 mt-2">{registerErrors}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Nombre Completo
          </label>
          <input
            type="text"
            name={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.name ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Nombre Completo"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Correo Electronico
          </label>
          <input
            type="text"
            name={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.email ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Correo Electronico"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            name={password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.password ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            name={confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-2 bg-slate-800 border ${
              errors.confirmPassword ? "border-red-500" : "border-slate-700"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            placeholder="Confirmar Contraseña"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all"
        >
          Crear Cuenta
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
