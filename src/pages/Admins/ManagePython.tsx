import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail, ProblemDetail } from "../hook"
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

export const PythonProblems = () => {
    const navigate = useNavigate();
    const [problemList, setProblemList] = useState<ProblemDetail[]>([])

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [collapsed, setCollapsed] = useState(false);
    const [confirmOpen, setConfirmopen] = useState(false);
    const [currProblem, setCurrProblemToDelete] = useState('')


    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Home")
                return
            }
        })

        axios.get<ProblemDetail[] | "GET_PYTHON_PROBLEM_ERROR">(`${BACKEND_API_ENDPOINT}/PythonProblems`).then(res => {
            if (res.data === "GET_PYTHON_PROBLEM_ERROR") {
                alert("Get Python Problem List Error!")
            } else {
                setProblemList(res.data)
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

        setTimeout(function timer() {
            console.clear()
        }, 150); 

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
            title: 'Language',
            dataIndex: 'ProblemLanguage',
            key: 'ProblemLanguage',
        },
        {
            title: 'Testcase Amount',
            dataIndex: 'CaseAmt',
            key: 'CaseAmt',
        },
        {
            title: 'Action',
            render: () => (
                <a>Delete</a>
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
        setCurrProblemToDelete(ProblemID)
    }
    const OkClick= () => {
        setConfirmopen(false)
        deleteProblem(currProblem)
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
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">(`${BACKEND_API_ENDPOINT}/logout`, {withCredentials: true}).then(res => {
            if (res.data === "LOGGED_OUT") {
                window.location.reload()
            } else {
                alert('Logout error go check console')
            }
        })
    }

    const deleteProblem = (ID: string) => {
        axios.post<"DELETE_PROBLEM_ERROR" | "PROBLEM_DELETE_SUCCESS">(`${BACKEND_API_ENDPOINT}/deletePythonProblems`, {ProblemID: ID})
        .then(res => {
            if (res.data === "DELETE_PROBLEM_ERROR") {
                notification.error({
                    message: 'Problem Deletion Error',
                    description: `There was a problem deleting ${ID} try again later...`,
                    placement: 'topLeft'
                  })
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000); 
                return
            } else {
                notification.success({
                    message: 'Delete Successful!',
                    description: `Problem ${ID} has been removed from the database.`,
                    placement: 'topLeft'
                  })
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000); 
                return
            }

        })
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
                        Manage Python Problems <br /><br />
                        <Table dataSource={problemList} columns={columns} style={{cursor: "pointer"}}/>

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