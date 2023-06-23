import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem"

function ImageGallery({ images }) {
    return (<ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    tags={tags}
                     />
            )
        )}
</ul>)
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery