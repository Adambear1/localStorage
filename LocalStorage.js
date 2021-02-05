const { writeFile, readFileSync, existsSync } = require("fs");
const Logger = require("./Logger");
const { log } = new Logger();
class LocalStorage {
  constructor() {
    if (existsSync("localStorage.json")) {
      this.items = JSON.parse(readFileSync("localStorage.json"));
    } else {
      this.items = {};
    }
  }

  get length() {
    return Object.keys(this.items).length;
  }
  getAll() {
    return this.items;
  }
  getItem(key) {
    return this.items[key];
  }
  setItem(key, value) {
    this.items[key] = value;
    writeFile("localStorage.json", JSON.stringify(this.items), (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  clear() {
    this.items = {};
    unlink("localStorage.json", () => {
      try {
        log("success", "Local Storage Cleared");
      } catch ({ message }) {
        log(null, message);
      }
    });
  }
}

module.exports = new LocalStorage();
