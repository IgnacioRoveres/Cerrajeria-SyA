import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo." }, { status: 400 });
    }

    // 1. Convertimos el archivo a un Buffer (formato que entiende el disco duro)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Generamos un nombre único para que no se pisen (ej: imagen-123456789.png)
    // Limpiamos el nombre original de espacios y caracteres raros
    const filename = Date.now() + '-' + file.name.replaceAll(" ", "_");
    
    // 3. Definimos la ruta donde se va a guardar (dentro de public/uploads)
    const uploadPath = path.join(process.cwd(), "public/uploads", filename);

    // 4. Escribimos el archivo en el disco
    await writeFile(uploadPath, buffer);

    // 5. Devolvemos la URL pública (la que va a usar la web)
    const url = `/uploads/${filename}`;
    
    return NextResponse.json({ url });

  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json({ error: "Falló la subida de imagen." }, { status: 500 });
  }
}