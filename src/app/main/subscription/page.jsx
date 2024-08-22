"use client";
import Footer from "@/components/Footer";
import Table from "@/components/Table";
import Helpers from "@/config/Helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";

const pages = () => {
  const [arrayChannel, setArrayChannel] = useState([]);

  const getSubscibedChannels = () => {
    axios
      .get("/api/user/subscribed-channel", Helpers.authHeaders)
      .then((response) => {
        console.log(response.data.channels);
        setArrayChannel(response.data.channels);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSubscibedChannels();
  }, []);

  return (
    <>
      <div className="w-full min-h-[87vh] flex  items-start mt-10 justify-center">
        <div className="flex flex-col items-center justify-center gap-5">
          {arrayChannel?.length > 0 ? (
            arrayChannel?.map((items) => <Table channel={items} />)
          ) : (
            <div>No subscribed channels found!</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default pages;
