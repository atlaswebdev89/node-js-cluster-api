const http = require("http");
const a = "123";
http
  .createServer((req, res) => {})
  .listen(8008, () => {
    console.log("Server start " + process.pid);
  });
