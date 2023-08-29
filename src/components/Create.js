import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";
import UploadAndDisplayImage from "./UploadAndDisplayImage";



const Create = () => {
  
  const [posts, setPosts] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

  const getImages = () => {
    axios.get("http://localhost:5000/build").then((response) => {
      setPosts(response.data);
      console.log(response.data);  
    });
  };

  
  useEffect(() => {
    getImages();
  }, []);

  const testFunction = () => {
    console.log('FUNCTION CHECK');
  }
  
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
          <UploadAndDisplayImage testFunction={testFunction} />
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
