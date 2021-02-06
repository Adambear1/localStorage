const app = require("express")();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const Logger = require("./Logger");
const localStorage = require("./LocalStorage");
// Init
const { log } = new Logger();
// Middle Ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Local Storage
app.post("/api/:action?/:id?", ({ body, params }, res) => {
  const { action, id } = params;
  const { key, value } = body;
  try {
    if (!action) {
      log("Sending initial data...");
      return res.json(localStorage.getAll());
    } else {
      switch (action) {
        case "add":
          log("Adding " + JSON.stringify(body) + " to local storage");
          return res.json(localStorage.setItem(key, value));
        case "clear":
          log("Clearing all instances from local storage");
          return res.json(localStorage.clear());
        case "remove":
          log("Clearing " + JSON.stringify(id) + " from from local storage");
          return res.json(localStorage.removeOne(id));
        case "edit":
          log(
            "Replacing key " +
              JSON.stringify(id) +
              " with " +
              body +
              " in local storage"
          );
          return res.json(localStorage.setItem(key, value, id));
         case "filter":
          log(
            "Filtering data..."
          );
          var sortedObj = Object.keys(localStorage.getAll()).sort().reduce((r, k) => (r[k] = localStorage.getAll()[k], r), {})
          return res.json(sortedObj)
        default:
          log("Invalid Action", "Error");
          return res.json(log("Invalid Action", "Error"));
      }
    }
  } catch ({ message }) {
    log(message, "Error");
    return res.json(log(message, "Error"));
  }
});
// Send HTML File
app.get("*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  } catch ({ message }) {
    log(null, message);
  }
});
app.listen(5000, () => console.log("Listening PORT: " + 5000));
