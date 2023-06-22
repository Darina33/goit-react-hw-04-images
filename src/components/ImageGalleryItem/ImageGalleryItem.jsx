import { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  toogleModal = () => {
    this.setState(prevState => ({ isShowModal: !prevState.isShowModal }));
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.setState({ isShowModal: false });
    }
  };

  handleClickImage = () => {
    this.setState({ isShowModal: true });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;

    return (
      <>
        <li className='ImageGalleryItem' onClick={this.toogleModal}>
          <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        </li>
        {this.state.isShowModal && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            handleBackdropClick={this.handleBackdropClick}
            onCloseModal={this.toogleModal}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};