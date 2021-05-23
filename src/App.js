import { useState } from 'react';
import { Layout } from 'antd';
import SliderSearch from './components/Slider';
import SearchBar from './components/SearchBar';
import axios from 'axios';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const [animeData, setAnimeData] = useState([]);

  const animeDataQuery = async (inputSearch) => {
    axios
      .get('https://api.jikan.moe/v3/search/anime?q=' + inputSearch)
      .then((res) => {
        let animesQuery = res.data.results;
        setAnimeData(animesQuery);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <Layout>
        <Header className='wallpaper' />
        <Content className='content'>
          <div className='searchBar'>
            <SearchBar animeDataQuery={animeDataQuery} />
          </div>
          {animeData.length > 0 && (
            <div className='slider'>
              <SliderSearch animeData={animeData} />
            </div>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default App;
