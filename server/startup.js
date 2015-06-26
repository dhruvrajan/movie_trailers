Meteor.startup(function() {
  console.log("@starting up")
  YoutubeApi.authenticate({
    type: 'key',
    key: "AIzaSyB4e0RZKawPIE3uFxz8dEzRLvsvqks3Jwg"
  });
});