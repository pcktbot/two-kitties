export default {
  testEnvironment: 'jsdom',
  transform: {},
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  extensionsToTreatAsEsm: ['.ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};