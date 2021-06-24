//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "It’s a headache when you forget the security code of your Apple iPhone or iPad. This scenario brings a lot of problems and makes users run to find a way to recover their devices, data. Sometimes users find some applications that promise but didn’t deliver. In other cases, some apps are just too expensive. Some online services are offering this kind of service. However, it’s much more convenient to have an application installed on our PC for seamless use anytime we need it. One of the best solutions in the Market is iToolab UnlockGo.";
const aboutContent = "RENDERLAKER has been a leading mobile technology media for over a decade with an audience of millions of monthly readers that want to know more about us. Founded in 2009, it has solidified its position as one of the first and best technology blogs, regarding Chinese phones, gadgets, news, reviews and IoT.";
const contactContent = "We love to hear from RENDERLEAKER readers! If you have a question or comment about GizChina, our websites, or services then please feel free to get in touch with us via one of the following methods.";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
