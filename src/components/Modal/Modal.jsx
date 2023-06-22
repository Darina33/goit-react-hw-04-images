import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { handleBackdropClick, largeImageURL, tags } = this.props;
    return (
      <div className='Overlay' onClick={handleBackdropClick}>
        <div className='Modal'>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleBackdropClick: PropTypes.func.isRequired,
};