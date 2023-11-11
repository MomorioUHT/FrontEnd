import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail,ProblemDetail } from "./hook"
import { Helmet } from 'react-helmet';
import {
    Layout, 
    Menu,
    Button,
    Table
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
 } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const Home = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [collapsed, setCollapsed] = useState(false);
    const [problemList, setProblemList] = useState<ProblemDetail[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const gotoproblem = (problemID: String) => {
        navigate(`/Python/${problemID}`)
    }

    const columns = [
        {
            title: 'Problem Name',
            dataIndex: 'ProblemName',
            key: 'ProblemName',
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        gotoproblem(record.ProblemID);
                    },
                };
            },
        },
        {
            title: 'Level',
            dataIndex: 'ProblemLevel',
            key: 'ProblemLevel',
        },
        {
            title: 'Language',
            dataIndex: 'ProblemLanguage',
            key: 'ProblemLanguage',
        },
        {
            title: 'Problem ID',
            dataIndex: 'ProblemID',
            key: 'ProblemID',
        }
    ];
    
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
        axios.get<ProblemDetail[] | "GET_PYTHON_PROBLEM_ERROR">(`${BACKEND_API_ENDPOINT}/PythonProblems`).then(res => {
            if (res.data === "GET_PYTHON_PROBLEM_ERROR") {
                alert("Get Python Problem List Error!")
            } else {
                setProblemList(res.data)
            }
        })
        setTimeout(function timer() {
            console.clear()
        }, 150);  
    }, [])

    const logout = () => {
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">(`${BACKEND_API_ENDPOINT}/logout`, {withCredentials: true}).then(res => {
            if (res.data === "LOGGED_OUT") {
                window.location.reload()
            } else {
                alert('Logout error go check console')
            }
        })
    }

    const gotoeditor = () => {
        navigate("/Playground")
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
                        defaultSelectedKeys={['2']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: 'Your Profile',
                            },
                            {
                                key: '2',
                                icon: <HomeOutlined />,
                                label: 'Home',
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
                        <a style={{color: 'white'}} onClick={gotoadmin}>{username} ({fullname})</a>
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
                    <Table dataSource={problemList} columns={columns} style={{cursor: "pointer"}}/>
                    
                    <Footer style={{textAlign: 'center',}}>
                        Lab ©2023 Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}