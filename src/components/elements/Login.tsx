import { Col, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Image } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

import { authServiceLogin } from "../../service/auth.service";


const Login = () => {
	const navigate = useNavigate();
	
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	const onFinish = (values: any) => {
		authServiceLogin( values.email, values.password).then(
			() => {
			  navigate("/dashboard");
			  window.location.reload();
			},
			(error) => {
			  const resMessage =
				(error.response &&
				  error.response.data &&
				  error.response.data.message) ||
				error.message ||
				error.toString();
	
			  setLoading(false);
			  setMessage(resMessage);
			}
		  );
		};

	



	return (
		<div>
		<h2>Giriş Ekranı</h2>
	  
	  <Row>
	   <Col span={12}>
	  <div>
	  <Image width={300} height={300} src="logo192.png"></Image>
	  </div>           
	  <Form
		name="normal_login"
		className="login-form"
		initialValues={{ remember: true }}
		onFinish={onFinish}
	  >
		<Form.Item
		  name="email"
		  rules={[{ required: true, message: 'Lütfen e-posta adresinizi giriniz.' }]}
		>
		  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="E-posta" />
		</Form.Item>
		<Form.Item
		  name="password"
		  rules={[{ required: true, message: 'Lütfen şifrenizi giriniz.' }]}
		>
		  <Input
			prefix={<LockOutlined className="site-form-item-icon" />}
			type="password"
			placeholder="Password"
		  />
		</Form.Item>
		<Form.Item>
		<Form.Item name="remember" valuePropName="checked" noStyle>
		  <Checkbox>Remember me</Checkbox>
		</Form.Item>
		<a className="login-form-forgot" href="">
		  Forgot password
		</a>
		</Form.Item>
		<Form.Item>
		  <Button type="primary" htmlType="submit" className="login-form-button">
			Log in
		  </Button>
		  Or <a href="">register now!</a>
		</Form.Item>
	  </Form>
		
	  </Col>
	  <Col span={12}>
		<Image width={300} height={300} src="logo192.png"></Image>  
	  </Col>
	  </Row>
	  </div>
	);
}

export default Login
