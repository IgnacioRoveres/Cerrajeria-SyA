"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Trash2, Save, RefreshCw } from "lucide-react"; // Iconos para la UI

export default function AdminPage() {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "", category: "Automotor", image: "", featured: false,
  });
  const [products, setProducts] = useState([]); // Lista de productos cargados
  const [loading, setLoading] = useState(true); // Para mostrar carga inicial
  const [uploading, setUploading] = useState(false); // Subida de imagen
  const [message, setMessage] = useState("");

  // --- 1. CARGAR PRODUCTOS AL INICIO ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error al cargar productos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- 2. MANEJO DEL FORMULARIO (CREAR) ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const fileData = await res.json();
      setFormData({ ...formData, image: fileData.url });
    } catch (error) {
      console.error(error);
      setMessage("Error al subir imagen ❌");
    } finally {
      setUploading(false);
    }
  };

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
        setMessage("¡Producto creado! ✅");
        setFormData({ name: "", description: "", price: "", stock: "", category: "Automotor", image: "", featured: false });
        fetchProducts(); // Recargar la lista
      }
    } catch (error) {
      setMessage("Error al guardar ❌");
    }
  };

  // --- 3. MANEJO DE LA TABLA (EDITAR Y BORRAR) ---
  
  // Función para detectar cambios en los inputs de la tabla
  const handleEditChange = (id, field, value) => {
    setProducts(products.map(p => p._id === id ? { ...p, [field]: value } : p));
  };

  // Guardar cambios de un producto específico (PUT)
  const saveEdit = async (product) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        alert("¡Cambios guardados! 💾");
      }
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  // Borrar producto (DELETE)
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés borrar este producto? No hay vuelta atrás.")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      setProducts(products.filter(p => p._id !== id)); // Lo sacamos de la lista visualmente
    } catch (error) {
      alert("Error al borrar");
    }
  };

  return (
    <div className="min-h-screen bg-syf-dark text-white pb-20">
      
      <div className="container mx-auto max-w-6xl px-4 py-10">
        
        {/* === SECCIÓN 1: FORMULARIO DE CARGA === */}
        <div className="mb-12 rounded-xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-6 text-2xl font-bold text-syf-red">➕ Cargar Nuevo Producto</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-400">Nombre</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-admin" placeholder="Ej: Llave Yale" />
              </div>
              <div>
                <label className="text-sm text-gray-400">Descripción</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required className="input-admin" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Precio ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="input-admin" />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Stock</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="input-admin" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-admin">
                  <option>Automotor</option><option>Residencial</option><option>Cerrajería</option><option>Accesorios</option>
                </select>
              </div>
            </div>
            
            {/* Carga de Imagen */}
            <div className="flex items-center gap-4 border-t border-white/10 pt-4">
               <input type="file" onChange={handleImageUpload} disabled={uploading} className="text-sm text-gray-400 file:mr-4 file:rounded-full file:bg-syf-red file:px-4 file:text-white" />
               {uploading && <span className="text-yellow-500 text-sm">Subiendo...</span>}
               {formData.image && <img src={formData.image} alt="Preview" className="h-10 w-10 rounded object-cover border border-white" />}
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="accent-syf-red" />
                <span className="text-sm">Destacar en Home</span>
              </label>
              <button type="submit" disabled={uploading} className="rounded-lg bg-syf-red px-8 py-2 font-bold hover:bg-red-700 disabled:opacity-50">
                {message || "Guardar Nuevo"}
              </button>
            </div>
          </form>
        </div>

        {/* === SECCIÓN 2: GESTIÓN DE INVENTARIO (TABLA) === */}
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
          📦 Inventario Actual
          <button onClick={fetchProducts} className="rounded-full bg-white/10 p-2 hover:bg-white/20" title="Recargar"><RefreshCw size={20} /></button>
        </h2>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/10 text-xs uppercase text-white">
              <tr>
                <th className="px-6 py-4">Foto</th>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Precio ($)</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr><td colSpan="5" className="p-8 text-center">Cargando inventario...</td></tr>
              ) : products.map((product) => (
                <tr key={product._id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    {product.image ? (
                      <img src={product.image} alt="" className="h-12 w-12 rounded object-cover border border-white/10" />
                    ) : (
                      <span className="text-2xl">🔧</span>
                    )}
                  </td>
                  
                  {/* Nombre Editable */}
                  <td className="px-6 py-4">
                    <input 
                      value={product.name} 
                      onChange={(e) => handleEditChange(product._id, "name", e.target.value)}
                      className="bg-transparent text-white focus:outline-none focus:border-b focus:border-syf-red w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                  </td>

                  {/* Precio Editable */}
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={product.price} 
                      onChange={(e) => handleEditChange(product._id, "price", e.target.value)}
                      className="bg-transparent text-white w-24 focus:outline-none focus:border-b focus:border-syf-red"
                    />
                  </td>

                  {/* Stock Editable */}
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={product.stock} 
                      onChange={(e) => handleEditChange(product._id, "stock", e.target.value)}
                      className={`w-16 rounded px-2 py-1 font-bold text-center focus:outline-none 
                        ${product.stock < 5 ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}
                    />
                  </td>

                  {/* Botones de Acción */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => saveEdit(product)}
                        className="rounded bg-blue-600/20 p-2 text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
                        title="Guardar Cambios"
                      >
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="rounded bg-red-600/20 p-2 text-red-500 hover:bg-red-600 hover:text-white transition-colors"
                        title="Eliminar Producto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      
      {/* Estilos extra para los inputs rapidos */}
      <style jsx>{`
        .input-admin {
          margin-top: 0.25rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background-color: rgba(0,0,0,0.5);
          padding: 0.75rem;
          color: white;
          outline: none;
        }
        .input-admin:focus {
          border-color: #E63946;
        }
      `}</style>
    </div>
  );
}