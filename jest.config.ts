export default {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  notify: false,
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: { '^.+\\.ts?$': 'ts-jest' },
  moduleDirectories: ['node_modules', 'src'],
}
