const {
  default: UploadSourceMapPlugin,
} = require('@tool-plugin/webpack-plugin');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    // 添加自定义插件到 webpack 配置中
    // config.plugins.push(
    //   new UploadSourceMapPlugin({
    //     appId: 'WXfvhDdQ',
    //     appKey: 'e90b2b6de544c7779bc6fddff671135e',
    //   }),
    // );
    // convert the config object to JSON string
    // const configJSON = JSON.stringify(config, null, 2);

    // write the JSON string to a file (for example, config.json)
    // fs.writeFileSync('config.json', configJSON);

    return config;
  },
};

module.exports = nextConfig;
