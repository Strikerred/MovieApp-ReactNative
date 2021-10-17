import {
    MOVIES_LIST,
    MOVIES_LIST_,
    UPDATE_SEARCH,
} from '../actions/movies';

const movies = (
    state = {
        moviesList: [],
        searchMovies: [],
        isLoading: true,
        search: '',
    },
    action,
) => {
    switch(action.type){
        case MOVIES_LIST:
            return {
                ...state,
                moviesList: action.payload,
            };
        case MOVIES_LIST_:
            return {
                ...state,
                searchMovies: action.payload,
            };
        case UPDATE_SEARCH:
            return{
                ...state, 
                search: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};

export default movies;