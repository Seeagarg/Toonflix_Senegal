import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import toonflix from "../images/toonflix.jpg";
import Lottie from 'lottie-react'
import loader from '../Animations/loader.json'

const Welcome = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            window.location.href = 'https://waaat.orange.sn/panz_osn/?serviceName=ToonFlix';
        },2000)
    },[])

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black flex justify-center items-center z-10">
    <div className="flex gap-[2rem] items-center">
    <div className="">
    <Lottie
        animationData={loader}
    />
    </div>
    <div className="container mx-auto max-w-screen-sm text-white  rounded-md p-6 md:p-12 flex flex-col items-center shadow-lg relative">
     <p className="text-6xl font-serif font-[600]"><span className="text-[#ff4003]">Bienvenue</span> à</p>
     {/* <p className="text-6xl font-serif font-[600]"><span className="text-[#ff4003]">Welcome</span> to</p> */}
     <br />
      <img
          src={toonflix}
          alt="/"
          className="w-20 h-auto mb-4 md:mb-0 md:w-[200px]"
        />
        <br />
        {/* <p className="text-5xl text-center font-serif font-[550]"> Explore exciting, diverse videos for everyone!</p> */}
        <p className="text-5xl text-center font-serif font-[500]">Découvrez des vidéos passionnantes et diversifiées pour tous !</p>
    </div>
    </div>
     
    </div>
  )
}

export default Welcome
