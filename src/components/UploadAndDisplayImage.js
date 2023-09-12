import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { PostImageContext } from "./PostImages";
import PreviewImage from "./PreviewImage";

const UploadAndDisplayImage = () => {
  //<-- was {postImage} prop, now Context
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [imgName, setImgName] = useState("");

  const postImage = useContext(PostImageContext);
  
  const onFileUpload = () => {
    if (selectedFile === null) {
      return;
    } else {
      const formData = new FormData();
      formData.append("myFile", selectedFile);

      axios.post("http://localhost:5000/api/uploadfile", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      makeFile(imgName, title, description);
    }
  };

  const makeFile = (imgName, title, description) => {
    let imgUrl = `images/${imgName}`;
    postImage(imgUrl, title, description);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const refTitle = useRef(null);
  const refDesc = useRef(null);
  const refImage = useRef(null);
  return (
    <>
      <h1>Upload and Display Image</h1>

      {selectedFile && (
        <PreviewImage title={title} description={description} refTitle={refTitle} refDesc={refDesc} refImage={refImage} selectedFile={selectedFile} setSelectedFile={setSelectedFile}  />
        
      )}
      <div className="upload-container">
        <div className="upload-form">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              ref={refTitle}
            />
            <input
              className="inputImage"
              type="file"
              name="myFile"
              onChange={(event) => {
                setSelectedFile(event.target.files[0]);
                setImgName(event.target.files[0].name);
              }}
              ref={refImage}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              ref={refDesc}
            />
            <button type="button" onClick={onFileUpload}>
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadAndDisplayImage;
