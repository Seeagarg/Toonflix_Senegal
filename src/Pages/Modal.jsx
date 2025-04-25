import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { baseurl } from "../Api/api";

const Modal = ({ open, onClose, videoid }) => {
  const [comments, setComments] = useState("");

  const fetchData = async () => {
    try {
      const ani = Cookies.get("number");
      // const response = await axios.get(`http://localhost:4000/api/little/comments/${param.id}`);
      const response = await axios.get(
        `${baseurl}api/little/comments/${videoid}`
      );

      console.log(response.data, "commentsvideos");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    // const value = e.target.value;
    setComments(e.target.value);
  };

 const handleSubmit = async (e) => {
  try {
    e.preventDefault();
    const ani = Cookies.get("number");
    
    // Make sure 'comments' and 'videoid' are defined
    const comments = "";
    const videoid = "";

    const userData = {
      comment: comments,
      ani: ani,
      videoid: videoid,
    };
    
    console.log("userData", userData);

    const response = await axios.post(`${baseurl}api/little/postcomment`, userData);
    // const response = await axios.post("http://localhost:4000/api/little/postcomment", userData);
    console.log(response.status, response.data);
  } catch (error) {
    console.error("Error in Axios request:", error);
  }
};


  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 overlay z-50 overflow-y-auto bg-black/60"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="max-w-2xl w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex bg-white shadow-lg rounded-md inset-0 overflow-y-auto bg-black/90"
      >
        <div className="w-full ">
          <p className="fixed top-8 right-8 cursor-pointer" onClick={onClose}>
            X
          </p>
          <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Laisser un commentaire</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block font-medium text-gray-600 text-lg"
                >
                  Comment:
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  rows="4"
                  value={comments}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
