import React, { useContext } from "react";
import { CopyYearCotext } from "./Create";

const Footer = () => {
  let copyYear = useContext(CopyYearCotext);

  if (copyYear > 2023) {
    copyYear = `2023 - ${copyYear}`;
  }

  return (
    <>
      <div>Copyright {copyYear} &copy; </div>
      <section className="footer">
        <ul>
          <li>link1</li>
          <li>link2</li>
          <li>link3</li>
          <li>link4</li>
        </ul>
      </section>
    </>
  );
};

export default Footer;
