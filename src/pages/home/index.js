import { StaticImage } from "gatsby-plugin-image";
import React from "react";

const index = () => {
  return (
    <div>
      this home page
      <StaticImage alt='logo' src={"../../images/icon.png"} width={50} height={50} />
    </div>
  );
};

export default index;
