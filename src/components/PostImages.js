import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Footer from "./Footer";
import Header from "./Header";


export const CopyYearCotext = createContext();

const PostImages = () => {
  const [posts, setPosts] = useState([]);
  
  const [postId, setPostId] = useState("");
  const [copyYear, setCopyYear] = useState("");

  const y = new Date();

  const getImage = () => {
    axios.get("https://api.vschool.io/sfalvo/thing/").then((response) => {
      setPosts(response.data);
    });
  };
  useEffect(() => {
    getImage();
    setCopyYear(y.getFullYear()); //needs to be in useEffect or it re-renders
  }, []);

  const postImage = (imgUrl, title, description) => {
    axios
      .post("https://api.vschool.io/sfalvo/thing", {
        title,
        imgUrl,
        description,
      })
      .then((response) => {
        setPosts((prev) => [...prev, response.data]);
      })
      .catch((error) => console.log(error));
  };

  const deletePost = (id,imageName) => {
    axios
      .delete(`https://api.vschool.io/sfalvo/thing/${id}`)
      .then((response) => {
        
        posts.filter((post) => {
          setPosts((prev) => [...prev, post.id !== id]);
          getImage();
        });
      });

      axios.delete(`http://localhost:5000/api/delete/`,{data: {imageName}})
      console.log(imageName);

  };

  return (
    <>
      <div className="container">
      
          <UploadAndDisplayImage postImage={postImage} />
        <div className="image-container">
          <ul>
            {posts.map((post) => {
              return (
                <li key={post._id}>
                  <h2> {post.title} </h2>
                  <p className="imageDisplay">
                    <img src={post.imgUrl} alt="PIC" />
                  </p>
                  <p>{post.description}</p>

                  <div>
                    <button
                      className="btn-submit"
                      type="button"
                      onClick={() => deletePost(post._id,post.imgUrl)}
                    >
                      DELETE
                    </button>
                  </div>
                  {/* <button className="btn-submit" type="button" onClick={() => deleteImage('pic.jpg')}>OTHER DELETE</button> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <CopyYearCotext.Provider value={copyYear}>
        <Footer />
      </CopyYearCotext.Provider>
    </>
  );
};

export default PostImages;
