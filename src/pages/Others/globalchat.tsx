import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../Redux/hook"
import { Helmet } from 'react-helmet';

import {
    Layout, 
    Menu,
    Button,
    Input
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CodeOutlined,
    LogoutOutlined,
    WechatOutlined,
    SendOutlined
 } from '@ant-design/icons';

 
//IO
import * as io from "socket.io-client";
const socket = io.connect("http://localhost:8001")

const { Header, Sider, Content } = Layout;

export const GlobalChat = () => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [message, setMessage] = useState('')
    const [roomID, setRoomID] = useState('')
    const [receivedMessage, setReceivedMessage] = useState('')
    const [messageList, setMessageList]: any[] = useState([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    
    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
            setRole(res.data[0].user_role)
        })
        setTimeout(function timer() {
            console.clear()
        }, 150);  
    }, [])

    useEffect(() => {
        socket.on("receive_message", (data: any) => {
            setMessageList((list: any) => [...list, data])
        })
    }, [socket])

    const logout = () => {
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">(`${BACKEND_API_ENDPOINT}/logout`, {withCredentials: true}).then(res => {
            if (res.data === "LOGGED_OUT") {
                window.location.reload()
            } else {
                alert('Logout error go check console')
            }
        })
    }

    const joinRoom = () => {
        if (roomID !== "") {
            socket.emit("join_room", roomID)
        }
    }

    const sendMessage = async() => {
        const messageData = {
            author: username,
            message: message,
            room: roomID,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit("send_message", messageData)
        setMessageList((list: any) => [...list, messageData])
    }

    const gotoeditor = () => {
        navigate("/Playground")
    }

    const gotohome = () => {
        navigate("/Home")
    }

    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard/CreateProblem")
        } 
    }
    
    return (
        <div>   
            <Helmet>
                <title>Home</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 

            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{height: 'auto'}}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <WechatOutlined />,
                                label: 'Global Chat',
                            },
                            {
                                key: '2',
                                icon: <HomeOutlined />,
                                label: 'Home',
                                onClick: gotohome
                            },
                            {
                                key: '3',
                                icon: <CodeOutlined />,
                                label: 'Playground',
                                onClick: gotoeditor
                            },
                        ]}
                    />
                </Sider>
            
            <Layout>
                <Header style={{padding: 0,}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: 'white'
                        }}
                    />
                    <div style={{float: "right", fontSize:'16px'}}>
                        <span style={{color: 'white'}} onClick={gotoadmin}>{username} ({fullname})</span>
                        <Button
                            type="text"
                            icon={<LogoutOutlined />}
                            onClick={logout}
                            style={{
                                width: 64,
                                height: 64,
                                color: 'white'
                            }}
                        />
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '853px',
                    }}
                >
                    {/* ------------------------------------------------------- */}
                    <span style={{
                        fontSize:'40px',
                        color: 'black'
                    }}>
                        Chat
                    </span><br/><br/>
                    <Input 
                        name="input"
                        size="large" 
                        placeholder="Create Your Chat Room" 
                        prefix={<WechatOutlined />} 
                        onChange={(e) => setRoomID(e.target.value)}
                        value={roomID}
                        style={{width: 250}}
                    />
                    <Button 
                        type="primary" 
                        onClick={joinRoom}
                        style={{height: 40,width: 40}}
                        icon={<SendOutlined />}
                    /><br/>
                    <Input 
                        name="input"
                        size="large" 
                        placeholder="Message" 
                        prefix={<WechatOutlined />} 
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        style={{width: 250}}
                    />
                    <Button 
                        type="primary" 
                        onClick={sendMessage}
                        style={{height: 40,width: 40}}
                        icon={<SendOutlined />}
                    /><br/>
                    {/* ------------------------------------------------------- */}

                    <span style={{
                        fontSize:'30px',
                        color: 'black'
                    }}>
                    {messageList.map((messageContent: any) => {
                        return (
                            <div>
                                <h6>{messageContent.author}: {messageContent.message} ({messageContent.time})</h6>
                            </div>
                        )
                    })}
                    </span>

                </Content>
            </Layout>
            </Layout>
        </div>
    )
}