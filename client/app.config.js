export default {
  name: 'AimsInstitutes',
  slug: 'aims-institutes',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourcompany.patientcallsystem'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.yourcompany.patientcallsystem'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  extra: {
    apiUrl: 'http://192.168.1.20:5000'  // Your actual IP address
  },
  newArchEnabled: true,
  plugins: [
    "expo-secure-store" // Added the plugin here
  ]
};
