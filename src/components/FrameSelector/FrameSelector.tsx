import type { FrameSelectorProps } from './FrameSelector.types';
import './FrameSelector-styles.css';
import { FRAMES } from '@/constants/frames';
import useEmblaCarousel from 'embla-carousel-react';

export function FrameSelector({
  handleSelectFrame,
  selectedFrame,
}: FrameSelectorProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, loop: true });

  return (
    <div className="FrameSelector-container">
      <h3>Escolha um Frame:</h3>
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {FRAMES.map((frame, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <img
                    key={index}
                    src={frame}
                    alt={`Frame ${index + 1}`}
                    className={`FrameSelector-image ${
                      selectedFrame === frame ? 'FrameSelector-selected' : ''
                    }`}
                    onClick={() => handleSelectFrame(frame)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
