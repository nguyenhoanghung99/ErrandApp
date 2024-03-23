module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          assets: './src/assets',
          constants: './src/constants',
          components: './src/components',
          config: './src/config',
          containers: './src/containers',
          context: './src/context',
          hooks: './src/hooks',
          i18n: './src/i18n',
          navigation: './src/navigation',
          store: './src/store',
          screens: './src/screens',
          types: './src/types',
          services: './src/services',
          theme: './src/theme',
          utils: './src/utils',
          HOC: './src/HOC',
          API: './src/API'
        },
      },
    ],
    'react-native-reanimated/plugin', 'module:react-native-dotenv'],
};
