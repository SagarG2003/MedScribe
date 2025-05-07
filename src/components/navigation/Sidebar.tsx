import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mic, Home, History, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const doctorName = user?.user_metadata?.name || 'Doctor';
  const specialty = user?.user_metadata?.specialty || 'Medical Professional';

  return (
    <div className="hidden md:flex md:flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Mic className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">MedScribe</h1>
        </div>
        <p className="text-xs text-gray-500 mt-1">Medical Transcription Assistant</p>
      </div>
      
      <nav className="flex-1 pt-4">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 text-sm font-medium ${
              isActive 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
          end
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/record" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 text-sm font-medium ${
              isActive 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Mic className="h-5 w-5" />
          <span>Record Session</span>
        </NavLink>
        
        <NavLink 
          to="/history" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 text-sm font-medium ${
              isActive 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <History className="h-5 w-5" />
          <span>Session History</span>
        </NavLink>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 text-sm font-medium ${
              isActive 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:bg-gray-100'
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-semibold">
            {doctorName.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">{doctorName}</p>
            <p className="text-xs text-gray-500 truncate">{specialty}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;