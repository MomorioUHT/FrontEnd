import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "./hook";
import { ResultDetail } from "./hook";
import AceEditor from "react-ace";
import Select from 'react-select';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";

export const CreateProblem = () => {

    const languages = [
        {label: "Python", value: "Python"},
        {label: "C", value: "C"},
        {label: "C++", value: "C++"},
    ]

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [problemID, setProblemID] = useState('')
    const [problemName, setProblemName] = useState('')
    const [correctProgram, setCorrectProgram] = useState('')
    const [language, setLanguage] = useState(null)
    const [caseAmt, setCaseAmt] = useState(0)

    const [resultList, setResultList] = useState([])

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

    const navigate = useNavigate();

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/checkLoginSession", {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/administrator", {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Home")
            }
        })

    }, [])

    const TestRun = () => {
        if (language === 'Python') {
            alert("Sending the code to test, Please allow up to 15 seconds for the result!")
            axios.post<any>("http://localhost:8000/TestRunPython", {
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
            }).then(res => {
                setResultList(res.data)
                setTimeout(function timer() {
                    alert("Results are now ready to view!")
                    window.scrollTo({top:3000 ,behavior:'smooth'});  
                  }, 200);                  
            })
        } else {
            alert("Please select a language to Compile!")
        }
    }

    // const StoreToMySQL = () => {
    //     if (language) {
    //         setOutputDisplay('Running...')
    //         axios.post<any>("http://localhost:8000/saveproblem", {
    //             correctProgram: correctProgram,
    //             problemID: problemID,
    //             language: language,
    //             case1: case1,
    //             case2: case2,
    //             case3: case3,
    //             case4: case4,
    //             case5: case5,
    //             case6: case6,
    //             case7: case7,
    //             case8: case8,
    //             case9: case9,
    //             case10: case10,
    //         }).then(res => {
    //             if (Number(res.data)) {
    //                 setOutputDisplay(JSON.stringify(res.data)) 
    //             } else if (String(res.data)) {
    //                 setOutputDisplay(res.data)               
    //             } else {
    //                 setOutputDisplay("Undefined result \n - Code has an infinite loop \n - Code does not return or print any output")
    //             }
    //         })
    //     } else {
    //         alert("Please select a language to Compile!")
    //         setOutputDisplay('Invalid Language!')
    //     }
    // }

    const updateLanguage = (e: any) => {
        setLanguage(e.value);
      };

    const gobacktoadmin = () => {
        navigate('/AdminDashboard')
    }

    return (
        <div>       
            <div className='navbar'>
                <div className="rightnav">
                    <h3 className="navdisplaytop">{username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gobacktoadmin}>Go Back to Admin's Dashboard</button>
                </div>
                <div className="leftnav">
                <h3 className="navdisplaytop">Create A Problem</h3>
                </div>
            </div>
            <div className="container3">
            <h3 className="titles">Enter The Code To Test A Program</h3>
                <h3 className="smallText">Define A Problem ID</h3>
                <input className="inputBox" onChange={(e) => setProblemID(e.target.value)} placeholder="Problem ID"/><br /><br />
                <input className="inputBox" onChange={(e) => setProblemName(e.target.value)} placeholder="Problem Name"/><br /><br />
                <input className="inputBox" onChange={(e) => setCaseAmt(Number(e.target.value))} placeholder="TestCase Amount"/><br /><br />
                <h3 className="smallText">Language for this Problem</h3>
                <Select 
                className="Selector" 
                options={languages} 
                onChange={updateLanguage}
                /><br />
                <button className="button" onClick={TestRun}>Test Run</button><br /><br />
                <AceEditor
                    mode="python"
                    theme="dracula"
                    onChange={setCorrectProgram}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px"     
                /><br />

                <h3 className="smallText">Enter A TestCase here</h3>
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase1}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase2}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase3}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase4}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase5}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase6}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase7}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase8}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase9}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />
                <AceEditor
                    mode="text"
                    theme="dracula"
                    onChange={setCase10}
                    name="codeMarker"
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}    
                    width="900px" 
                    height="100px"    
                /><br />

                <h3 className="smallText">Expected Output</h3>
                <table className="container2">
                    <thead className="smallText2">
                        <tr>
                            <th className="tabledata2">Test Case</th>
                            <th className="tabledata2">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        resultList.map((list, index) => (
                            <tr key={index}>
                            <td className="tabledata">{index+1}</td>
                            <td className="tabledata">{list}</td>
                            </tr>
                        ))
                        }
                    </tbody>
            </table>     
            </div>
        </div>
    )
}