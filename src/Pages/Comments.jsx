import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { baseurl } from "../Api/api";

const Comments = ({ videoId }) => {
  console.log("videoid", videoId);
  const [loading, setLoading] = useState(true);
  const [commentVideos, setCommentVideos] = useState({ comments: [] });
  const [comment, setComment] = useState(false);
  const [videoid, setVideoid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState("");
  const [like, setLike] = useState(0);
  const [count, setCount] = useState(0);
  const [likeCount, setLikeCount] = useState();

  const param = useParams();

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    fetchData();
    fetchLikes();
  }, [videoId]);

  const fetchLikes = async () => {
    try {
      const response = await axios.get(
        `${baseurl}api/little/getlikes/${videoId}`
      );
      setLikeCount(response.data?.Likes.likes ?? 0);
    } catch (error) {
      console.error("Error checking if post is liked:", error);
    }
  };

  const checkLikedStatus = () => {
    const storedLikedStatus = localStorage.getItem(`liked_${videoId}`);
    setIsLiked(storedLikedStatus === "true");
  };
  
  const handleLike = async (e) => {
    e.preventDefault();
    const ani = Cookies.get("number");
    const data = { status: "1", ani, videoid: videoId };
  
    try {
      console.log("Sending like request with data:", data);
      await axios.post(`${baseurl}api/little/likevideo`, data);
      setIsLiked(true);
      fetchLikes();
      localStorage.setItem(`liked_${videoId}`, "true");
      console.log("Like successful!");
    } catch (error) {
      console.error("Error in Axios request:", error);
    }
  };

  const handleUnlike = async () => {
    const ani = Cookies.get("number");

    try {
      await axios.delete(`${baseurl}api/little/unlike/${ani}/${videoId}`);
      setIsLiked(false);
      fetchLikes();
      localStorage.removeItem(`liked_${videoId}`);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const fetchData = async () => {
    try {
      const ani = Cookies.get("number");
      const response = await axios.get(
        `${baseurl}api/little/comments/${videoId}`
      );

      setCommentVideos(response.data);
      console.log(response.data, "commentsvideos");
      setCount(response.data.comments.length);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmit = (e) => {
    const ani = Cookies.get("number");
    e.preventDefault();
    const userData = {
      comment: comments,
      ani: ani,
      videoid: videoId,
    };
    console.log("userData", userData);
    axios
      .post(`${baseurl}api/little/postcomment`, userData)
      .then((response) => {
        console.log(response.status, response.data);
        onClose();
        fetchData();
      })
      .catch((error) => {
        console.error("Error in Axios request:", error);
      });
  };

  return (
    <>
      <div className="container mx-auto max-w-[1140px]  px-4 py-2  flex  justify-between gap-4">
        <div className="card-footer flex gap-3 px-4  bg-white active md:active lg:active  rounded-xl font-bold shadow-lg  text-black active:bg-bg-black p-2 ">
          <div className=" flex gap-4">
            <div>
              {isLiked ? (
                <AiFillHeart
                  size={25}
                  className="text-red-500 "
                  onClick={handleUnlike}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  onClick={handleLike}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            <h4 className=" font-bold">Likes: ({likeCount})</h4>
            <div>
              <div>
                <h2 className=" font-bold mb-4 text-left container mx-auto max-w-[1100px] ">comments: ({count})</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div onClick={onClose} className="px-4 py-12 fixed inset-0 overlay z-50 overflow-y-auto bg-black/60">
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="max-w-2xl w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex "
          >
            <div className=" container mx-auto max-w-[1100px]  ">
              <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
                <div className="flex justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">Leave a comment</h2>
                  </div>
                  <div className="mr-4">
                    <p className="fixed  cursor-pointer text-xl " onClick={onClose}> X </p>
                  </div>
                </div>
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
                 Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto max-w-[1140px] px-4 ">
        <div className="bg-white shadow-md overflow-auto">
          <div className="container mx-auto max-w-[1100px]">
            <div className="font-bold p-3 cursor-pointer">
              <button className="animate-pulse animate-infinite text-black " onClick={openModal}> Click here to write Comment......</button>
            </div>
            <hr className="px-3" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-[1140px] px-4 ">
        <div className="bg-white shadow-md overflow-auto h-[120px] ">
          <div className="">
            {commentVideos.comments && commentVideos.comments.length > 0 ? (
              commentVideos.comments.map((data, index) => (
                <div
                  key={index}
                  className="flex items-left space-x-4 text-left overflow-auto mt-1"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden ">
                    <div className="p-2 px-4 ">
                      <FaUserCircle className='w-[100%] h-[100%]'/>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="px-2 font-semibold">{data.comments}</p>
                    <p className="px-2 font-normal">{data.ani}</p>
                    <hr className="bg-black" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center p-4">No comments available.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
