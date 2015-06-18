Movies = new Mongo.Collection("movies");

if (Meteor.isClient) {
    Meteor.subscribe("movies");
    Session.setDefault("sort-by", "rating")
    Template.body.helpers({
        //movies: function() {
        //    return Movies.find();
        //},
        user_movies: function() {
            var sort_query = {};
            sort_query[Session.get("sort-by")] =  -1;
            return Movies.find({owner: Meteor.userId()}, {sort: sort_query})
        }
    });


    Template.body.events({
        'submit .new-movie': function(event) {
            var title = event.target.title.value;
            var description = event.target.description.value;
            var poster_url = event.target.poster_url.value;
            var youtube_url = event.target.youtube_url.value;
            Meteor.call("addMovie", title, description, poster_url, youtube_url)
        },

        'change .order-by': function(event) {
            //console.log("@change sort: ", event.target.value);
            Session.set("sort-by", event.target.value)
        },

        'submit .add-by-search': function(event) {
            event.preventDefault();

            var title = event.target.title.value;
            var result = Meteor.call("searchMovie", title);
            console.log("@result: ", result);
            console.log("@call complete");
        }

    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {

    Meteor.methods({
        addMovie: function(title, description, year, poster_url, youtube_url) {
            var trailer_youtube_id = youtube_url.substring(youtube_url.indexOf("watch?v=") + 8, youtube_url.length);
            Movies.insert({
                title: title,
                description: description,
                year: parseInt(year),
                poster_url: poster_url,
                youtube_url: youtube_url,
                trailer_youtube_id: trailer_youtube_id,
                date_created: new Date(),
                owner: Meteor.userId(),
                rating: -1
            });
        },

        deleteMovie: function(id) {
            Movies.remove(id);
        },

        searchMovie: function(title) {
            var result = Meteor.wrapAsync(HTTP.get)("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json");

            if (result && result.data.Error) {
                console.log("@raised: ", result.data.Error);
                throw new Meteor.Error(result.data.Error);
            }

            console.log("@on to youtube");
            var result2 = Meteor.wrapAsync(YoutubeApi.search.list.bind(YoutubeApi.search))({
                part: "id",
                type: "video",
                maxResults: 3,
                q: result.data.Title + " trailer"
            });

            Meteor.call("addMovie", result.data.Title, result.data.Plot, result.data.Year, result.data.Poster,
                "https://www.youtube.com/watch?v="+result2.items[0].id.videoId);
            console.log("@omdbapi: ", result.data.Title, ", plot: ", result.data.Plot, ", ID: ",
                result2.items[0].id.videoId);
        },

        rateMovie: function (id, rating) {
            Movies.update(id, {$set: {rating: rating}});
        }
    });

    Meteor.startup(function() {
        // code to run on server at startup
        YoutubeApi.authenticate({
            type: 'key',
            key: "AIzaSyB4e0RZKawPIE3uFxz8dEzRLvsvqks3Jwg",
        });
    });
}