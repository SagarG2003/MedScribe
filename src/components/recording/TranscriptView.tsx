import React, { useState, useEffect } from 'react';
import { ComprehendMedicalClient, DetectEntitiesV2Command } from '@aws-sdk/client-comprehendmedical';

interface TranscriptViewProps {
  transcript: string;
  isEditing: boolean;
  editableTranscript: string;
  setEditableTranscript: (transcript: string) => void;
  setMedicalTerms: (terms: {
    phi: string[];
    symptoms: string[];
    diagnosis: string[];
    followUp: string[];
  }) => void;
}

const TranscriptView: React.FC<TranscriptViewProps> = ({
  transcript,
  isEditing,
  editableTranscript,
  setEditableTranscript,
  setMedicalTerms,
}) => {
  const placeholderText = 'Transcript will appear here as you speak...';
  const [highlightedTranscript, setHighlightedTranscript] = useState<string>('');

  useEffect(() => {
    const highlightMedicalTerms = async (text: string) => {
      if (!text) return;

      const client = new ComprehendMedicalClient({
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'AKIA5FTY675QX7Q3N2KO',
          secretAccessKey: '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',
        },
      });
      const command = new DetectEntitiesV2Command({ Text: text });

      try {
        const response = await client.send(command);
        let highlightedText = text;

        const extractedTerms = {
          phi: [] as string[],
          symptoms: [] as string[],
          diagnosis: [] as string[],
          followUp: [] as string[],
          medication: [] as string[],
        };

        const followUpPhrases = [
          'follow up in 2 weeks',
          'schedule an appointment',
          'refer to specialist',
          'blood test',
          'medication refill',
          'physical therapy',
        ];

        followUpPhrases.forEach((phrase) => {
          const regex = new RegExp(`(${phrase})`, 'gi');
          if (regex.test(text)) {
            extractedTerms.followUp.push(phrase);
            highlightedText = highlightedText.replace(
              regex,
              `<span class="bg-green-100 text-green-800 px-1 rounded">$1</span>`
            );
          }
        });

        if (response.Entities) {
          response.Entities.forEach((entity) => {
            if (entity.Text && entity.Category) {
              const categoryClassMap: Record<string, string> = {
                PROTECTED_HEALTH_INFORMATION: 'bg-blue-100 text-blue-800',
                MEDICAL_CONDITION: 'bg-red-100 text-red-800',
                ANATOMY: 'bg-amber-100 text-amber-800',
                TREATMENT: 'bg-green-100 text-green-800',
              };

              const cssClass = categoryClassMap[entity.Category] || 'bg-gray-100 text-gray-800';
              const regex = new RegExp(`(${entity.Text})`, 'gi');
              highlightedText = highlightedText.replace(
                regex,
                `<span class="${cssClass} px-1 rounded">$1</span>`
              );

              // Categorize extracted terms
              if (String(entity.Category) === 'PROTECTED_HEALTH_INFORMATION') extractedTerms.phi.push(entity.Text);
              if (entity.Category === 'MEDICAL_CONDITION') extractedTerms.symptoms.push(entity.Text);
              if (entity.Category === 'ANATOMY') extractedTerms.diagnosis.push(entity.Text);
              if (entity.Category === 'TEST_TREATMENT_PROCEDURE') extractedTerms.followUp.push(entity.Text);
              if (entity.Category === 'MEDICATION') {
                extractedTerms.medication.push(entity.Text);
              }
            }
          });
        }

        console.log('Extracted Medical Terms:', extractedTerms);
        setHighlightedTranscript(highlightedText);
        setMedicalTerms(extractedTerms);
      } catch (error) {
        console.error('Error detecting medical entities:', error);
      }
    };

    highlightMedicalTerms(transcript);
  }, [transcript, setMedicalTerms]);

  if (isEditing) {
    return (
      <textarea
        className="w-full h-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        value={editableTranscript}
        onChange={(e) => setEditableTranscript(e.target.value)}
      />
    );
  }

  if (!transcript) {
    return (
      <div className="h-full flex items-center justify-center p-8 text-gray-400 italic text-center">
        {placeholderText}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-md h-full overflow-y-auto">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: highlightedTranscript }}
      />
    </div>
  );
};

export default TranscriptView;