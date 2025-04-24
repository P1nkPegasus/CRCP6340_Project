import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";
import cors from "cors";

let projects = [];
let contracts = [];
let mints = [];

const app = express(); //more security can get added here
app.use(cors());
const port = 3000;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
  await db
    .connect()
    .then(async () => {
      //query the database for the project records
      projects = await db.getAllProjects();
      contracts = [];
      mints = [];
      projects.forEach((item) => {
        contracts.push(item.contractAddress);
        mints.push(0); // initializing parallel array
      });
      let featuredRand = Math.floor(Math.random() * projects.length);      console.log(projects);
      res.render("index.ejs", {
        title: "Rukiya D.'s NFT Portfolio",
        description: "Rukiya D.'s NFT Portfolio",
        projectArray: projects,
        featuredProject: projects[featuredRand],
        contracts: contracts,
        mints: mints
      });
    })
    .catch(next);
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    title: "Contact Rukiya D.",
    description: "Contact Rukiya D.",
  });
});

// app.get("/newProject", (req, res) => {
//   res.render("newProject.ejs", {
//     title: "New Project",
//     description: "A page to start a new project",
//   });
// });

app.get("/projects", (req, res) => {
  res.render("projects.ejs", {
    title: "Projects",
    description: "A page for multiple projects",
    projectArray: projects,
    contracts: contracts,
    mints: mints
  });
});

app.get("/project/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === parseInt(projectId));
  if (project) {
    res.render("project.ejs", {
      title: `Project ${projectId}`,
      description: `Details of Project ${projectId}`,
      which: `Project ${projectId}`,
      project: project,
      contracts: contracts,
      mints: mints
    });
  } else {
    res.render("error.ejs", {
      title: "Error",
      description: "An error occurred",
    });
  }
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

  app.use(async (error, req, res, next) => {
    console.log(error);
    let msg;
    msg = error.message;
    if (msg != "No project with that ID") {
    msg =
      "There was an internal error. Apologies. We are working on it!!";
  }
    res.render("error.ejs", {
      title: "Error",
      description: "An error occurred",
    });
  });

  app.listen(port, () => {
    console.log(`Hey there!! The NFT app listening on port ${port}`);
  });
