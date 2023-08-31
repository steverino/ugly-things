import React from "react";
import Header from "./Header";
import PostImages from "./PostImages";


const App = () => {
const baseURL = 'https://api.vschool.io/sfalvo/thing/'

  return (
    <>
      <div className="container">
        <Header/>
        
        <PostImages />
      </div>
    </>
  );
};

export default App;
