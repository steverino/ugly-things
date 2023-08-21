import React, { useState, useEffect } from "react";
import axios from "axios";

const Create = () => {
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [images, setImages] = useState("IMAGES");
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get("https://api.vschool.io/sfalvo/thing/").then((response) => {
      setPosts(response.data);
    });
  }, []);
  

  const postImage = () => {
    axios
    .post("https://api.vschool.io/sfalvo/thing", {
      title: title,
      description: description,
      imgUrl: images,
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
          
    })})
  };


  return (
    <>
      <form className="form">
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            name="image"
            placeholder="Image"
            onChange={(e) => setImages(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button className="btn-submit" type="button" onClick={postImage}>
            Submit
          </button>
        </div>
      </form>
      {/* {console.log(Array.isArray(posts))} */}
      <div className="container">
        <ul>
          {posts.map((post, index) => {
            // return <li key={index}> <h3>{post.title}</h3> <p>{post.imgUrl}</p> {post.description}</li>;
            // console.log(Array.isArray(posts));
            return (
              <>
                <li>
                  <p> {post.title} </p>
                  <img src={post.imgUrl} alt="PIC" />
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
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Create;
