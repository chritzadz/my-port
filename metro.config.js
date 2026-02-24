const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const config = getDefaultConfig(__dirname);

const { resolver } = config;

config.resolver = {
  ...resolver,
  sourceExts: [...resolver.sourceExts, "cjs"],
  unstable_enablePackageExports: true,
  unstable_conditionNames: ["browser", "require", "react-native"],
};
module.exports = withNativeWind(config, { input: "./global.css" });
