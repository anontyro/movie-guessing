export default () => ({
  environment: process.env.NODE_ENV || 'DEV',
  accessToken: process.env.ACCESS_TOKEN,
});
