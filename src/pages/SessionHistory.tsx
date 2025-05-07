import React, { useState } from 'react';
import { Search, Calendar, Clock, Filter, Download } from 'lucide-react';

const SessionHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');


  const sessions = [
    {
      id: '1',
      patientName: 'Sagar',
      date: '2025-04-15',
      time: '09:30 AM',
      duration: '15 min',
      status: 'Completed',
      reason: 'Chest pain follow-up'
    },
    {
      id: '2',
      patientName: 'Virat Kohli',
      date: '2025-04-14',
      time: '02:15 PM',
      duration: '22 min',
      status: 'Completed',
      reason: 'Annual check-up'
    },
    {
      id: '3',
      patientName: 'Sagar Guney',
      date: '2025-04-13',
      time: '11:00 AM',
      duration: '18 min',
      status: 'Completed',
      reason: 'Medication review'
    },
    {

      id: '4',
      patientName: 'Shane John',
      date: '2025-03-29',
      time: '10:15 AM',
      duration: '30 min',
      status: 'Completed',
      reason: 'Diabetes management'
    },
    {
      id: '5',
      patientName: 'Rajesh Kumar',
      date: '2025-03-09',
      time: '01:30 PM',
      duration: '20 min',
      status: 'Completed',
      reason: 'Post-surgery check-up'
    }
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearchTerm = session.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateFilter = !dateFilter || session.date === dateFilter;

    return matchesSearchTerm && matchesDateFilter;
  });

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by patient name or reason"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{session.patientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{formatDate(session.date)}</div>
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {session.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{session.reason}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {session.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Export
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSessions.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No sessions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;