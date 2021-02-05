const app = require("express")();
const path = require("path");
const Logger = require("./Logger");
const LocalStorage = require("./LocalStorage");
const { log } = new Logger();
const { getItem, setItem, getAll, clear } = new LocalStorage();
// Local Storage
app.post("/api/:action", ({ params, body }, res) => {
  const { action } = params;
  const { key, value } = body;
  console.log(action);
  switch (action) {
    case "add":
      setItem(key, value);
      getAll();
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
    res.sendFile(path.join(__dirname, "./index.html"));
  } catch ({ message }) {
    log(null, message);
  }
});
app.listen(5000, () => console.log("Listening PORT: " + 5000));
