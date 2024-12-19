import PropTypes from 'prop-types';
export default function ErrorMessage({ message }) {
  return <h1 className='error'>⛔️ {message}</h1>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
