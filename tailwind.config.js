/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
        "*.{js,ts,jsx,tsx,mdx}"
    ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        rotate3d: 'rotate3d 25s linear infinite',
        pulse3d: 'pulse3d 3s ease-in-out infinite',
        morphing: 'morphing 6s ease-in-out infinite',
        glow: 'glowPulse 2s ease-in-out infinite',
        slideInUp3d: 'slideInUp3d 1.2s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateY(0deg)' },
          '33%': { transform: 'translateY(-15px) rotateX(3deg) rotateY(-3deg)' },
          '66%': { transform: 'translateY(-25px) rotateX(-2deg) rotateY(4deg)' },
        },
        rotate3d: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '25%': { transform: 'rotateX(90deg) rotateY(90deg) rotateZ(90deg)' },
          '50%': { transform: 'rotateX(180deg) rotateY(180deg) rotateZ(180deg)' },
          '75%': { transform: 'rotateX(270deg) rotateY(270deg) rotateZ(270deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)' },
        },
        pulse3d: {
          '0%, 100%': { transform: 'scale3d(1, 1, 1) rotateX(0deg)' },
          '50%': { transform: 'scale3d(1.1,1.1,1.1) rotateX(5deg)' },
        },
        morphing: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'rotate(0deg) scale(1)' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'rotate(180deg) scale(1.1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.3),0 0 40px rgba(16,185,129,0.1)' },
          '50%': { boxShad
