import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";
import { render } from "ejs";
const app = express();
const port = 3000;
let data = ["Project 1", "Project 2", "Project 3"];
let projects = [];
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
  await db
    .connect()
    .then(async () => {
      //query the database for the project records
      projects = await db.getAllProjects();
      console.log(projects);
      res.render("index", {
        title: "Rukiya D.'s NFT Portfolio",
        description: "Rukiya D.'s NFT Portfolio",
        projectArray: projects
      });
    })
    .catch(next);
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

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects",
    description: "A page for multiple projects",
    projectArray: projects,
  });
});

app.get("/project/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === parseInt(projectId));
  if (project) {
    res.render("project", {
      title: `Project ${projectId}`,
      description: `Details of Project ${projectId}`,
      which: `Project ${projectId}`,
      project: project,
    });
  } else {
    res.render("error", {
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

  app.use((error, req, res, next) => {
    console.log(error);
    res.render("error", {
      title: "Error",
      description: "An error occurred",
    });
  });

  app.listen(port, () => {
    console.log(`NFT app listening on port ${port}`);
  });
