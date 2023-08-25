import React from "react";
import Create from "./Create";
import Header from "./Header";
import ImageUpload from "./ImageUpload";


const App = () => {
const baseURL = 'https://api.vschool.io/sfalvo/thing/'

  return (
    <>
      <div className="container">
        <Header/>
        
        <ImageUpload />
      </div>
    </>
  );
};

export default App;
