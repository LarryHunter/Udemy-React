import PropTypes from 'prop-types';

export default function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className='options'>
      {question.options.map((option, index) => {
        let optionButtonClassName = 'btn btn-option';
        if (index === answer) optionButtonClassName += ' answer';
        if (hasAnswered) optionButtonClassName += index === question.correctOption ? ' correct' : ' wrong';

        return (
          <button
            key={option}
            disabled={hasAnswered}
            className={optionButtonClassName}
            onClick={() => {
              dispatch({ type: 'newAnswer', payload: index });
            }}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

Options.propTypes = {
  question: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctOption: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  answer: PropTypes.number,
};
