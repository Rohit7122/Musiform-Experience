/** @type {import('jest').Config} */
const config = {
    testEnvironment:    "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],  // ← AfterEnv not AfterFramework
    transform: {
        "^.+\\.tsx?$": ["ts-jest", {
            tsconfig: { jsx: "react-jsx" },
        }],
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/app/$1",
    },
    testMatch: [
        "**/__tests__/**/*.test.tsx",
        "**/__tests__/**/*.test.ts",
    ],
}

module.exports = config