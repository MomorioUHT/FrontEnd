import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "./hook"
import AceEditor from "react-ace";
import Select from 'react-select';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export const Editor = () => {

    const languages = [
        {label: "Python", value: "Python"},
        {label: "C", value: "C"},
        {label: "C++", value: "C++"},
    ]

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [language, setLanguage] = useState(null)

    const [outputDisplay, setOutputDisplay] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/checkLoginSession", {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
            setRole(res.data[0].user_role)
        })
    }, [])

    const logout = () => {
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">("http://localhost:8000/logout", {withCredentials: true}).then(res => {
            if (res.data === "LOGGED_OUT") {
                navigate('/Login')
            } else {
                alert('Logout error go check console')
            }
        })
    }

    const compileCode = () => {
        if (language) {
            setOutputDisplay('Running...')
            axios.post<any>("http://localhost:8000/compile", {
                code: code,
                input: input,
                language: language
            }).then(res => {
                if (Number(res.data)) {
                    setOutputDisplay(JSON.stringify(res.data)) 
                } else if (String(res.data)) {
                    setOutputDisplay(res.data)               
                } else {
                    setOutputDisplay("Undefined result \n - Code has an infinite loop \n - Code does not return or print any output")
                }
            })
        } else {
            alert("Please select a language to Compile!")
            setOutputDisplay('Invalid Language!')
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
                    <button className="button" onClick={logout}>Log out</button>
                </div>
                <div className="rightnav">
                    <h3 className="navdisplaytop" onClick={gotoadmin}>{username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gotohome}>Home</button>
                </div>
            </div>
            <div className="container3">
                <AceEditor
                    mode="python"
                    theme="dracula"
                    onChange={setCode}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px"     
                />
                <h3 className="smallText">Input (leave blank for no input)</h3>
                <AceEditor
                    mode="text"
                    theme="dracula"
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
                <button className="button" onClick={compileCode}>Run</button><br />
                <h3 className="smallText">Console</h3>
                <AceEditor
                    mode="text"
                    theme="dracula"
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