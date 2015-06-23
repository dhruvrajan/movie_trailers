Template.movie_tile.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  },

  'click #remove-movie': function () {
    Meteor.call("deleteMovie", this._id);
  },

  'click .modal-trigger': function () {
    console.log("@playing video: ", this.youtube_url);
    var video = document.getElementById("youtube-video");
    video.videoId = this.youtube_url.substring(32);
    video.play();
  }
});

Template.movie_tile.helpers({

});