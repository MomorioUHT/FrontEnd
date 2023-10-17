import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserDetail } from "../hook";
import axios from 'axios';
import {  Button, 
          Input, 
          Space, 
          notification, 
          Layout, 
          Menu, 
       } from 'antd';

import {  EyeInvisibleOutlined, 
          EyeTwoTone, 
          UserOutlined, 
          KeyOutlined, 
          LoginOutlined,
          PlusSquareOutlined
       } from '@ant-design/icons';

const { Header } = Layout;

export const MainPage = () => {
    const [username, setLoginUsername] = useState('')
    const [password, setLoginPassword] = useState('')

    const [reguser, setregUser] = useState('')
    const [regpassword, setregPassword] = useState('')
    const [regconfirmpassword, setregconfirmPassword] = useState('')
    
    const navigate = useNavigate();
    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR" | "LOGGED_IN">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                return
            } else {
                navigate("/Home")
            }
        })
    }, [])
    
    const ToggleDisplay = (Arg: string) => {
        const Regbox = document.getElementById(`Register`);
        const Loginbox = document.getElementById(`Login`);
        if (Arg === "Login") {
            if (Regbox != null && Loginbox != null) {
                Regbox.style.display = "none"
                Loginbox.style.display = "block"
            }
        } else if (Arg === "Register") {
            if (Regbox != null && Loginbox != null) {
                Regbox.style.display = "block"
                Loginbox.style.display = "none"
            }       
    }}

    const Login = (e: any) => {
        if (!username || !password) {
            notification.error({
                message: 'Error',
                description: 'Please fill out the forms',
                placement: 'topLeft'
              })
            return
        } else {
            axios.post<UserDetail[] | "WRONG" | "SEVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/login`, {
                username: username,
                password: password
              }, {withCredentials: true})
              .then(function (response) {
                console.log(response);
                if (response.data === "SEVER_SIDE_ERROR" || response.data === "WRONG") {
                    notification.error({
                        message: 'Login failed',
                        description: 'Username or Password is Incorrect',
                        placement: 'topLeft'
                      })
                } else {
                    notification.success({
                        message: 'Login Successful',
                        description: 'Redirecting...',
                        placement: 'topLeft'
                      })
                    setTimeout(function timer() {
                        window.location.reload()
                    }, 150);   
                }
              })
        }
    }

    const Register = (e: any) => {
        if (!reguser || !regpassword || !regconfirmpassword) {
            notification.error({
                message: 'Error',
                description: 'Please fill out the forms',
                placement: 'topLeft'
              })
        } else if (regpassword !== regconfirmpassword) {
            notification.error({
                message: 'Cannt Register',
                description: 'Password Does not Match',
                placement: 'topLeft'
              })
        } else if (String(regpassword).length < 6 || String(regconfirmpassword).length < 6) {
            notification.error({
                message: 'Cannt Register',
                description: 'Password must be at least 6 characters long',
                placement: 'topLeft'
              })
        } else {
            axios.post(`${BACKEND_API_ENDPOINT}/register`, {
                username: reguser,
                password: regpassword,
                fullname: reguser + '#' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
                role: "User",
                sessionID: 0
              })
              .then(function (response) {
                console.log(response);
                if (response.data === "MySQL_REG_COMPLETED!") {
                    notification.success({
                        message: 'Register Complete',
                        description: 'You can now login!',
                        placement: 'topLeft'
                      })  
                } else if (response.data === "POST_ADD_USER_ERROR") {
                    notification.error({
                        message: 'Error',
                        description: 'Authentication Server was down...',
                        placement: 'topLeft'
                      })
                }
              })
        }
    }

    return (
        <div className="MainPageBody">
            <div className="RefreshOnLoad">
                <Header
                    style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    }}
                >
                <div  />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                            key: '1',
                            icon: <LoginOutlined />,
                            label: 'Login',
                            onClick: () => ToggleDisplay("Login")
                            },
                            {
                            key: '2',
                            icon: <PlusSquareOutlined />,
                            label: 'Register',
                            onClick: () => ToggleDisplay("Register")
                            },
                        ]}
                    />
                </Header>
                <div id="Login" className="RefreshOnLoad" style={{display: "block",margin: 30}}>
                    <h1 className="LoginAndRegisterTitle">Login</h1>
                    <Space.Compact
                        style={{
                            width: '100%',
                        }}
                        >
                        <Input 
                            name="input"
                            size="large" 
                            placeholder="Username" 
                            prefix={<UserOutlined />} 
                            onChange={(e) => setLoginUsername(e.target.value)}
                            style={{width: 250}}
                        />
                        <Input.Password
                            name="input"
                            size="large"
                            placeholder="Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<KeyOutlined />}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            value={password}
                            style={{width: 250}}
                        />
                        <Button 
                            type="primary" 
                            onClick={Login}
                            style={{height: 40,width: 40}}
                            icon={<LoginOutlined />}
                            />
                    </Space.Compact>
                </div>
                <div id="Register" className="RefreshOnLoad" style={{display: "none",margin: 30}}>
                    <h1 className="LoginAndRegisterTitle">Register</h1>
                    <Space.Compact
                        style={{
                            width: '100%',
                        }}
                        >
                        <Input 
                            name="input"
                            size="large" 
                            placeholder="Username" 
                            prefix={<UserOutlined />} 
                            onChange={(e) => setregUser(e.target.value)}
                            value={reguser}
                            style={{width: 250}}
                        />
                        <Input.Password
                            name="input"
                            size="large"
                            placeholder="Set a Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<KeyOutlined />}
                            onChange={(e) => setregPassword(e.target.value)}
                            value={regpassword}
                            style={{width: 250}}
                        />
                        <Input.Password
                            name="input"
                            size="large"
                            placeholder="Confirm Password"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            prefix={<KeyOutlined />}
                            onChange={(e) => setregconfirmPassword(e.target.value)}
                            value={regconfirmpassword}
                            style={{width: 250}}
                        />
                        <Button 
                            type="primary" 
                            onClick={Register}
                            style={{height: 40,width: 110}}
                            icon={<LoginOutlined />}
                            >Register</Button>
                    </Space.Compact>
                </div>
            </div>
        </div>
    )
}