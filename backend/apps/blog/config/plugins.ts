module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
      jwt: {
        expiresIn: '2h',
      },
    },
  },
  'refresh-token': {
    enabled: true,
    config: {
      refreshTokenExpiresIn: '30d',
      requestRefreshOnAll: false,
      refreshTokenSecret: env('REFRESH_JWT_SECRET'),
      cookieResponse: false,
      refreshTokenRotation: false,
    },
  },
  graphql: {
    enabled: true,
    config: {
      defaultLimit: 10,
      maxLimit: 20,
    },
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-minio-ce',
      providerOptions: {
        accessKey: env('AWS_ACCESS_KEY_ID', 'minioadmin'),
        secretKey: env('AWS_SECRET_ACCESS_KEY', 'minioadmin'),
        bucket: env('AWS_BUCKET', 'mezonblogs'),
        endPoint: env('AWS_ENDPOINT', 'localhost'),
        port: env('MINIO_PORT', 9000),
        // useSSL: env('MINIO_USE_SSL', false), // default is false for localhost
        folder: env('AWS_FOLDER', 'images'),
        // private: env('MINIO_PRIVATE', false),
      },
    },
  },
});
