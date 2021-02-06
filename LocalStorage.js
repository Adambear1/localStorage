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
  removeOne(key){
    delete this.items[key]
    writeFile("localStorage.json", JSON.stringify(this.items), (error) => {
      if (error) {
        console.error(error);
      }
    })
    return this.items
  }

  editItem(key, value){
    return this.items[key] = value
  }
  setItem(key, value, id) {
    delete this.items[id]
    this.items[key] = value;
    writeFile("localStorage.json", JSON.stringify(this.items), (error) => {
      if (error) {
        console.error(error);
      }
    });
    return this.items
  }

  clear() {
    this.items = {};
    writeFile("localStorage.json", JSON.stringify(this.items), (error) => {
      if (error) {
        console.error(error);
      }
    });
    return this.items
  }
}

module.exports = new LocalStorage();
