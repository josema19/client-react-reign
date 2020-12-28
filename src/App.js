// Importar otros Componentes
import Header from './components/Header';
import ArticlesList from './components/ArticlesList';

// Importar State
import ArticleState from './context/articleState';

const App = () => (
  <ArticleState>
    <Header />
    <ArticlesList />
  </ArticleState>
)

export default App;
