import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SessionData {
  id: string;
  patientInfo: {
    name: string;
  };
  date: string;
  duration: string;
}

interface RecentSessionCardProps {
  session: SessionData;
}

const RecentSessionCard: React.FC<RecentSessionCardProps> = ({ session }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/report/${session.id}`)}
      className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 hover:shadow-sm cursor-pointer transition-all"
    >
      <h4 className="font-medium text-gray-800">{session.patientInfo.name}</h4>
      <p className="text-sm text-gray-500">{new Date(session.date).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500">Duration: {session.duration}</p>
    </div>
  );
};

export default RecentSessionCard;