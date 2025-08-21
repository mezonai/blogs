export default [
  'strapi::logger',
  'strapi::errors',
  {
    // https://github.com/flyce/strapi-provider-upload-minio-ce?tab=readme-ov-file#pictures-cannot-be-displayed
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:", "http:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "localhost:9000",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "localhost:9000",
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept', 'X-Target-Language'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
