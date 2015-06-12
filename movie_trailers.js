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
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
