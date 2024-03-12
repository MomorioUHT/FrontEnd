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

import { useProblemsQuery,useDeleteProblemMutation } from "../Redux/Api";

const { Header, Sider, Content, Footer } = Layout;

export const ManageProblem = () => {
    const navigate = useNavigate();

    const { data, error, isLoading, isFetching, isSuccess } = useProblemsQuery();
    const { refetch } = useProblemsQuery();

    const [ problemDeletion ] = useDeleteProblemMutation();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

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
                settag(res.data.userTag)
                if (res.data.userRole !== "Admin") {
                    navigate('/Home')
                }
            } else {
                navigate('/Lab')
            }
         })
    }, [])

    const columns = [
        {
            title: 'Problem ID',
            dataIndex: 'ProblemID',
            key: 'ProblemID',
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        gotoproblem(record.ProblemID)
                    },
                };
            },
        },
        {
            title: 'Problem Name',
            dataIndex: 'ProblemName',
            key: 'ProblemName',
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
            description: `Problem ${currProblemIDToDelete} has been removed from the database.`,
            placement: 'topLeft'
          })
    };

    const CancelClick = () => {
        setConfirmopen(false)
    };

    const gotohome = () => {
        navigate('/Home')
    }

    const goToManageUsers = () => {
        navigate('/AdminDashboard/Users')
    }

    const goToCreateProblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const goToCreateLab = () => {
        navigate("/AdminDashboard/CreateLab")
    }

    const goToManageLabs = () => {
        navigate("/AdminDashboard/ManageLabs")
    }

    const gotoproblem = (problemID: String) => {
        navigate(`/task/${problemID}`)
    }

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/Lab")
        }, 150);        
    }


    return (
        <div> 
            <Helmet>
                <title>All Problems</title>
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
                        defaultSelectedKeys={['4']}
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
                                onClick: goToManageUsers,
                            },
                            {
                                key: '4',
                                icon: <CodeOutlined />,
                                label: 'Manage Problems',
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
                        Manage Problems <br /><br />
                        {isFetching && <span>Fetching...</span>}
                        {isLoading && <span>Loading...</span>}
                        {error && <span>Fetch Problems Failed!</span>}
                        {isSuccess && <Table dataSource={data} columns={columns} style={{cursor: "pointer"}}/>}

                    </span><br/>               
                    
                    <Footer style={{textAlign: 'center',}}>
                        Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}