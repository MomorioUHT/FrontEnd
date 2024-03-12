import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { ProblemDetail } from "../Redux/hook"
import { Helmet } from 'react-helmet';
import {
    Layout, 
    Button,
    Table,
    notification
 } from 'antd';

 import {      
    LogoutOutlined,
 } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export const LabPage = () => {

    const { LabName } = useParams();

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')
    const [role, setRole] = useState('')

    const [currentLabName, setCurrentLabName] = useState('');

    const [problemList, setProblemList] = useState<ProblemDetail[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const gotoproblem = (problemID: String) => {
        navigate(`/task/${problemID}`)
    }

    const columns = [
        {
            title: 'Task #',
            dataIndex: 'index',
            key: 'index',
            render: (index: any) => <span>{index + 1}</span>,
            width: 100,
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        gotoproblem(record.ProblemID);
                    },
                };
            },
        },
        {
            title: "Problems",
            dataIndex: 'ProblemName',
            key: 'ProblemName',
            onCell: (record: any) => {
                return {
                    onClick: () => {
                        gotoproblem(record.ProblemID);
                    },
                };
            },
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
                settag(res.data.userTag)
                setRole(res.data.userRole)
            } else {
                navigate('/Lab')
            }
         })

        axios.post<ProblemDetail[] | "NOT_FOUND">(`${BACKEND_API_ENDPOINT}/GetLabContents/${LabName}`).then(res => {
            console.log(res.data)
            if (res.data === "NOT_FOUND") {
                errorNotify("That lab does not exist")
                setTimeout(function timer() {
                    navigate("/Home")
                }, 150);  
            } else {
                setProblemList(res.data)
            }
        })

        axios.get(`${BACKEND_API_ENDPOINT}/GetLabName/${LabName}`).then(res => {
            console.log(res.data)
            setCurrentLabName(res.data)
        })

    }, [])

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/Lab")
        }, 150);        
    }

    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard/CreateProblem")
        } 
    }
    
    return (
        <div>   
            <Helmet>
                <title>Lab</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 
        
            <Layout>
                <Header style={{padding: 0,}}>
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
                        {currentLabName} 
                    </span><br /><br />
                    <Table dataSource={problemList.map((item, index) => ({ ...item, index }))} columns={columns} style={{cursor: "pointer"}} />
                    
                    <Footer style={{textAlign: 'center',}}>
                        Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
        </div>
    )
}