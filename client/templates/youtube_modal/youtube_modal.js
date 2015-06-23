Template.youtube_modal.events({
  'click .close': function (event, template) {
    template.find(".youtube-video").seekTo(0);
    template.find(".youtube-video").pause();
    console.log("@closing video");
  },

  'click .modal-trigger': function(event, template) {
    console.log("@playing video");
    template.find(".youtube-video").play();
  }
});