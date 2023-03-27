import React, { useEffect, useState, Component } from 'react';

import { Bars } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from './api-services/api-services';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [serachQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (serachQuery === '') {
      return;
    }
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const newImages = await getImages(serachQuery, page);
        setGallery(prevGallery => [...prevGallery, ...newImages]);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchImages();
  }, [serachQuery, page]);

  useEffect(() => {
    if (page > 1) {
      const { scrollTop, clientHeight } = window.document.documentElement;
      window.scrollTo({
        top: scrollTop + clientHeight - 170,
        behavior: 'smooth',
      });
    }
  });

  const onSearchFormSubmit = serachQuery => {
    setSearchQuery(serachQuery);
    setPage(1);
    setGallery([]);
  };

  const onLoadMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <Searchbar onSubmit={onSearchFormSubmit} />
      <ImageGallery images={gallery} />

      {gallery.length > 0 && !isLoading && (
        <LoadMoreBtn loadMore={onLoadMoreBtnClick} isSubmitting={isLoading} />
      )}
      {isLoading && (
        <div className="Loader">
          <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};
