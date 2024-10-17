import PropTypes from 'prop-types';
import { useState } from 'react';

export default function TextExpander({
  children,
  collapsedNumWords = 10,
  expandButtonText = 'Show more',
  collapseButtonText = 'Show less',
  expanded = false,
  className = 'box',
  buttonColor = 'purple',
}) {
  const buttonStyle = {
    cursor: 'pointer',
    color: `${buttonColor}`,
  };

  TextExpander.propTypes = {
    children: PropTypes.string,
    collapsedNumWords: PropTypes.number,
    expandButtonText: PropTypes.string,
    collapseButtonText: PropTypes.string,
    expanded: PropTypes.bool,
    className: PropTypes.string,
    buttonColor: PropTypes.string,
  };

  const [isExpanded, setIsExpanded] = useState(expanded);

  const toggleExpanded = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  /* 
  *** This is not needed if you use the string.split, string.slice, and string.join JS syntax!! ***
  const shortenedSentence = () => {
    let newSentence = '';

    for (let i = 0; i < collapsedNumWords; i++) {
      newSentence += `${numWords[i]} `;
    }
    return newSentence.trimEnd();
  };
  */

  return (
    <p
      className={className}
      onClick={() => toggleExpanded()}>
      {/* {isExpanded ? `${children} ` : `${shortenedSentence()} `} */}
      {isExpanded ? children : `${children.split(' ').slice(0, collapsedNumWords).join(' ')}...`}
      <span
        role='button'
        style={buttonStyle}>
        {isExpanded ? ` ${collapseButtonText}` : ` ${expandButtonText}`}
      </span>
    </p>
  );
}
