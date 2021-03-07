import { spawn } from "child_process";

export class Zork {
  process;

  constructor(callback) {
    const file = "./zork";
    console.log(file);
    this.process = spawn(file);

    this.process.stdout.on("data", (data) => {
      console.log("Received data: " + data);
      callback(data);
    });

    this.process.stderr.on("data", (data) => {
      console.error(`ERROR!!!! ${data}`);
    });

    this.process.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
    });
  }

  execute(cmd: string): void {
    console.log("Executing cmd: " + cmd);
    this.process.stdin.write(cmd + "\n");
  }
}
