const { writeFile, readFile, existsSync } = require("fs");
const Logger = require("./Logger");
const { log } = new Logger();
class LocalStorage {
  constructor() {
    this.fileName = "localStorage.json";
    if (existsSync(this.fileName)) {
      log("success", "Retrieving local storage items");
      var text = readFile(this.fileName);
      this.items = text;
    } else {
      log("success", "No items in local storage");
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
    this.items = this.items[key] = value;
    return writeFile(
      "localStorage.json",
      JSON.stringify(this.items),
      ({ message }) => {
        if (message) {
          log(null, message);
        }
      }
    );
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

module.exports = LocalStorage;
