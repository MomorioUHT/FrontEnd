import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../Redux/hook"
import AceEditor from "react-ace";
import { Helmet } from 'react-helmet';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";

import {
    Layout, 
    Menu,
    Button,
    notification,
    Select
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    CodeOutlined,
    LogoutOutlined,
    RightCircleOutlined,
    WechatOutlined
 } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const Playground = () => {

    const [collapsed, setCollapsed] = useState(false);

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState(null)

    const [outputDisplay, setOutputDisplay] = useState('')

    const navigate = useNavigate();

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
                setRole(res.data.userRole)
            } else {
                navigate('/MainPage')
            }
         })
        setTimeout(function timer() {
            console.clear()
        }, 150);  
    }, [])

    const compileCode = () => {
        setTimeout(function timer() {
            window.scrollTo({top:0 ,behavior:'smooth'});  
          }, 0); 
        if (!language) {
            notification.error({
                message: 'Error',
                description: 'Please select the language to compile this code',
                placement: 'topLeft'
              })
        } else if (code === '') {
            notification.error({
                message: 'Error',
                description: 'There is no any code to run...',
                placement: 'topLeft'
              })            
        }
        else {
            setOutputDisplay('Running...')
            axios.post<any>(`${BACKEND_API_ENDPOINT}/compile`, {
                code: code,
                input: input,
                language: language
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    notification.warning({
                        message: 'Queue Error',
                        description: 'Please wait a few moments and run that command again.',
                        placement: 'topLeft'
                      })
                } else {
                    setTimeout(function timer() {
                        window.scrollTo({top:3000 ,behavior:'smooth'});  
                      }, 0);  
                    notification.success({
                        message: 'Run Successful!',
                        description: 'The results is ready to view',
                        placement: 'topLeft'
                    })                                         
                    if (Number(res.data)) {
                        setOutputDisplay(JSON.stringify(res.data)) 
                    } else if (String(res.data)) {
                        setOutputDisplay(res.data)               
                    } else {
                        setOutputDisplay("Undefined result \n - Code has an infinite loop \n - Code does not return or print any output")
                    }
                }
            })
        }
    }

    const updateLanguage = (value: any) => {
        setLanguage(value);
      };

    const gotohome = () => {
        navigate("/Home")
    }

    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard/CreateProblem")
        } 
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
                <title>Playground</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 

            <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{height: 'auto'}}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '1',
                            icon: <HomeOutlined />,
                            label: 'Home',
                            onClick: gotohome
                        },
                        {
                            key: '2',
                            icon: <CodeOutlined />,
                            label: 'Playground',
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
                        margin: '10px 24px',
                        minHeight: '853px',
                    }}
                >
                        <h3 className="smallText">Compile Language</h3>
                            <Select 
                                onChange={updateLanguage}
                                style={{ width: 120,}}
                                options={[
                                    {
                                      value: 'Python',
                                      label: 'Python',
                                    },
                                    {
                                      value: 'C',
                                      label: 'C',
                                      disabled: true,
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
                            /><br /><br />
                            <Button type="primary" icon={<RightCircleOutlined />} onClick={compileCode}>Run</Button>
                        <table>
                            <thead style={{textAlign: "left"}}>
                                <tr>
                                    <th><h1>Code</h1></th>
                                    <th><h1>Input (Leave blank for no input)</h1></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <AceEditor
                                        mode="python"
                                        theme="dreamweaver"
                                        onChange={setCode}
                                        name="setCode"
                                        editorProps={{ $blockScrolling: true }}
                                        fontSize={16}    
                                        width="1100px"    
                                        />
                                    </td>
                                    <td>
                                        <AceEditor
                                        mode="text"
                                        theme="dreamweaver"
                                        onChange={setInput}
                                        name="setInput"
                                        editorProps={{ $blockScrolling: true }}
                                        fontSize={16}    
                                        width="550px"  
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div style={{display: "inline-block"}}>
                            <h3 className="smallText">Console</h3>
                            <AceEditor
                                mode="text"
                                theme="dreamweaver"
                                name="Console"
                                fontSize={16}    
                                width="1650px" 
                                height="300px" 
                                value={outputDisplay}   
                                readOnly
                            /> 
                        </div>    
                    <Footer style={{textAlign: 'center',}}>
                        Lab ©2023 Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>

        </div>
    )
}