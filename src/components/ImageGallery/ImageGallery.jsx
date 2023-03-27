import React, { useState } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Modal } from '../Modal/Modal';

const ImageGallery = ({ images }) => {
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alternative, setAlternative] = useState('');

  const handelOpenModal = (e, imageURL, tags) => {
    if (e.currentTarget.nodeName === 'LI') {
      setLargeImageURL(imageURL);
      setAlternative(tags);
    }
  };

  const handelCloseModal = e => {
    setLargeImageURL(null);
  };

  return (
    <>
      {images.length > 0 && (
        <ul className="ImageGallery">
          <ImageGalleryItem imagesList={images} onClick={handelOpenModal} />
        </ul>
      )}
      {largeImageURL && (
        <Modal onClose={handelCloseModal}>
          <img src={largeImageURL} alt={alternative} />
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;
