// Importar librerías
import {
    SWITCH_LOADING,
    SUCCESSFUL_GET_ARTICLES,
    FAILED_GET_ARTICLES,
    SUCCESSFUL_DELETE_ARTICLE,
    FAILED_DELETE_ARTICLE,
} from '../types';

// Definir Reducer
const articleReducer = (state, action) => {
    switch (action.type) {
        case SUCCESSFUL_DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.payload)
            };
        case FAILED_DELETE_ARTICLE:
        case FAILED_GET_ARTICLES:
            return {
                ...state,
                message: action.payload,
            };
        case SUCCESSFUL_GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
            };
        case SWITCH_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state
    }
}

export default articleReducer;
