import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import toonflix from "../images/toonflix.jpg";
import { base_url_toonflix } from '../Api/api';
import Cookies from "js-cookie";



// mcfunny.madfunny.co.za
// https://madfunny.co.za/DoiRedirect?subscription_id=2123446562&msisdn=27680633950&ext_ref=testing_ref
const Otp = () => {


    const [input1,setInput1] = useState('');
    const [input2,setInput2] = useState('');
    const [input3,setInput3] = useState('');
    const [input4,setInput4] = useState('');
    const [loading,setLoading] = useState(false);

    const [time,setTime] = useState(60);
    const pack = Cookies.get('pack');
          const extId = Cookies.get('extId')


    const [number,setNumber] = useState();

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(window.location.search);
    const otpId = urlParams.get('id');
    

    

    const handleClear=()=>{
        setInput1('');
        setInput2('');
        setInput3('');
        setInput4('');
    }

    const handleInputChange = (e, setInput, nextFieldId, prevFieldId) => {
        const { value } = e.target;
        if (/^\d$/.test(value) || value === '') {
          setInput(value);
          if (value && nextFieldId) {
            document.getElementById(nextFieldId).focus();
          }
        }
      };

      const handleKeyDown = (e, prevFieldId) => {
        if (e.key === 'Backspace' && !e.target.value && prevFieldId) {
          document.getElementById(prevFieldId).focus();
        }
      };

      useEffect(() => {
        if (time > 0) {
            const timer = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timer);
        }
        else{
          Cookies.remove('extId')
          Cookies.remove('number')
          Cookies.remove('pack')

          navigate(`/subscribe`)
        }
    }, [time]);

      const redirectUser=async(e)=>{
        e.preventDefault()
        console.log(input1,input2,input3,input4)
        const otp = input1+input2+input3+input4;
        console.log(otp.length)
        if(otp.length <4){
          toast.warn("Entrez d'abord OTP !!");
          return;
        }
        console.log('otp entered........');
        

        try{
          


          const res = await axios.post(`${base_url_toonflix}/matched-otp?pack=${pack}&extId=${extId}&otpId=${otpId}&otp=${otp}`);
          console.log(res.data)
         
          if(res?.status == 201 || res?.status == 208 || res?.status == 200){
            toast.success('OTP correspondant !!')
            setTimeout(()=>{
              navigate(`/home`)
            },1000)
          }
          else if(res?.status == 402){
            toast.error(res?.data)
          }
          else if(res?.status == 403){
            toast.error(res?.data)
          }
          else{
            toast.error(res?.data)
          }

        }
        catch(err){
          console.log(err)
          toast.error(err?.response?.data)
        }
        handleClear()
      }



  return (
    <>
    <ToastContainer/> 
<div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
        <img
          src={toonflix}
          alt="/"
          className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
        />
        <div className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
          <div className="text-center">
          <form  onSubmit={redirectUser} className=' max-w-lg rounded-md flex flex-col justify-center items-center' style={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set a transparent white background
          backdropFilter: 'blur(10px)',
          border:'1px solid grey',
          padding: '20px',
        }}>
          <h1 className='text-black text-center  text-2xl font-bold  md:text-4xl  mt-5'>Validation OTP
         
          </h1>
          <p className='text-black text-xl font-semibold mt-1  '>
          Saisissez l'OTP envoyé à votre numéro de mobile :          </p>
         <br />
          <div className='flex justify-center  gap-2'>
    <input id="input1" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input1} onChange={(e) => handleInputChange(e, setInput1, 'input2', null)}
              onKeyDown={(e) => handleKeyDown(e, null)}/>
    <input id="input2" className='h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input2} onChange={(e) => handleInputChange(e, setInput2, 'input3', 'input1')}
              onKeyDown={(e) => handleKeyDown(e, 'input1')} />
    <input id="input3" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input3} onChange={(e) => handleInputChange(e, setInput3, 'input4', 'input2')}
              onKeyDown={(e) => handleKeyDown(e, 'input2')} />
    <input id="input4" className=' h-10 w-10 outline-none text-center font-sans text-xl text-black rounded-md border border-black bg-white' placeholder="" type="tel" maxlength="1" value={input4} onChange={(e) => handleInputChange(e, setInput4, null, 'input3')}
              onKeyDown={(e) => handleKeyDown(e, 'input3')} />
  </div>
          
<br />
          <button
            disabled={loading}
            type="submit"
            className=" text-white mt-2 w-48 bg-orange-600 text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 focus:outline-none ">
            {loading ? "Chargement..." : "Valider OTP"}
          </button>

        </form>
        <p>OTP expirera dans {time}</p>
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </div>
    </>

  );
};

export default Otp;
