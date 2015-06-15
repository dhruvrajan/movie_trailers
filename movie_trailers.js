Movies = new Mongo.Collection("movies");

if (Meteor.isClient) {
  Meteor.subscribe("movies")

  Template.body.helpers({
    movies: function () {
      return Movies.find();
    }
  });

  Template.movie_tile.helpers({

  });

  Template.body.events({
      'submit .new-movie': function (event) {
          var title = event.target.title.value;
          var description = event.target.description.value;
          var poster_url = event.target.poster_url.value;
          var youtube_url = event.target.youtube_url.value;
          Meteor.call("addMovie", title, description, poster_url, youtube_url)
      },

      'submit .add-by-search': function(event) {
          var title = event.target.title.value;
          //var movie_data = Meteor.call("searchMovie", title);
          //Meteor.call("addMovie", title, title, title, title);
          //Meteor.call("addMovie", title, movie_data.data.plot, movie_data.data.poster, "https://www.youtube.com/watch?v=8BfMivMDOBI")
          Meteor.call("searchMovie", title);
      }

  });
  Template.movie_tile.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    },

    //'click .movie-tile': function () {
    //  Meteor.call("deleteMovie", this._id);
    //},

    'click #remove-movie': function () {
      Meteor.call("deleteMovie", this._id);
    }
  });
}

Meteor.methods({
  addMovie: function (title, description, poster_url, youtube_url) {
    var trailer_youtube_id = youtube_url.substring(youtube_url.indexOf("watch?v=") + 8, youtube_url.length);
    Movies.insert({
      title: title,
      description: description,
      poster_url: poster_url,
      youtube_url: youtube_url,
      trailer_youtube_id: trailer_youtube_id
    });
  },

  deleteMovie: function (id) {
    Movies.remove(id);
  },

  searchMovie: function(title) {
      HTTP.get("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json", function(error, result) {
          if (!error) {
              Meteor.call("addMovie", result.data.Title, result.data.Plot, result.data.Poster, "")
          }
      });
  }

});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
