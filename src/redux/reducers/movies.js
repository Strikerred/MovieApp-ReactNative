import {
    MOVIES_LIST,
    UPDATE_SEARCH,
} from '../actions/movies';

const movies = (
    state = {
        moviesList: [],
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