import React from "react";
import Header from "../components/HomeComponents/Header";
import Form from "../components/HomeComponents/Form";
import Footer from "../components/HomeComponents/Footer";
import { Toaster } from 'react-hot-toast';


const Home = () => {
  return (
    <div className=" bg-websiteBg min-h-screen overflow-y-hidden  ">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Header />
      <Form />
      <Footer />
    </div>
  );
};

export default Home;
