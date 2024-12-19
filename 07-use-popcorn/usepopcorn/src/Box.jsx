import { useState } from 'react';
import PropTypes from 'prop-types';
import OpenButton from './OpenButton';

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMovieList = () => {
    setIsOpen((open) => !open);
  };

  return (
    <div className='box'>
      <OpenButton onClick={() => toggleMovieList()}>{isOpen ? '–' : '+'}</OpenButton>
      {isOpen && children}
    </div>
  );
}

Box.propTypes = {
  children: PropTypes.node.isRequired,
};
