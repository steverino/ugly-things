import React, { useContext } from "react";
import { UserContext } from "./App";

const Header = () => {
  const myUser = useContext(UserContext);

  return (
    <>
      <div className="header">Ugly Things</div>
      <div>Welcome {myUser}</div>
    </>
  );
};

export default Header;
