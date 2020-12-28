// Importar librerías
import React, { useContext } from 'react';

// Importar context
import ArticleContext from '../context/articleContext';

const Alert = () => {
    // Definir context
    const articleContext = useContext(ArticleContext);
    const { message } = articleContext;

    // Renderizar componente
    return (
        <div className="alert-container">
            {message}
        </div>
    );
}

export default Alert;