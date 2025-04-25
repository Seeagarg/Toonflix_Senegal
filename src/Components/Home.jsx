// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCategories,
  setSelectedCategory,
  setVideos,
} from "../slices/categorySlice";
import Navbar from "../Pages/Navbar";
import VideoCards from "../Pages/VideoCards";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import PopUp from "../Pages/PopUp";
import Login from "../Pages/Login";
import ContinueWatching from "../Pages/ContinueWatching";
import {base_url_toonflix, HomeApi} from "../Api/api"
import { ToastContainer, toast } from 'react-toastify';
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch();

  const storeCategory = useSelector((state) => state.category);
  const navigate = useNavigate()

  const number = Cookies.get('number')
  const ExtId = Cookies.get('extId')



  useEffect(() => {
    const getHeaders=async()=>{
      try{
        const res = await axios.get(`${base_url_toonflix}/get-header?alias=${number}&extId=${ExtId}`);
        console.log(res?.status,'rspojse')
        if(res?.status == 200 || res?.status == 201 ){
            navigate('/home')
        }
      }
      catch(err){
        if(err.response?.status == 403 || err.response?.status == 402 ){
          console.log(err,'error')
          toast.error("Échec de la facturation en raison d'un solde insuffisant!!")
          setTimeout(()=>{
            navigate('/subscribe');
          },1000)
        }
        else if(err.response?.status == 404){
          navigate(`/header?msisdn=${number}&extId=${ExtId}`)
          // setShow(true);
        }
        else{
          setTimeout(()=>{
            navigate('/subscribe');
          },1000)
        }
      }
    }

    getHeaders();

  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(HomeApi);
        console.log("resData",response.data);
        const { categories, videos } = response.data;

        console.log(categories,'cats')
        console.log(videos,'videos')

        dispatch(setCategories(categories));
        dispatch(setVideos(videos));
        dispatch(setSelectedCategory("All"));
     
      } catch (error) {
        console.error("Error fetching data:", error);
   
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
    <ToastContainer/>
      <div className="text-sm  ">

        <Navbar />
        <>

          <Header categories={storeCategory} />
          <ContinueWatching/>
          <VideoCards categories={storeCategory} />
        </>

        </div>          
      <Footer className="" /> 
    </>
  );
};

export default Home;

