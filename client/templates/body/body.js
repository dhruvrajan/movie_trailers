Template.body.helpers({
  user_movies: function () {
    var sort_query = {};
    sort_query[Session.get("sort-by")] = -1;
    return Movies.find({owner: Meteor.userId()}, {sort: sort_query})
  }
});

//Template.body.onRendered(function () {
//  this.group = this.find('#order-by');
//});

Template.body.events({
  'submit .new-movie': function (event) {
    var title = event.target.title.value;
    var description = event.target.description.value;
    var poster_url = event.target.poster_url.value;
    var youtube_url = event.target.youtube_url.value;
    Meteor.call("addMovie", title, description, poster_url, youtube_url)
  },

  'change #order-by': function (event, template) {
    //var selected = template.group.selected;
    console.log("@selected: ", event.target.getAttribute("name"));
    Session.set("sort-by", event.target.getAttribute("name"));
  },

  'click #show-video': function (event, template) {
    if (template.find(".youtube-video").style.display == "block") {
      template.find(".youtube-video").style.display = "none";
    } else {
      template.find(".youtube-video").style.display = "block";
    }
  },

  'submit .add-by-search': function (event) {
    event.preventDefault();

    var title = event.target.title.value;
    var result = Meteor.call("searchMovie", title);
    console.log("@result: ", result);
    console.log("@call complete");
  }
});
