module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};