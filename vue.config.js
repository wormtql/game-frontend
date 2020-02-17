module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    port: process.env.NODE_ENV === "development" ? 8081 : 80
  }
};