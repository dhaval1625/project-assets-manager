/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      fontFamily: {
         sans: ['Raleway', 'sans-serif'],
      },
      extend: {
         colors: {
            dark: {
               DEFAULT: '#242a30',
               100: '#2b353e',
            },
            primary: {
               DEFAULT: '#82c6ef',
               100: '#6da9b9',
               200: '#0482ce',
            },
            white: {
               DEFAULT: '#fff',
               100: '#d9dfe2'
            },
            danger: {
               DEFAULT: '#fa6f6feb',
            }
         },
         boxShadow: {
            'xl': '0 35px 60px -15px rgb(255 255 255 / 30%)',
          }
      },
   },
   plugins: [],
};
