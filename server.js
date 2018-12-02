const express = require('express');
const app = express();
const cors = require('cors');
const Nightmare = require('nightmare');
//example
const port = 3000;

app.use(cors());

// first endpoint - already built
// this says that when the app is at "/" - so "home", it will send a response of "Hedgehog Time". That is why we see those words on the screen when we go to localhost:3000/.
app.get('/', (req, res) => {
  res.send("Hedgehog Time");
});

// your endpoint
app.get('/pets',(req, res)=> {
res.send("My dog is amazing!");
});

// scraper endpoint
app.get('/diamonds/:keyword' , (req, res) => {
  var keyword = req.params.keyword;
  function findHedgieImage(keyword) {
    var nightmare = Nightmare();
//subsituting variable
return nightmare
  .goto('https://www.google.com')
  .insert('input[title="Search"]', `diamonds ${keyword}`)
  .click('input[value="Google Search"]')//bot clicks search
  .wait('a.q.qs')//wait for link to show up
  .click('a.q.qs')//clink after shown
  .wait('div#res.med')//bot is waiting for whatever shows in link
 .evaluate(function() { //
    var photoDivs = document.querySelectorAll('img.rg_ic');
    var list = [].slice.call(photoDivs);
//collecting all photos to one collection
    return list.map(function(div) {
      return div.src;
    }); //giving collection of images
  })
  .end()
  .then(function(result) {
    return result.slice(1, 5);
  })//actually giving 4 images (0 is starting point)
  .then(function (images) {
    res.json(images);//bot gives back images to the user
  })
   .catch(function(error) {
    console.error('Search failed:' , error);
  });
}
findHedgieImage(keyword);
});
//find error


app.listen(port, () => {
  console.log(`app running on ${port}`);
});
//show that app is  running
