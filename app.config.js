export default {
  expo: {
    name: "marejadasuv",
    slug: "marejadasuv",
    version: "1.0.0",
    scheme: "marejadasuv",
    android: {
      package: "com.lowframes.marejadasuv",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
      googleMaps: {
          apiKey: process.env.GOOGLE_MAPS_API_KEY
        }
    },
    extra: {
      eas: {
        projectId: "83072883-62b4-4793-8308-2102bbb1e7bc"
      }
    }
  }
};
