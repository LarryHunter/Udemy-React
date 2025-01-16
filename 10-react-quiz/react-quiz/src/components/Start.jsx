import PropTypes from 'prop-types';

export default function Start({ numQuestions, dispatch }) {
  return (
    <main className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery...</h3>
      <button
        onClick={() => dispatch({ type: 'start' })}
        className='btn btn-ui'>
        Let's start!
      </button>
    </main>
  );
}

Start.propTypes = {
  numQuestions: PropTypes.number.isRequired,
};
