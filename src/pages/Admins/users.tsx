import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail} from "../hook"
import { Helmet } from 'react-helmet';

import {
    Layout, 
    Menu,
    Button,
    Table,
    Modal,
    Result,
    notification
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
    FormOutlined,
    LeftCircleOutlined
 } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const Users = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [userList, setUserList] = useState<UserDetail[]>([])

    const [collapsed, setCollapsed] = useState(false);
    const [confirmOpen, setConfirmopen] = useState(false);

    const [currUserName, setCurrUserToDelete] = useState('')

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Home")
                return
            }
        })

        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
        })

        axios.get<UserDetail[] | "GET_USERLIST_ERROR">(`${BACKEND_API_ENDPOINT}/users`).then(res => {
            if (res.data === "GET_USERLIST_ERROR") {
                alert("Get Userlist Error!")
            } else {
                setUserList(res.data)
            }
        })

        setTimeout(function timer() {
            console.clear()
        }, 150); 

    }, [])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Full Name',
            dataIndex: 'user_fullname',
            key: 'user_fullname',
        },
        {
            title: 'Password',
            dataIndex: 'user_password',
            key: 'user_password',
        },
        {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'user_role',
        },
        {
            title: 'Action',
            render: () => (
                <a>Delete</a>
              ),
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        confirmDelete(record.user_name)
                    },
                };
            },
        }
    ];

    const confirmDelete = (user: string) => {
        setConfirmopen(true)
        setCurrUserToDelete(user)
    }
    const OkClick= () => {
        setConfirmopen(false)
        deleteUser(currUserName)
    };

    const CancelClick = () => {
        setConfirmopen(false)
    };

    const deleteUser = (name: string) => {
        axios.post<"USER_DELETE_SUCCESS" | "DELETE_USER_ERROR">(`${BACKEND_API_ENDPOINT}/deleteUser`, {userNameToDelete: name})
        .then(res => {
            if (res.data === "DELETE_USER_ERROR") {
                notification.error({
                    message: 'User Deletion Error',
                    description: `There was a problem deleting ${name} try again later...`,
                    placement: 'topLeft'
                  })
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000);  
                return
            } else {
                notification.success({
                    message: 'Delete Successful!',
                    description: `User  ${name} has been removed from the database.`,
                    placement: 'topLeft'
                  })
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000);  
                return
            }

        })
    }

    const gotohome = () => {
        navigate('/Home')
    }

    const gotocreateproblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const gotopythonproblem = () => {
        navigate("/AdminDashboard/PythonProblems")
    }

    const logout = () => {
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">(`${BACKEND_API_ENDPOINT}/logout`, {withCredentials: true}).then(res => {
            if (res.data === "LOGGED_OUT") {
                window.location.reload()
            } else {
                alert('Logout error go check console')
            }
        })
    }

    return (
        <div> 
            <Helmet>
                <title>Manage Users</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>

            <Modal open={confirmOpen} onOk={OkClick} onCancel={CancelClick} >
                <Result 
                    status="info"
                    title="Delete This user?"
                    subTitle="This action cannot be undone."
                >
                </Result>
            </Modal>  
            
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{height: 'auto'}}>
                     <Button
                        type="text"
                        icon={<LeftCircleOutlined />}
                        onClick={gotohome}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: 'white',
                        }}
                    >Home</Button>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['2']}
                        items={[
                            {
                                key: '1',
                                icon: <FormOutlined />,
                                label: 'Create Problems',
                                onClick: gotocreateproblem
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: 'Manage Users',
                            },
                            {
                                key: '3',
                                icon: <CodeOutlined />,
                                label: 'Python Problems',
                                onClick: gotopythonproblem
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
                        <a style={{color: 'white'}}>{username} ({fullname})</a>
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
                    <a style={{
                        fontSize:'20px',
                        marginLeft: '10px',
                        color: 'black'
                    }}>
                        Manage Users <br /><br />
                        <Table dataSource={userList} columns={columns} style={{cursor: "pointer"}}/>

                    </a><br/>               
                    
                    <Footer style={{textAlign: 'center',}}>
                        Lab ©2023 Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}