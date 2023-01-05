import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosIns from '../../axios/axios';
import GlobalContext from '../../context/GlobalContext/GlobalContext';
import ImageSlider from '../imageSlider/ImageSlider';

const MoviesBanner = () => {
  const [list, setList] = useState([]);
  const { state } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  useEffect(() => {
    getMoviesBanners();
  }, [state.authUser]);
  async function getMoviesBanners() {
    try {
      const res = await axiosIns({
        url: state.authUser ? '/auth_api/video_list' : '/web_api/video_list',
        method: 'POST',
        data: {
          is_promposal: 'Yes',
        },
      });
      // console.log(res);
      if (res.data.status) {
        setList([
          ...res.data.results,
          res.data.results[0],
          res.data.results[1],
        ]);
      } else {
        console.log('getMoviesBanners else', res.data);
      }
    } catch (err) {
      console.log('getMoviesBanners Error\n', err.message);
    }
  }
  function onCurrentClick(currentSlide) {
    // console.log(currentSlide);
    navigateTo(`/watch/${currentSlide.id}`);
  }
  return (
    <>
      <ImageSlider
        slides={list}
        autoplay={true}
        speed={10000}
        onCurrentClick={onCurrentClick}
      />
    </>
  );
};

export default MoviesBanner;
