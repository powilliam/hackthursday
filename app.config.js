export default ({ config }) => ({
  ...config,
  extra: {
    newsUrl: process.env.NEWS_URL,
    newsSecret: process.env.NEWS_SECRET,
  },
});
