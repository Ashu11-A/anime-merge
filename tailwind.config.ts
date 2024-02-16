import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      'ld': '928px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      'purple-dark': {
        extend: 'dark',
        colors: {
          background: '#0D001A',
          foreground: '#ffffff',
          primary: {
            50: '#3B096C',
            100: '#520F83',
            200: '#7318A2',
            300: '#9823C2',
            400: '#c031e2',
            500: '#DD62ED',
            600: '#F182F6',
            700: '#FCADF9',
            800: '#FDD5F9',
            900: '#FEECFE',
            DEFAULT: '#DD62ED',
            foreground: '#ffffff',
          },
          focus: '#F182F6',

        },
        layout: {
          disabledOpacity: '0.3',
          radius: {
            small: '4px',
            medium: '6px',
            large: '8px',
          },
          borderWidth: {
            small: '1px',
            medium: '2px',
            large: '3px',
          },
        }
      }
    }
  }
  )],
}
export default config
