import connectDB from "@/lib/db";         
import Product from "@/models/Product";  
import { NextResponse } from "next/server";

//Tiene que decir "GET" en mayúsculas y NO debe decir "default"
export async function GET() {
  try {
    await connectDB();
    
    // 1. Limpieza
    await Product.deleteMany();
    
    // 2. Siembra
    await Product.insertMany([
      { name: "Cilindro Fiat", description: "Con llaves", price: 45000, stock: 4, category: "Automotor" },
      { name: "Batería Moura", description: "12x75", price: 185000, stock: 2, category: "Automotor" },
      { name: "Cerradura Yale", description: "Doble perno", price: 32000, stock: 15, category: "Residencial" },
      { name: "Llave VW", description: "Carcasa", price: 12500, stock: 50, category: "Accesorios" },
    ]);

    return NextResponse.json({ message: "Base de datos sembrada con éxito 🌱" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}