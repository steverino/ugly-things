import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Footer from "./Footer";
import PreviewImage from "./PreviewImage";

export const CopyYearCotext = createContext();

export const PostImageContext = createContext();

const PostImages = () => {
  const [posts, setPosts] = useState([]);
  const [copyYear, setCopyYear] = useState("");
  const [showPreview, setShowPreview] = useState(false)
  const [imgLoc, setImgLoc] = useState('')

  const getImage = () => {
    axios.get("https://api.vschool.io/sfalvo/thing/").then((response) => {
      setPosts(response.data);
    });
  };
  useEffect(() => {
    getImage();
    
    setCopyYear(new Date().getFullYear()); //needs to be in useEffect or it re-renders
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

  const deletePost = (id, imageName) => {
    axios
      .delete(`https://api.vschool.io/sfalvo/thing/${id}`)
      .then((response) => {
        posts.filter((post) => {
          return setPosts((prev) => [...prev, post.id !== id]);
        });
        getImage();
      });

    axios.delete(`http://localhost:5000/api/delete/`, { data: { imageName } });
    
  };

  const editPost=(id,imgUrl,title,description)=>{
    axios.put(`https://api.vschool.io/sfalvo/thing/${id}`,{
      title:title,
      imgUrl:imgUrl,
      description:description
    }).then((response)=>{
      console.log(title);
    })
  }

  return (
    <>
      <div className="container">
        <PostImageContext.Provider value={postImage}>
          <UploadAndDisplayImage />
        </PostImageContext.Provider>
        {showPreview && <PreviewImage imgUrl={imgLoc} />}

        <div className="image-container">
          <ul>
            {posts.map((post) => {
              return (
                // DISPLAY IMAGE
                <li key={post._id}>
                  <h2> {post.title} </h2>
                  <p className="imageDisplay">
                    <img src={post.imgUrl} alt="PIC" />
                  </p>
                  <p>{post.description}</p>

                  <div>
                    {/* DELETE IMAGE */}
                    <button
                      className="btn-submit"
                      type="button"
                      onClick={() => deletePost(post._id, post.imgUrl)}
                    >
                      DELETE
                    </button>
                    
                    {/* EDIT IMAGE  */}
                    {/* <button
                      className="btn-submit"
                      type="button"
                      onClick={() => editPost(post._id,post.title,post.description, post.imgUrl)}
                      // onClick={ ()=>handleClick(post.imgUrl)}
                    >
                      Edit
                    </button> */}
                  </div>
                  {posts && 'Click text to edit in place'}
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
