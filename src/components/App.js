import React from "react";
import Header from "./Header";
import PostImages from "./PostImages";

const App = () => {
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