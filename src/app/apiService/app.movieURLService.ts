const API_KEY  = '0920ab6465d4820a807193b5d5056ece';

const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY + '&language=en-US';

const MOVIES_URL  = 'https://api.themoviedb.org/3/discover/movie?api_key=' + API_KEY;  

const SEARCH_MOVIES_URL =  'https://api.themoviedb.org/3/search/movie?api_key=';

export class MovieURLService {

    constructor() {}

    private getTodaysDate(){
        const today = new Date();

        return today.getFullYear() + "-" + 
                ( today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1 ) + "-" +
                ( today.getDate() < 10 ? "0" + today.getDate() : today.getDate() );
    }

    private getDaysPassedDate() {
        const previousDate = new Date();
        previousDate.setDate( previousDate.getDate() - 30 );

        return previousDate.getFullYear() + "-" + 
                ( previousDate.getMonth() + 1 < 10 ? "0" + (previousDate.getMonth() + 1) : previousDate.getMonth() + 1 ) + "-" +
                ( previousDate.getDate() < 10 ? "0" + previousDate.getDate() : previousDate.getDate() );
    }

    getGenreURL() {
        return GENRE_URL;
    }

    getMoviesURL(genreId: number, pageNumber: number = 1) {
        return MOVIES_URL + '&primary_release_date.gte=' + this.getDaysPassedDate() + '&primary_release_date.lte=' + this.getTodaysDate() + '&page=' + pageNumber + '&with_genres=' + genreId;
    }

    getRecentMoviesURL(pageNumber: number = 1) {
        return MOVIES_URL + '&primary_release_date.gte=' + this.getDaysPassedDate() + '&primary_release_date.lte=' + this.getTodaysDate() + '&page=' + pageNumber;
    }

    getSearchURL() {
        return SEARCH_MOVIES_URL + API_KEY + '&query=';
    }

    getSuggestionURL(keyword) {
        return SEARCH_MOVIES_URL + API_KEY + '&language=en-US&query=' + keyword + '&page=1&include_adult=false';
    }
}
