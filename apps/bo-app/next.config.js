const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withImages = require('next-images');

const nextConfig = {
  async redirects() {
    return [
    ];
  },
  devIndicators: {
    autoPrerender: false
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack: (config, options) => {
    // modify the `config` here
    return config;
  }
};

module.exports = withPlugins([
  withImages,
  withBundleAnalyzer
], nextConfig);
