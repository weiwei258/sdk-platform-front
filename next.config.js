// const {
//   default: UploadSourceMapPlugin,
// } = require('@tool-plugin/webpack-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    // 添加自定义插件到 webpack 配置中
    // config.plugins.push(
    //   new UploadSourceMapPlugin({
    //     appId: 'mGGeXsyR',
    //     appKey: 'd232ab18af1da3e70cd2934ccd01aa02',
    //   }),
    // );

    return config;
  },
};

module.exports = nextConfig;
