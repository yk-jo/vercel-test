const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  sassOptions: {
    prependData: `@import 'src/assets/styles/index.scss';`,
  },
  env: {
    // ssr 에서도 읽을 수 있는 환경변수
    API_BASE_URL: process.env.API_BASE_URL, 
    NEXTAUTH_URL: process.env.NEXTAUTH_URL
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
