import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Pause, Play, Save, Edit2, Trash2 } from 'lucide-react';
import RecordingVisualizer from '../components/recording/RecordingVisualizer';
import TranscriptView from '../components/recording/TranscriptView';
import MedicalTermsPanel from '../components/recording/MedicalTermsPanel';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
// import jsPDF from 'jspdf';

const RecordSession: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    id: '',
    dob: '',
    reason: ''
  });
  
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport
  } = useSpeechRecognition();
  
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableTranscript, setEditableTranscript] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [medicalTerms, setMedicalTerms] = useState({
    phi: [] as string[],
    symptoms: [] as string[],
    diagnosis: [] as string[],
    followUp: [] as string[]
  });
  
  useEffect(() => {
    if (transcript) {
      const extractedTerms = {
        phi: extractPHI(transcript),
        symptoms: extractSymptoms(transcript),
        diagnosis: extractDiagnosis(transcript),
        followUp: extractFollowUp(transcript)
      };
      
      setMedicalTerms(extractedTerms);
    }
  }, [transcript]);

  useEffect(() => {
  }, [medicalTerms]);
  
  const extractPHI = (text: string) => {
    const phiTerms = [
      'John Doe', '45-year-old', 'male', 'DOB: 05/12/1980',
      'phone number', 'address', 'email', 'insurance ID'
    ];
    return phiTerms.filter(term => text.toLowerCase().includes(term.toLowerCase()));
  };
  
  const extractSymptoms = (text: string) => {
    const symptomTerms = [
      'chest pain', 'shortness of breath', 'dizziness', 'fatigue',
      'headache', 'nausea', 'fever', 'cough', 'sore throat'
    ];
    return symptomTerms.filter(term => text.toLowerCase().includes(term.toLowerCase()));
  };
  
  const extractDiagnosis = (text: string) => {
    const diagnosisTerms = [
      'hypertension', 'diabetes', 'asthma', 'heart disease',
      'viral infection', 'bronchitis', 'allergic reaction'
    ];
    return diagnosisTerms.filter(term => text.toLowerCase().includes(term.toLowerCase()));
  };
  
  const extractFollowUp = (text: string) => {
    const followUpTerms = [
      'follow up in 2 weeks', 'schedule an appointment', 'refer to specialist',
      'blood test', 'medication refill', 'physical therapy'
    ];
    return followUpTerms.filter(term => text.toLowerCase().includes(term.toLowerCase()));
  };
  
  // Timer functionality
  useEffect(() => {
    if (isListening && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isListening, isPaused]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleStartRecording = () => {
    if (!isListening) {
      startListening();
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };
  
  const handlePauseRecording = () => {
    if (isListening && !isPaused) {
      setIsPaused(true);
      stopListening();
    }
  };
  
  const handleStopRecording = () => {
    stopListening();
    setIsPaused(false);
  };
  
  const handleReset = () => {
    resetTranscript();
    setRecordingTime(0);
    setIsPaused(false);
    setMedicalTerms({
      phi: [],
      symptoms: [],
      diagnosis: [],
      followUp: []
    });
  };
  
  const handleSave = () => {
    if (!transcript) {
      alert('No transcript available to save.');
      return;
    }

    const sessionData = {
      id: Date.now().toString(), // Unique session ID
      patientInfo,
      transcript,
      medicalSummary: medicalTerms,
      date: new Date().toISOString(),
      duration: formatTime(recordingTime),
    };

    // Save to local storage
    const existingSessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    localStorage.setItem('sessions', JSON.stringify([...existingSessions, sessionData]));

    alert('Session saved successfully!');
  };
  
  const handleEditTranscript = () => {
    setIsEditing(true);
    setEditableTranscript(transcript);
  };
  
  const handleSaveEdit = () => {
    setIsEditing(false);
  };
  
  useEffect(() => {
    if (!hasRecognitionSupport) {
      alert('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
    }
  }, [hasRecognitionSupport]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Patient Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient name"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient ID
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter patient ID"
              value={patientInfo.id}
              onChange={(e) => setPatientInfo({...patientInfo, id: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={patientInfo.dob}
              onChange={(e) => setPatientInfo({...patientInfo, dob: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter reason for visit"
              value={patientInfo.reason}
              onChange={(e) => setPatientInfo({...patientInfo, reason: e.target.value})}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recording</h2>
          <div className="flex items-center gap-2">
            <div className={`h-2.5 w-2.5 rounded-full ${isListening && !isPaused ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span className="text-sm font-medium">
              {isListening && !isPaused ? 'Recording' : isPaused ? 'Paused' : 'Ready'}
            </span>
            <span className="text-sm text-gray-500 ml-2">{formatTime(recordingTime)}</span>
          </div>
        </div>
        
        <div className="flex justify-center mb-4">
          <RecordingVisualizer isRecording={isListening && !isPaused} />
        </div>
        
        <div className="flex justify-center space-x-4 mb-6">
          {!isListening || isPaused ? (
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              disabled={!hasRecognitionSupport}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              {isPaused ? 'Resume' : 'Start Recording'}
            </button>
          ) : (
            <button
              onClick={handlePauseRecording}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
            >
              <Pause className="h-5 w-5" />
              Pause
            </button>
          )}
          
          <button
            onClick={handleStopRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            disabled={!isListening && !isPaused}
          >
            <MicOff className="h-5 w-5" />
            Stop
          </button>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            disabled={!transcript}
          >
            <Trash2 className="h-5 w-5" />
            Reset
          </button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Transcript</h2>
              {transcript && !isEditing && (
                <button
                  onClick={handleEditTranscript}
                  className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
              )}
              {isEditing && (
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <TranscriptView 
                transcript={transcript} 
                isEditing={isEditing}
                editableTranscript={editableTranscript}
                setEditableTranscript={setEditableTranscript}
                setMedicalTerms={setMedicalTerms} // Pass the setter function for medical terms
              />
            </div>
            
            {transcript && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-5 w-5" />
                  Save Report
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <MedicalTermsPanel terms={medicalTerms} />
        </div>
      </div>
    </div>
  );
};

export default RecordSession;