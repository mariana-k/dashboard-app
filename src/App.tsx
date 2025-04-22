import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AppLayout } from './components/AppLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/dashboard'));
const Cards = lazy(() => import('./pages/cards'));
const Transactions = lazy(() => import('./pages/transactions'));
const Settings = lazy(() => import('./pages/settings'));

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppLayout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/cards" element={<Cards />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;