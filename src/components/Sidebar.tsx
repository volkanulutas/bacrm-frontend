import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../config";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Button, Switch,} from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useState } from "react";

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

const Sidebar = () => {
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };


  const useAuth = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    } else {
      return false;
    }
  };
  const user = useAuth();
  const location = useLocation();
  const navigation = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigation("/login");
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation("/" + e.key);
  };




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
  return (
    <div>
       <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        onClick={onClick}
        mode="inline"
        style={{ width: 256 }}
        theme={theme}
        // selectedKeys={[current]}
        inlineCollapsed={true}
        items={items}
      />
    </div>
  );
};

export default Sidebar;
