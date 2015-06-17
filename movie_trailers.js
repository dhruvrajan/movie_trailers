Movies = new Mongo.Collection("movies");

if (Meteor.isClient) {
    Meteor.subscribe("movies")

    Template.body.helpers({
        movies: function() {
            return Movies.find();
        },
        user_movies: function() {
            return Movies.find({owner: Meteor.userId()})
        }
    });

    Template.movie_tile.helpers({
    });

    Template.body.events({
        'submit .new-movie': function(event) {
            var title = event.target.title.value;
            var description = event.target.description.value;
            var poster_url = event.target.poster_url.value;
            var youtube_url = event.target.youtube_url.value;
            Meteor.call("addMovie", title, description, poster_url, youtube_url)
        },

        'submit .add-by-search': function(event) {
            event.preventDefault();

            var title = event.target.title.value;
            //var movie_data = Meteor.call("searchMovie", title);
            //Meteor.call("addMovie", title, title, title, title);
            //Meteor.call("addMovie", title, movie_data.data.plot, movie_data.data.poster, "https://www.youtube.com/watch?v=8BfMivMDOBI")
            var result = Meteor.call("searchMovie", title);
            console.log("@result: ", result);
            console.log("@call complete");
        }

    });

    Template.movie_tile.events({
        'click button': function() {
            // increment the counter when button is clicked
            Session.set('counter', Session.get('counter') + 1);
        },


        'click #remove-movie': function() {
            Meteor.call("deleteMovie", this._id);
        },
    });

    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {

    Meteor.methods({
        addMovie: function(title, description, poster_url, youtube_url) {
            var trailer_youtube_id = youtube_url.substring(youtube_url.indexOf("watch?v=") + 8, youtube_url.length);
            Movies.insert({
                title: title,
                description: description,
                poster_url: poster_url,
                youtube_url: youtube_url,
                trailer_youtube_id: trailer_youtube_id,
                createdAt: new Date(),
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

            Meteor.call("addMovie", result.data.Title, result.data.Plot, result.data.Poster, "https://www.youtube.com/watch?v="+result2.items[0].id.videoId);

            console.log("@omdbapi: ", result.data.Title, ", plot: ", result.data.Plot, ", ID: ", result2.items[0].id.videoId);

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