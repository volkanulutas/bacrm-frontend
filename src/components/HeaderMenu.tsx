import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "../config";
import type { MenuProps, MenuTheme } from "antd";
import { Menu, Switch } from "antd";
import { Button, Tooltip, Space } from 'antd';
import { SearchOutlined, LoginOutlined } from '@ant-design/icons';

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { on } from "events";

const MenuItems = [
  { name: 'Login', link: '/login', icon: <LoginOutlined />  }, 
  { name: 'theme', link: '/about', icon: <SearchOutlined/> }, 
]; 

const HeaderMenu = () => {
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [current, setCurrent] = useState("1");
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
    navigation("/login-scree");
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigation("/" + e.key);
  };

  return (
    <Menu mode="horizontal"> 

      <Menu.Item key= "login">  
        <Tooltip title="Login">
          <Button type="link" shape="circle" icon={<LoginOutlined />} href="/login" />
        </Tooltip>
      </Menu.Item>  
      <Menu.Item>
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      </Menu.Item>
    </Menu>  
  );
};

export default HeaderMenu;
