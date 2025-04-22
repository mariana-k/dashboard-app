import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { Dashboard } from './pages/dashboard';
import { Cards } from './pages/cards';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;