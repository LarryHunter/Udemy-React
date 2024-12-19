import PropTypes from 'prop-types';

export default function OpenButton({ children, onClick }) {
  return (
    <button
      className='btn-toggle'
      onClick={onClick}>
      {children}
    </button>
  );
}

OpenButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
