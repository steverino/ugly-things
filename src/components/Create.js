import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "./ImageUpload";


const Create = () => {
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [images, setImages] = useState("IMAGES");
  const [posts, setPosts] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

  const getImages = () => {
    axios.get("https://api.vschool.io/sfalvo/thing").then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    getImages();
  }, []);

  const postImage = () => {
    axios
      .post("https://api.vschool.io/sfalvo/thing", {
        title: title,
        description: description,
        imgUrl: images,
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
          setDeleteMsg(response.data.msg);
          setTimeout(() => {
            setDeleteMsg("");
          }, 3000);
          getImages();
        });
      });
  };

  return (
    <>
      {/* <form className="form"> */}
        <div className="form-input">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* <input
            type="text"
            name="image"
            placeholder="Image"
            onChange={(e) => setImages(e.target.value)}
          /> */}
          <div>
          <ImageUpload />
          </div>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button className="btn-submit" type="button" onClick={postImage}>
            Submit
          </button>
          <img src="logo192.png" alt="" />
        </div>
      {/* </form> */}

      <div id="deleteMessage">{deleteMsg}</div>
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
