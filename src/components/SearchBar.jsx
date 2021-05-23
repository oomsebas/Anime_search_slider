import { Input, Space } from 'antd';
import '../styles/searchBar.css';

const { Search } = Input;

const SearchBar = ({ animeDataQuery }) => {
  const searchQuery = (value) => {
    if (value.length < 3 && value !== '') {
      alert('Search phrase must be at least 3 characters');
      value = null;
    }
    if (value) {
      animeDataQuery(value);
    }
  };

  const searchQueryKeyboard = (event) => {
    let valueString = event.target.value;
    if (valueString.length < 3 && valueString !== '') {
      alert('Search phrase must be at least 3 characters');
      valueString = null;
    }
    if (valueString) {
      animeDataQuery(valueString);
    }
  };

  return (
    <Space direction='vertical'>
      <p className='intro'>Type your favorite Anime and have fun!!!</p>
      <Search
        className='searchBarShadow'
        placeholder='Anime title'
        allowClear
        bordered={false}
        enterButton
        size='large'
        onSearch={searchQuery}
        onPressEnter={searchQueryKeyboard}
      />
    </Space>
  );
};

export default SearchBar;
