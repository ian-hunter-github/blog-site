module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Explicitly specify the installed package
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/dist-node/'],

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.app.json' }], // Move ts-jest config here
  },

  // globals: {
  //   'ts-jest': {
  //     tsconfig: '<rootDir>/tsconfig.app.json', // Explicitly point to the correct config
  //   },

}

