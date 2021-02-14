
let _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to daily my daily blog, You can read my blog post at my blog. If you want to know more about me , please look at \"About Me\" page"
const aboutContent = "This blog was made by Burakhan Unver with help of Angela Yu's ejs and express tutorial. You can check my github "
const contactContent = "My Github username is 'brkunver', and LinkedIn username is 'burakhan-unver'"

const app = express();
// Posts Array
let posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Home Page
app.get("/", (req, res) => {
  res.render("home.ejs", { homeContent: homeStartingContent, posts: posts });
});
//About Page
app.get("/about", (req, res) => {
  res.render("about.ejs", { aboutText: aboutContent });
});
//Contact Page
app.get("/contact", (req, res) => {
  res.render("contact.ejs", { contactText: contactContent });
});
//With compose page, you can add new blog post
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

//function for every post page
app.get("/posts/:postid", (req, res) => {
  //lodash library converting string
  let postPage = _.lowerCase(req.params.postid);

  //Loop is looking for matching post
  for (let arr of posts) {
    let newTitle = _.lowerCase(arr.title);
    if (newTitle == postPage) {
      res.render("post.ejs", {postTitle : arr.title , post : arr.text});
      break;
    }
  }
});

//This function adding new post to "posts" array
app.post("/compose", (req, res) => {
  let post = {
    title: req.body.postTitle,
    text: req.body.postText,
  };

  posts.push(post);
  res.redirect("/");
});


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
