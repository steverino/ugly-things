import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import data from '../assets/data.json'


const Create = () => {
  
  const [posts, setPosts] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

console.log('data '+data.myData);
console.log(data.myData);

  const getImages = () => {
    axios.get("http://localhost:5000/uploads").then((response) => {
      setPosts(response.data.myData);
      // console.log(response.data.myData);  
    });
  };

  
  useEffect(() => {
    getImages();
  }, []);
  
  const deletePost = (id) => {
    axios
      .delete(`https://api.vschool.io/sfalvo/thing/${id}`)
      .then((response) => {
        posts.filter((post) => {
          setDeleteMsg(response.data.msg + ' ' + post.title);
          setTimeout(() => {
            setDeleteMsg("");
          }, 3000);
          getImages();
          return post
        });
      });
  };


  return (
    <>
      
        <div className="form-input">
          
          
          <div>
          <UploadAndDisplayImage />
          </div>
          
        </div>
       <div>
        {posts}
       </div>
      

      <div id="deleteMessage">{deleteMsg}</div>
      {/* {console.log(Array.isArray(posts))} */}
      
    </>
  );
};

export default Create;
