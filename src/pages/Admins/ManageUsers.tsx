import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
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

import { useUsersQuery,useDeleteUserMutation } from "../Redux/Api";

const { Header, Sider, Content, Footer } = Layout;

export const ManageUsers = () => {
    const navigate = useNavigate();

    const { data, error, isLoading, isFetching, isSuccess } = useUsersQuery();
    const { refetch } = useUsersQuery();

    const [ userDeletion ] = useDeleteUserMutation();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

    const [collapsed, setCollapsed] = useState(false);
    const [confirmOpen, setConfirmopen] = useState(false);

    const [currUserName, setCurrUserToDelete] = useState('')

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {
            headers: {
                'access-token': localStorage.getItem("token")
            }
        }).then(res => { 
            console.log(res)
            if (res.data.message === "AUTHENTICATED") {
                setUsername(res.data.username)
                settag(res.data.userTag)
                if (res.data.userRole !== "Admin") {
                    navigate('/Home')
                }
            } else {
                navigate('/MainPage')
            }
         })
    }, [])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Full Name',
            dataIndex: 'user_tag',
            key: 'user_tag',
        },
        {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'user_role',
        },
        {
            title: 'Action',
            render: () => (
                <span>Delete</span>
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
    
    const CancelClick = () => {
        setConfirmopen(false)
    };

    const OkClick = async() => {
        await setConfirmopen(false)
        await userDeletion(currUserName)
        await refetch()
        notification.success({
            message: 'Delete Successful!',
            description: `User ${currUserName} has been removed from the database.`,
            placement: 'topLeft'
          })
    };
    
    const gotohome = () => {
        navigate('/Home')
    }

    const goToCreateProblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const goToManageProblems = () => {
        navigate("/AdminDashboard/ManageProblems")
    }

    const goToCreateLab = () => {
        navigate("/AdminDashboard/CreateLab")
    }

    const goToManageLabs = () => {
        navigate("/AdminDashboard/ManageLabs")
    }

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/MainPage")
        }, 150);        
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
                        defaultSelectedKeys={['3']}
                        items={[
                            {
                                key: '1',
                                icon: <FormOutlined />,
                                label: 'Create Problems',
                                onClick: goToCreateProblem
                            },
                            {
                                key: '2',
                                icon: <FormOutlined  />,
                                label: 'Create Labs',
                                onClick: goToCreateLab
                            },
                            {
                                key: '3',
                                icon: <UserOutlined />,
                                label: 'Manage Users',
                            },
                            {
                                key: '4',
                                icon: <CodeOutlined />,
                                label: 'Manage Problems',
                                onClick: goToManageProblems
                            },
                            {
                                key: '5',
                                icon: <CodeOutlined />,
                                label: 'Manage Labs',
                                onClick: goToManageLabs
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
                        <span style={{color: 'white'}}>{username} ({tag})</span>
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
                        fontSize:'20px',
                        marginLeft: '10px',
                        color: 'black'
                    }}>
                        Manage Users <br /><br />
                        {isFetching && <span>Fetching...</span>}
                        {isLoading && <span>Loading...</span>}
                        {error && <span>Fetch users failed!</span>}
                        {isSuccess && <Table dataSource={data} columns={columns} style={{cursor: "pointer"}}/>}

                    </span><br/>               
                    
                    <Footer style={{textAlign: 'center',}}>
                        Lab ©2023 Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}