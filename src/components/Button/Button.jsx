import PropTypes from 'prop-types';

const Button = ({ loadMoreButton }) => {
  return (
    <button className="Button" onClick={loadMoreButton} id="load-more">
      LoadMore
    </button>
  );
};

Button.propTypes = {
  loadMoreButton: PropTypes.func.isRequired,
};

export default Button;