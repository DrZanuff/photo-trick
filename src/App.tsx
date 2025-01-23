import { useState, useRef } from 'react';
import { FRAMES } from '@/constants/frames';
import { H_SIZE, W_SIZE } from './constants/sizes';

export const App = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  const checkCameraAccess = async () => {
    try {
      // Obter o stream da câmera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setHasCamera(true);
      setIsStreaming(true);
    } catch (error) {
      alert('Câmera não disponível ou acesso negado.');
      setHasCamera(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current && selectedFrame) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const frameImage = new Image();
        frameImage.src = selectedFrame;
        frameImage.onload = () => {
          context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        };
      }
    }
  };

  return (
    <div>
      <h1>Photo-trick</h1>

      {!isStreaming && (
        <button onClick={checkCameraAccess}>
          {hasCamera ? 'Ativar Câmera' : 'Permitir Acesso à Câmera'}
        </button>
      )}

      <div style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: 'auto',
            display: isStreaming ? 'block' : 'none',
          }}
        />
        {selectedFrame && (
          <img
            src={selectedFrame}
            alt="Selected Frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <div>
        <h3>Escolha um Frame:</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {FRAMES.map((frame, index) => (
            <img
              key={index}
              src={frame}
              alt={`Frame ${index + 1}`}
              style={{
                width: '100px',
                height: 'auto',
                cursor: 'pointer',
                border: selectedFrame === frame ? '2px solid blue' : 'none',
              }}
              onClick={() => setSelectedFrame(frame)}
            />
          ))}
        </div>
      </div>

      {isStreaming && selectedFrame && (
        <button onClick={takePhoto}>Tirar Foto</button>
      )}

      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          marginTop: '20px',
          width: '100%',
          maxWidth: `${W_SIZE}px`,
        }}
        width={`${W_SIZE}`}
        height={`${H_SIZE}`}
      />
    </div>
  );
};
