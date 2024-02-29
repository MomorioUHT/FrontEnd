import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { EachProblem } from "../Redux/hook";

import {
    Layout, 
    Menu,
    Button,
    Table,
    Input,
    notification
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
    FormOutlined,
    LeftCircleOutlined,
    PlusSquareOutlined,
    EditOutlined,
    MinusSquareOutlined,
    ForwardOutlined
 } from '@ant-design/icons';

import { useProblemsQuery,useDeleteProblemMutation } from "../Redux/Api";

const { Header, Sider, Content, Footer } = Layout;

export const CreateLab = () => {
    const navigate = useNavigate();

    const { data, error, isLoading, isFetching, isSuccess } = useProblemsQuery();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

    const [collapsed, setCollapsed] = useState(false);

    const [labName, setLabName] = useState('')
    const [labID, setLabID] = useState('')
    const [labProblems, setLabProblemsList] = useState<EachProblem[]>([]);
    const [labProblemsID, setLabProblemsListID]: any[] = useState([]);
    const [loadingCreateLab, setLoadingCreateLab] = useState(false);

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

    const columnsSelected = [
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
            title: 'Action',
            render: () => (
                <span><MinusSquareOutlined /> Remove</span>
              ),
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        removeProblemFromList(record.ProblemID)
                    },
                };
            },
        }
    ];

    const columnsAll = [
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
            title: 'Action',
            render: () => (
                <span><PlusSquareOutlined /> Add</span>
              ),
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        addProblemToList(record.ProblemName, record.ProblemID)
                    },
                };
            },
        }
    ];
    
    const successNotify = (Arg: string) => {
        notification.success({
            message: 'Success!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const addProblemToList = (newProblemName: string, newProblemID: string) => {
        const newProblem: EachProblem = { ProblemName: newProblemName, ProblemID: newProblemID };
        setLabProblemsList((list: EachProblem[]) => [...list, newProblem]);
        setLabProblemsListID((list: any) => {
            if (list.length === 0) {
              return [newProblemID];
            } else {
              return [...list, newProblemID];
            }
        });
    };
    
    const removeProblemFromList = (ProblemID: string) => {
        setLabProblemsList((list: EachProblem[]) => list.filter((problem) => problem.ProblemID !== ProblemID));
        setLabProblemsListID((list: any) => list.filter((id: string) => id !== ProblemID));
    };

    const confirmCreateLab = () => {
        const stringLabProblemList = labProblemsID.join(',');
        setLoadingCreateLab(true)
        axios.post<'SAVE_LAB_FAILED' | 'SAVE_LAB_SUCCESS'>(`${BACKEND_API_ENDPOINT}/CreateLab`, {
            sentLabName: labName,
            sentLabID: labID,
            sentLabProblemList: stringLabProblemList
        }).then(res => {
            if (res.data === "SAVE_LAB_SUCCESS") {
                successNotify("The lab has been saved!")
            } else {
                errorNotify("There is an error saving the lab!")
            }
            setLoadingCreateLab(false)
        })
    }

    const gotohome = () => {
        navigate('/Home')
    }

    const goToManageUsers = () => {
        navigate('/AdminDashboard/Users')
    }

    const goToCreateProblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const goToManageProblems = () => {
        navigate("/AdminDashboard/ManageProblems")
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
                <title>Create Lab</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet>
 
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
                                onClick: goToCreateProblem
                            },
                            {
                                key: '2',
                                icon: <FormOutlined  />,
                                label: 'Create Labs',
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
                        Create Lab<br /><br />
                        <Input 
                            name="input"
                            size="large" 
                            placeholder="Lab Name" 
                            prefix={<EditOutlined />} 
                            onChange={(e) => setLabName(e.target.value)}
                            style={{width: 250}}
                        />
                        <Input 
                            name="input"
                            size="large" 
                            placeholder="Lab ID (any)" 
                            prefix={<EditOutlined />} 
                            onChange={(e) => setLabID(e.target.value)}
                            style={{width: 250}}
                        />
                        <Button type="primary" icon={<ForwardOutlined />} onClick={confirmCreateLab} loading={loadingCreateLab}>Test Run</Button>
                        <br /><br />

                        Current problems in this lab (You need to sort it by yourself)<br /><br />
                        <Table dataSource={labProblems} columns={columnsSelected} style={{cursor: "pointer"}}/>

                        Select problems to put in the lab <br /><br />
                        {isFetching && <span>Fetching...</span>}
                        {isLoading && <span>Loading...</span>}
                        {error && <span>Fetch Problems Failed!</span>}
                        {isSuccess && <Table dataSource={data} columns={columnsAll} style={{cursor: "pointer"}}/>}

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