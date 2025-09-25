module.exports = {
  content: [
    
    // Add these for app folder
    "./app/**/*.{js,ts,jsx,tsx,md,mdx}", // All file types in app
    "./app/*.{js,ts,jsx,tsx,md,mdx}",    // Root files in app
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    }
  },
  plugins: []
}
