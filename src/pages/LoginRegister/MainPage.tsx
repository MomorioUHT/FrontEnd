import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {  Button, 
          Input, 
          notification, 
          Layout, 
          Form,
       } from 'antd';

const { Header } = Layout;

export const MainPage = () => {
    const [username, setLoginUsername] = useState('')
    const [password, setLoginPassword] = useState('')

    const [reguser, setregUser] = useState('')
    const [regpassword, setregPassword] = useState('')
    
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

    const [isLoginForm, setIsLoginForm] = useState(true);

    const toggleForm = () => {
      setIsLoginForm(!isLoginForm);
    };

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

    const onFinish = () => {
        if (isLoginForm) {
            Login();
        } else {
            Register();
        }
      };

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
        if (!reguser || !regpassword) {
            errorNotify("Please fill out the forms")
        } else if (String(regpassword).length < 6) {
            errorNotify("Password must be at least 6 characters long")
        } else {
            axios.post(`${BACKEND_API_ENDPOINT}/register`, {
                username: reguser,
                password: regpassword,
                tag: Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Helmet>
                <title>Lab</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>
          <Form
            name={isLoginForm ? 'login' : 'register'}
            onFinish={onFinish}
            style={{ width: 300 }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input value={isLoginForm ? username : reguser} onChange={(e) => isLoginForm ? setLoginUsername(e.target.value) : setregUser(e.target.value)} />
            </Form.Item>
    
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={isLoginForm ? password : regpassword} onChange={(e) => isLoginForm ? setLoginPassword(e.target.value) : setregPassword(e.target.value)} />
            </Form.Item>
    
            {!isLoginForm && (
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  { required: true, message: 'Please confirm your password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('The two passwords do not match!');
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
            )}
    
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                {isLoginForm ? 'Login' : 'Register'}
              </Button>
            </Form.Item>
    
            <Form.Item>
              <Button type="link" onClick={toggleForm} style={{ width: '100%' }}>
                {isLoginForm ? 'No Account?, Register' : 'Already have an account?, Login'}
              </Button>
            </Form.Item>
          </Form>
        </div>
    )
}