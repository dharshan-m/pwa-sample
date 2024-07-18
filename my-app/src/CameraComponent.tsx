import React, { useRef, useEffect } from 'react';

const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const getUserMedia = async (facingMode: 'user' | 'environment') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleStop = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
      <button onClick={() => getUserMedia('user')}>Front Camera</button>
      <button onClick={() => getUserMedia('environment')}>Back Camera</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default CameraComponent;
