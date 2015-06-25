Meteor.methods({
  addMovie: function(title, description, year, poster_url, youtube_url) {
    // Add a movie object to the database
    var trailer_youtube_id = youtube_url.substring(youtube_url.indexOf("watch?v=") + 8, youtube_url.length);
    Movies.insert({
      title: title,
      description: description,
      year: parseInt(year),
      poster_url: poster_url,
      youtube_url: youtube_url,
      trailer_youtube_id: trailer_youtube_id,
      date_created: new Date(),
      owner: Meteor.userId(),
      rating: -1
    });
  },

  deleteMovie: function(id) {
    // remove a movie from a user's database
    Movies.remove(id);
  },

  searchMovie: function(title) {
    // query OmdbAPI by the movie title and get the movie information.
    var result = Meteor.wrapAsync(HTTP.get)("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json");

    if (result && result.data.Error) {
      console.log("@raised: ", result.data.Error);
      throw new Meteor.Error(result.data.Error);
    }

    // Search for the movie trailer on youtube.com
    console.log("@on to youtube");
    var result2 = Meteor.wrapAsync(YoutubeApi.search.list.bind(YoutubeApi.search))({
      part: "id",
      type: "video",
      maxResults: 3,
      q: result.data.Title + " trailer"
    });

    // Add the movie with its information to the database
    Meteor.call("addMovie", result.data.Title, result.data.Plot, result.data.Year, result.data.Poster,
        "https://www.youtube.com/watch?v="+result2.items[0].id.videoId);
    console.log("@omdbapi: ", result.data.Title, ", plot: ", result.data.Plot, ", ID: ",
        result2.items[0].id.videoId);
  },

  // Rate a movie
  rateMovie: function (id, rating) {
    Movies.update(id, {$set: {rating: rating}});
  }
});
