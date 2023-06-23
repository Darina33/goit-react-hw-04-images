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
  // const [largeImages, setLargeImages] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (!query) return;
    const getImages = async () => {
      try {
        const images = await fetchImages(query, page);
        if (images.lenght === 0) {
          return setError(Notify.warning(
            'Sorry, there are no images matching your search query'))
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
    setQuery(newSearch);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
  };

  const loadMoreButton = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1)
  };

  return (
    <div>
         <Searchbar onSubmit={searchImages} />
         {isLoading && <Loader/>}
         <ImageGallery images={images} />
         {!isLoading && images.length >= 12 && !error && (
          <Button LoadMoreButton={loadMoreButton} />
        )}
      </div>
  )
}

// export class App extends Component {

//   onHandleSubmit = query => {
//     if (this.state.query === query) {
//       return;
//     }
//     this.setState({
//       query,
//       page: 1,
//       images: [],
//       isLoading: true,
//       isLoadMore: false,
//     });
//   };

//   LoadMoreButton = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   async componentDidUpdate(prevProps, prevState) {
//     const perPage = 12;
//     try {
//       if (
//         prevState.query !== this.state.query ||
//         prevState.page !== this.state.page
//       ) {
//         const data = await fetchImages(this.state.query, this.state.page);

//         if (data.hits.length === 0) {
//           Notify.warning(
//             'Sorry, there are no images matching your search query'
//           );
//           this.setState({ isLoading: false });
//           return;
//         }

//         this.setState(prevState => ({
//           images: [...prevState.images, ...data.hits],
//           isLoading: false,
//         }));

//         let totalPage = data.totalHits / perPage;

//         if (totalPage > 1) {
//           this.setState({ isLoadMore: true });
//         }

//         if (this.state.page > totalPage) {
//           this.setState({ isLoadMore: false });
//         }
//       }
//     } catch (error) {
//       this.setState({ isError: true, isLoading: false });
//     }
//   }

//   render() {
//     const { images, isLoading, isLoadMore } = this.state;
//     return (
//     );
//   }
// }