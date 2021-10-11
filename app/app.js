const app = require("./server");
const mongoConnect = require("./mongoose.js");

dotenv.config();

const port = process.env.PORT;

mongoConnect().finally(
  app.listen(port, () => console.log(`서버 연결 port ${port}`))
);
