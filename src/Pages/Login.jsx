import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toonflix from "../images/toonflix.jpg";
import axios from "axios";
import Cookies from "js-cookie";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { base_url_toonflix } from "../Api/api";


const Login = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  const [headersNumber,setHeadersNumber] = useState('');

  const [selectedOption, setSelectedOption] = useState({ value: 'daily', label: 'Tous les jours' })

  function generateUniqueAlphabetId(length = 22) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}


  const urlParams = new URLSearchParams(window.location.search);
  const msisdn = urlParams.get('msisdn');
  const ExtId = urlParams.get('extId') || generateUniqueAlphabetId();

  console.log(msisdn)


  const navigate = useNavigate();

  const options = [
    { value: 'daily', label: 'Tous les jours' },
    { value: 'weekly', label: 'Hebdomadaire' },
    { value: 'monthly', label: 'Mensuelle' },
  ];

  // console.log(selectedOption)

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


  Cookies.set('extId',ExtId );

  const checkUser=async()=>{
    try{
      const num = Cookies.get('number')
      const res = await axios.post(`${base_url_toonflix}/checkStatus?msisdn=${num}`)
      if(res.status == 200 || res.status == 201 || res.status == 202 ){
        navigate('/home')
      }
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    checkUser()
  })



  // Check for the existence of the loginStatus cookie on component mount
  

  // const handle = async () => {
  //   setLoading(true)

  //   const data = {
  //     msisdn:number,
  //     packType:selectedOption.value,
  //     extId:ExtId
  //   }

  //   try{
  //     const res = await axios.post(`${base_url_toonflix}/subwithmsisdn`,data);
  //     console.log(res.data);

  //     if(res.status == 201 || res.status == 208 || res.status == 200){
  //       toast.success(res.data)
  //       setTimeout(()=>{
  //         navigate('/home')
  //       },1000)
        
  //     }
  //     else{
  //       toast.error(res.data)
  //     }


  //   }
  //   catch(err){
  //     console.log(err,'error------in subscribing')
  //   }

  //   Cookies.set('number',number);
  //   setLoading(false)

  //   // navigate('/otp-validation')
  // };


  const handle=async(e)=>{
    e.preventDefault();
    setLoading(true)
    // console.log('handleClicked')
    try{
      // const data = {
      //       msisdn:number,
      //       packType:selectedOption.value,
      //       extId:ExtId
      //     }

          Cookies.set('number',number)
          Cookies.set('pack',selectedOption.value)

          if(!number){
            toast.warn("Veuillez d'abord entrer le numéro!!")
            return;
          }

          const res = await axios.post(`${base_url_toonflix}/send-otp?msisdn=${number}`);
          console.log(res.data);

          if(res.status == 200){
            toast.success('OTP envoyé avec succès!!')
            setTimeout(()=>{
              navigate(`/otp-validation?id=${res.data}`)
            },1000)
          }  
    }
    catch(err){
      console.log(err)
      toast.error(err?.response?.data)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
        <img
          src={toonflix}
          alt="/"
          className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
        />
        <form className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
             
                
            Cliquez à
             
              <span className="text-orange-600 font-bold text-2xl md:text-3xl px-2">
              
s'abonner
              </span>
            </h1>
            <p className='text-left pt-4 text-lg font-semibold'>{headersNumber == ''?'Entrez le numéro':'Votre numéro'}</p>
            <input
              type="tel"
              placeholder="ENTREZ VOTRE NUMÉRO DE TÉLÉPHONE."
              className="border border-black text-lg md:text-xl text-left p-2 mt-3 w-full h-10"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          {/* <br /> */}
          <p className='py-2 pt-4 text-lg font-semibold'>Type de paquet</p>
          <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
      />
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handle}
              type='submit'
              className="w-full bg-orange-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Soumission..." : "Envoyer OTP"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
