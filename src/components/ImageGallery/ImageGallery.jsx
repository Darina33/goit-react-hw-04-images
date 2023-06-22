import React from "react"
import PropTypes from 'prop-types';

import ImageGalleryItem from "components/ImageGalleryItem"

const ImageGallery = ({ images }) => {
    return (<ul className="ImageGallery">
        {images.map(image => {
            return (
                <ImageGalleryItem
                    key={image.id}
                    webformatURL={image.webformatURL}
                    largeImageURL={image.largeImageURL}
                    tags={image.tags}
                     />
            )
        })}
</ul>)
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery