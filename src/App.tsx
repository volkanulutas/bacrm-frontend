import React, { useEffect, useState } from "react";
import MainRoutes from "./Routes";
import HeaderMenu from "./components/HeaderMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as AuthService from "./service/auth.service";
import IUser from './types/user.type';
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
  LogoutOutlined,
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
import MenuItem from "antd/es/menu/MenuItem";
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
    type
  } as MenuItem;
}

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
  // role
  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  /*
  useEffect( () => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
    setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
    setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
  })*/

  const items: MenuItem[] = [


    getItem("Çalışanlar", "employee", <UserOutlined />, [
      getItem("Çalışan Listesi", "employee-list"),
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
      ( {showAdminBoard}? getItem("Teklif Listesi", "proposal-list-form") : null )
    ])
  ];


  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };


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
              <Menu theme="dark" mode="horizontal">
                <Menu.Item>
                  <Image width={32} height={32} src="logo192.png"></Image>
                </Menu.Item>

                {!currentUser ? (
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
                ): ( 
                <Menu.Item key="logout">
                  <Tooltip title="Çıkış Yap">
                    <Button
                      type="link"
                      shape="circle"
                      icon={<LogoutOutlined />}
                      href="/logout"
                    />
                  </Tooltip>
                </Menu.Item>)}
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
