import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProblemDetail } from "../Redux/hook";
import { Helmet } from 'react-helmet';
import ReactMarkdown from "react-markdown"

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/ext-language_tools";

import {  Button, 
    notification, 
    Layout, 
    Select,
    Modal,
    Table
 } from 'antd';

import {  
    LogoutOutlined,
    DoubleRightOutlined,
    BulbOutlined,
 } from '@ant-design/icons';

import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout";

const { Header,Footer } = Layout;

export const ProblemPage = () => {

    const { problemID } = useParams();

    const [username, setUsername] = useState('')
    const [tag, settag] = useState('')

    const [code, setCode] = useState('')

    const [resultDisplay, setDisplaying] = useState('Click Submit to grading your program')
    const [tableData, setTableData] = useState([]);

    const [visible, setVisible] = useState(false);

    const [currentProblem, setCurrentProblem] = useState<ProblemDetail[]>([])

    const [loadings, setLoadings] = useState(false);
    const [language, setLanguage] = useState(null)

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const navigate = useNavigate();

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
                getSubmitResult(res.data.username)
            } else {
                navigate('/MainPage')
            }
         })

        axios.get<ProblemDetail[] | "PROBLEM_NOT_FOUND">(`${BACKEND_API_ENDPOINT}/currentProblem/${problemID}`).then(res => {
            if (res.data === "PROBLEM_NOT_FOUND") {
                errorNotify("Problem does not exist")
                setTimeout(function timer() {
                    navigate("/Home")
                }, 150);  
            } else {
                setCurrentProblem(res.data)
            }
        })

    }, [])

    const getSubmitResult = (username: string) => {
        axios.post(`${BACKEND_API_ENDPOINT}/CheckSubmitResult`, {
            idToCheck: problemID,
            usernameToCheck: username,
        }).then(res => {
            console.log(res.data)
            if (res.data.Result === "None") {
                setDisplaying("Click Submit to grading your program")
            } else {
                updateTestData(res.data.Result)
                if (res.data.isPassed) {
                    enterLoading(false)
                    setDisplaying(`PASSED ✓ [${res.data.Result}]`)
                } else {
                    enterLoading(false)
                    setDisplaying(`FAILED ✗ [${res.data.Result}]`)
                }
            }
        }) 
    }
    const errorNotify = (Arg: string) => {
        notification.error({
            message: 'Error!',
            description: Arg,
            placement: 'topLeft'
          })
    }

    const enterLoading = (value: boolean) => {
        setLoadings(value);
    }

    const SubmitCode = (ProblemID: String) => {
        if (!language) {
            errorNotify("Please select language to submit!")
        } else {
            enterLoading(true)
            setDisplaying(`🕒 Judging...`)
            updateTestData('NO')
            window.scrollTo({top:0 ,behavior:'smooth'}); 
            axios.post(`${BACKEND_API_ENDPOINT}/Grading`, {
                code: code,
                problemID: ProblemID,
                submitLanguage: language,
                submitUser: username
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    errorNotify("Queue is not avalible")
                } else if (res.data === 'ERROR WHILE SELECT PROBLEMS!') {
                    errorNotify("Problem does not exist")
                } else{
                    updateTestData(res.data.gradingResult)
                    if (res.data.isPassed) {
                        enterLoading(false)
                        setDisplaying(`PASSED ✓ [${res.data.gradingResult}]`)
                    } else {
                        enterLoading(false)
                        setDisplaying(`FAILED ✗ [${res.data.gradingResult}]`)
                    }
                }
            })
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setTimeout(function timer() {
            navigate("/MainPage")
        }, 150);        
    }

    const columns = [
        {
          title: 'Test #',
          dataIndex: 'testNumber',
          key: 'testNumber',
        },
        {
          title: 'Result',
          dataIndex: 'result',
          key: 'result',
        },
        {
          title: 'Meaning',
          dataIndex: 'meaning',
          key: 'meaning',
        },
    ];

    const updateTestData = (newResult: any) => {
        if (newResult === 'NO') {
            setTableData([]);
        } else {
            const newTestData = newResult.split('').map((status: any, index: any) => ({
                key: index.toString(),
                testNumber: index + 1,
                result: status,
                meaning: status === 'P' ? 'Passed' : 'Failed',
              }));
            setTableData(newTestData);
        }
    };

    const showModal = () => {
        setVisible(true);
    };
    
    const handleOk = () => {
        setVisible(false);
    };
    
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div> 
            <Helmet>
                <title>Problem</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </Helmet> 

            <Layout>
            <Header style={{padding: 0}}>
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

            <Content style={{
                margin: '50px',
                minHeight: '853px', 
                alignContent: 'center'   
            }}>
                <div className="problemPage">
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
                                </span><br />

                                {"Latest Submission Result ᐅ " + resultDisplay + " "}

                                {tableData.length > 0 && (
                                    <Button type="primary" size="small" onClick={showModal}>
                                    Result Explaination
                                    </Button>
                                )}

                                <ReactMarkdown>{list.ProblemDescription}</ReactMarkdown><br/>

                                <TextArea 
                                    name="input"
                                    size="large" 
                                    placeholder="Place your code here and submit" 
                                    onChange={(e: any) => setCode(e.target.value)}
                                    style={{height: 500, width: 900}}
                                /><br /><br /><br />

                                <Button type="primary" loading={loadings} onClick={() => SubmitCode(`${problemID}`)}>
                                    Submit <DoubleRightOutlined />
                                </Button><br/><br/>

                                <Modal
                                    title="Result Explaination"
                                    visible={visible}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    bodyStyle={{ maxHeight: 500, overflowY: 'auto' }}
                                >
                                    <Table columns={columns} dataSource={tableData} pagination={false} />
                                </Modal>

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
                                /><br/><br/>
                                
                            </div>
                        ))                
                    }      
                </div>  
            </Content>

            <Footer style={{textAlign: 'center',}}>
                Created with love by MomorioUHT UwU
            </Footer>

        </Layout>  
        </div>
    )
}