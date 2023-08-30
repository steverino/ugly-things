import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import UploadAndDisplayImage from "./UploadAndDisplayImage";

const Create = () => {
  
  const [posts, setPosts] = useState([]);
  
  const getImage=()=>{
  axios.get("https://api.vschool.io/sfalvo/thing/").then((response) => {
    setPosts(response.data);
  });
}
  useEffect(() => {
    getImage()
  }, []);
  

  const postImage = (imgUrl,title,description) => {
    
    axios
    .post("https://api.vschool.io/sfalvo/thing", {
      title,
      imgUrl,
      description
    })
    .then((response) => {
      setPosts((prev)=> [...prev, response.data]);
      
    })
    .catch((error) => console.log(error));
  };
  
  const deletePost = (id) => {
    axios.delete(`https://api.vschool.io/sfalvo/thing/${id}`)
    .then((response)=> {posts.filter((post)=> {
            
            setPosts((prev)=> [...prev, post.id !== id])
          getImage()
    })})
  };


  return (
    <>
      <UploadAndDisplayImage postImage={postImage}/>
      {/* {console.log(Array.isArray(posts))} */}
      <div className="container">
        <ul>
          {posts.map((post, index) => {
            // return <li key={index}> <h3>{post.title}</h3> <p>{post.imgUrl}</p> {post.description}</li>;
            // console.log(Array.isArray(posts));
            return (
              
                <li key={post._id}>
                  <h2> {post.title} </h2>
                  <p className="imageDisplay"><img src={post.imgUrl} alt="PIC" /></p>
                  <p>{post.description}</p>

                  <div>
                    <button
                      className="btn-submit"
                      type="button"
                      onClick={() => deletePost(post._id)}
                    >
                      DELETE
                    </button>
                  </div>
                </li>
              
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Create;
