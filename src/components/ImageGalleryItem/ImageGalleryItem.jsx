import React from 'react';

export const ImageGalleryItem = ({ imagesList, onClick }) => {
  return imagesList.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li
      key={id}
      className="ImageGalleryItem"
      onClick={e => onClick(e, largeImageURL, tags)}
    >
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  ));
};
