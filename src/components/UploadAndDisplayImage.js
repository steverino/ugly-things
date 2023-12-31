import React, { useState, useRef } from "react";
import axios from "axios";


const UploadAndDisplayImage = ({ postImage }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [imgName, setImgName] = useState("");
  
  
  const onFileUpload = () => {

    if(selectedFile === null){
      return alert("No Image Selected")
    }else{
      
      const formData = new FormData();
      formData.append("myFile", selectedFile);
      
      axios.post("http://localhost:5000/api/uploadfile", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      makeFile(imgName,title,description);
    }
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
              setSelectedFile(null) //Removes image
              refTitle.current.value = ''; //removes text field
              refDesc.current.value = '' ;//removes text field
              refImage.current.value = '' ;//removes text field
              
              }}>Remove</button>
          </div>
        )}
        <br />
        <br />
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
