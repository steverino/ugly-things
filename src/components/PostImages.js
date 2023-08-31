import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import UploadAndDisplayImage from "./UploadAndDisplayImage";
import Footer from "./Footer";

export const UserContext = createContext();
export const CopyYearCotext = createContext();

const PostImages = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("logged In User");
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

  const deletePost = (id) => {
    axios
      .delete(`https://api.vschool.io/sfalvo/thing/${id}`)
      .then((response) => {
        posts.filter((post) => {
          setPosts((prev) => [...prev, post.id !== id]);
          getImage();
        });
      });
  };

  return (
    <>
      <UserContext.Provider value={user}>
        <UploadAndDisplayImage postImage={postImage} />
      </UserContext.Provider>
      {/* {console.log(Array.isArray(posts))} */}
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
      <CopyYearCotext.Provider value={copyYear}>
        <Footer />
      </CopyYearCotext.Provider>
    </>
  );
};

export default PostImages;
