import axios from "axios";
import Cookies from "js-cookie";
import React, { CSSProperties, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { baseurl } from "../Api/api";
import { changeLang } from "../Data/ChangeLanguage";


const VideoCards = () => {
  const [loading, setLoading] = useState(true);
  const storeFilteredVideos = useSelector((state) => state.category.filteredVideos);
    const navigate=useNavigate()
    console.log("videos",storeFilteredVideos)


  useEffect(() => {
   
    const fetchData = async () => {
      try {
       
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 



  const fetchContinuevideos=async( videoid,name,image,vurl)=>{
    const ani=Cookies.get('number')
    console.log("data ", name, videoid,image,vurl)
      try {
  
        const data={
          ani:ani,
          videoid:videoid,
          imageurl:image,
          title:name,
          vurl:vurl
         
        }
      console.log("data",data)
        // const res = await axios.post(`http://localhost:4000/api/little/continue-watching`,data);
        const res = await axios.post(`${baseurl}api/little/continue-watching`,data);
        console.log("res", res.data);
       
         navigate(`/VideoItem/${videoid}`)
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }



  return (
    <div className="container mx-auto max-w-[1140px] px-4 ">
          <div className='py-2   text-orange-600 font-bold'>   <p className="text-4xl">Explorer<span className='text-orange-600 text-4xl'> Vidéos.</span></p>
    </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          
          <SyncLoader color="#FFA500"  loading={loading} size={15} />
        </div>
      ) : (
        <div  className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
          {storeFilteredVideos.map((data) => (
            <div key={data.id} className="text-white cursor-pointer">
            
                <div className="relative w-full overflow-hidden rounded-xl" onClick={()=>fetchContinuevideos(data.id,data.name,data.imgurl,data.vurl)}>
                  <img
                    src={data.imgurl}
                    alt={data.name}
                    width={500}
                    height={300}
                    layout="responsive"
                    className="w-full h-[200px] object-cover rounded-t-lg relative backdrop-blur-3xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
                    <p className="text-white ">{changeLang(data.name)}</p>
                  </div>
                </div>
             
            </div>
            

             
          ))}
        </div>
       
      )}
    </div>
  );
};

export default VideoCards;
