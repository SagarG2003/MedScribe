import React, { useState } from 'react';
import { Save, Info } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    general: {
      autoSave: true,
      darkMode: false,
      enableNotifications: true
    },
    transcription: {
      language: 'en-US',
      punctuation: true,
      interimResults: true,
      continuousRecording: true
    },
    reporting: {
      autoGenerateReport: true,
      highlightMedicalTerms: true,
      exportFormat: 'pdf'
    }
  });
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: checked
      }
    });
  };
  
  const handleTranscriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setSettings({
      ...settings,
      transcription: {
        ...settings.transcription,
        [name]: newValue
      }
    });
  };
  
  const handleReportingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setSettings({
      ...settings,
      reporting: {
        ...settings.reporting,
        [name]: newValue
      }
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to local storage or backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          <button 
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Save Settings</span>
          </button>
        </div>
        
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-4">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="autoSave" className="font-medium text-gray-700">
                    Auto-save transcriptions
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically save transcriptions while recording
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="autoSave"
                    name="autoSave"
                    checked={settings.general.autoSave}
                    onChange={handleGeneralChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="autoSave"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.general.autoSave ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.general.autoSave ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="darkMode" className="font-medium text-gray-700">
                    Dark Mode
                  </label>
                  <p className="text-sm text-gray-500">
                    Enable dark mode for the application
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="darkMode"
                    name="darkMode"
                    checked={settings.general.darkMode}
                    onChange={handleGeneralChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="darkMode"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.general.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.general.darkMode ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="enableNotifications" className="font-medium text-gray-700">
                    Notifications
                  </label>
                  <p className="text-sm text-gray-500">
                    Receive notifications about completed transcriptions
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="enableNotifications"
                    name="enableNotifications"
                    checked={settings.general.enableNotifications}
                    onChange={handleGeneralChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="enableNotifications"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.general.enableNotifications ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.general.enableNotifications ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Transcription Settings</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="language" className="block font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={settings.transcription.language}
                  onChange={handleTranscriptionChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-GB">English (UK)</option>
                  <option value="es-ES">Spanish</option>
                  <option value="fr-FR">French</option>
                  <option value="de-DE">German</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="punctuation" className="font-medium text-gray-700">
                    Automatic Punctuation
                  </label>
                  <p className="text-sm text-gray-500">
                    Add punctuation to transcribed text automatically
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="punctuation"
                    name="punctuation"
                    checked={settings.transcription.punctuation}
                    onChange={handleTranscriptionChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="punctuation"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.transcription.punctuation ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.transcription.punctuation ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="interimResults" className="font-medium text-gray-700">
                    Show Interim Results
                  </label>
                  <p className="text-sm text-gray-500">
                    Display partial transcription results while speaking
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="interimResults"
                    name="interimResults"
                    checked={settings.transcription.interimResults}
                    onChange={handleTranscriptionChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="interimResults"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.transcription.interimResults ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.transcription.interimResults ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-lg font-medium text-gray-800 mb-4">Reporting Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="autoGenerateReport" className="font-medium text-gray-700">
                    Auto-generate Reports
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically generate reports after transcription
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="autoGenerateReport"
                    name="autoGenerateReport"
                    checked={settings.reporting.autoGenerateReport}
                    onChange={handleReportingChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="autoGenerateReport"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.reporting.autoGenerateReport ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.reporting.autoGenerateReport ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor="highlightMedicalTerms" className="font-medium text-gray-700">
                    Highlight Medical Terms
                  </label>
                  <p className="text-sm text-gray-500">
                    Automatically highlight medical terms in transcriptions
                  </p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                  <input
                    type="checkbox"
                    id="highlightMedicalTerms"
                    name="highlightMedicalTerms"
                    checked={settings.reporting.highlightMedicalTerms}
                    onChange={handleReportingChange}
                    className="opacity-0 w-0 h-0"
                  />
                  <label
                    htmlFor="highlightMedicalTerms"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      settings.reporting.highlightMedicalTerms ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute left-1 bottom-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        settings.reporting.highlightMedicalTerms ? 'transform translate-x-6' : ''
                      }`}
                    ></span>
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="exportFormat" className="block font-medium text-gray-700 mb-1">
                  Default Export Format
                </label>
                <select
                  id="exportFormat"
                  name="exportFormat"
                  value={settings.reporting.exportFormat}
                  onChange={handleReportingChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="docx">Word (DOCX)</option>
                  <option value="txt">Plain Text (TXT)</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-800 rounded-md">
            <div className="mt-0.5">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Browser Compatibility</h4>
              <p className="text-sm">
                Speech recognition works best in Chrome, Edge, and Safari browsers.
                For optimal performance, please use one of these supported browsers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;