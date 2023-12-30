import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../Redux/hook";
import { ResultDetail } from "../Redux/hook";
import AceEditor from "react-ace";
import { Helmet } from 'react-helmet';
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
    PlusCircleOutlined,
    CheckSquareOutlined,
    ForwardOutlined,
    UnorderedListOutlined,
    PlusSquareOutlined
 } from '@ant-design/icons';

const { Header, Sider, Content, Footer } = Layout;

export const CreateProblem = () => {

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [correctProgram, setCorrectProgram] = useState('')
    const [language, setLanguage] = useState(null)
    const [caseAmt, setCaseAmt] = useState(0)
    const [problemLevel, setProblemLevel] = useState(null)

    const [collapsed, setCollapsed] = useState(false);
    const [loadingsTestRun, setLoadingsTestRun] = useState(false);
    const [loadingsSaveProblem, setLoadingsSaveProblem] = useState(false);

    const [resultList, setResultList] = useState<ResultDetail[]>([])
    const [displaying, setDisplaying] = useState('Waiting for a command...')
    
    const [Input1, setInput1] = useState('')
    const [Input2, setInput2] = useState('')
    const [Input3, setInput3] = useState('')

    const [Output1, setOutput1] = useState('')
    const [Output2, setOutput2] = useState('')
    const [Output3, setOutput3] = useState('')

    const [case1, setCase1] = useState('')
    const [case2, setCase2] = useState('')
    const [case3, setCase3] = useState('')
    const [case4, setCase4] = useState('')
    const [case5, setCase5] = useState('')
    const [case6, setCase6] = useState('')
    const [case7, setCase7] = useState('')
    const [case8, setCase8] = useState('')
    const [case9, setCase9] = useState('')
    const [case10, setCase10] = useState('')
    const [case11, setCase11] = useState('')
    const [case12, setCase12] = useState('')
    const [case13, setCase13] = useState('')
    const [case14, setCase14] = useState('')
    const [case15, setCase15] = useState('')
    const [case16, setCase16] = useState('')
    const [case17, setCase17] = useState('')
    const [case18, setCase18] = useState('')
    const [case19, setCase19] = useState('')
    const [case20, setCase20] = useState('')
    const [case21, setCase21] = useState('')
    const [case22, setCase22] = useState('')
    const [case23, setCase23] = useState('')
    const [case24, setCase24] = useState('')
    const [case25, setCase25] = useState('')
    const [case26, setCase26] = useState('')
    const [case27, setCase27] = useState('')
    const [case28, setCase28] = useState('')
    const [case29, setCase29] = useState('')
    const [case30, setCase30] = useState('')
    const [case31, setCase31] = useState('')
    const [case32, setCase32] = useState('')
    const [case33, setCase33] = useState('')
    const [case34, setCase34] = useState('')
    const [case35, setCase35] = useState('')
    const [case36, setCase36] = useState('')
    const [case37, setCase37] = useState('')
    const [case38, setCase38] = useState('')
    const [case39, setCase39] = useState('')
    const [case40, setCase40] = useState('')

    const navigate = useNavigate();

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
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Home")
            }
        })
    }, [])

    const TestRun = () => {
        if (!language) {
            notification.error({
                message: 'Error',
                description: 'Please Select your language to test!',
                placement: 'topLeft'
              })  
            setDisplaying('Please Select your language to test!')
        } else if (caseAmt === 0) {
            notification.error({
                message: 'Error',
                description: 'Please Define TestCases Amount!',
                placement: 'topLeft'
              })  
            setDisplaying('Please Define TestCases Amount!')
        } else if (correctProgram === '') {
            notification.error({
                message: 'Error',
                description: 'There is no program to test!',
                placement: 'topLeft'
              })  
            setDisplaying('There is no program to test!')
        } else if (language === 'Disabled') {
            notification.error({
                message: 'Error',
                description: 'This language is disabled UwU',
                placement: 'topLeft'
              })  
            setDisplaying('This language is disabled UwU')
        } else {
            toggleLoadTestRun(true)
            notification.info({
                message: 'Testing',
                description: 'Testing your code, please stand by...',
                placement: 'topLeft'
              })  
            setDisplaying('Testing your code, please stand by...')

            window.scrollTo({top:0 ,behavior:'smooth'}); 
            axios.post<any>(`${BACKEND_API_ENDPOINT}/TestRun`, {
                language: language,
                correctProgram: correctProgram,
                caseAmt: Number(caseAmt),
                case1: case1,
                case2: case2,
                case3: case3,
                case4: case4,
                case5: case5,
                case6: case6,
                case7: case7,
                case8: case8,
                case9: case9,
                case10: case10,
                case11: case11,
                case12: case12,
                case13: case13,
                case14: case14,
                case15: case15,
                case16: case16,
                case17: case17,
                case18: case18,
                case19: case19,
                case20: case20,
                case21: case21,
                case22: case22,
                case23: case23,
                case24: case24,
                case25: case25,
                case26: case26,
                case27: case27,
                case28: case28,
                case29: case29,
                case30: case30,
                case31: case31,
                case32: case32,
                case33: case33,
                case34: case34,
                case35: case35,
                case36: case36,
                case37: case37,
                case38: case38,
                case39: case39,
                case40: case40,
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    setDisplaying(`▶ ⚠️ 🕑 The Program is Busy, please wait a moment and queue again.`)
                } else {
                    console.log(res.data)
                    setResultList(res.data)
                    notification.success({
                        message: 'Testing Success',
                        description: 'Results are ready to review!',
                        placement: 'topLeft'
                      })  
                    setDisplaying('Results are ready to review!')
                    setTimeout(function timer() {
                            window.scrollTo({top:3300 ,behavior:'smooth'});     
                      }, 500);
                }             
                toggleLoadTestRun(false)     
            })
        } 
    }

    const StoreToMySQL = () => {
        toggleLoadSaveProblem(true)
        if (!language) {
            notification.error({
                message: 'Error',
                description: 'Please Select your language to test!',
                placement: 'topLeft'
              })  
            setDisplaying('Please Select your language to test!')
            toggleLoadSaveProblem(false)
        } else if (!problemLevel) {
            notification.error({
                message: 'Error',
                description: 'Please Select the level for this problem!',
                placement: 'topLeft'
              })  
            setDisplaying('Please Select the level for this problem!')
            toggleLoadSaveProblem(false)
        } else if (caseAmt === 0) {
            notification.error({
                message: 'Error',
                description: 'Please Define TestCases Amount!',
                placement: 'topLeft'
              })  
            setDisplaying('Please Define TestCases Amount!')
            toggleLoadSaveProblem(false)
        } else if (correctProgram === '') {
            notification.error({
                message: 'Error',
                description: 'There is no program to save!',
                placement: 'topLeft'
              })  
            setDisplaying('There is no program to save!')
            toggleLoadSaveProblem(false)
        } else if (problemDescription === '') {
            notification.error({
                message: 'Error',
                description: 'Please write a problem description',
                placement: 'topLeft'
              })  
            setDisplaying('Please write a problem description')
            toggleLoadSaveProblem(false)
        } else if (Input1 === '' && Output1 === '') {
            notification.error({
                message: 'Error',
                description: 'You need at least 1 problem examples!',
                placement: 'topLeft'
              })  
            setDisplaying('You need at least 1 problem examples!')
            toggleLoadSaveProblem(false)
        } else if (language === 'Disabled') {
            notification.error({
                message: 'Error',
                description: 'This language is disabled UwU',
                placement: 'topLeft'
              })  
            setDisplaying('This language is disabled UwU')
            toggleLoadSaveProblem(false)
        } else {
            notification.info({
                message: 'Saving',
                description: 'Saving your problem, please stand by...',
                placement: 'topLeft'
              })  
            setDisplaying('Saving your problem, please stand by...')
            toggleLoadSaveProblem(true)
            window.scrollTo({top:0 ,behavior:'smooth'}); 
            axios.post<'ADDING_PROBLEM_ERROR' | 'PROBLEM_SAVED!' | 'QUEUE_NOT_AVALIBLE'>(`${BACKEND_API_ENDPOINT}/SaveToDatabase`, {
                correctProgram: correctProgram,
                problemID: Math.random().toString(16).slice(2),
                problemName: problemName,
                problemDescription: problemDescription,
                Input1: Input1,
                Input2: Input2,
                Input3: Input3,
                Output1: Output1,
                Output2: Output2,
                Output3: Output3,
                caseAmt: Number(caseAmt),
                problemLevel: problemLevel,
                case1: case1,
                case2: case2,
                case3: case3,
                case4: case4,
                case5: case5,
                case6: case6,
                case7: case7,
                case8: case8,
                case9: case9,
                case10: case10,
                case11: case11,
                case12: case12,
                case13: case13,
                case14: case14,
                case15: case15,
                case16: case16,
                case17: case17,
                case18: case18,
                case19: case19,
                case20: case20,
                case21: case21,
                case22: case22,
                case23: case23,
                case24: case24,
                case25: case25,
                case26: case26,
                case27: case27,
                case28: case28,
                case29: case29,
                case30: case30,
                case31: case31,
                case32: case32,
                case33: case33,
                case34: case34,
                case35: case35,
                case36: case36,
                case37: case37,
                case38: case38,
                case39: case39,
                case40: case40,
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    notification.error({
                        message: 'Queue Error',
                        description: 'Please wait a moment and try to queue again...',
                        placement: 'topLeft'
                      })  
                    setDisplaying('Please wait a moment and try to queue again...')
                    toggleLoadSaveProblem(false)
                } else if (res.data === 'ADDING_PROBLEM_ERROR') {
                    notification.error({
                        message: 'Save Error',
                        description: 'See in console...',
                        placement: 'topLeft'
                      })  
                    setDisplaying('Problem Saving Error!')
                    window.scrollTo({top:0 ,behavior:'smooth'});
                    toggleLoadSaveProblem(false)
                } else {
                    notification.success({
                        message: 'Save Successful!',
                        description: 'The problem is now saved and ready to solve!',
                        placement: 'topLeft'
                      })  
                    setDisplaying('The problem is now saved and ready to solve!')
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

    const gotocreateproblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const gotopythonproblem = () => {
        navigate("/AdminDashboard/ManageProblems")
    }

    const gotouserpage = () => {
        navigate('/AdminDashboard/Users')
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
    const ToggleTestCases = (Section: String) => {
        const box = document.getElementById(`${Section}`);
        if (box != null) {
            if (box.style.display === "none") {
                box.style.display = "block";
            } else {
                box.style.display = "none";
            }
        }        
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
                            <Input 
                                name="input"
                                size="large" 
                                placeholder="Testcase Amount" 
                                prefix={<PlusCircleOutlined />} 
                                onChange={(e) => setCaseAmt(Number(e.target.value))}
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

                        <Button type="primary" icon={<FormOutlined />} onClick={() => ToggleTestCases("TC1")}>Case 1- 10</Button>
                        <Button type="primary" icon={<FormOutlined />} onClick={() => ToggleTestCases("TC2")}>Case 11- 20</Button>
                        <Button type="primary" icon={<FormOutlined />} onClick={() => ToggleTestCases("TC3")}>Case 21- 30</Button>
                        <Button type="primary" icon={<FormOutlined />} onClick={() => ToggleTestCases("TC4")}>Case 31- 40</Button><br /><br />

                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setProblemDescription}
                            name="Description"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Problem Description"
                            fontSize={16}    
                            width="800px" 
                            height="300px"    
                        /><br /><br /><br />

                        <span style={{
                                    fontSize:'14px',
                                    color: 'black'
                            }}>Example Section</span><br /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setInput1}
                            name="Example1"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 1 Input"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setOutput1}
                            name="Example1out"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 1 Output"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setInput2}
                            name="Example2"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 2 Input"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setOutput2}
                            name="Example2out"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 2 Output"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setInput3}
                            name="Example3"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 3 Input"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                        <AceEditor
                            mode="text"
                            theme="dreamweaver"
                            onChange={setOutput3}
                            name="Example3out"
                            editorProps={{ $blockScrolling: true }}
                            placeholder="Example 3 Output"
                            fontSize={16}    
                            width="800px"
                            height="100px"    
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
                            <div style={{display: "block"}} id="TC1">
                                <span style={{
                                    fontSize:'25px',
                                    color: 'black',
                                }}>
                                <PlusSquareOutlined /> Testcase 1-10</span><br /><br />
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase1}
                                    name="1"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #1"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase2}
                                    name="2"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #2"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase3}
                                    name="3"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #3"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase4}
                                    name="4"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #4"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase5}
                                    name="5"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #5"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase6}
                                    name="6"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #6"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase7}
                                    name="7"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #7"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase8}
                                    name="8"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #8"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase9}
                                    name="9"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #9"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase10}
                                    name="10"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #10"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br />
                            </div>
                            
                            <div style={{display: "none"}} id="TC2">
                                <span style={{
                                        fontSize:'25px',
                                        color: 'black',
                                }}>
                                <PlusSquareOutlined /> Testcase 11-20</span><br /><br />
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase11}
                                    name="11"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #11"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase12}
                                    name="12"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #12"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase13}
                                    name="13"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #13"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase14}
                                    name="14"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #14"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase15}
                                    name="15"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #15"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase16}
                                    name="16"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #16"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase17}
                                    name="17"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #17"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase18}
                                    name="18"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #18"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase19}
                                    name="19"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #19"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase20}
                                    name="20"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #20"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br />
                            </div>

                            <div style={{display: "none"}} id="TC3">
                            <span style={{
                                    fontSize:'25px',
                                    color: 'black',
                                }}>
                                <PlusSquareOutlined /> Testcase 21-30</span><br /><br />
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase21}
                                    name="21"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #21"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase22}
                                    name="22"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #22"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase23}
                                    name="23"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #23"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase24}
                                    name="24"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #24"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase25}
                                    name="25"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #25"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase26}
                                    name="26"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #26"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase27}
                                    name="27"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #27"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase28}
                                    name="28"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #28"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase29}
                                    name="29"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #29"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase30}
                                    name="30"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #30"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br />
                            </div>
                            
                            <div style={{display: "none"}} id="TC4">
                                <span style={{
                                    fontSize:'25px',
                                    color: 'black',
                                }}>
                                <PlusSquareOutlined /> Testcase 31-40</span><br /><br />
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase31}
                                    name="31"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #31"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase32}
                                    name="32"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #32"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase33}
                                    name="33"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #33"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase34}
                                    name="34"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #34"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase35}
                                    name="35"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #35"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase36}
                                    name="36"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #36"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase37}
                                    name="37"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #37"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase38}
                                    name="38"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #38"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase39}
                                    name="39"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #39"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br/>
                                <AceEditor
                                    mode="text"
                                    theme="dreamweaver"
                                    onChange={setCase40}
                                    name="40"
                                    editorProps={{ $blockScrolling: true }}
                                    placeholder="Testcase #40"
                                    fontSize={16}    
                                    width="800px"
                                    height="100px"    
                                /><br />
                            </div>
                        </div>
                    </div>

                    <h3 className="smallText"><UnorderedListOutlined /> Expected Output</h3>
                    <Table dataSource={resultList} columns={columns} bordered style={{cursor: "pointer",whiteSpace: "pre"}}/>

                    <Footer style={{textAlign: 'center',}}>
                        Lab ©2023 Created with love by MomorioUHT UwU
                    </Footer>
                </Content>
            </Layout>
            </Layout>
        </div>
    )
}