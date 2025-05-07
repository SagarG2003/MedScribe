import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Download, 
  Printer, 
  Edit2,
  User,
  Stethoscope,
  Clipboard,
  Calendar as CalendarIcon
} from 'lucide-react';

const ReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [report, setReport] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = () => {
      setLoading(true);

      // Simulate API fetch by retrieving data from localStorage
      setTimeout(() => {
        const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const session = sessions.find((s: any) => s.id === id);

        if (session) {
          setReport(session);
        } else {
          setReport(null);
        }

        setLoading(false);
      }, 1000); // Simulate network delay
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading report...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Report not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6 mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Patient Report</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{report.duration}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
                  <Edit2 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700">
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{report.patientInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient ID</p>
                  <p className="font-medium">{report.patientInfo.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">{new Date(report.patientInfo.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reason for Visit</p>
                  <p className="font-medium">{report.patientInfo.reason}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-800">Transcription</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-md whitespace-pre-line">{report.transcript}</div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Terms</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-md bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-700" />
                  </div>
                  <h4 className="font-medium text-gray-800">Patient Info (PHI)</h4>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <ul className="space-y-1.5">
                    {report.medicalSummary.phi.map((term: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm text-gray-600">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-md bg-amber-100 flex items-center justify-center">
                    <Stethoscope className="h-4 w-4 text-amber-700" />
                  </div>
                  <h4 className="font-medium text-gray-800">Symptoms</h4>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <ul className="space-y-1.5">
                    {report.medicalSummary.symptoms.map((term: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        <span className="text-sm text-gray-600">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-md bg-red-100 flex items-center justify-center">
                    <Clipboard className="h-4 w-4 text-red-700" />
                  </div>
                  <h4 className="font-medium text-gray-800">Diagnosis</h4>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <ul className="space-y-1.5">
                    {report.medicalSummary.diagnosis.map((term: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                        <span className="text-sm text-gray-600">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-7 w-7 rounded-md bg-green-100 flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-green-700" />
                  </div>
                  <h4 className="font-medium text-gray-800">Follow-up</h4>
                </div>
                <div className="bg-gray-50 rounded-md p-3">
                  <ul className="space-y-1.5">
                    {report.medicalSummary.followUp.map((term: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="text-sm text-gray-600">{term}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;