import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { ProblemDetail } from "../Redux/hook"
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
        navigate(`/task/${problemID}`)
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
            title: 'Problem ID',
            dataIndex: 'ProblemID',
            key: 'ProblemID',
        }
    ];
    
    useEffect(() => {
        axios.get(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        }).then(res => { 
            console.log(res)
            if (res.data.message === "AUTHENTICATED") {
                setUsername(res.data.username)
                setFullname(res.data.userFullname)
                setRole(res.data.userRole)
            } else {
                navigate('/MainPage')
            }
         })

        axios.get<ProblemDetail[] | "GET_PROBLEM_ERROR">(`${BACKEND_API_ENDPOINT}/Problems`).then(res => {
            if (res.data === "GET_PROBLEM_ERROR") {
                alert("Get Problem List Error!")
            } else {
                setProblemList(res.data)
            }
        })

    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/MainPage")
        }, 150);        
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
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <HomeOutlined />,
                                label: 'Home',
                            },
                            {
                                key: '2',
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