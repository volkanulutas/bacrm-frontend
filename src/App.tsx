import React from "react";

import { Layout, Space } from "antd";
import MainRoutes from "./Routes";
import Sidebar from "./components/Sidebar";

import "./styles.css";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#55bcc9",
};

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#494ca2",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#F3EFE0",
};

function App() {
  return (
    <div className="app">
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}>BACRM</Header>
          <Layout hasSider>
            <Sider>
              {/** Sidebar */}
              <Sidebar />
            </Sider>
            <Content>{/** Inner container  <MainRoutes />*/}</Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
