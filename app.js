import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
const app = express();
const port = 3000;
let data = ["Project 1", "Project 2", "Project 3"];
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Rukiya D.'s NFT Portfolio",
    description: "Rukiya D.s NFT Portfolio",
  });
});

// app.get("/about", (req, res) => {
//   res.render("about", {
//     title: "About Rukiya D.",
//     description: "A page for the artist's biography.",
//   });
// });

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Rukiya D.",
    description: "Contact Rukiya D.",
  });
});

app.get("/newProject", (req, res) => {
  res.render("newProject", {
    title: "New Project",
    description: "A page to start a new project",
  });
});

app.get("/project", (req, res) => {
  res.render("project", {
    title: "Project",
    description: "A page for one project.",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects",
    description: "A page for multiple projects.",
    projects: data,
  });
});

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.subject, req.body.text)
    .then(() => {
      res.send({ result: "Success" });
    })
    .catch((error) => {
      res.send({ result: "Error sending message" });
    });
});

app.listen(port, () => {
  console.log(process.env.SENSITIVE_INFO);
  console.log(`NFT app listening on port ${port}`);
});
