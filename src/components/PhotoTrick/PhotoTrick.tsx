import { useState, useRef } from 'react';
import { H_SIZE, W_SIZE } from '@/constants/sizes';
import { VideoFeed } from '@/components/VideoFeed';
import { FrameSelector } from '@/components/FrameSelector';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import './PhotoTrick-styles.css';
import { PhotoModal } from '../PhotoModal';
import { Logo } from '../Logo';
import { Typography } from '@mui/material';

export const PhotoTrick = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSelectFrame = (frame: string) => {
    setSelectedFrame(frame);
  };

  const checkCameraAccess = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: W_SIZE, height: H_SIZE },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setHasCamera(true);
      setIsStreaming(true);
      setIsLoading(false);
    } catch (error) {
      alert('Câmera não disponível ou acesso negado.');
      setHasCamera(false);
      setIsLoading(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current && selectedFrame) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const video = videoRef.current;

      if (context) {
        // Set the canvas width and height to 1:1 ratio (smaller of the video width or height)
        const size = Math.min(video.videoWidth, video.videoHeight);
        canvas.width = size;
        canvas.height = size;

        // Calculate video dimensions to maintain the 16:9 aspect ratio
        const videoRatio = video.videoWidth / video.videoHeight;
        let drawWidth = size;
        let drawHeight = size;

        if (videoRatio > 1) {
          // If the video is wider (16:9), the drawing will be adjusted to the width
          drawHeight = size / videoRatio;
        } else {
          // If the video is taller (e.g., 9:16)
          drawWidth = size * videoRatio;
        }

        // Calculate the starting position (to center the content, if necessary)
        const offsetX = (size - drawWidth) / 2;
        const offsetY = (size - drawHeight) / 2;

        // Save the current context state to restore after the transformation
        context.save();

        // Flip the video horizontally (mirror effect)
        context.scale(-1, 1);
        // Draw the video on the canvas with proper cropping or resizing
        context.drawImage(
          video,
          0,
          0,
          video.videoWidth,
          video.videoHeight,
          -(offsetX + drawWidth), // Adjustment after flipping horizontally
          offsetY,
          drawWidth,
          drawHeight
        );

        // Restore the context to its original state
        context.restore();

        // Add the selected frame image
        const frameImage = new Image();
        frameImage.src = selectedFrame;
        frameImage.onload = () => {
          context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        };

        setIsModalOpen(true);
      }
    }
  };

  return (
    <div className={'PhotoTrick-container'}>
      <Stack direction="column" gap="20px">
        <Logo />
        <div className="PhotoTrick-body">
          <Box className="PhotoTrick-body-container" width={'100%'}>
            <Paper elevation={1} sx={{ minWidth: '100%' }}>
              <div className="PhotoTrick-feed-container">
                {!isStreaming && (
                  <Button
                    variant="contained"
                    color="warning"
                    loading={isLoading}
                    onClick={checkCameraAccess}
                    startIcon={<PhotoCameraIcon />}
                    sx={{ width: '90%' }}
                  >
                    {hasCamera ? 'ACTIVATE CAMERA' : 'ALLOW CAMERA ACCESS'}
                  </Button>
                )}

                <VideoFeed
                  isStreaming={isStreaming}
                  selectedFrame={selectedFrame}
                  ref={videoRef}
                />
              </div>
            </Paper>
          </Box>

          <div className="PhotoTrick-body-container PhotoTrick-body-container-mobile">
            <Stack direction="column" gap="20px" sx={{ width: '100%' }}>
              <Paper
                elevation={1}
                sx={{ width: '100%', height: 'fit-content' }}
              >
                <FrameSelector
                  handleSelectFrame={handleSelectFrame}
                  selectedFrame={selectedFrame}
                />
              </Paper>

              <Button
                variant="contained"
                color="info"
                disabled={!isStreaming || !selectedFrame}
                onClick={takePhoto}
                sx={{
                  borderRadius: '50%',
                  aspectRatio: '1/1',
                  maxWidth: '64px',
                  margin: '0 auto',
                }}
              >
                <PhotoCameraIcon />
              </Button>

              <Typography color="warning">
                <i>Allow camera access, select a frame then take a photo!</i>
              </Typography>
            </Stack>
          </div>
        </div>
      </Stack>

      <PhotoModal
        handleCloseModal={handleCloseModal}
        isModalOpen={isModalOpen}
        ref={canvasRef}
        selectedFrame={selectedFrame || 'photo.png'}
      />

      <Typography color="secondary">
        <i>
          Developed by{' '}
          <a href="https://github.com/DrZanuff" target="_blank">
            Ricardo Machado
          </a>
        </i>
      </Typography>
    </div>
  );
};
