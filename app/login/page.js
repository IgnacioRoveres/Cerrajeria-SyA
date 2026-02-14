"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, AlertCircle } from "lucide-react"; // Agregué ícono de alerta

export default function LoginPage() {
  const router = useRouter();
  
  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Captcha
  const [captchaVal, setCaptchaVal] = useState(""); // Inicializar como string vacío
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0 });
  const [isHuman, setIsHuman] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaChallenge({ num1, num2 });
    setCaptchaVal("");
    setIsHuman(false);
  };

  const handleCaptchaChange = (e) => {
    const valStr = e.target.value;
    setCaptchaVal(valStr);
    
    const val = parseInt(valStr);
    if (val === captchaChallenge.num1 + captchaChallenge.num2) {
      setIsHuman(true);
      setError("");
    } else {
      setIsHuman(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isHuman) {
      setError("❌ Resolvé la suma primero (Anti-Robots).");
      return;
    }

    setLoading(true);

    // Login
    const res = await signIn("credentials", {
      email: email,       // Enviamos el campo 'email'
      password: password, // Enviamos el campo 'password'
      redirect: false,
    });

    if (res?.error) {
      setError("❌ Datos incorrectos. Revisá mayúsculas.");
      setLoading(false);
      generateCaptcha();
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-syf-dark px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-syf-red/20 text-syf-red border border-syf-red/50 shadow-[0_0_15px_rgba(230,57,70,0.3)]">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Acceso Restringido</h1>
          <p className="text-sm text-gray-400">Panel de Administración SyF</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* USERNAME / EMAIL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-400">Usuario / Email</label>
            <input
              name="email"     // IMPORTANTE para el gestor de contraseñas
              type="text"      // Cambiado a text para permitir usuarios simples
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-white focus:border-syf-red focus:outline-none focus:ring-1 focus:ring-syf-red transition-all"
              placeholder="Ingresá tu usuario..."
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-400">Contraseña</label>
            <input
              name="password"  // IMPORTANTE para el gestor de contraseñas
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-white focus:border-syf-red focus:outline-none focus:ring-1 focus:ring-syf-red transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {/* CAPTCHA */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">¿Cuánto es?</span>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-white select-none">
                {captchaChallenge.num1} + {captchaChallenge.num2} =
              </span>
              <input
                type="number"
                value={captchaVal}
                onChange={handleCaptchaChange}
                className={`w-20 rounded-lg border p-2 text-center font-bold text-black focus:outline-none transition-colors
                  ${isHuman ? "border-green-500 bg-green-100 ring-2 ring-green-500/50" : "border-gray-500 bg-white"}`}
                placeholder="?"
              />
            </div>
            {isHuman && <span className="text-green-500 animate-bounce text-xl">✓</span>}
          </div>

          {/* BOTÓN */}
          <button
            type="submit"
            disabled={loading || !isHuman}
            className="w-full rounded-lg bg-syf-red py-3 font-bold text-white transition-all hover:bg-red-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-syf-red/20"
          >
            {loading ? "Verificando..." : "Ingresar al Sistema"}
          </button>

          {/* ERROR */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center text-sm text-red-400 animate-pulse justify-center">
              <AlertCircle size={16} />
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}