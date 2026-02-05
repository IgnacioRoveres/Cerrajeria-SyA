"use client"; // Importante: Esto es una página interactiva (cliente)

import { useState } from "react";
import Navbar from "../components/layout/Navbar"; // Ajustá la ruta si es necesario

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Automotor", // Valor por defecto
    image: "", // Por ahora usaremos URL de imagen (luego vemos subida de archivos)
    featured: false,
  });

  const [message, setMessage] = useState("");

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar datos a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Guardando...");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("¡Producto creado con éxito! ✅");
        // Limpiar formulario
        setFormData({
          name: "",
          description: "",
          price: "",
          stock: "",
          category: "Automotor",
          image: "",
          featured: false,
        });
      } else {
        setMessage("Hubo un error al guardar ❌");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error de conexión ❌");
    }
  };

  return (
    <div className="min-h-screen bg-syf-dark text-white">
      <Navbar />
      
      <div className="container mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-syf-red">Panel de Carga</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-8">
          
          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Nombre del Producto</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              placeholder="Ej: Cilindro Fiat Palio"
            />
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-medium text-gray-400">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              placeholder="Detalles técnicos..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* PRECIO */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Precio ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              />
            </div>

            {/* STOCK */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* CATEGORÍA */}
            <div>
              <label className="block text-sm font-medium text-gray-400">Categoría</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              >
                <option value="Automotor">Automotor</option>
                <option value="Residencial">Residencial</option>
                <option value="Cerrajería">Cerrajería</option>
                <option value="Accesorios">Accesorios</option>
              </select>
            </div>

            {/* DESTACADO */}
            <div className="flex items-center justify-center pt-6">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 accent-syf-red"
                />
                <span className="text-white">¿Destacar en Inicio?</span>
              </label>
            </div>
          </div>

          {/* URL IMAGEN (Temporal) */}
          <div>
            <label className="block text-sm font-medium text-gray-400">URL de Imagen</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 p-3 text-white focus:border-syf-red focus:outline-none"
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-gray-500">
              * Por ahora pegá un link de Google Imágenes. Pronto agregaremos subida de archivos.
            </p>
          </div>

          {/* BOTÓN GUARDAR */}
          <button
            type="submit"
            className="w-full rounded-lg bg-syf-red py-4 font-bold text-white transition-all hover:bg-red-700 hover:scale-[1.02]"
          >
            Guardar Producto
          </button>

          {/* MENSAJE DE ESTADO */}
          {message && (
            <div className={`mt-4 rounded-lg p-3 text-center font-bold ${message.includes("error") ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}