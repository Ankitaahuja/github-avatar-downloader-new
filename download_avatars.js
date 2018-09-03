const request = require('request');
const fs = require('fs'); 

let repoOwner = process.argv[2];
let repoName = process.argv[3];
console.log('Welcome to the GitHub Avatar Downloader!');
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
        headers: {
          'User-Agent': 'request'
        }
      };
      request(options, function(err, res, body) {
        cb(err, body);
      });
    }

getRepoContributors("jquery", "jquery", function(err, result) {
    console.log("Errors:", err);
    // console.log("Result:", result);
    result = JSON.parse(result);
    // avatarURL = result[0].avatar_url;
    result.forEach(function(element) {
       let url = element.avatar_url;
        let path = "avatars/"+element.login+".jpg";
    
        downloadImageByURL(url,path)
      });
    // console.log("Result:", avatarURL);
  });

  function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('error', function (err) {
      throw err; 
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath)); 
  }

