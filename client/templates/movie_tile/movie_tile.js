Template.movie_tile.events({
  'click button': function () {
    // increment the counter when button is clicked
    Session.set('counter', Session.get('counter') + 1);
  },

  'click #remove-movie': function () {
    Meteor.call("deleteMovie", this._id);
  },

  'click .close': function (event, template) {
    template.find(".youtube-video").seekTo(0);
    template.find(".youtube-video").pause();
    console.log("@closing video");
  },

  'click .movie-tile': function (event, template) {
    console.log("@playing video");
    var video = document.getElementById("youtube-video");
    video.videoId = this.youtube_url;
    video.style.display = "block";
    //window.open('#openModal');
    video.play();
  }
});

Template.movie_tile.helpers({

});