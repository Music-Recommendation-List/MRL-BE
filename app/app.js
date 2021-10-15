const app = require("./server");
const mongoConnect = require("./mongoose");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => console.log(`서버 연결 port ${port}`));

// mongoConnect().finally(
//   app.listen(port, () => console.log(`서버 연결 port ${port}`))
// );
