import media
from fresh_tomatoes import create_movie_tiles_content, open_movies_page

avatar = media.Movie("Avatar", "Marines on Pandora", "http://www.avatarpelicula.es/avatar_onesheet.jpg",
                     "https://www.youtube.com/watch?v=5PSNL1qE6VY")

toy_story = media.Movie("Toy Story", "Toys that come to life", "http://www.movie2kto.ws/uploads/newImage60510.jpg",
                        "https://www.youtube.com/watch?v=KYz2wyBy3kc")

inception = media.Movie("Inception", "The Dream is Real",
                        "http://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX640_SY720_.jpg",
                        "www.youtube.com/watch?v=66TuSJo4dZM")

dark_knight = media.Movie("The Dark Knight", "The Joker Attacks Gotham",
                          "http://ia.media-imdb.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX640_SY720_.jpg",
                          "https://www.youtube.com/watch?v=5y2szViJlaY")

interstellar = media.Movie("Interstellar", "Mankind was born on earth, but never meant to die here",
                           "https://d3ui957tjb5bqd.cloudfront.net/uploads/2014/11/interstellar-poster-3.png",
                           "www.youtube.com/watch?v=0vxOhd4qlnA")

guardians = media.Movie("Guardians of the Galaxy", "Take my hand",
                        "http://1.media.dorkly.cvcdn.com/26/95/18b149286ca6f2920e017bd5d2ffcbf5.jpg",
                        "https://www.youtube.com/watch?v=2LIQ2-PZBC8")

movies = [avatar, toy_story, inception, dark_knight, interstellar, guardians]

create_movie_tiles_content(movies)
open_movies_page(movies)
