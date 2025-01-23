import { forwardRef } from 'react';
import type { VideoFeedProps } from './VideoFeed.types';
import './VideoFeed-styles.css';

export const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(
  ({ isStreaming, selectedFrame }, ref) => {
    return (
      <div className={'VideoFeed-container'}>
        <video
          ref={ref}
          autoPlay
          muted
          playsInline
          className="VideoFeed-video"
          style={{
            width: '100%',
            height: 'auto',
            display: isStreaming ? 'block' : 'none',
            transform: 'scaleX(-1)',
          }}
        />
        {selectedFrame && (
          <img
            src={selectedFrame}
            alt="Selected Frame"
            className="VideoFeed-frame"
          />
        )}
      </div>
    );
  }
);
VideoFeed.displayName = 'VideoFeed';
