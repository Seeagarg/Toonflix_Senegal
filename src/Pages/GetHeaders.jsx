import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import toonflix from "../images/toonflix.jpg";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url_toonflix } from "../Api/api";
import Lottie from 'lottie-react'
import loader from '../Animations/Loader2.json'

// import {useNavigate} from 'react-router-dom'

const GetHeaders = () => {


  const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours' })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [show,setShow] = useState(false); 



  const urlParams = new URLSearchParams(window.location.search);


  //  const url = new URL(window.location.href); // or a specific URL string
  // const urlParams = new URLSearchParams(url);
  const msisdn = urlParams.get('msisdn');
  const ExtId = urlParams.get('extId');

  console.log(msisdn)

  // Get specific parameters by name
  


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'rgb(234 88 12)' : 'gray', // Change border color here
      boxShadow: state.isFocused ? '0 0 0 1px rgb(234 88 12)' : 'none', // Optional: Add box shadow
      '&:hover': {
        borderColor: state.isFocused ? 'rgb(234 88 12)' : 'gray', // Change border color on hover
      },
    
    }),
    // You can customize other parts of the select component as well
  };

  const navigate = useNavigate();

  const options = [
    { value: 'daily', label: 'Tous les jours' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuelle' },
  ];


  Cookies.set('number',msisdn);
  Cookies.set('extId',ExtId)

  const handle = async () => {
    setLoading(true)

    const data = {
      msisdn:msisdn,
      packType:selectedOption.value,
      extId:ExtId
    }

    try{
      const res = await axios.post(`${base_url_toonflix}/subwithmsisdn`,data);
      console.log(res.data);

      if(res.status == 201 || res.status == 208){
        toast.success(res.data)
        navigate('/home')
      }
      else{
        toast.error(res.data)
      }


    }
    catch(err){
      console.log(err,'error------in subscribing')
    }

    Cookies.set('number',msisdn);
    setLoading(false)
  };



    useEffect(() => {
        const getHeaders=async()=>{
          try{
            const res = await axios.get(`${base_url_toonflix}/get-header?alias=${msisdn}&extId=${ExtId}`);
            console.log(res?.status,'rspojse')
            if(res?.status == 200 || res?.status == 201 ){
                navigate('/home')
            }
          }
          catch(err){
            if(err.response?.status == 403 || err.response?.status == 402 ){
              console.log(err,'error')
              toast.error('Charging Failed Due to Insufficient Balance!!')
              setTimeout(()=>{
                navigate('/subscribe');
              },1000)
            }
            else if(err.response?.status == 404){
              setShow(true);
            }
            // else{
            //   setShow(true)
            // }
          }
        }

        getHeaders();

      }, []);



  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
    {
      show ? 
      <>
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
      <img
        src={toonflix}
        alt="/"
        className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
      />
      <form className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
           
              
          Sélectionnez le
           
            <span className="text-orange-600 font-bold text-2xl md:text-3xl px-2">
            Type de paquet

            </span>
          </h1>
          {/* <p className='text-left pt-4 text-lg font-semibold'>{headersNumber == ''?'Enter Number':'Your Number'}</p> */}
          {/* <input
            type="tel"
            placeholder="ENTER YOUR PHONE NO."
            className="border border-black text-lg md:text-xl text-left p-2 mt-3 w-full h-10"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          /> */}
        </div>
        {/* <br /> */}
        <p className='py-2 pt-4 text-lg font-semibold'>Type de paquet</p>
        <Select
      defaultValue={selectedOption}
      onChange={setSelectedOption}
      options={options}
      styles={customStyles}
    />
        {/* {error && <p className="text-red-600 text-center mt-2">{error}</p>} */}
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={handle}
            type='submit'
            className="w-full bg-orange-600 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Soumission..." : "Soumettre"}
          </button>
        </div>
      </form>
    </div>
    <ToastContainer/>
      </>:
      <>
        <Lottie
          animationData={loader}
        />
      </>
    }
  </div>
  )
}

export default GetHeaders
