module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "src/**/*.js",
        mutated: true,
        included: false
      },
      "test/**/*.ts"
    ],
    testRunner: "jest",
    // mutator: "typescript",
    // transpilers: [],
    reporter: ["clear-text", "progress"],
    // coverageAnalysis: "all",
    coverageAnalysis: 'off', // Coverage analysis with a transpiler is not supported a.t.m.
    tsconfigFile: 'tsconfig.json', // Location of your tsconfig.json file
    mutator: 'typescript', // Specify that you want to mutate typescript code
    transpilers: [
      'typescript' // Specify that your typescript code needs to be transpiled before tests can be run. Not needed if you're using ts-node Just-in-time compilation.
    ]
  });
};
