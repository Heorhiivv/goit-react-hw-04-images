import React from 'react';
import axios from 'axios';
const API_KEY = '18890613-7ee27e7de9432b6f472efa8f6';
const baseURL = `https://pixabay.com/api/`;

export const getImages = async (searchQuery, page) => {
  try {
    const gallery = await axios(
      `${baseURL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return gallery.data.hits;
  } catch (error) {
    console.log(error);
  }
};
