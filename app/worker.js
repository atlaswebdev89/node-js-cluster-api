import http from "node:http";
// Workers can share any TCP connection
// In this case it is an HTTP server
http
  .createServer((req, res) => {
    for (let y = 0; y < 1e7; y++) {}
    console.log(`Request ${req.url}`);
    res.writeHead(200);
    res.end(`hello world. Pid process: ${process.pid}\n`);
  })
  .listen(8008);

console.log(`Worker ${process.pid} started`);

process.on("message", (msq) => {
  console.log(msq);
});
process.send(`Hello it is Worker ${process.pid}`);
