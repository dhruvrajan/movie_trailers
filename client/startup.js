Meteor.subscribe("movies");
Session.setDefault("sort-by", "rating");

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
