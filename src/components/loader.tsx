"use client";
import { Spin } from "antd";
import React from "react";

function Loader() {
  return (
    <div className="flex justify-center mt-20">
      <Spin size="large" tip="Loading..." style={{ color: "#f1c40f" }} />
    </div>
  );
}

export default Loader;
