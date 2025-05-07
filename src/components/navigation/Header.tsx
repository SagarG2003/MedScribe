import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const getPageTitle = (path: string) => {
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/record':
        return 'Record Session';
      case '/history':
        return 'Session History';
      case '/settings':
        return 'Settings';
      default:
        if (path.startsWith('/report/')) {
          return 'Patient Report';
        }
        return 'MediScribe';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="md:hidden mr-2 rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{getPageTitle(location.pathname)}</h1>
      </div>
      
      <div className="flex items-center space-x-3">
        <button className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="h-full w-64 bg-white shadow-lg">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-800">MediScribe</h1>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <nav className="flex-1 pt-4">
              <button 
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              
              <button 
                onClick={() => {
                  navigate('/record');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  location.pathname === '/record' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Record Session
              </button>
              
              <button 
                onClick={() => {
                  navigate('/history');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  location.pathname === '/history' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Session History
              </button>
              
              <button 
                onClick={() => {
                  navigate('/settings');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium ${
                  location.pathname === '/settings' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;