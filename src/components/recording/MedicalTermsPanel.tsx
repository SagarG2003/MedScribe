import React from 'react';
import { User, Stethoscope, Clipboard, Calendar } from 'lucide-react';

interface MedicalTermsPanelProps {
  terms: {
    phi: string[];
    symptoms: string[];
    diagnosis: string[];
    followUp: string[];
  };
}

const MedicalTermsPanel: React.FC<MedicalTermsPanelProps> = ({ terms }) => {
  console.log('Medical Terms in Panel:', terms);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Medical Summary</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-7 w-7 rounded-md bg-blue-100 flex items-center justify-center">
              <User className="h-4 w-4 text-blue-700" />
            </div>
            <h3 className="font-medium text-gray-800">Patient Info (PHI)</h3>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <ul className="space-y-1.5">
              {terms.phi.map((term, index) => (
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
            <h3 className="font-medium text-gray-800">Symptoms</h3>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <ul className="space-y-1.5">
              {terms.symptoms.map((term, index) => (
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
            <h3 className="font-medium text-gray-800">Diagnosis</h3>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <ul className="space-y-1.5">
              {terms.diagnosis.map((term, index) => (
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
              <Calendar className="h-4 w-4 text-green-700" />
            </div>
            <h3 className="font-medium text-gray-800">Follow-up/Treatment</h3>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <ul className="space-y-1.5">
              {terms.followUp.map((term, index) => (
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
  );
};

export default MedicalTermsPanel;