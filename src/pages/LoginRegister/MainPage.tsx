import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../Redux/hook";
import { Helmet } from 'react-helmet';
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
        axios.get(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        }).then(res => { 
            console.log(res)
            if (res.data.message === "AUTHENTICATED") {
                navigate('/home')
            } else {
                navigate('/MainPage')
            }
         })
    }, [])

    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const successNotify = (Arg: string) => {
        notification.success({
            message: 'Success!',
            description: Arg,
            placement: 'topLeft'
          })
    }
    
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

    const Login = () => {
        if (!username || !password) {
            errorNotify("Please fill out the forms")
        } else {
            axios.post(`${BACKEND_API_ENDPOINT}/login`, {
                username: username,
                password: password
              }, {withCredentials: true})
              .then(function (res) {
                console.log(res);
                if (res.data.Login) {
                    successNotify("Login Successful")
                    localStorage.setItem("token", res.data.token)
                    navigate('/Home')
                } else {
                    errorNotify("Username or Password is Incorrect")
                }
              })
        }
    }

    const Register = () => {
        if (!reguser || !regpassword || !regconfirmpassword) {
            errorNotify("Please fill out the forms")
        } else if (regpassword !== regconfirmpassword) {
            errorNotify("Password does not match!")
        } else if (String(regpassword).length < 6 || String(regconfirmpassword).length < 6) {
            errorNotify("Password must be at least 6 characters long")
        } else {
            axios.post(`${BACKEND_API_ENDPOINT}/register`, {
                username: reguser,
                password: regpassword,
                fullname: reguser + '#' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
                role: "User",
              })
              .then(function (response) {
                console.log(response);
                if (response.data === "MySQL_REG_COMPLETED!") {
                    successNotify("Registeration Success!")
                } else if (response.data === "POST_ADD_USER_ERROR") {
                    errorNotify("Authentication Server was down...")
                }
              })
        }
    }

    return (
        <div className="MainPageBody">
            <Helmet>
                <title>Lab</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>

                <Header
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    }}
                >
                    <div className="demo-logo" />
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
    )
}