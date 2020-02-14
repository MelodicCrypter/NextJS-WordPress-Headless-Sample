const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const nextConfig = {
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                },
            },
        });

        return config;
    },
};

module.exports = withPlugins(
    [
        // CSS and Sass
        [withCSS(withSass())],

        // Image optimization
        [optimizedImages, { handleImages: ['jpeg', 'png', 'svg', 'webp'] }],
    ],

    // NextJS Configs
    nextConfig,
);
