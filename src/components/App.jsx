import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import fetchImages from '../services/image-api';
import Loader from "./Loader";
import Button from "./Button";

export function App(){
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  // const [isLoadMore, setLoadMore] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMoreButton = () => {
    console.log('jjuu');
    setPage(prevState => prevState + 1)
  };

  useEffect(() => { 
    if (query === '') return;
    const getImages = async () => {
      try {
        const images = await fetchImages(query, page);
        if (images.lenght === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query');
          return;
        }
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        setError('Sorry, there are no images matching your search query');
      } finally {
        setIsLoading(false)
      }
    };

    getImages();
  }, [page, query]);

  const searchImages = newSearch => {
    if (query === newSearch) {
      Notify.warning('Images for this query are now shown');
      return;
    }
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  return (
    <div>
         <Searchbar onSubmit={searchImages} />
         {isLoading && <Loader/>}
         <ImageGallery images={images} />
         {!isLoading && images.length >= 12 && !error && (
          <Button loadMoreButton={loadMoreButton} />
        )}
      </div>
  )
}