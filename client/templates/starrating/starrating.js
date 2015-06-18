Template.starrating.events({
  'click .star': function (event, template) {
    console.log("@click: ", this, +this, typeof this, typeof +this);
    Meteor.call('rateMovie', template.data._id, +this);
  }
});

Template.starrating.helpers({
  indices: function () {
    return [1, 2, 3, 4, 5];
  },

  filled: function (index, movie) {
    return movie.rating >= index;
  }
});