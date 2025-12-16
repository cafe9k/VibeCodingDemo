/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ctrip-blue': '#0086F6',
        'ctrip-orange': '#FF6600',
        'ctrip-light-blue': '#E6F4FF',
        'ctrip-dark-blue': '#0066CC',
        'ctrip-success': '#52C41A',
        'ctrip-warning': '#FA8C16',
        'ctrip-error': '#FF4D4F',
        'ctrip-gray-dark': '#333333',
        'ctrip-gray': '#666666',
        'ctrip-gray-light': '#999999',
        'ctrip-border': '#DDDDDD',
        'ctrip-bg': '#F5F5F5',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'modal': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'ctrip-sm': '4px',
        'ctrip-md': '8px',
        'ctrip-lg': '12px',
        'ctrip-xl': '16px',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ctrip: {
          "primary": "#0086F6",
          "secondary": "#FF6600",
          "accent": "#E6F4FF",
          "neutral": "#666666",
          "base-100": "#FFFFFF",
          "base-200": "#F5F5F5",
          "base-300": "#DDDDDD",
          "info": "#0086F6",
          "success": "#52C41A",
          "warning": "#FA8C16",
          "error": "#FF4D4F",
        },
      },
    ],
    darkTheme: false,
  },
}

