import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^motion/react$': '<rootDir>/__mocks__/motion-react.tsx',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.worktrees/', '/Website/', '/web/'],
}

export default createJestConfig(config)
