import { useState } from "react";
import axios from "axios";


const ImageUpload = ({images}) => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);

    const formData = new FormData();
    
    formData.append('image', selectedFile);
    
    axios.post('http://localhost:5000/uploads', formData)
      .then((response) => {

        console.log(response);
      })
      .catch((error) => {
        console.error('Error uploading image', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="image" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};
  
export default ImageUpload;
