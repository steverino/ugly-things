import React, { useState } from "react";
import axios from "axios";

const UploadAndDisplayImage = ({ postImage }) => {
  // console.log(postImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("TITLE");
  const [description, setDescription] = useState("DESCRIPTION");
  const [imgUrl, setImgUrl] = useState("");

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile);

    console.log(selectedFile);
    axios.post("http://localhost:5000/api/uploadfile", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target);
  };

  return (
    <>
      <div>
        <h1>Upload and Display Image using React Hook's</h1>

        {selectedFile && (
          <div>
            <img
              alt="not found"
              width={"250px"}
              src={URL.createObjectURL(selectedFile)}
            />
            <br />
            <button onClick={() => setSelectedFile(null)}>Remove</button>
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
          />

          <input
            type="file"
            name="myFile"
            onChange={(event) => {
              setSelectedFile(event.target.files[0]);
            }}
          />
          <button type="button" onClick={onFileUpload}>
            Upload Image
          </button>

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </form>
      </div>
      <div>
        <img src="" alt="" />TEST
      </div>
    </>
  );
};

export default UploadAndDisplayImage;
