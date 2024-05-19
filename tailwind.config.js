/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // Define suas fontes padrão
        // Você pode adicionar mais fontes conforme necessário
      },
      fontSize: {
        '2xs': '.625rem', // Define um tamanho de fonte personalizado
        // Você pode adicionar mais tamanhos de fonte conforme necessário
      },
      // Você pode estender outras propriedades do tema conforme necessário
    },
  },
  plugins: [],
}

