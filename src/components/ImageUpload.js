import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = ({ postImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [pic,setPic] = useState()
  const [posts, setPosts] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");


  const getImages = () => {
    axios.get("http://localhost:5000/uploads").then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  };

  
  useEffect(() => {
    getImages();
  }, []);
  const handleFileChange = (event) => {
    
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target);

    const myArray = [title,pic,description]
    
    const formData = new FormData();

    formData.append('image', selectedFile);
    


    axios
      .post("http://localhost:5000/uploads", formData)
      .then((response) => {
        console.log('iu post '+formData);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input type="file" name="image" onChange={handleFileChange} />

      <input
        type="text"
        name="description"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Upload</button>
    </form>

<div className="container">
<ul>
  {posts.map((post, index) => {
    // return <li key={index}> <h3>{post.title}</h3> <p>{post.imgUrl}</p> {post.description}</li>;
    // console.log(Array.isArray(posts));
    return (
      <React.Fragment key={post._id}>
        <li >
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
      </React.Fragment>
    );
  })}
  
</ul>
</div>
</>
  );
};

export default ImageUpload;
