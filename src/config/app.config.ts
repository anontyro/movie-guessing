export default () => ({
  environment: process.env.NODE_ENV || 'development',
  accessToken: process.env.ACCESS_TOKEN,
});
