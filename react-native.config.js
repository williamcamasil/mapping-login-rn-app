module.exports = {
  dependency: {
    platforms: {
      // desabilita auto linking desse repositório em outros repositórios que o instalarem como dependência
      android: null,
      ios: null,
    },
  },
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
