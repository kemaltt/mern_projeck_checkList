const express = require("express");
const app = express();
const { readJSONFile, writeJSONFile } = require("./jsonFileSystem");
const cors = require("cors");

const PORT = process.env.PORT || 9000;

//logging middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.get("/dashboard", (req, res) => {
  readJSONFile("./models/data.json").then((data) => {
    res.json(data);
  });
});

app.put("/checkedlist/:id", (req, res) => {
  const { id, checked } = req.body;
  readJSONFile("./models/data.json").then((data) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.checked = checked;
      }
      return item;
    });
    console.log(newData);
    writeJSONFile("./models/data.json", newData).then(() => {
      res.json(newData);
    });
  });
});

app.post("/newlist", (req, res) => {
  const newList = req.body;
  readJSONFile("./models/data.json").then((data) => {
    data.push(newList);
    writeJSONFile("./models/data.json", data).then(() => {
      res.json(data);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
