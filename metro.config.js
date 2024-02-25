// eslint-disable-next-line import/no-extraneous-dependencies
const { getDefaultConfig } = require('metro-config');
const metroHandleSyncRequest = require('mapping-tools-rn/lib/utils/metro-handle-sync-request');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    server: {
      enhanceMiddleware: metroHandleSyncRequest,
    },
  };
})();
