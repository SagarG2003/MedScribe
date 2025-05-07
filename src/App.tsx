import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RecordSession from './pages/RecordSession';
import SessionHistory from './pages/SessionHistory';
import Settings from './pages/Settings';
import ReportView from './pages/ReportView';
import Auth from './pages/Auth';
import { useAuth } from './hooks/useAuth';

function App() {
  const { session } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={session ? <Navigate to="/app" replace /> : <LandingPage />} 
        />
        
        <Route 
          path="/auth" 
          element={session ? <Navigate to="/app" replace /> : <Auth />} 
        />
        
        {/* Protected app routes */}
        {session ? (
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="record" element={<RecordSession />} />
            <Route path="history" element={<SessionHistory />} />
            <Route path="settings" element={<Settings />} />
            <Route path="report/:id" element={<ReportView />} />
          </Route>
        ) : (
          <Route path="/app/*" element={<Navigate to="/auth" replace />} />
        )}
        
        {/* Catch all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;