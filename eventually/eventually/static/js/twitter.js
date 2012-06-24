var updateInterval = 3000;

/* Query the twitter API and update the results div. */
function updateTwitterFeed(){
  hashtag = escape("#angelhack OR @angelhack");
  var api_url = "http://search.twitter.com/search.json?q="+hashtag;
  $.getJSON(api_url+"&callback=?",function(api_results){
    var results = api_results.results;
    if(results.length == 0) {
      $('#twitterfeed').innerHTML("No results to display");
    }
    else {
      for(var i = 0; i < results.length; i++) {
        var tweeter = "@" + results[i].from_user;
        var announcementClass = ""
        if(tweeter.toLowerCase() == "@angelhack"){
          announcementClass = ' class="announcement" '
        }
        var tweet = results[i].text;
        $('#twitterfeed').append("<p"+announcementClass+"><strong>" + tweeter + "</strong>: " + tweet + "</p>");
      }
    }
  });
}

$('document').ready(function(){
  updateTwitterFeed();
  //this makes it live update:
  //var pid = setInterval(updateTwitterFeed, updateInterval);
});


