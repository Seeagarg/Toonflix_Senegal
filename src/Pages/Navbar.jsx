import React,{useState, useEffect} from 'react'
import toonflix from "../images/toonflix.jpg"
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import Cookies from "js-cookie";
import axios from 'axios';
import { base_url_toonflix } from '../Api/api';

const Navbar = () => {

  const [loading,setLoading] = useState(false);

  const number = Cookies.get('number')
  const navigate = useNavigate()

  const handleUnsub = async() => {
    setLoading(true);
    try{
      const res = await axios.get(`${base_url_toonflix}/unsubscription?msisdn=${number}`)
      console.log(res);
      navigate('/subscribe')
     
    }
    catch(err){
      console.log(err);
    }
    setLoading(false);
  }


  // useEffect(()=>{
  //   if(!number || number == NULL){
  //     navigate('/subscribe')
  //   }
  // },[])


  return (
<div className="w-full h-20 bg-zinc-900   flex justify-between items-center shadow-2xl   mb-8 p-4">
    {/* <nav> */}
        <div className='items-center  text-center'>
          <Link to="/home">
          <img  className="h-[50px] w-[200px] hover:scale-110" src={toonflix} alt="" />
          </Link>
           
        </div>
        <div>
        <button
              onClick={handleUnsub}
              
              className="w-full bg-orange-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "unsub..." : "Se désabonner"}
            </button>
        </div>
    {/* </nav> */}
</div>

  )
}

export default Navbar