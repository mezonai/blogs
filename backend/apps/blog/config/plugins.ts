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
      defaultLimit: 100,
      maxLimit: 100,
    },
  },
  upload: {
    config: {
      provider: 'strapi-provider-upload-minio-ce',
      providerOptions: {
        accessKey: env('AWS_ACCESS_KEY_ID'),
        secretKey: env('AWS_SECRET_ACCESS_KEY'),
        bucket: env('AWS_BUCKET', 'mezon'),
        endPoint: env('AWS_ENDPOINT'),
        port: env('MINIO_PORT', 9000),
        useSSL: env('MINIO_USE_SSL', false),
        folder: env('AWS_FOLDER', 'mezonblogs'),
      },
    },
  },
});
