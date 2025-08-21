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
<<<<<<< HEAD
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
          },
          endpoint: env('AWS_ENDPOINT'),  
          region: env('AWS_REGION'),
          forcePathStyle: true,         
        },
        params: {
          ACL: env('AWS_ACL', 'public-read'),
          signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
          Bucket: env('AWS_BUCKET'),
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
=======
      /**
       * TODO:
       * - duplicate images stored in bucket (research about thumbnails_prefix)
       * - research `providerOptions.expiry`
       * - try create your own MinIO provider
       */
      provider: 'strapi-provider-upload-minio-ce',
      providerOptions: {
        accessKey: env('MINIO_ACCESS_KEY', 'minioadmin'),
        secretKey: env('MINIO_SECRET_KEY', 'minioadmin'),
        bucket: env('MINIO_BUCKET', 'mezonblogs'),
        endPoint: env('MINIO_ENDPOINT', 'localhost'),
        port: env('MINIO_PORT', 9000),
        useSSL: env('MINIO_USE_SSL', false), // default is false for localhost
        folder: env('MINIO_FOLDER', 'images'),
        private: env('MINIO_PRIVATE', false),
>>>>>>> a88bb063bfe80a538f03fe019b5654229a842122
      },
    },
  },
});
