import React from "react";
import Header from "../components/HomeComponents/Header";
import Form from "../components/HomeComponents/Form";
import Footer from "../components/HomeComponents/Footer";

const Home = () => {
  return (
    <div className=" bg-websiteBg min-h-screen overflow-y-hidden  ">
      <Header />
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
