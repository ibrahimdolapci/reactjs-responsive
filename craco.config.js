const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#3BA935',
                            '@border-radius-base': "4px",
                            '@btn-padding-horizontal-base': "40px",
                            '@btn-height-base': '36px',
                            '@body-background': '#EBECEF',
                            '@font-family': "'Open Sans', sans-serif"
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
