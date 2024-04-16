const { themeVariants, prefersLight, prefersDark } = require("tailwindcss-theme-variants");

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
               300: '#236495',
               400: '#448cb9',
            },
            white: {
               DEFAULT: '#fff',
               100: '#d9dfe2',
               200: '#f5f5f5',
            },
            danger: {
               DEFAULT: '#fa6f6feb',
            },
            gray: {
               DEFAULT: '#9c9c9c'
            }
         },
         boxShadow: {
            'xl': '0 35px 60px -5px rgb(255 255 255 / 30%)',
            'lg': '0 10px 20px -2px rgb(255 255 255 / 30%)',
            'sm': '0 10px 20px -2px rgb(255 255 255 / 10%)',
            'dark-lg': '0 5px 10px 0px rgb(0 0 0 / 30%)',
            'dark-md': '0 5px 5px 0px rgb(0 0 0 / 20%)',
            'dark-sm': '0 3px 5px 0px rgb(0 0 0 / 10%)',
          }
      },
   },
   plugins: [
    themeVariants({
        themes: {
            light: {
               selector: ".light-theme",
            },
            dark: {
               selector: ".dark-theme",
            },
        },
      }),
   ],
};
