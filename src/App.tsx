import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppLayout } from './components/AppLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Loading } from './components/Loading'

// Lazy load pages
const Dashboard = lazy(() => import('./pages/dashboard'))
const Cards = lazy(() => import('./pages/cards'))
const Transactions = lazy(() => import('./pages/transactions'))
const Settings = lazy(() => import('./pages/settings'))

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
  )
}

export default App
