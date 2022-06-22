module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleNameMapper: {
    '@api/(.*)': '<rootDir>/build/api/$1',
    '@entity/(.*)': '<rootDir>/build/entity/$1',
    '@data-source': '<rootDir>/build/data-source/index.js',
    '@lib/(.*)': '<rootDir>/build/lib/$1',
    '@server': '<rootDir>/build/server.js',
  },
};
