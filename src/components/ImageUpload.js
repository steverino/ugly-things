import { useState } from "react";



const ImageUpload = ({images}) => {
    const [file, setFile] = useState();
    const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    
    return (
        <>
      <div>
      <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} />
      </div>
    </>
  );
}
  
export default ImageUpload;
