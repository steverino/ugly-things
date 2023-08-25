import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";



const Create = () => {
  
  const [images, setImages] = useState('/backend/uploads');
  const [posts, setPosts] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

  const getImages = () => {
    axios.get("http://localhost:5000/uploads").then((response) => {
      setPosts(response.data);
    });
  };

  
  useEffect(() => {
    getImages();
  }, []);

  const postImage = () => {
    axios
      .post("https://api.vschool.io/sfalvo/thing", {
        // title: title,
        // description: description,
        // imgUrl: images,
      })
      .then((response) => {
        setPosts((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };
  
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
      {/* <form className="form"> */}
        <div className="form-input">
          
          {/* <input
            type="text"
            name="image"
            placeholder="Image"
            onChange={(e) => setImages(e.target.value)}
          /> */}
          <div>
          <ImageUpload postImage={postImage} />
          </div>
          
        </div>
        <div className="form-button">
          {/* <button className="btn-submit" type="button" onClick={postImage}>
            Submit
          </button> */}
          
        </div>
      {/* </form> */}

      <div id="deleteMessage">{deleteMsg}</div>
      {/* {console.log(Array.isArray(posts))} */}
      
    </>
  );
};

export default Create;
