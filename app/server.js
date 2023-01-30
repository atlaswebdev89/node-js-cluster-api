const http = require("http");

http
  .createServer((req, res) => {
    res.write(`Hello ${req.method} method`);
    res.end("\n");
  })
  .listen(8008, () => {
    process.stdout.write(`Server start ${process.pid}`);
  });
