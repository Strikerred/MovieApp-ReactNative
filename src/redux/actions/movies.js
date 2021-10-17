import axios from 'axios';
import {MovieDBAPI, SearchMovieAPI} from '../../constants/index';
import * as RootNavigation from '../../navigation/RootNavigation';

export const MOVIES_LIST = 'MOVIES_LIST';
export const SEARCH_MOVIE = 'SEARCH_MOVIE';
export const MOVIES_LIST_ = 'MOVIES_LIST_';

export const movie = movie => {
    return {
      type: SEARCH_MOVIE,
      movie: movie.trim(),
      error: '',
    };
  };

export const searchResults = body => {
    return async dispatch => {
        try{
            const response = await axios.get(SearchMovieAPI + body);
            if(response.status === 200 && response.data.results.length > 0){
                dispatch({
                    type: MOVIES_LIST_,
                    payload: response.data.results
                });
            }
        } catch (e){
            console.log(e);
        }        
    };  
}

export const getMovies = () => {
    return async dispatch => {
        try{
            const response = await axios.get(MovieDBAPI);
            if(response.status === 200 && response.data.results.length > 0){
                dispatch({
                    type: MOVIES_LIST,
                    payload: response.data.results
                });
            }
        } catch (e){
            console.log(e);
        }        
    };
};

