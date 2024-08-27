// Import Bibliotecas
import { BrowserRouter as Router } from 'react-router-dom';

// Import Componentes
import MyRoutes from './routes/MyRoutes'

// Import CSS
import './style/global.css'

const App = () => {
    return (
        <Router>
            <MyRoutes /> 
        </Router>
    )
}

export default App