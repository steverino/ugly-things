import React, { useContext } from "react";
import { CopyYearCotext } from "./PostImages";

const Footer = () => {
  let copyYear = useContext(CopyYearCotext);

  if (copyYear > 2023) {
    copyYear = `2023 - ${copyYear}`;
  }

  return (
    <>
      <section className="footer">
        <div>Copyright {copyYear} &copy; </div>
        <div className="footer-links">
          <ul>
            <li><a href="#">link1</a></li>
            <li><a href="#">link2</a></li>
            <li><a href="#">link3</a></li>
            <li><a href="#">link4</a></li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Footer;
