import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();

    worker.on("listening", () => {
      worker.send(`Hello it is Master ${process.pid}`);
    });

    worker.on("message", (msg) => {
      console.log(msg);
    });
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  // handler ctrl+c
  process.on("SIGINT", (data) => {
    console.log("\nSTOP");
    process.exit();
  });
} else {
  import("./worker.js");
}
