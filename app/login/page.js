"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react"; // Asegurate de tener lucide-react instalado, o usá un svg

export default function LoginPage() {
  const router = useRouter();
  
  // Estados para el formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados para el Captcha
  const [captchaVal, setCaptchaVal] = useState(0); // El input del usuario
  const [captchaChallenge, setCaptchaChallenge] = useState({ num1: 0, num2: 0 }); // Los números a sumar
  const [isHuman, setIsHuman] = useState(false); // ¿Resolvió bien?

  // Generar un desafío matemático nuevo al cargar
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1; // 1 a 10
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaChallenge({ num1, num2 });
    setCaptchaVal("");
    setIsHuman(false);
  };

  const handleCaptchaChange = (e) => {
    const val = parseInt(e.target.value);
    setCaptchaVal(e.target.value);
    
    // Verificamos si la suma es correcta
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

    // Intentamos loguearnos con NextAuth
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // No redireccionar automático para poder manejar errores
    });

    if (res.error) {
      setError("❌ Usuario o contraseña incorrectos.");
      setLoading(false);
      generateCaptcha(); // Reiniciamos captcha por seguridad
    } else {
      // Si salió todo bien, nos vamos al admin
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-syf-dark px-4">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-syf-red/20 text-syf-red">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Acceso Restringido</h1>
          <p className="text-sm text-gray-400">Solo personal autorizado de SyF</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-white focus:border-syf-red focus:outline-none"
              placeholder="admin@syf.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-400">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 p-3 text-white focus:border-syf-red focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {/* CAPTCHA MATEMÁTICO */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-sm text-gray-300">
              Verificación de seguridad:
            </label>
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-syf-red select-none">
                {captchaChallenge.num1} + {captchaChallenge.num2} =
              </span>
              <input
                type="number"
                value={captchaVal}
                onChange={handleCaptchaChange}
                className={`w-20 rounded-lg border p-2 text-center font-bold text-black focus:outline-none 
                  ${isHuman ? "border-green-500 bg-green-100" : "border-gray-500 bg-white"}`}
                placeholder="?"
              />
              {isHuman && <span className="text-green-500 text-xl">✓</span>}
            </div>
          </div>

          {/* Botón de Ingreso */}
          <button
            type="submit"
            disabled={loading || !isHuman}
            className="w-full rounded-lg bg-syf-red py-3 font-bold text-white transition-all hover:bg-red-700 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verificando..." : "Ingresar al Sistema"}
          </button>

          {/* Mensajes de Error */}
          {error && (
            <div className="rounded-lg bg-red-500/20 p-3 text-center text-sm text-red-400 animate-pulse">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}