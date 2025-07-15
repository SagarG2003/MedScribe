// Description: This is the main entry point of the application. It sets up the routing for the application using Reaact Router.
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import RecordSession from './pages/RecordSession';
import SessionHistory from './pages/SessionHistory';
import Settings from './pages/Settings';
import ReportView from './pages/ReportView';
import Auth from './pages/Auth';
import LandingPage from './pages/LandingPage'; 
import { useAuth } from './hooks/useAuth';

function App() {
  const { session } = useAuth();

  if (!session) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/auth" element={<Auth />} /> 
          <Route path="*" element={<Navigate to="/" replace />} /> 
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="record" element={<RecordSession />} />
          <Route path="history" element={<SessionHistory />} />
          <Route path="settings" element={<Settings />} />
          <Route path="report/:id" element={<ReportView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;