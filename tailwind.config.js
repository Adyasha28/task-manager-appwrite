/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],

  theme: {
    colors: {
      'bg-dark': 'hsl(235, 21%, 11%)' ,
      'dark-li': 'hsl(235, 24%, 19%)',
      'list-dark': "hsl(235, 24%, 19%)",
      'list-font-dark': "hsl(233, 14%, 35%)",
      'color-blue': 'hsl(219.27deg 100% 61.89%)',
      'white' : '#fff',
      'black' : '#000'
    },
    extend: {
      backgroundImage: {
        'bg-desktop-dark': "url('./images/bg-desktop-dark.jpg')",
        'bg-desktop-light': "url('./images/bg-desktop-light.jpg')",
        'bg-mobile-dark': "url('./images/bg-mobile-dark.jpg')",
        'bg-mobile-light': "url('./images/bg-mobile-light.jpg')",
        'check-gradient': 'linear-gradient(to right,hsl(192, 100%, 67%),hsl(280, 87%, 65%))',
        'dark-gradient': "linear-gradient(145deg, #272940, #202236);"
      },
      borderRadius: {
        
      },
      boxShadow: {
        'dark-shadow': "11px 11px 6px #161724,-11px -11px 6px #323554;"
      }
    },
  },
  plugins: [],
}

