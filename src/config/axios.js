// Importar librerías
import axios from 'axios';

// Definir cliente axios
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BANCKEND_URL
})

// Exportar cliente axios
export default axiosClient;