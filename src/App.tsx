import React, { useState } from 'react';
import MainRoutes from "./Routes";
import HeaderMenu from "./components/HeaderMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme, Space, Button} from 'antd';

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import "./styles.css";
type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "sub1", <MailOutlined />, [
    getItem("Dashboard", "dashboard"),
    getItem("Tabs Demo", "tabs"),
    getItem("Dynamic Form", "dynamic-form"),
    getItem("Timesheet", "timesheet"),
    getItem("Users", "users"),
    getItem("Example", "example"),
    getItem("Proposal Form", "proposal-form-list"),
  ]),

  getItem("İzinler", "sub2", <AppstoreOutlined />, [
    getItem("İzin Talep Formu", "leave-form"),
    getItem("İzin Onay Formu", "leave-approve-form"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ])  ,
  getItem("Teklifler", "sub2", <AppstoreOutlined />, [
    getItem("İzin Talep Formu", "leave-form"),
    getItem("İzin Onay Formu", "leave-approve-form"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ])  
];



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
  const navigation = useNavigate();
  const [current, setCurrent] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation("/" + e.key);
  };
  return (
    <div className="app">
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={headerStyle}> <HeaderMenu/></Header>
          <Layout hasSider>
          <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            theme='dark'
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onClick}
            items={items}
          />
        </Sider>
            <Content 
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }} > 
            <MainRoutes />
            </Content>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
