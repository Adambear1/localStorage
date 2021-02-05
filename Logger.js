class Logger {
  constructor() {
    this.logs = [];
  }
  log(type = "error", message = null) {
    const timestamp = new Date().toISOString();
    // this.logs.push({ message, timestamp });
    if (type === "success") {
      return console.log(
        "\x1b[34m",
        `${message ? message : "Operation Successful"} - ${timestamp}`
      );
    } else {
      return console.log("\x1b[31m", `${error} - ${timestamp}`);
    }
  }
}

module.exports = Logger;
