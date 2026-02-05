/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        syf: {
          red: '#D62828',    // Rojo SyF
          dark: '#121212',   // Negro Fondo
          gray: '#1E1E1E',   // Gris Componentes
          light: '#F5F5F5',  // Texto
        }
      },
    },
  },
  plugins: [],
};