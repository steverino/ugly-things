import React, { createContext, useState } from "react";
import Header from "./Header";
import PostImages from "./PostImages";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState("logged In User");
  return (
    <>
      <div className="wrapper">
        <UserContext.Provider value={user}>
          <Header />
        </UserContext.Provider>

        <PostImages />
      </div>
    </>
  );
};

export default App;
