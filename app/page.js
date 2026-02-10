import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Categories from "./components/home/Categories";
import FeaturedProducts from "./components/home/FeaturedProducts"; // <--- Tu nuevo componente
import About from "./components/home/About";
import Brands from "./components/home/Brands";

export default function Home() {
  return (
    <main className="min-h-screen bg-syf-dark">      
      {/* 1. Portada */}
      <Hero />
      
      {/* 2. Accesos Rápidos */}
      <Categories />
      
      {/* 3. Productos (Server Component que trae sus propios datos) */}
      <FeaturedProducts />
      
      {/* 4. Institucional */}
      <About />

      {/*5. Marcas*/}
      <Brands />
      
    </main>
  );
}