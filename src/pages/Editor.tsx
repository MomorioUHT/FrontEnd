import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "./hook"
import AceEditor from "react-ace";
import Select from 'react-select';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/ext-language_tools";

export const Editor = () => {

    const languages = [
        {label: "Python", value: "Python"},
        {label: "C (Disabled)", value: "Disabled"},
        {label: "C++ (Disabled)", value: "Disabled"},
        {label: "C# (Disabled)", value: "Disabled"},
        {label: "Java (Disabled)", value: "Disabled"},
        {label: "Visual Basic (Disabled)", value: "Disabled"},
    ]

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState(null)

    const [outputDisplay, setOutputDisplay] = useState('')
    const [displaying, setDisplaying] = useState('▶ Waiting for a command...')

    const navigate = useNavigate();

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    
    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
            setRole(res.data[0].user_role)
        })
    })

    const compileCode = () => {
        if (language !== 'Disabled') {
            setOutputDisplay('Running...')
            axios.post<any>(`${BACKEND_API_ENDPOINT}/compile`, {
                code: code,
                input: input,
                language: language
            }).then(res => {
                if (res.data === 'QUEUE_NOT_AVALIBLE') {
                    setDisplaying(`▶ ⚠️ 🕑 The Program is Busy, please wait a moment and queue again.`)
                } else {
                    if (Number(res.data)) {
                        setOutputDisplay(JSON.stringify(res.data)) 
                    } else if (String(res.data)) {
                        setOutputDisplay(res.data)               
                    } else {
                        setOutputDisplay("Undefined result \n - Code has an infinite loop \n - Code does not return or print any output")
                    }
                }
            })
        } else if (language === 'Disabled') {
            setDisplaying('▶ ⛔ Sorry This language has been disabled by the owner!')
        } else {
            setDisplaying('▶ ⚠️ Please select a language for this problem!')
        }
    }

    const updateLanguage = (e: any) => {
        setLanguage(e.value);
      };

    const gotohome = () => {
        navigate("/Home")
    }
    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard")
        } else {
            alert("You do not have permission to access that page!")
        }
    }

    return (
        <div>       
            <div className='navbar'>
                <div className="rightnav">
                    <h3 className="navdisplaytopclickable" onClick={gotoadmin}>{username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <button className="button2" onClick={gotohome}>🡄 Home</button>
                </div>
            </div>
            <div className="container3">
                <a className="bigtitles">Editor</a><br /><br />
                <h3 className="smallText">{displaying}</h3>
                <AceEditor
                    mode="python"
                    theme="ambiance"
                    onChange={setCode}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px"     
                />
                <h3 className="smallText">Input (leave blank for no input)</h3>
                <AceEditor
                    mode="text"
                    theme="ambiance"
                    onChange={setInput}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <h3 className="smallText">Compile Language</h3>
                <Select 
                className="Selector" 
                options={languages} 
                onChange={updateLanguage}
                />
                <button className="button2" onClick={compileCode}>Run</button><br />
                <h3 className="smallText">Console</h3>
                <AceEditor
                    mode="text"
                    theme="ambiance"
                    name="codeMarker"
                    fontSize={16}    
                    width="900px" 
                    height="400px" 
                    value={outputDisplay}   
                />         
            </div>
        </div>
    )
}