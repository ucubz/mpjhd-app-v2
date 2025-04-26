// App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { MPJHDProvider } from './context/MPJHDContext';

const App = () => (
  <MPJHDProvider>
    <Router>
      <Routes />
    </Router>
  </MPJHDProvider>
);

export default App;