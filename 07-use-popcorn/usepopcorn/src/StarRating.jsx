import { useState } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  messages: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  defaultRating = 0,
  color = '#FCC419',
  size = 24,
  className = '',
  messages = [],
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating(rating);
  };

  const handleHoverRating = (hoverRating) => {
    setHoverRating(hoverRating);
  };

  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color: color,
    fontSize: `${size}px`,
  };

  return (
    <div
      style={containerStyle}
      className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => handleHoverRating(i + 1)}
            onHoverOut={() => handleHoverRating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {(() => {
          if (messages.length === maxRating) {
            const index = hoverRating ? hoverRating - 1 : rating - 1;
            return messages[index];
          }
          return hoverRating || rating || '';
        })()}
      </p>
    </div>
  );
}
