import axios from 'axios';
import {MovieDBAPI} from '../../constants/index';
import * as RootNavigation from '../../navigation/RootNavigation';

export const MOVIES_LIST = 'MOVIES_LIST';

export const setSearch = search => {
    return {
      type: UPDATE_SEARCH,
      search: search.trim(),
      error: '',
    };
  };

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