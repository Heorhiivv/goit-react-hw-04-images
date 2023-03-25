import React, { Component } from 'react';

import { Bars } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getImages } from './api-services/api-services';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import { height } from '@mui/system';

export class App extends Component {
  state = {
    gallery: [],
    serachQuery: '',
    isLoading: false,
    page: 1,
    error: null,
    largeImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const prevQueryWord = prevState.serachQuery;
    const newQueryWord = this.state.serachQuery;
    try {
      if (prevQueryWord !== newQueryWord) {
        this.setState({ isLoading: true });
        const newImages = await getImages(newQueryWord, page);
        this.setState({ gallery: newImages, isLoading: false });
      }
      if (prevState.page !== page && prevQueryWord === newQueryWord) {
        this.setState({ isLoading: true });
        const newImages = await getImages(newQueryWord, page);
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...newImages],
          isLoading: false,
        }));
      }
      if (page !== 1) {
        const { scrollTop, clientHeight } = document.documentElement;
        window.scrollTo({
          top: scrollTop + clientHeight - 170,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      this.setState({ error });
    }
  }

  onSearchFormSubmit = serachQuery => {
    this.setState({ serachQuery: serachQuery, page: 1, gallery: [] });
  };

  onLoadMoreBtnClick = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { serachQuery, gallery, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSearchFormSubmit} />
        <ImageGallery images={gallery} />

        {gallery.length > 0 && !isLoading && (
          <LoadMoreBtn
            loadMore={this.onLoadMoreBtnClick}
            isSubmitting={isLoading}
          />
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
  }
}
