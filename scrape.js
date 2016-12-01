var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');

  //url = 'http://www.imdb.com/title/tt1229340/';

params = process.argv 

console.log(
	'url');
console.log(params[2]);
console.log(
	'file');
console.log(params[3]);
url = params[2];
file = params[3];


  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile(file, JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

   /* res.send('Check your console!')*/
  })