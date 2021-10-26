module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                poppins: "'Poppins', sans-serif",
                ubuntu: "'Ubuntu', sans-serif",
            },

            colors: {
                "69665c": "#69665c",
                b2afa1: "#b2afa1",
                fff9de: "#fff9de",
                "fff9de-600": "#e6e0c8",
                d1e5f7: "#d1e5f7",
                "d1e5f7-600": "#bccede",
                daf2a6: "#daf2a6",
                "daf2a6-600": "#c4da95",
                ffcece: "#ffcece",
                "ffcece-600": "#e6b9b9",
                d2ceff: "#d2ceff",
                "d2ceff-600": "#bdb9e6",
            },

            maxHeight: {
                "screen-4/5": "calc(100vh * (4/5))",
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
