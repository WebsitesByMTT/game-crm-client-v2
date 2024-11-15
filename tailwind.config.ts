import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
  			'.1': '.1 .1 0%',
  			'.2': '.2 .2 0%',
  			'.3': '.3 .3 0%',
  			'.4': '.4 .4 0%',
  			'.5': '.5 .5 0%',
  			'.6': '.6 .6 0%',
  			'.7': '.7 .7 0%',
  			'.8': '.8 .8 0%',
  			'.9': '.9 .9 0%'
  		},
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;