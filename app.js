import express from 'express';
import dotenv from 'dotenv';
import * as utils from './utils/utils.js';  
dotenv.config();
const app = express();
const port = 3000;
let data = ['Project 1', 'Project 2', 'Project 3'];
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
})

// app.get('/about', (req, res) => {
//   res.render('about.ejs');
// })

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

app.get('/newProject', (req, res) => {
  res.render('newProject.ejs');
})

app.get('/project', (req, res) => {
  res.render('project.ejs');
})

app.get('/projects', (req, res) => {
  res.render('projects.ejs', {projects: data});
})

app.post('/mail', async(req, res) => {
  await utils 
  .sendMessage(req.body.subject, req.body.text)
  .then(() => {
    res.send({result: 'Success'});
  })
  .catch((error) => {
    res.send({result: 'Error sending message'});
  });
});

app.listen(port, () => {
  console.log(process.env.SENSITIVE_INFO);
  console.log(`NFT app listening on port ${port}`);
});