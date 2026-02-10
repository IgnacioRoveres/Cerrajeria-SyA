import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

// 1. OBTENER TODOS (GET)
export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 2. CREAR NUEVO (POST)
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();
    const newProduct = await Product.create(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 3. ACTUALIZAR PRODUCTO (PUT)
export async function PUT(req) {
  try {
    await connectDB();
    const data = await req.json();
    const { _id, ...updateData } = data; // Separamos el ID del resto de los datos

    // Buscamos por ID y actualizamos
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 4. BORRAR PRODUCTO (DELETE) 
export async function DELETE(req) {
  try {
    await connectDB();
    // Obtenemos el ID de la URL (ej: ?id=12345)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}