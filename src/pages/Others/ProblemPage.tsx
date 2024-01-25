import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserDetail,ProblemDetail } from "../Redux/hook";
import { Helmet } from 'react-helmet';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";

import {  Button, 
    notification, 
    Layout, 
    Select
 } from 'antd';

import {  
    LeftCircleOutlined,
    LogoutOutlined,
    InfoCircleOutlined,
    DoubleRightOutlined,
    BulbOutlined,
    CaretRightOutlined,
 } from '@ant-design/icons';
import { Content } from "antd/es/layout/layout";

const { Header,Footer } = Layout;

export const Problem1 = () => {

    const {id} = useParams();

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [code, setCode] = useState('')

    const [resultDisplay, setDisplaying] = useState('Click Submit to grading your program')
    const [resultSubDisplay, setSubDisplaying] = useState('')
    const [resultSymbol, setResultSymbol] = useState('')
    const [currentProblem, setCurrentProblem] = useState<ProblemDetail[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const navigate = useNavigate();

    const [loadings, setLoadings] = useState(false);
    const [language, setLanguage] = useState(null)

    const enterLoading = (value: boolean) => {
        setLoadings(value);
    }

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

        axios.get<ProblemDetail[]>(`${BACKEND_API_ENDPOINT}/currentProblem/${id}`).then(res => {
            if (res.data.length === 0) {
                notification.error({
                    message: 'Error',
                    description: 'That Problem Does not exist...',
                    placement: 'topLeft'
                  })
                  setTimeout(function timer() {
                    navigate("/Home")
                }, 150);  
            } else {
                setCurrentProblem(res.data)
            }
        })

        setTimeout(function timer() {
            console.clear()
        }, 150);  
    }, [])

    const SubmitCode = (ProblemID: String) => {
        if (!language) {
            notification.error({
                message: 'Error',
                description: 'Please Select language to Submit!',
                placement: 'topLeft'
              }) 
        } else if (code.replaceAll(" ", "") === '') {
            notification.error({
                message: 'Error',
                description: 'The code is empty!',
                placement: 'topLeft'
              })            
        } else {
            enterLoading(true)
            setDisplaying(`In queue...`)
            setResultSymbol('')
            setSubDisplaying('')
            axios.post(`${BACKEND_API_ENDPOINT}/Grading`, {
                code: code,
                problemID: ProblemID,
                submitLanguage: language
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    notification.info({
                        message: 'The Server is quite busy',
                        description: 'Try to queue again...',
                        placement: 'topLeft'
                      })
                } else if (res.data === 'ERROR WHILE SELECT PROBLEMS!') {
                    notification.error({
                        message: 'Error',
                        description: 'That Problem Does not exist...',
                        placement: 'topLeft'
                      })
                } else{
                    if (res.data.includes('-') || res.data.includes('C') || res.data.includes('S')) {
                        enterLoading(false)
                        setDisplaying(`[${res.data}]`)
                        setResultSymbol('FAILED ✗')
                        setSubDisplaying(`${String(res.data).replaceAll('-', '').replaceAll('C', '').length} cases out of ${String(res.data).length} passed`)
                    } else {
                        enterLoading(false)
                        setDisplaying(`[${res.data}]`)
                        setResultSymbol('PASSED ✓')
                        setSubDisplaying(`All ${res.data.length} cases passed`)
                    }
                }
            })
        }
    }

    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard/CreateProblem")
        } 
    }
    const gotohome = () => {
        navigate("/Home")
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
                <title>Problem</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 

            <Layout>
            <Header style={{padding: 0}}>
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
                    >Go Back</Button>
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

            <Content style={{
                margin: '10px 24px',
                minHeight: '853px',    
            }}>
                <div className="container">
                    <div className="left">
                    {
                        currentProblem.map((list) => (
                            <div style={{marginTop: '20px'}}>
                                <span style={{
                                    fontSize:'40px',
                                    color: 'black'
                                }}>
                                    <BulbOutlined /> {list.ProblemName}
                                </span><br/>

                                <span style={{
                                    fontSize:'15px',
                                    color: 'black'
                                }}>
                                    Level {list.ProblemLevel}
                                </span><br /><br />

                                <span style={{
                                    fontSize:'20px',
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>
                                Description
                                </span><br />

                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                {list.ProblemDescription}
                                </p>

                                <span style={{
                                    fontSize:'20px',
                                    color: 'black',
                                    fontWeight: 'bold'
                                }}>
                                Example
                                </span><br />

                                <p style={{
                                    fontSize:'15px',
                                    color: 'black'
                                }}>
                                
                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Input1
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Input1}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                />
                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Output1
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Output1}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                /><br/>

                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Input2
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Input2}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                />
                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Output2
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Output2}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                /><br/>

                            <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Input3
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Input3}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                />
                                <p style={{
                                    fontSize:'15px',
                                    color: 'black',
                                    whiteSpace: 'pre'
                                }}>
                                Output3
                                </p>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    value={list.Output3}
                                    fontSize={16}    
                                    width="900px" 
                                    maxLines={Infinity}  
                                    readOnly={true}
                                    editorProps={{ $blockScrolling: true }}
                                /><br/>
                                
                                </p>
                            </div>
                        ))                
                    }      
                    </div>
                    <div className="right">
                        <p style={{
                                fontSize:'15px',
                                color: 'black'
                        }}>
                        Latest Submission Result <CaretRightOutlined /> {resultSymbol} {resultDisplay} <InfoCircleOutlined /> {resultSubDisplay}</p>

                        <Button type="primary" loading={loadings} onClick={() => SubmitCode(`${id}`)}>
                            Submit <DoubleRightOutlined />
                        </Button><br/><br/>

                        <Select 
                                onChange={setLanguage}
                                style={{ width: 160,}}
                                placeholder="Submit language"
                                options={[
                                    {
                                    value: 'Python',
                                    label: 'Python',
                                    },
                                    {
                                    value: 'C',
                                    label: 'C',
                                    disabled: true
                                    },
                                    {
                                    value: 'C++',
                                    label: 'C++',
                                    disabled: true,
                                    },
                                    {
                                    value: 'C#',
                                    label: 'C#',
                                    disabled: true,
                                    },
                                    {
                                    value: 'Java',
                                    label: 'Java',
                                    disabled: true,
                                    },
                                    {
                                    value: 'Visual Basic',
                                    label: 'Visual Basic',
                                    disabled: true,
                                    },
                                ]}
                            /><br/><br/>

                        <AceEditor
                            mode="python"
                            theme="dreamweaver"
                            onChange={setCode}
                            name="Code"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="900px" 
                            height="800px"   
                        />
                    </div>
                </div>    
            </Content>

            <Footer style={{textAlign: 'center',}}>
                Lab ©2023 Created with love by MomorioUHT UwU
            </Footer>
        </Layout>  
        </div>
    )
}