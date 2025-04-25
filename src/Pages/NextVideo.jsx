import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoItem from './VideoItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { baseurl } from '../Api/api';
import { changeLang } from '../Data/ChangeLanguage';

const NextVideo = ({ id, title, rowID }) => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchDataFromBackend = async () => {
      try {
        // const res = await axios.get(`http://localhost:4000/api/little/${id}`);
        const res = await axios.get(`${baseurl}api/content/little/${id}`);
        console.log(res, "res");
        setVideoData(res.data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFromBackend();
  }, [id]);

  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };

  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };

  return (
    <>
      <h2 className='text-white font-bold md:text-xl p-4'>{changeLang(title)}</h2>
      <div className='relative flex items-center group'>
        <MdChevronLeft
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
        <div
          id={'slider' + rowID}
          className='w-full h-full overflow-x-hidden whitespace-nowrap scroll-smooth scrollbar-hide relative'
        >
          {videoData.map((item, id) => (
            <VideoItem key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
          size={40}
        />
      </div>
    </>
  );
};

export default NextVideo;
