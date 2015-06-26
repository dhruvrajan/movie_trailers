///**
// * Initial setup; subscribe to database, and configure accounts-ui.
// */

Meteor.subscribe("movies");
Session.setDefault("sort-by", "rating");

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
