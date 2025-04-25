// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toonflix from "../images/toonflix.jpg";
// import axios from "axios";

// const PopUp = () => {
//   const [open, setOpen] = useState(false);
//   const [number, setNumber] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [apiData, setApiData] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setOpen(true);
//     }, 3000);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, []);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handle = async () => {
//     setLoading(true);
//     try {
//       // Make a GET request to the API
//       const response = await axios.get('http://176.9.105.211:3679/check-sub', {
//         params: {
//           msisdn: number,
//         },
//       });

//       // Check if subExist is 1
//       if (response.data && response.data.subExist === 1) {
//         // Allow user to proceed
//         setApiData(response.data);
//         setError(null);
        
//         // Perform navigation to the success page
//         navigate("/Header"); // Replace "/success" with your desired path

//         // Close the pop-up after successful submission
//         handleClose();
//       } else {
//         // Show an error if subExist is not 1
//         setError('Subscription does not exist.');
//         setApiData(null);
//       }
//     } catch (error) {
//       // Handle errors
//       setError('Error submitting data.');
//       setApiData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
//       <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
//         <img
//           src={toonflix}
//           alt="/"
//           className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
//         />
//         <div className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
//           <div className="text-center">
//             <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
//               Enter your Phone Number to enjoy
//               <span className="text-orange-600 font-bold text-2xl md:text-3xl px-2">
//                 unlimited Cartoon videos
//               </span>
//             </h1>
//             <input
//               type="tel"
//               placeholder="ENTER YOUR PHONE NO."
//               className="border border-black text-lg md:text-xl text-center mt-3 w-full h-10"
//               onChange={(e) => setNumber(e.target.value)}
//             />
//           </div>
//           {error && <p className="text-red-600 text-center mt-2">{error}</p>}
//           <div className="flex mt-4 md:mt-6">
//             <button
//               onClick={handle}
//               className="w-full bg-orange-600 text-white py-2 px-4 rounded"
//               disabled={loading}
//             >
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopUp;
