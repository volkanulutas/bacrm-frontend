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
import {useNavigate} from "react-router-dom";


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

const Logout = () => {
	const navigate = useNavigate()

	//ADMIN
	//USER

	const login = () => {
		localStorage.removeItem("user");
		navigate("/dashboard")
	}

	return (
		<div className="login">
			 <Tooltip title="Çıkış Yap">
                    <Button
                      type="link"
                      shape="circle"
                      icon={<LogoutOutlined />}
                      href="/logout-screen"
                    />
                  </Tooltip>
		</div>
	)
}

export default Logout
