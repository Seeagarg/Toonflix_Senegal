import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { baseurl } from '../Api/api';
import { changeLang } from '../Data/ChangeLanguage';


const ContinueWatching = () => {
    const [loading, setLoading] = useState(true);
    const[continueVideos,setcontinueVideos] = useState([])
    const fetchData = async () => {
      try {
        const ani=Cookies.get('number')
        // const response = await axios.get(`http://localhost:4000/api/little/watching/${ani}`);
        const response = await axios.get(`${baseurl}api/little/watching/${ani}`);
        setcontinueVideos(response.data.result)
       console.log(response,"continueVideos");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchData();
      }, []);
  return (
    <div className="container mx-auto max-w-[1140px] px-4 py-12">
        <div className='p-2 text-xl text-orange-600 font-bold'>   <p>Continuer à regarder
        <span className='text-black'>.....</span></p>
    </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          
          <SyncLoader color="#FFA500"  loading={loading} size={15} />
        </div>
      ) : (
     
        <div  className="grid grid-cols-4 lg:grid-cols-4 gap-4 mt-0 mb-0">
              
          {continueVideos?.map((data) => (
            
            <div key={data.id} className="text-white cursor-pointer">
              <Link to={`/VideoItem/${data.videoid}`}>
                <div className="relative w-full overflow-hidden rounded-xl">
                  <img
                    src={data.imageurl}
                    alt={data.vurl}
                    width={500}
                    height={300}
                    layout="responsive"
                    className="w-full h-[100px] object-cover rounded-t-lg relative backdrop-blur-3xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
                    <p className="text-white sm:text-sm ">{changeLang(data.title).slice(0,20)}</p>
                  </div>
                </div>
              </Link>
            </div>
            

             
          ))}
        </div>
    
      )}
     <div className='py-4'> 
            <hr className=''/>
     </div>
    </div>
  )
}

export default ContinueWatching