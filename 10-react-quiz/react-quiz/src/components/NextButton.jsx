import PropTypes from 'prop-types';

export default function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  const lastQuestion = index + 1 === numQuestions;

  return (
    <button
      className='btn btn-ui'
      onClick={() => {
        dispatch({ type: lastQuestion ? 'finish' : 'nextQuestion' });
      }}>
      {lastQuestion ? 'Finish' : 'Next'}
    </button>
  );
}

NextButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};
