// Layout.js
import React from "react";
import Bar from "./Bar";

const Layout = ({ children }) => {
  return (
    <>
      <Bar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
