import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Clock, 
  FileText, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import RecentSessionCard from '../components/dashboard/RecentSessionCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const doctorName = user?.user_metadata?.name || 'Doctor';
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    setRecentSessions(sessions);
  }, []);

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Welcome, Dr {doctorName}</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <button 
          onClick={() => navigate('/record')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mic className="h-6 w-6 text-blue-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">New Transcription</h3>
          <p className="text-gray-600 text-sm mt-1">Record a new patient session</p>
        </button>
        
        <button 
          onClick={() => navigate('/history')}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Session History</h3>
          <p className="text-gray-600 text-sm mt-1">View and manage past sessions</p>
        </button>
        
        <button 
          onClick={() => window.location.href = 'https://www.jotform.com/form-templates/medical-report-form'}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">Report Templates</h3>
          <p className="text-gray-600 text-sm mt-1">Manage Medical report templates</p>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Stats Overview</h3>
          <span className="text-sm text-gray-500">Last 30 days</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Mic className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sessions</p>
              <p className="text-xl font-semibold text-gray-800">15</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-teal-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Hours</p>
              <p className="text-xl font-semibold text-gray-800">5.4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Patients</p>
              <p className="text-xl font-semibold text-gray-800">20</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">Recent Sessions</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View all
          </button>
        </div>
        
        <div className="space-y-4">
          {recentSessions.map((session) => (
            <RecentSessionCard session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;