// Importar librerías
import React, { useContext, useEffect } from 'react';
import moment from 'moment';

// Importar otros componentes
import Alert from './Alert';
import { ReactComponent as TrashIcon } from '../icons/smart-trash.svg';

// Importar context
import ArticleContext from '../context/articleContext';

moment.locale('en');

const ArticlesList = () => {
    // Definir context
    const articleContext = useContext(ArticleContext);
    const { articles, loading, message, deleteArticle, getArticles, switchLoading } = articleContext;

    // Definir effect para obtener la información de los artículos
    useEffect(() => {
        switchLoading(true);
        getArticles();
        switchLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Definir funciones
    /**
     *
     * @param {*} article
     * Abre en un nueva ventana la url del artículo seleccionado en caso de existir.
     */
    const openURL = (article) => {
        if (article.story_url) {
            window.open(article.story_url);
        } else if (article.url) {
            window.open(article.url);
        } else {
            console.log('No existe una url asociada a este artículo');
        };
    };

    /**
     *
     * @param {*} article
     * Elimina un artículo de la lista.
     */
    const removeArticle = (article) => {
        switchLoading(true);
        deleteArticle(article);
        switchLoading(false);
    };

    // Renderizar componente
    return (
        <>
            {message && <Alert />}
            {loading ? (
                <h1 style={{ textAlign: 'center' }}>Cargando Artículos</h1>
            ) : (
                    <>
                        {articles.length === 0 ? (
                            <h1 style={{ textAlign: 'center' }}>No existen Artículos Disponibles</h1>
                        ) : (
                                articles.map((article, index) => (
                                    <div key={index} className="articles-container">
                                        <div key={index} className="articles-content" onClick={() => openURL(article)}>
                                            <p className="article-title">{article.story_title || article.title} <span className="article-author">- {article.author} -</span></p>
                                            <p className="article-time">{moment(article.created_at).format('MMM DD')}</p>
                                        </div>
                                        <div className="time-trash-container">
                                            <TrashIcon onClick={() => removeArticle(article)} />
                                        </div>
                                    </div>
                                ))
                            )}
                    </>
                )}
        </>
    );
}
export default ArticlesList;