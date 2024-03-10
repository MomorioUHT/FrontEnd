import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResultDetail } from "../Redux/hook";
import AceEditor from "react-ace";
import { Helmet } from 'react-helmet';
import ReactMarkdown from "react-markdown";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";

import {
    Layout, 
    Menu,
    Input,
    Button,
    Table,
    notification,
    Select
 } from 'antd';

 import {      
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CodeOutlined,
    LogoutOutlined,
    FormOutlined,
    LeftCircleOutlined,
    EditOutlined,
    CheckSquareOutlined,
    ForwardOutlined,
    UnorderedListOutlined,
    PlusSquareOutlined
 } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";

const { Header, Sider, Content, Footer } = Layout;

export const CreateProblem = () => {

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [correctProgram, setCorrectProgram] = useState('')
    const [language, setLanguage] = useState(null)
    const [problemLevel, setProblemLevel] = useState(null)

    const [collapsed, setCollapsed] = useState(false);

    const [loadingsTestRun, setLoadingsTestRun] = useState(false);
    const [loadingsSaveProblem, setLoadingsSaveProblem] = useState(false);

    const [resultList, setResultList] = useState<ResultDetail[]>([])
    const [displaying, setDisplaying] = useState('Waiting for a command...')
    
    const [testcases, setTestCases] = useState('')

    const navigate = useNavigate();

    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const infoNotify = (Arg: string) => {
        notification.info({
            message: 'Waiting...',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const successNotify = (Arg: string) => {
        notification.success({
            message: 'Success!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const columns = [
        {
            title: 'Input',
            dataIndex: 'input',
            key: 'input',
        },
        {
            title: 'Output',
            dataIndex: 'output',
            key: 'output',
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
                if (res.data.userRole !== "Admin") {
                    navigate('/Home')
                }
            } else {
                navigate('/MainPage')
            }
         })
    }, [])

    const TestRun = () => {
        if (!language) {
            errorNotify('Please Select your language to test!')
            setDisplaying('Please Select your language to test!')
        } else if (correctProgram === '') {
            errorNotify('There is no program to test!')
            setDisplaying('There is no program to test!')
        } else if (language === 'Disabled') {
            errorNotify('This language is disabled UwU')
            setDisplaying('This language is disabled UwU')
        } else {
            toggleLoadTestRun(true)
            infoNotify('Testing your code, please stand by...')
            setDisplaying('Testing your code, please stand by...')

            window.scrollTo({top:0 ,behavior:'smooth'}); 
            axios.post<any>(`${BACKEND_API_ENDPOINT}/TestRun`, {
                language: language,
                correctProgram: correctProgram,
                Testcases: testcases,
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    errorNotify('The server is busy!')
                } else {
                    setResultList(res.data)

                    successNotify('Results are ready to review!')
                    setDisplaying('Results are ready to review!')

                    setTimeout(function timer() {
                            window.scrollTo({top:3300 ,behavior:'smooth'});     
                            console.log(resultList)
                      }, 500);
                }             
                toggleLoadTestRun(false)     
            })
        } 
    }

    const StoreToMySQL = () => {
        toggleLoadSaveProblem(true)
        if (resultList.length === 0) {
            errorNotify('You need to test your code before saving!')
            setDisplaying('You need to test your code before saving!')
            toggleLoadSaveProblem(false)
        } else if (!language) {
            errorNotify('Please Select your language to test!')
            setDisplaying('Please Select your language to test!')
            toggleLoadSaveProblem(false)
        } else if (!problemLevel) {
            errorNotify('Please Select the level for this problem!')
            setDisplaying('Please Select the level for this problem!')
            toggleLoadSaveProblem(false)
        }  else if (correctProgram === '') {
            errorNotify('There is no program to save!')
            setDisplaying('There is no program to save!')
            toggleLoadSaveProblem(false)
        } else if (problemDescription === '') {
            errorNotify('Please write a problem description') 
            setDisplaying('Please write a problem description')
            toggleLoadSaveProblem(false)
        } else {
            toggleLoadSaveProblem(true)

            //Arr mapping only results
            const answers = resultList.map(item => {
                return item.output;
            });

            window.scrollTo({top:0 ,behavior:'smooth'}); 

            axios.post<'ADDING_PROBLEM_ERROR' | 'PROBLEM_SAVED!' | 'QUEUE_NOT_AVALIBLE'>(`${BACKEND_API_ENDPOINT}/SaveToDatabase`, {
                problemID: Math.random().toString(16).slice(2),
                problemName: problemName,
                problemLevel: problemLevel,
                problemDescription: problemDescription,
                Testcases: testcases,
                answers: answers,
            }).then(res => {
                window.scrollTo({top:0 ,behavior:'smooth'});
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    errorNotify('Please wait a moment and try to queue again...') 
                    setDisplaying('Please wait a moment and try to queue again...')
                    toggleLoadSaveProblem(false)
                } else if (res.data === 'ADDING_PROBLEM_ERROR') {
                    errorNotify('Problem Saving Error!') 
                    setDisplaying('Problem Saving Error!')
                    toggleLoadSaveProblem(false)
                } else {
                    successNotify('Problem Save Success!')
                    setDisplaying('Problem Save Success!')
                    toggleLoadSaveProblem(false)
                }
            })
        }
    }

    const toggleLoadSaveProblem = (value: boolean) => {
        setLoadingsSaveProblem(value);
    }

    const toggleLoadTestRun = (value: boolean) => {
        setLoadingsTestRun(value);
    }

    const gotohome = () => {
        navigate('/Home')
    }

    const goToManageProblems = () => {
        navigate("/AdminDashboard/ManageProblems")
    }

    const goToManageUsers = () => {
        navigate('/AdminDashboard/Users')
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
                <title>Create Problem</title>
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
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <FormOutlined />,
                                label: 'Create Problems',
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
                    }}>

                    <div className="container">
                        <div className="left">
                            <span style={{
                                    fontSize:'25px',
                                    color: 'black'
                            }}>
                            Create Problem</span><br /><br />
                            <span style={{
                                    fontSize:'14px',
                                    color: 'black'
                            }}>{displaying}</span><br /><br />

                            <Input 
                                name="input"
                                size="large" 
                                placeholder="Problem Name" 
                                prefix={<EditOutlined />} 
                                onChange={(e) => setProblemName(e.target.value)}
                                style={{width: 250}}
                            />    
                            <Select 
                                onChange={setLanguage}
                                style={{ width: 120,}}
                                placeholder="Language"
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
                            />
                            <Select 
                                onChange={setProblemLevel}
                                style={{ width: 120,}}
                                placeholder="Difficulty"
                                options={[
                                    {
                                    value: 'Easy',
                                    label: 'Easy',
                                    },
                                    {
                                    value: 'Medium',
                                    label: 'Medium',
                                    },
                                    {
                                    value: 'Hard',
                                    label: 'Hard',
                                    },
                                    {
                                    value: 'Evil',
                                    label: 'Evil',
                                    },
                                ]}
                            /><br /><br />

                            <Button type="primary" icon={<ForwardOutlined />} onClick={TestRun} loading={loadingsTestRun}>Test Run</Button>
                            <Button type="primary" icon={<CheckSquareOutlined />} onClick={StoreToMySQL} loading={loadingsSaveProblem}>Save Problem</Button><br /><br />


                            <TextArea 
                                name="input"
                                size="large" 
                                placeholder="Problem Description (Markdown Language)" 
                                onChange={(e) => setProblemDescription(e.target.value)}
                                style={{height: 500}}
                            /><br /><br /><br />

                            <span style={{
                                        fontSize:'14px',
                                        color: 'black'
                            }}>Correct Program</span><br /><br />
                            <AceEditor
                                mode="python"
                                theme="dreamweaver"
                                onChange={setCorrectProgram}
                                name="CorrectProgram"
                                editorProps={{ $blockScrolling: true }}
                                placeholder="Correct Program (To test and compare outputs)"
                                fontSize={16}    
                                width="800px"    
                            /><br />

                        </div>

                        <div className="right">
                            <span style={{
                                fontSize:'25px',
                                color: 'black',
                            }}> <PlusSquareOutlined /> Preview</span><br /><br />

                            <ReactMarkdown>{problemDescription}</ReactMarkdown>

                            <div style={{display: "block"}} id="TC1">
                                <span style={{
                                    fontSize:'25px',
                                    color: 'black',
                                }}>
                                <PlusSquareOutlined /> Testcases (use ::TESTCASE:: to seperate)</span><br /><br />
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setTestCases}
                                    name="1"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="#Testcases"
                                    fontSize={16}    
                                    width="800px"
                                    height="1000px"    
                                /><br/>
                            </div>
                        </div>
                    </div>

                    <h3 className="smallText"><UnorderedListOutlined /> Expected Output</h3>
                    <Table dataSource={resultList} columns={columns} bordered style={{cursor: "pointer",whiteSpace: "pre"}}/>

                    <Footer style={{textAlign: 'center',}}>
                        Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}