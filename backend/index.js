// const express = require("express");
const app = express();
// const { readJSONFile, writeJSONFile } = require("./jsonFileSystem");
// const cors = require("cors");
// const { v4: uuid } = require("uuid");

import { nanoid } from "nanoid";
import cors from "cors";
import express from "express";
import { readJSONFile, writeJSONFile } from "./jsonFileSystem.js";

const jsonPath = "./models/data.json";

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
  const { id } = req.body;
  readJSONFile("./models/data.json").then((data) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    console.log(newData);
    writeJSONFile("./models/data.json", newData).then(() => {
      res.json(newData);
    });
  });
});

app.put("/reset", (req, res) => {
  readJSONFile("./models/data.json").then((data) => {
    const newData = data.filter((item) => {
      item.checked = false;
      return item;
    });
    console.log(newData);
    writeJSONFile("./models/data.json", newData).then(() => {
      res.json(newData);
    });
  });
});

app.post("/dashboard", (req, res) => {
  const newList = {
    title: req.body.title,
    // checked: req.body.checked,
    id: nanoid(),
  };
  console.log(newList);
  readJSONFile(jsonPath) // reviews lesen
    .then((data) => [newList, ...data])
    .then((updatedData) => writeJSONFile(jsonPath, updatedData)) // reviews schreiben
    .then((updatedData) => res.json(updatedData)); // antworten
});

// writeJSONFile("./models/data.json", newList).then(() => {
//     res.json(newList);
//   });
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
