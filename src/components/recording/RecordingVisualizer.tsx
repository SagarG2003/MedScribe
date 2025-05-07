import React, { useEffect, useRef, useState } from 'react';

interface RecordingVisualizerProps {
  isRecording: boolean;
}

const RecordingVisualizer: React.FC<RecordingVisualizerProps> = ({ isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barCount] = useState(50);
  const requestRef = useRef<number>();
  
  // Mock audio data for visualization
  const getRandomValue = () => {
    if (isRecording) {
      return Math.random() * 50 + 5;
    }
    return 5; // Minimal height when not recording
  };
  
  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / barCount;
    const heightScale = canvas.height / 60;
    
    for (let i = 0; i < barCount; i++) {
      const height = getRandomValue() * heightScale;
      const x = i * barWidth;
      const y = (canvas.height - height) / 2;
      
      // Create a gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + height);
      gradient.addColorStop(0, '#3B82F6'); // blue-500
      gradient.addColorStop(1, '#60A5FA'); // blue-400
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 1, height);
    }
    
    requestRef.current = requestAnimationFrame(renderFrame);
  };
  
  useEffect(() => {
    if (isRecording) {
      requestRef.current = requestAnimationFrame(renderFrame);
    } else if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      
      // Draw flat line when not recording
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const barWidth = canvas.width / barCount;
          const height = 5;
          const heightScale = canvas.height / 60;
          
          for (let i = 0; i < barCount; i++) {
            const x = i * barWidth;
            const y = (canvas.height - height * heightScale) / 2;
            
            ctx.fillStyle = '#D1D5DB'; // gray-300
            ctx.fillRect(x, y, barWidth - 1, height * heightScale);
          }
        }
      }
    }
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, barCount]);

  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={100} 
      className="rounded-lg bg-gray-50 border border-gray-200"
    />
  );
};

export default RecordingVisualizer;