import webbrowser

class Movie():
    """Class for storing information about movies"""

    def __init__(self, title, storyline, poster_url, trailer_url):
        """ Create a new movie"""
        self.title = title
        self.storyline = storyline
        self.poster_url = poster_url
        self.trailer_url = trailer_url
        
    def show_trailer(self):
        """Opens a window with the movie's trailer url"""
        webbrowser.open(self.trailer_url)
