//jshint esversion:6
const express = require('express');
// const bodyParser = require('body-parser');
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Cat ipsum dolor sit amet, miaow then turn around and show you my bum scratch me now! Stop scratching me! Cat walks in keyboard fight an alligator and win yet i is playing on your console hooman. Climb leg slap the dog because cats rule but the cat was chasing the mouse or avoid the new toy and just play with the box it came in so steal the warm chair right after you get up stare at ceiling. Do not try to mix old food with new one to fool me! Touch my tail, i shred your hand purrrr catch eat throw up catch eat throw up bad birds trip owner up in kitchen i want food. Is good you understand your place in my world sleeping in the box but experiences short bursts of poo-phoria after going to the loo lick plastic bags leave dead animals as gifts walk on keyboard.";
const aboutContent = "Wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again have my breakfast spaghetti yarn. If it smells like fish eat as much as you wish warm up laptop with butt lick butt fart rainbows until owner yells pee in litter box hiss at cats ask for petting. It's 3am, time to create some chaos if human is on laptop sit on the keyboard or nyan and stares at human while pushing stuff off a table for get my claw stuck in the dog's ear. Pose purrfectly to show my beauty. Fat baby cat best buddy little guy human is washing you why halp oh the horror flee scratch hiss bite.";
const contactContent = "Paw at beetle and eat it before it gets away roll on the floor purring your whiskers off take a big fluffing crap so eat half my food and ask for more. Show belly claw drapes eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap for step on your keyboard while you're gaming and then turn in a circle purr when being pet, for kitty poochy. Attack curtains furrier and even more furrier hairball, pet me pet me don't pet me sleep on dog bed, force dog to sleep on floor where is it? i saw that bird i need to bring it home to mommy squirrel!";

const app = express();
const port = 3000;

const posts = [];

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render("compose");
});

app.get("/posts/:postName", (req, res) => {
let requestedTitle = req.params.postName;
requestedTitle = _.chain(requestedTitle).toLower().kebabCase().value();

posts.forEach(post => {
let storedTitle = post.title;
storedTitle =  _.chain(storedTitle).toLower().kebabCase().value();
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title, content: post.content
      });
    }
  });
});

app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
