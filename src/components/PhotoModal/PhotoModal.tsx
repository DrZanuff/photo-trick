import { MutableRefObject, forwardRef } from 'react';
import type { PhotoModalProps } from './PhotoModal.types';
import './PhotoModal-styles.css';
import Paper from '@mui/material/Paper';
import { H_SIZE, W_SIZE } from '@/constants/sizes';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';

export const PhotoModal = forwardRef<HTMLCanvasElement, PhotoModalProps>(
  ({ handleCloseModal, isModalOpen, selectedFrame }, ref) => {
    const handleSaveImage = () => {
      if (ref && (ref as MutableRefObject<HTMLCanvasElement | null>).current) {
        const canvas = (ref as MutableRefObject<HTMLCanvasElement>).current;

        const imageURL = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imageURL;
        link.download = `photo-trick${selectedFrame}`;

        link.click();
      }
    };

    return (
      <div
        className={`PhotoModal-canvas-container ${isModalOpen ? 'open' : ''}`}
        style={{
          opacity: isModalOpen ? 1 : 0,
          pointerEvents: isModalOpen ? 'all' : 'none',
        }}
      >
        <Paper
          elevation={1}
          sx={{ padding: '20px', height: 'fit-content', margin: '30px' }}
        >
          <canvas
            className="PhotoModal-canvas"
            ref={ref}
            style={{
              width: '100%',
              height: '100%',
            }}
            width={W_SIZE}
            height={H_SIZE}
          />

          <div className="canvas-buttons-container">
            <Button
              variant="contained"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleCloseModal}
            >
              CLOSE
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleSaveImage}
            >
              DOWNLOAD
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
);
