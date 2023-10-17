import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail,ProblemDetail } from "./hook"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/ext-language_tools";

export const Problem1 = () => {

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [code, setCode] = useState('')

    const [resultDisplay, setDisplaying] = useState('▶ Click Submit to grading your program')
    const [problemList, setProblemList] = useState<ProblemDetail[]>([])

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
        })
        axios.get<ProblemDetail[] | "GET_PYTHON_PROBLEM_ERROR">(`${BACKEND_API_ENDPOINT}/PythonProblems`).then(res => {
            if (res.data === "GET_PYTHON_PROBLEM_ERROR") {
                alert("Get Python Problem List Error!")
            } else {
                setProblemList(res.data)
            }
        })
    }, [])

    const gotohome = () => {
        navigate("/Home")
    }

    const SubmitCode = (ProblemID: String) => {
        setDisplaying('▶ 🕑 Grading...')
        window.scrollTo({top:0 ,behavior:'smooth'});  
        axios.post(`${BACKEND_API_ENDPOINT}/Grading`, {
            code: code,
            problemID: ProblemID,
            language: 'Python'
        }).then(res => {
            if (res.data === 'QUEUE_NOT_AVALIBLE') {
                setDisplaying(`▶ ⚠️ 🕑 The Program is Busy, please wait a moment and queue again.`)
            } else if (res.data === 'ERROR WHILE SELECT PROBLEMS!') {
                setDisplaying(`❌ Problem ID Does not Exist!`)
            } else{
                if (res.data.includes('-') || res.data.includes('C')) {
                    setDisplaying(`▶ Result: ❌ FAILED [${res.data}] 📋 ${String(res.data).replaceAll('-', '').replaceAll('C', '').length} PASSED / ${String(res.data).replaceAll('P', '').length} FAILED`)
                } else {
                    setDisplaying(`▶ Result: ✅ PASSED [${res.data}] 📋 ${res.data.length} / ${res.data.length} PASSED`)
                }
            }
        })
    }

    const ToggleProblem = (ProblemID: String) => {
        setDisplaying('▶ Click Submit to grading your program')
        const box = document.getElementById(`${ProblemID}`);
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
            <div className='navbar'>
                <div className="rightnav">
                    <h3 className="navdisplaytop">👤 {username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gotohome}>🡄 Go Back</button>
                </div>
                <div className="leftnav">
                    <h3 className="navdisplaytop">🌐 Python Problems</h3>
                </div>
            </div>
            <div className="sidenav">
                <br />
                {
                    problemList.map((list) => (
                        <a className='smallText3' onClick={() => ToggleProblem(list.ProblemID)}>✦ {list.ProblemName}</a>
                    ))
                }
            </div>
            
            {
                problemList.map((list, index) => (
                    <div className="containerlefthide" id={list.ProblemID}>
                        <a className='titles'>✦ {list.ProblemName}</a><br /><br />
                        <a className='smallText'>{resultDisplay}</a><br /><br />
                        <a href="about:blank" className='smallText'>-------------------------------------------------------------------</a><br></br>
                        <a className='smallText'>{list.ProblemDescription}</a><br></br><br></br>
                        <a className='smallText2'>Example</a><br></br>
                        <a className='smallText'>{list.ProblemExamples}</a><br></br>
                        <a className='smallText'>-------------------------------------------------------------------</a><br></br><br></br>
                        <AceEditor
                            mode="python"
                            theme="ambiance"
                            onChange={setCode}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="900px"    
                        /><br />   
                        <button className="button2" onClick={() => SubmitCode(list.ProblemID)}>Submit</button> 
                    </div>
                ))                
            }
        </div>
    )
}