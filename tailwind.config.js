/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'mdplus': '824px',
                'smplus': '361px',
            },
            fontFamily: {
                sans: ['"Josefin Sans"', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [],
}