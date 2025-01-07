import PropTypes from 'prop-types';

export default function MainComponent({ children }) {
  return <div className='main'>{children}</div>;
}

MainComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
