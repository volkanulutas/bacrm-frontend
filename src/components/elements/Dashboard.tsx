import React from "react";
import { Button, Checkbox, Form, Input, Image } from "antd";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Image
        width={500}
        height={150}
        src="logo.png"
        preview={{ visible: false }}
      ></Image>
      <Image
        width={1200}
        height={800}
        src="dashboard2.jpg"
        preview={{ visible: false, forceRender: false }}
      ></Image>
    </div>
  );
};

export default Dashboard;
