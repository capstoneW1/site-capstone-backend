const app = require("./app");

// const port = process.env.PORT || 3001
const port = 3001;
app.listen(process.env.PORT || 3000, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
