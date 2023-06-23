import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (query, page) => {
  const { data } = await axios.get(
    `/?q=${query}&page=${page}&key=35592946-b30e38cecc5f402f2c111ab69&image_type=photo&orientation=horizontal&per_page=12`,
  );

  return data.hits;
};

export default fetchImages;