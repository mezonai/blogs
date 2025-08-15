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
});
