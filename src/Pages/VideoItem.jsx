import React, { useEffect, useState,useRef  } from "react";
import Modal from "../Pages/Modal";
import ReactPlayer from 'react-player/lazy';
import Navbar from "../Pages/Navbar";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import SimilarVideos from "./SimilarVideos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import Comments from "./Comments";
import { baseurl } from "../Api/api";
import { changeLang } from "../Data/ChangeLanguage";
const VideoItem = () => {
  const params = useParams();
  console.log("param======",params)
  const [videoData, setVideoData] = useState(null);
  const [image, setImage] = useState("");
  const [videoid, setVideoid] = useState("");
  const [title, setTitle] = useState("")

    useEffect(() => {
      const fetchDataFromBackend = async () => {
        try {
          const res = await axios.get(
            `${baseurl}api/content/little/${params.id}`
         
          );
          console.log(res, "res");
          setVideoData(res.data.videos);
      
          setVideoid(res.data.videos.id);
          
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchDataFromBackend();
    }, [params.id]);
  

    return (
      <>
      <Navbar />
      <div className="container mx-auto max-w-[1140px] px-4 py-12  flex gap-4">
        <Link to="/home">
          <div className="px-6 bg-white active md:active lg:active hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-zinc-700 hover:text-white active:bg-bg-black p-2">
            <FaHome size={20} />
          </div>
        </Link>
        <div className="px-6 active md:active lg:active bg-white hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-zinc-700 hover:text-white active:bg-bg-black p-2 w-full">
          {changeLang(videoData?.name)}
        </div>
      </div>  
      <div className="max-w-[1100px] mx-auto  h-[400px] md:[300px]  bg-zinc-700">
        <div className="w-full justify-center">
          <div onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }} className='h-[400px]' >
            <ReactPlayer
              url={videoData?.vurl}
              controls={true}
              width="100%"
              height="100%"
              loop={true}
              playsinline={true}
              className=""
            />
          </div>
        </div>
      </div>
      <div>
        <Comments videoId={params.id} />
      </div>
      <SubHeader />
      <SimilarVideos videos={videoData?.videos} />
      <Footer />
    </>
    );
};

export default VideoItem;
