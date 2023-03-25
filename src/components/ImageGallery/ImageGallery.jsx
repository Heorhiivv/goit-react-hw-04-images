import React, { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';
class ImageGallery extends Component {
  state = {
    largeImageURL: '',
    alternative: '',
  };

  handelOpenModal = (e, imageURL, tags) => {
    if (e.currentTarget.nodeName === 'LI') {
      this.setState({ largeImageURL: imageURL, alternative: tags });
    }
  };

  handelCloseModal = e => {
    this.setState({ largeImageURL: null });
  };

  render() {
    const gallery = this.props.images;
    const { largeImageURL, alternative } = this.state;
    return (
      <>
        {gallery.length > 0 && (
          <ul className="ImageGallery">
            <ImageGalleryItem
              imagesList={gallery}
              onClick={this.handelOpenModal}
            />
          </ul>
        )}
        {largeImageURL && (
          <Modal onClose={this.handelCloseModal}>
            <img src={largeImageURL} alt={alternative} />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
