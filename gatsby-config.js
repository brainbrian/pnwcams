module.exports = {
    siteMetadata: {
        title: 'pnwcams',
    },
    plugins: [
        'gatsby-plugin-sass',
        {
            resolve: 'gatsby-plugin-prettier-eslint',
            options: {
                prettier: {
                    patterns: [
                        // the pattern "**/*.{js,jsx,ts,tsx}" is not used because we will rely on `eslint --fix`
                        '**/*.{css,scss,less}',
                        '**/*.{json,json5}',
                        '**/*.{graphql}',
                        '**/*.{md,mdx}',
                        '**/*.{html}',
                        '**/*.{yaml,yml}',
                    ],
                },
                eslint: {
                    patterns: '**/*.{js,jsx}',
                    customOptions: {
                        fix: true,
                        cache: true,
                    },
                },
            },
        },
    ],
};
