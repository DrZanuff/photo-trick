import type { FrameSelectorProps } from './FrameSelector.types';
import './FrameSelector-styles.css';
import { FRAMES } from '@/constants/frames';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { COLORS } from '@/theme';

const handleDragStart = (e: any) => e.preventDefault();

const responsive = {
  0: { items: 3 },
  // 568: { items: 3, },
  // 1024: { items: 3, },
};

export function FrameSelector({
  handleSelectFrame,
  selectedFrame,
}: FrameSelectorProps) {
  return (
    <div className="FrameSelector-container">
      <h3 style={{ color: COLORS.INFO_MAIN }}>CHOOSE A FRAME</h3>
      <AliceCarousel
        disableButtonsControls
        disableDotsControls
        mouseTracking
        responsive={responsive}
        items={FRAMES.map((frame, index) => (
          <div className="slide" key={index} onDragStart={handleDragStart}>
            <img
              src={frame}
              alt={`Frame ${index + 1}`}
              className={`FrameSelector-image ${
                selectedFrame === frame ? 'FrameSelector-selected' : ''
              }`}
              onClick={() => handleSelectFrame(frame)}
            />
          </div>
        ))}
      />
    </div>
  );
}
