import PropTypes from 'prop-types';

export default function RestartButton({ dispatch }) {
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'restart' })}>
      Restart quiz
    </button>
  );
}
