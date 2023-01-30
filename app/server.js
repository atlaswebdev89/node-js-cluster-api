import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    worker.on("exit", () => {
      console.log(`worker ${worker.process.pid} died`);
      cluster.fork();
    });

    worker.on("listening", () => {
      worker.send(`Hello it is Master ${process.pid}`);
    });

    worker.on("message", (msg) => {
      console.log(msg);
    });
  }
} else {
  import("./worker.js");
}
