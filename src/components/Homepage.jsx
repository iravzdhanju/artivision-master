import React from "react";
import Footer from "./FooterComponent";
import Nav from "./Navbar";
import UserForms from "./UserForm";

const Homepage = () => {
  return (
    <main>
      {/*  */}
      <Nav />

      {/* <div className="contentHomepage"> */}
      <UserForms />
      {/* </div> */}
      {/* <Footer /> */}
    </main>
    //
  );
};

export default Homepage;
