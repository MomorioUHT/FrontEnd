import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail, ProblemDetail } from "../Redux/hook"
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

import { useProblemsQuery,useDeleteProblemMutation } from "../Redux/Api";

const { Header, Sider, Content, Footer } = Layout;

export const Problems = () => {
    const navigate = useNavigate();

    const { data, error, isLoading, isFetching, isSuccess } = useProblemsQuery();
    const { refetch } = useProblemsQuery();

    const [ problemDeletion ] = useDeleteProblemMutation();

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [collapsed, setCollapsed] = useState(false);
    const [confirmOpen, setConfirmopen] = useState(false);
    const [currProblemIDToDelete, setCurrProblemIDToDelete] = useState('')


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
                setFullname(res.data.userFullname)
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
            title: 'Problem ID',
            dataIndex: 'ProblemID',
            key: 'ProblemID',
        },
        {
            title: 'Problem Name',
            dataIndex: 'ProblemName',
            key: 'ProblemName',
        },
        {
            title: 'Testcase Amount',
            dataIndex: 'CaseAmt',
            key: 'CaseAmt',
        },
        {
            title: 'Action',
            render: () => (
                <span>Delete</span>
              ),
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        confirmDelete(record.ProblemID)
                    },
                };
            },
        }
    ];

    const confirmDelete = (ProblemID: string) => {
        setConfirmopen(true)
        setCurrProblemIDToDelete(ProblemID)
    }
    
    const OkClick = async() => {
        await setConfirmopen(false)
        await problemDeletion(currProblemIDToDelete)
        await refetch()
        notification.success({
            message: 'Delete Successful!',
            description: `User ${currProblemIDToDelete} has been removed from the database.`,
            placement: 'topLeft'
          })
    };

    const CancelClick = () => {
        setConfirmopen(false)
    };

    const gotohome = () => {
        navigate('/Home')
    }

    const gotouserpage = () => {
        navigate('/AdminDashboard/Users')
    }

    const gotocreateproblem = () => {
        navigate("/AdminDashboard/CreateProblem")
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
                <title>Manage Python Problems</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>

            <Modal open={confirmOpen} onOk={OkClick} onCancel={CancelClick} >
                <Result 
                    status="info"
                    title="Delete This Problem?"
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
                                onClick: gotocreateproblem
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: 'Manage Users',
                                onClick: gotouserpage
                            },
                            {
                                key: '3',
                                icon: <CodeOutlined />,
                                label: 'Python Problems',
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
                        <span style={{color: 'white'}}>{username} ({fullname})</span>
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
                        Manage Python Problems <br /><br />
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