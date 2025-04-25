import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate,Navigate } from 'react-router-dom';
import Home from "./Components/Home"
import VideoItem from './Pages/VideoItem';
import Header from './Pages/Header';
import ScrollToTop from './Pages/ScrollToTop';
import Login from './Pages/Login';
import Otp from './Pages/Otp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetHeaders from './Pages/GetHeaders';
import Welcome from './Pages/Welcome';


function App() {
  // useEffect(() => {
  //   const isLoggedIn = Cookies.get('loginStatus');

  //   if (!isLoggedIn === 'false') {
  //      window.location.href = '/'; 
  //   }
  // }, []);

  // const navigate = useNavigate();

  // const GoToHeader=()=>{

  //   useEffect(()=>{
  //     navigate('/header')
  //   },[])

  //   return<></>
  // }



  return (
    <>
      <div className='bg-slate-200'>
        <BrowserRouter>
          <Routes>
          {/* <Route path="/" element={<Navigate to="/" />} /> */}
          <Route  path='/welcome' element={<Welcome/>}/>
          <Route path='/header' element={<React.Fragment><GetHeaders /></React.Fragment>} />
            <Route path='/home' element={<React.Fragment><ScrollToTop /><Home /></React.Fragment>} />
            <Route path='/otp-validation' element={<React.Fragment><Otp/></React.Fragment>}/>
            <Route path='/subscribe' element={<React.Fragment><Login /></React.Fragment>} />
            <Route path='/VideoItem/:id' element={<React.Fragment><ScrollToTop /><VideoItem /></React.Fragment>} />
            <Route path='/Header' element={<React.Fragment><ScrollToTop /><Header /></React.Fragment>} />
            {/* <Route path="*" element={<Navigate to="/subscribe"/>} /> */}

          </Routes>
        </BrowserRouter>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
}

export default App;
