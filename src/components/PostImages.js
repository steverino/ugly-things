import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Footer from "./Footer";

export const CopyYearCotext = createContext();

export const PostImageContext = createContext();

const PostImages = () => {
  const [posts, setPosts] = useState([]);
  const [copyYear, setCopyYear] = useState("");

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

  const editPost=(id,item)=>{
    console.log(item);
    
    axios.put(`https://api.vschool.io/sfalvo/thing/${id}`,item )
      .then((response)=>{ // should response be used?
        // setPosts((prev)=> [...prev, response.data])
      
      // console.log(response.data.title);
      
      
    })
  }

  return (
    <>
      <div className="container">
        <PostImageContext.Provider value={postImage}>
          <UploadAndDisplayImage />
        </PostImageContext.Provider>

        <div className="image-container">
          <ul>
            {posts.map((post) => {
              return (
                // DISPLAY IMAGE
                <li key={post._id}>
                  <h2 contentEditable={true} onInput={(e) => editPost(post._id, {title:e.currentTarget.textContent})} suppressContentEditableWarning={true}> {post.title} </h2>
                  {/* <h2 contentEditable={true} onChange={(e) => editPost(post._id, e.currentTarget.textContent, post.imgUrl, post.description)} > {post.title} </h2> */}
                  <p className="imageDisplay">
                    <img src={post.imgUrl} alt="PIC" />
                  </p>
                  <p contentEditable={true} onInput={(e) => editPost(post._id, {description:e.currentTarget.textContent})} suppressContentEditableWarning={true}>{post.description}</p>
                  {/* <p contentEditable={true} onChange={(e) => editPost(post._id, post.title, post.imgUrl, e.currentTarget.textContent)} >{post.description}</p> */}

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
                      onClick={() => editPost(post._id, post.imgUrl,post.title,post.description)}
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
