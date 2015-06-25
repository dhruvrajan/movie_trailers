Template.body.helpers({
  user_movies: function () {
    // get a list of the current user's movies, sorted by the value of the session variable 'sort-by'
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

  'change #order-by': function (event) {
    // change the attribute by which movies are sorted
    console.log("@selected: ", event.target.getAttribute("name"));
    Session.set("sort-by", event.target.getAttribute("name"));
  },
  'click .close': function (event, template) {
    // close youtube video modal
    template.find("#youtube-video").seekTo(0);
    template.find("#youtube-video").pause();
    console.log("@closing video");
  },
  'submit .add-by-search': function (event) {
    // Add movie by searching OmdbAPI by title
    event.preventDefault();

    var title = event.target.title.value;
    var result = Meteor.call("searchMovie", title);
    console.log("@result: ", result);
    console.log("@call complete");
  }
});
