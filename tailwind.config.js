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
        "british-green-darker": "#001C0E",
        "prussian-blue": "#0F3350",
      },
      dropShadow: {
        'custom-button': '0 5px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
