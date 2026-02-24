"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { Trash2, Save, RefreshCw, UploadCloud, CheckCircle } from "lucide-react";

export default function AdminPage() {
  // --- ESTADOS ---
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", stock: "", category: "Automotor", image: "", featured: false,
  });
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [uploading, setUploading] = useState(false); // Estado de subida de imagen
  const [uploadSuccess, setUploadSuccess] = useState(false); // Para mostrar tilde verde
  const [message, setMessage] = useState("");

  // --- 1. CARGAR PRODUCTOS ---
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

  // --- 2. MANEJO DEL FORMULARIO ---
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // 🔥 ESTA ES LA FUNCIÓN QUE MANDA A CLOUDINARY
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccess(false);
    const data = new FormData();
    data.append("file", file);

    try {
      // Llamamos a la API que creamos en el PASO 1
      const res = await fetch("/api/upload", { method: "POST", body: data });
      
      if (!res.ok) throw new Error("Error en la subida");

      const fileData = await res.json();
      
      // Guardamos la URL de Cloudinary en el formulario
      setFormData({ ...formData, image: fileData.url });
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Error al subir la imagen. Revisá tu internet o las claves.");
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
        // Resetear form
        setFormData({ name: "", description: "", price: "", stock: "", category: "Automotor", image: "", featured: false });
        setUploadSuccess(false);
        fetchProducts(); // Recargar la lista
        
        // Borrar mensaje a los 3 segundos
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      setMessage("Error al guardar ❌");
    }
  };

  // --- 3. MANEJO DE LA TABLA ---
  const handleEditChange = (id, field, value) => {
    setProducts(products.map(p => p._id === id ? { ...p, [field]: value } : p));
  };

  const saveEdit = async (product) => {
    try {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) alert("¡Cambios guardados! 💾");
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés borrar este producto?")) return;
    try {
      await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      alert("Error al borrar");
    }
  };

  return (
    <div className="min-h-screen bg-syf-dark text-white pb-20 pt-24">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* === SECCIÓN 1: FORMULARIO DE CARGA === */}
        <div className="mb-12 rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-syf-red flex items-center gap-2">
                ➕ Cargar Nuevo Producto
            </h2>
            {message && <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-bold border border-green-500/50">{message}</span>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Nombre del Producto</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-admin" placeholder="Ej: Cilindro Yale 60mm" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Descripción Corta</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required className="input-admin" placeholder="Ej: Bronce, 3 llaves..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Precio ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required className="input-admin" placeholder="0.00" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Stock Inicial</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="input-admin" placeholder="10" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Categoría</label>
                <select name="category" value={formData.category} onChange={handleChange} className="input-admin cursor-pointer">
                  <option>Automotor</option>
                  <option>Residencial</option>
                  <option>Cerrajería</option>
                  <option>Accesorios</option>
                  <option>Herramientas</option>
                  <option value="Servicios">Servicios</option>
                </select>
              </div>
            </div>
            
            {/* CARGA DE IMAGEN MEJORADA */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 border-t border-white/10 pt-6">
               <div className="w-full md:w-auto">
                    <label className="block text-sm text-gray-400 mb-2">Foto del Producto</label>
                    <div className="relative">
                        <input 
                            type="file" 
                            onChange={handleImageUpload} 
                            disabled={uploading} 
                            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-syf-red file:text-white hover:file:bg-red-700 cursor-pointer" 
                        />
                        {uploading && <div className="absolute top-0 right-0 bg-black/80 px-2 rounded text-xs text-yellow-500 animate-pulse">Subiendo a Nube...</div>}
                    </div>
               </div>

               {/* PREVIEW DE LA IMAGEN */}
               {formData.image && (
                   <div className="flex items-center gap-3 bg-black/40 p-2 rounded-lg border border-white/10">
                       <img src={formData.image} alt="Preview" className="h-20 w-20 rounded object-cover" />
                       <div className="flex flex-col">
                           <span className="text-xs text-green-400 flex items-center gap-1 font-bold"><CheckCircle size={12}/> Imagen Lista</span>
                           <span className="text-[10px] text-gray-500 max-w-[150px] truncate">{formData.image}</span>
                       </div>
                   </div>
               )}
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <label className="flex items-center gap-2 cursor-pointer select-none group">
                <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="accent-syf-red w-5 h-5 cursor-pointer" />
                <span className="text-sm group-hover:text-white transition-colors">Destacar en la Home</span>
              </label>
              
              <button 
                type="submit" 
                disabled={uploading} // No dejar guardar si la foto no terminó de subir
                className="rounded-full bg-syf-red px-8 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-syf-red/20 flex items-center gap-2"
              >
                <Save size={20} />
                {uploading ? "Esperando imagen..." : "Guardar Producto"}
              </button>
            </div>
          </form>
        </div>

        {/* === SECCIÓN 2: GESTIÓN DE INVENTARIO (TABLA) === */}
        <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
            📦 Inventario ({products.length})
            </h2>
            <button onClick={fetchProducts} className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                <RefreshCw size={16} /> Actualizar
            </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 shadow-2xl">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-xs uppercase text-white font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Foto</th>
                <th className="px-6 py-4">Producto / Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr><td colSpan="5" className="p-12 text-center text-gray-500">Cargando inventario desde la base de datos...</td></tr>
              ) : products.map((product) => (
                <tr key={product._id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center">
                        {product.image ? (
                        <img src={product.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                        <span className="text-xl opacity-30">📷</span>
                        )}
                    </div>
                  </td>
                  
                  {/* Nombre Editable */}
                  <td className="px-6 py-4">
                    <input 
                      value={product.name} 
                      onChange={(e) => handleEditChange(product._id, "name", e.target.value)}
                      className="bg-transparent text-white focus:outline-none focus:border-b focus:border-syf-red w-full font-medium"
                    />
                    <div className="text-xs text-gray-600 mt-1">{product.category}</div>
                  </td>

                  {/* Precio Editable */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500">$</span>
                        <input 
                        type="number" 
                        value={product.price} 
                        onChange={(e) => handleEditChange(product._id, "price", e.target.value)}
                        className="bg-transparent text-white w-20 focus:outline-none focus:border-b focus:border-syf-red"
                        />
                    </div>
                  </td>

                  {/* Stock Editable */}
                  <td className="px-6 py-4">
                    <input 
                      type="number" 
                      value={product.stock} 
                      onChange={(e) => handleEditChange(product._id, "stock", e.target.value)}
                      className={`w-16 rounded px-2 py-1 font-bold text-center focus:outline-none 
                        ${product.stock < 5 ? "bg-red-900/30 text-red-400 border border-red-900/50" : "bg-green-900/30 text-green-400 border border-green-900/50"}`}
                    />
                  </td>

                  {/* Botones de Acción */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-50 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => saveEdit(product)}
                        className="rounded p-2 text-blue-400 hover:bg-blue-500/20 transition-colors"
                        title="Guardar Cambios"
                      >
                        <Save size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
                        className="rounded p-2 text-red-400 hover:bg-red-500/20 transition-colors"
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
      
      {/* Estilos locales */}
      <style jsx>{`
        .input-admin {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background-color: rgba(0,0,0,0.5);
          padding: 0.75rem;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-admin:focus {
          border-color: #E63946;
          background-color: rgba(0,0,0,0.8);
        }
      `}</style>
    </div>
  );
}