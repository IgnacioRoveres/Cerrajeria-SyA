import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// 1. OBTENER TODOS LOS PRODUCTOS (Para ver la lista)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 }); // Los más nuevos primero
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. CREAR UN PRODUCTO NUEVO (Lo que va a usar el formulario)
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json(); // Leemos lo que manda el formulario

    // Creamos el producto en la base de datos
    const newProduct = await Product.create(data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}