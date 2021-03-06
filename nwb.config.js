module.exports = {
    type: "react-component",
    npm: {
        esModules: true,
        umd: {
            global: "ReactLoki",
            externals: {
                react: "React"
            }
        }
    },
    webpack: {
        html: {
            template: 'src/index.html',
        }
    }
}