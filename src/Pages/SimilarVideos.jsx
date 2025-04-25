import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../Api/api";
import { changeLang } from "../Data/ChangeLanguage";


const VideoCards = () => {
  const [storeFilteredVideos, setStoreFilteredVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseurl}api/content/little`);
        setStoreFilteredVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchContinueVideos = async (videoId, name, image, vurl) => {
    const ani = Cookies.get("number");
    try {
      const data = {
        ani: ani,
        videoid: videoId,
        imageurl: image,
        title: name,
        vurl: vurl,
      };
      const res = await axios.post(`${baseurl}api/little/continue-watching`, data);
      navigate(`/videoItem/${videoId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
    
        
        <div className="container mx-auto max-w-[1140px] px-4 py-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
            {storeFilteredVideos.map((video) => (
              <div key={video.id} className="text-white cursor-pointer">
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  onClick={() =>
                    fetchContinueVideos(
                      video.id,
                      video.name,
                      video.imgurl,
                      video.vurl
                    )
                  }
                >
                  <img
                    src={video.imgurl}
                    alt={video.name}
                    width={500}
                    height={300}
                    className="w-full h-[200px] object-cover rounded-t-lg relative backdrop-blur-3xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
                    <p className="text-white">
                      {changeLang(video.name)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </>
  );
};

export default VideoCards;
