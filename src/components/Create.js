import React, {useState, useEffect} from "react";
import axios from "axios";
import Images from "./Images";

const Create = () => {
    const [title, setTitle] = useState('TITLE') 
    const [description, setDescription] = useState('DESCRIPTION') 
    const [image, setImage] = useState('IMAGE') 
    
    useEffect(() => {
      axios
      .get("https://api.vschool.io/sfalvo/thing")
      .then((response) => {
        setImage(response.data);
      })

    },[])
    
    const postImage = () => {
                
        axios
        .post("https://api.vschool.io/sfalvo/thing/", {
          title: 'title',
          description: 'description',
          image: 'image'
        })
        .then((response) => {
          setImage(response.data)
        })
        .catch((error) => console.log(error));
        
      }
    
    return (
    <>
      <form className="form">
        <div className="form-input">
          <input type="text" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input type="text" name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
          <input type="text" name="image" placeholder="Image" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div className="form-button">
          <button className="btn-submit" type="button" onClick={postImage}>
            Submit
          </button>
        </div>
      </form>
      <div>{title}</div>
      <div>{description}</div>
      <div>{image}</div>
    </>
  );
};

export default Create;
