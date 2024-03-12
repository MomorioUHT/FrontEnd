import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { LabDetail, ProblemDetail } from "../Redux/hook"
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
    LogoutOutlined,
 } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const Home = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')
    const [role, setRole] = useState('')

    const [collapsed, setCollapsed] = useState(false);
    const [labList, setLablist] = useState<LabDetail[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const columnsLab = [
        {
            title: 'Lab Name',
            dataIndex: 'LabName',
            key: 'LabName',
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        gotoLab(record.LabID)
                    },
                };
            },
        },
    ];
    
    useEffect(() => {
        axios.get(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        }).then(res => { 
            if (res.data.message === "AUTHENTICATED") {
                setUsername(res.data.username)
                settag(res.data.userTag)
                setRole(res.data.userRole)
            } else {
                navigate('/Lab')
            }
         })

        axios.get<LabDetail[] | "GET_LAB_ERROR">(`${BACKEND_API_ENDPOINT}/labs`).then(res => {
            if (res.data !== "GET_LAB_ERROR") {
                setLablist(res.data)
            }
        })

    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/Lab")
        }, 150);        
    }

    const gotoLab = (LabID: String) => {
        navigate(`/Labs/${LabID}`)
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
                            }
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
                        <span style={{color: 'white', cursor: 'pointer'}} onClick={gotoadmin}>{username} ({tag})</span>
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
                    <span style={{
                        fontSize:'30px',
                        color: 'black'
                    }}>
                        Labs
                    </span><br /><br />
                    <Table dataSource={labList} columns={columnsLab} style={{cursor: "pointer"}}/><br/><br/>
{/* 
                    <Table dataSource={problemList} columns={columnsAll} style={{cursor: "pointer"}}/> */}
                    
                    <Footer style={{textAlign: 'center'}}>
                        Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}