import React, { useState, useEffect } from "react";
import axios from "axios";
import Images from "./Images";

const Create = () => {
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [images, setImages] = useState('IMAGES');
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios.get("https://api.vschool.io/sfalvo/thing/").then((response) => {
      console.log(response.data);
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
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };
if (!posts) return "No post!"

  const deletePost = (id) => {
    axios.delete(`https://api.vschool.io/sfalvo/thing/${id}`);
    setPosts(
        posts.filter((post) => {
          return post.id !== id;
        })
    );
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
      <ul>
        {posts.map((post, index) => {
          // return <li key={index}> <h3>{post.title}</h3> <p>{post.imgUrl}</p> {post.description}</li>;
          // console.log(Array.isArray(posts));
          return ( 
            <>
            {post.title}
            
            <button className="btn-submit" type="button" onClick={()=>deletePost(post._id)}>
            DELETE
          </button>
            </>
            )
          
        })}
      </ul>
    </>
  );
};

export default Create;
