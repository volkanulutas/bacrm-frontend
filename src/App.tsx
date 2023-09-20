import React, { useState } from "react";
import MainRoutes from "./Routes";
import HeaderMenu from "./components/HeaderMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Tooltip,
  Layout,
  Menu,
  theme,
  Space,
  Button,
  Switch,
  MenuTheme,
  Image,
} from "antd";

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import "./styles.css";
import InnerContent from "./components/InnerContent";
type MenuItem = Required<MenuProps>["items"][number];

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
    getItem("Users", "users"),
    getItem("Example", "example"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
 
  ]),

  getItem("Çalışanlar", "employee", <UserOutlined />, [
    getItem("Çalışan Listesi", "employee-list"),
    getItem("Giriş Ekranı", "login-scren")
  ]),
  getItem("İşler", "work", <PieChartOutlined />, [
    getItem("İş Listesi", "work-list"),
    getItem("İşçilik Girişi", "timesheet"),
  ]),

  getItem("İzinler", "leaves", <AppstoreOutlined />, [
    getItem("İzin Talep Formu", "leave-form"),
    getItem("İzin Onay Formu", "leave-approve-form"),
   
  ]),
  getItem("Teklifler", "proposal", <DesktopOutlined />, [
    getItem("Teklif Listesi", "proposal-list-form"),
  ]),
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
  const [themeLcl, setThemeLcl] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const changeTheme = (value: boolean) => {
    setThemeLcl(value ? "dark" : "light");
  };

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
          <Header style={{ display: "flex", alignItems: "center" }}>
            <div>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                <Menu.Item>
                  <Image width={32} height={32} src="logo192.png"></Image>
                </Menu.Item>
                <Menu.Item key="login">
                  <Tooltip title="Login">
                    <Button
                      type="link"
                      shape="circle"
                      icon={<LoginOutlined />}
                      href="/login"
                    />
                  </Tooltip>
                </Menu.Item>
                <Menu.Item>
                  <Switch
                    checked={themeLcl === "dark"}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                  />
                </Menu.Item>
              </Menu>
            </div>
          </Header>
          <Layout>
            <Sider
              collapsible
              collapsed={collapsed}
              width={200}
              style={{ background: colorBgContainer }}
              breakpoint="lg"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                theme={themeLcl}
                defaultOpenKeys={["sub1"]}
                style={{ height: "300%", borderRight: 0 }}
                onClick={onClick}
                items={items}
              />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <MainRoutes></MainRoutes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </Space>
    </div>
  );
}

export default App;
