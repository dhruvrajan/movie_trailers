Template.movie_tile.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  },

  'click #remove-movie': function () {
    Meteor.call("deleteMovie", this._id);
  },
  'keyup': function (event) {
    console.log("@body Escape Clicked", event);
  }
});

Template.movie_tile.helpers({
  //metascore: function () {
  //    return this.metascore;
  //}

});