/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#ECDAC8",
        "dune": "#E4CCB3",
        "almond": "#DDBD9B",
        "darker-almond": "#B88B5B",
        "caput-brown": "#623229",
        "british-green": "#004423",
        "prussian-blue": "#0F3350",
      },
    },
  },
  plugins: [],
}
