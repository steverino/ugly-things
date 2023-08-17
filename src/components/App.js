import React from "react";
import Create from "./Create";
import Header from "./Header";


const App = () => {
const baseURL = 'https://api.vschool.io/sfalvo/thing/'

  return (
    <>
      <div className="container">
        <Header/>
        
        <Create />
      </div>
    </>
  );
};

export default App;
