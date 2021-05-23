import React, { useRef, useState } from 'react';
import { Popover } from 'antd';
import { StarFilled } from '@ant-design/icons';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import '../styles/slider.css';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

function avgRating(data) {
  let sumRating = data.reduce((accumulator, currentValue) => {
    return { score: accumulator.score + currentValue.score };
  });
  return sumRating.score / data.length;
}

const SliderSearch = ({ animeData }) => {
  const message = [
    "I don't recommend it",
    'You may have fun',
    'Great, this is one of the best anime',
  ];

  const sliderRender = animeData.map((animeRow) => {
    const text = (
      <span className='synopsis'>Synopsis, Episodes: {animeRow.episodes}</span>
    );

    const content = (
      <div className='synopsis'>
        <p>{animeRow.synopsis}</p>
      </div>
    );

    animeRow.score < 8
      ? animeRow.score < 5
        ? (animeRow['opinion'] = message[0])
        : (animeRow['opinion'] = message[1])
      : (animeRow['opinion'] = message[2]);

    return (
      <>
        <SwiperSlide>
          <div>
            <Popover placement='bottom' content={content} title={text}>
              <a href={animeRow.url}>
                <img src={animeRow.image_url} />
              </a>
            </Popover>
            <div className='textTitle'>
              <p>{animeRow.title}</p>
              <p>
                <StarFilled />
                {animeRow.score}
              </p>
              <p>{animeRow.opinion}</p>
            </div>
          </div>
        </SwiperSlide>
      </>
    );
  });

  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        navigation={true}
        className='mySwiper'
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        spaceBetween={25}
        breakpoints={{
          640: {
            slidesPerView: 3,
            sliderPerGroup: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 50,
          },
        }}
      >
        {sliderRender}
      </Swiper>
      <p className='average'>
        Average Rate:
        {' ' + avgRating(animeData).toFixed(2)}
      </p>
    </>
  );
};

export default SliderSearch;
