Template.body.helpers({
  //movies: function() {
  //    return Movies.find();
  //},
  user_movies: function () {
    var sort_query = {};
    sort_query[Session.get("sort-by")] = -1;
    return Movies.find({owner: Meteor.userId()}, {sort: sort_query})
  }
});

Template.body.events({
  'submit .new-movie': function (event) {
    var title = event.target.title.value;
    var description = event.target.description.value;
    var poster_url = event.target.poster_url.value;
    var youtube_url = event.target.youtube_url.value;
    Meteor.call("addMovie", title, description, poster_url, youtube_url)
  },

  'change .order-by': function (event) {
    //console.log("@change sort: ", event.target.value);
    Session.set("sort-by", event.target.value)
  },

  'submit .add-by-search': function (event) {
    event.preventDefault();

    var title = event.target.title.value;
    var result = Meteor.call("searchMovie", title);
    console.log("@result: ", result);
    console.log("@call complete");
  }
});
