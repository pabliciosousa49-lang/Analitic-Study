/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zinc: {
          900: '#18181b',
          950: '#09090b', // Fundo principal ultra escuro
        },
        emerald: {
          400: '#34d399', // Detalhes em verde tech
        },
      },
    },
  },
  plugins: [],
}