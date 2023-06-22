import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import fetchImages from '../services/image-api';
import Loader from "./Loader";
import Button from "./Button";

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
    isError: false,
    isLoadMore: false,
  };

  onHandleSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({
      query,
      page: 1,
      images: [],
      isLoading: true,
      isLoadMore: false,
    });
  };

  LoadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const perPage = 12;
    try {
      if (
        prevState.query !== this.state.query ||
        prevState.page !== this.state.page
      ) {
        const data = await fetchImages(this.state.query, this.state.page);

        if (data.hits.length === 0) {
          Notify.warning(
            'Sorry, there are no images matching your search query'
          );
          this.setState({ isLoading: false });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          isLoading: false,
        }));

        let totalPage = data.totalHits / perPage;

        if (totalPage > 1) {
          this.setState({ isLoadMore: true });
        }

        if (this.state.page > totalPage) {
          this.setState({ isLoadMore: false });
        }
      }
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { images, isLoading, isLoadMore } = this.state;
    return (<div>
        <Searchbar onSubmit={this.onHandleSubmit} />
        {isLoading && <Loader/>}
        <ImageGallery images={images} />
        {isLoadMore && (
          <Button LoadMoreButton={this.LoadMoreButton} />
        )}
      </div>
    );
  }
}