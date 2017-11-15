module.exports = function(config) {
  config.set({
    files: [],
    testRunner: "jest",
    reporter: ["clear-text", "progress"],
    coverageAnalysis: "off",
    mutator: 'typescript',
    transpilers: ["typescript"],
    tsconfigFile: "tsconfig.json",
    mutate: ["src/**/*.ts"],
    logLevel: 'trace'
  });
};
