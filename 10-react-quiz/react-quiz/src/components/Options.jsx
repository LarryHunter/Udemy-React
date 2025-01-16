import PropTypes from 'prop-types';

export default function Options({ question }) {
  return (
    <div className='options'>
      {question.options.map((option) => (
        <button
          key={option}
          className='btn btn-option'>
          {option}
        </button>
      ))}
    </div>
  );
}

Options.propTypes = {
  question: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
