module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                main: 'Cabin Sketch',
            },
            backgroundImage: {
                mountain:
                    "url('https://images.unsplash.com/photo-1484542603127-984f4f7d14cb?ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTQ3NTU3ODM&ixlib=rb-1.2.1')",
                gradient:
                    '-webkit-linear-gradient(241.11deg, rgba(255, 235, 151, 0.75) 13.89%, rgba(255, 135, 110, 0.75) 46.58%, rgba(148, 68, 85, 0.75) 91.53%)',
            },

            fontSize: {
                xxs: ['0.55rem', { lineHeight: '1rem' }],
            },
            backgroundColor: {
                navBar: 'var(--navBar)',
                main: 'var(--main)',
                input: 'var(--input)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
