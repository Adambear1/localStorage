const app = require("express")();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const Logger = require("./Logger");
const localStorage = require("./LocalStorage");
// Instances
const { log } = new Logger();
// Middle Ware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// Local Storage
app.post("/api/:action", ({ body, params }, res) => {
  const { action } = params;
  const { key, value } = body;
  switch (action) {
    case "add":
      localStorage.setItem(key, value);
      localStorage.getAll();
      break;
    case "remove":
      break;
    default:
      break;
  }
  if (!action) {
    res.json(getAll());
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
