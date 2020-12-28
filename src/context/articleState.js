// Importar librerías
import React, { useReducer } from 'react';
import ArticleContext from './articleContext';
import ArticleReducer from './articleReducer';

// Importar acciones
import {
    SWITCH_LOADING,
    SUCCESSFUL_GET_ARTICLES,
    FAILED_GET_ARTICLES,
    SUCCESSFUL_DELETE_ARTICLE,
    FAILED_DELETE_ARTICLE,
} from '../types';

// Importar cliente axios
import axiosClient from '../config/axios';

const ArticleState = ({ children }) => {
    // Definir State Inicial
    const initialState = {
        articles: [],
        loading: null,
        message: null,
    };

    // Definir Reducer
    const [state, dispatch] = useReducer(ArticleReducer, initialState);

    // Definir funciones
    /**
     *
     * @param {*} article
     * Elimina la información de un artículo de la BD y de la lista de artículos.
     */
    const deleteArticle = async (article) => {
        try {
            await axiosClient.delete(`/api/articles/${article._id}`);
            dispatch({
                type: SUCCESSFUL_DELETE_ARTICLE,
                payload: article._id
            });

        } catch (error) {
            dispatch({
                type: FAILED_DELETE_ARTICLE,
                payload: error.response.data.msg,
            });
        };
    };

    /**
     * Obtiene todos los artículos de la BD.
     */
    const getArticles = async () => {
        try {
            // Obtener respuesta
            const response = await axiosClient.get('/api/articles');

            // Actualizar información del state
            dispatch({
                type: SUCCESSFUL_GET_ARTICLES,
                payload: response.data.articles,
            })
        } catch (error) {
            dispatch({
                type: FAILED_GET_ARTICLES,
                payload: error.response.data.msg,
            });
        };
    };

    /**
     *
     * @param {*} bool
     * Cambia de true a false y viceversa el estado de loading.
     */
    const switchLoading = (bool) => {
        dispatch({
            type: SWITCH_LOADING,
            payload: bool
        });
    };

    // Renderizar componente
    return (
        <ArticleContext.Provider
            value={{
                articles: state.articles,
                loading: state.loading,
                message: state.message,
                deleteArticle,
                getArticles,
                switchLoading,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
}

export default ArticleState;