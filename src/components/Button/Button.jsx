import PropTypes from 'prop-types';

const Button = ({ LoadMoreButton }) => {
  return (
    <button className="Button" onClick={LoadMoreButton} id="load-more">
      LoadMore
    </button>
  );
};

Button.propTypes = {
  LoadMoreButton: PropTypes.func.isRequired,
};

export default Button;