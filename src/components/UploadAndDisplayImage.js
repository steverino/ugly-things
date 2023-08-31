import React, { useState, createContext, useContext, useRef } from "react";
import axios from "axios";
import { UserContext } from "./PostImages";

const UploadAndDisplayImage = ({ postImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [imgName, setImgName] = useState("");
  const myUser = useContext(UserContext)
  
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);
    
    axios.post("http://localhost:5000/api/uploadfile", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    makeFile(imgName,title,description);
  };
  
  const makeFile = (imgName,title,description)=>{
    let imgUrl = `images/${imgName}`
    postImage(imgUrl,title,description)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };
  const refTitle=useRef(null)
  const refDesc=useRef(null)
  const refImage=useRef(null)
  return (
    <>
      <div>
        {myUser}
        <h1>Upload and Display Image</h1>
        
        {selectedFile && (
          <div>
            <div>{title}</div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedFile)}
              />
            <div>{description}</div>
            <br />
            <button onClick={() => {
              setSelectedFile(null)
              refTitle.current.value = '';
              refDesc.current.value = ''
              refImage.current.value = ''
              
              }}>Remove</button>
          </div>
        )}
        <br />
        <br />
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <button type="button" onClick={onFileUpload}>
            Upload Image
          </button>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            ref={refDesc}
          />
        </form>
      </div>
    </>
  );
};

export default UploadAndDisplayImage;
