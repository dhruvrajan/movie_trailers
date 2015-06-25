/**
 * Event handlers for movie-tiles.
 */

Template.movie_tile.events({
  'click #remove-movie': function () {
    // remove movie from user's list
    Meteor.call("deleteMovie", this._id);
  },

  'click .modal-trigger': function () {
    // display youtube video modal when a .modal-trigger is clicked
    console.log("@playing video: ", this.youtube_url);
    var video = document.getElementById("youtube-video");
    video.videoId = this.youtube_url.substring(32);
    video.play();
  }
});

Template.movie_tile.helpers({

});