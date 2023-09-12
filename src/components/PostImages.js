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
    console.log(imageName);
  };

  const editPost=(id,title,imgUrl,description)=>{
    axios.put(`https://api.vschool.io/sfalvo/thing/${id}`,{
      title:title,
      imgUrl:imgUrl,
      description:description
    }).then((response)=>{
      // response.data.title = title;
    })
    // handleClick(imgUrl)
  }

  const handleClick= (imgLoc,imgUrl, title, description)=>{
    setShowPreview(current=>!current)
    setImgLoc(imgLoc)
    console.log(imgLoc);
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
                  <h2 contentEditable={true} onInput={(e)=>editPost(post._id, e.currentTarget.textContent,post.imgUrl,post.description)} >{post.title}</h2>
                  <p className="imageDisplay">
                    <img src={post.imgUrl} alt="PIC" />
                  </p>
                  <p contentEditable={true} onInput={(e)=>editPost(post._id,post.title,post.imgUrl, e.currentTarget.textContent)}>{post.description}</p>

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
