import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDetail } from "../hook";
import { ResultDetail } from "../hook";
import AceEditor from "react-ace";
import Select from 'react-select';

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/ext-language_tools";

export const CreateProblem = () => {

    const languages = [
        {label: "Python", value: "Python"},
        {label: "C (Disabled)", value: "Disabled"},
        {label: "C++ (Disabled)", value: "Disabled"},
        {label: "C# (Disabled)", value: "Disabled"},
        {label: "Java (Disabled)", value: "Disabled"},
        {label: "Visual Basic (Disabled)", value: "Disabled"},
    ]

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')

    const [problemName, setProblemName] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const [problemExamples, setProblemExamples] = useState('')
    const [correctProgram, setCorrectProgram] = useState('')
    const [language, setLanguage] = useState(null)
    const [caseAmt, setCaseAmt] = useState(0)

    const [resultList, setResultList] = useState<ResultDetail[]>([])
    const [displaying, setDisplaying] = useState('▶ Waiting for a command...')

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

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
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

    })

    const TestRun = () => {
        if (language !== 'Disabled') {
            setDisplaying('▶ 🕑 Testing your code... 📋')
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
                    setTimeout(function timer() {
                        setDisplaying("✅ Results Are ready to review!")
                        setTimeout(function timer() {
                            window.scrollTo({top:3300 ,behavior:'smooth'});  
                          }, 1500);      
                      }, 200);
                }                  
            })
        } else if (language === 'Disabled') {
            setDisplaying('▶ ⛔ Sorry This language has been disabled by the owner!')
        } else {
            setDisplaying('▶ ⚠️ Please select a language for this problem!')
        }
    }

    const StoreToMySQL = () => {
        if (language !== 'Disabled') {
            setDisplaying('▶ 🕑 Saving the problem... 💾')
            window.scrollTo({top:0 ,behavior:'smooth'}); 
            axios.post<'ADDING_PROBLEM_ERROR' | 'PROBLEM_SAVED!' | 'QUEUE_NOT_AVALIBLE'>(`${BACKEND_API_ENDPOINT}/SaveToDatabase`, {
                correctProgram: correctProgram,
                problemID: Math.random().toString(16).slice(2),
                problemName: problemName,
                problemDescription: problemDescription,
                problemExamples: problemExamples,
                caseAmt: Number(caseAmt),
                language: language,
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
                    setDisplaying(`▶ ⚠️ Unable to queue your request, please wait a moment and queue again.`)
                } else if (res.data === 'ADDING_PROBLEM_ERROR') {
                    setDisplaying('▶ ⚠️ Error While saving the problem (See in Console)') 
                    window.scrollTo({top:0 ,behavior:'smooth'});
                } else {
                    setDisplaying('▶ ✅ Problem Saved!') 
                }
            })
        } else {
            setDisplaying('▶ ⚠️ Please select a language for this problem!')
        }
    }

    const updateLanguage = (e: any) => {
        setLanguage(e.value);
      };

    const gobacktoadmin = () => {
        navigate('/AdminDashboard')
    }

    const ToggleTestCases = (Section: number) => {
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
            <div className='navbar'>
                <div className="rightnav">
                    <h3 className="navdisplaytop">🔰 {username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gobacktoadmin}>🡄 Go Back</button>
                </div>
                <div className="leftnav">
                    <h3 className="navdisplaytop">✏️ Create A Problem</h3>
                </div>
            </div>
            <div className="containerleft">
                <h3 className="titles">✏️ Create A Problem</h3>
                    <h3 className="smallText">{displaying}</h3>
                    <input className="inputBox" onChange={(e) => setProblemName(e.target.value)} placeholder="Problem Name"/><br /><br />
                    <input className="inputBox" onChange={(e) => setCaseAmt(Number(e.target.value))} placeholder="TestCase Amount"/><br /><br />
                    <button className="button2" onClick={TestRun}>Test Run</button>
                    <button className="button2" onClick={StoreToMySQL}>Save Problem</button><br /><br />

                    <h3 className="smallText">⚙️ Language for this Problem</h3>
                    <Select 
                    className="Selector" 
                    options={languages} 
                    onChange={updateLanguage}
                    /><br />

                    <h3 className="smallText">⌨️ Description</h3>
                    <AceEditor
                        mode="text"
                        theme="ambiance"
                        onChange={setProblemDescription}
                        name="codeMarker"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={16}    
                        width="800px" 
                        height="300px"    
                    /><br />
                    <h3 className="smallText">📲 Examples Section</h3>
                    <AceEditor
                        mode="text"
                        theme="ambiance"
                        onChange={setProblemExamples}
                        name="codeMarker"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={16}    
                        width="800px"
                        height="100px"    
                    /><br />

                    <h3 className="smallText">✅ Correct Program</h3>
                    <AceEditor
                        mode="python"
                        theme="ambiance"
                        onChange={setCorrectProgram}
                        name="codeMarker"
                        editorProps={{ $blockScrolling: true }}
                        fontSize={16}    
                        width="800px"    
                    /><br />

                    <h2 className="smallText">📋 TestCases</h2>
                    <button className="button2" onClick={() => ToggleTestCases(1)}>Case 1 - 10</button>
                    <button className="button2" onClick={() => ToggleTestCases(2)}>Case 11 - 20</button>
                    <button className="button2" onClick={() => ToggleTestCases(3)}>Case 21 - 30</button>
                    <button className="button2" onClick={() => ToggleTestCases(4)}>Case 31 - 40</button><br /><br />
                    <div className="containerlefthideadmin" id="1">
                        <h3 className="smallText">1</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase1}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">2</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase2}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">3</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase3}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">4</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase4}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">5</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase5}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">6</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase6}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">7</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase7}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">8</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase8}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">9</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase9}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">10</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase10}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                    </div>
                    
                    <div className="containerlefthideadmin" id="2">
                        <h3 className="smallText">11</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase11}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">12</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase12}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">13</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase13}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">14</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase14}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">15</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase15}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">16</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase16}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">17</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase17}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">18</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase18}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">19</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase19}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">20</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase20}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                    </div>

                    <div className="containerlefthideadmin" id="3">
                        <h3 className="smallText">21</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase21}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">22</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase22}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">23</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase23}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">24</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase24}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">25</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase25}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">26</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase26}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">27</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase27}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">28</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase28}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">29</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase29}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">30</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase30}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                    </div>
                    
                    <div className="containerlefthideadmin" id="4">
                        <h3 className="smallText">31</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase31}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">32</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase32}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">33</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase33}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">34</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase34}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">35</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase35}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">36</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase36}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">37</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase37}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">38</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase38}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">39</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase39}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        />
                        <h3 className="smallText">40</h3>
                        <AceEditor
                            mode="text"
                            theme="ambiance"
                            onChange={setCase40}
                            name="codeMarker"
                            editorProps={{ $blockScrolling: true }}
                            fontSize={16}    
                            width="800px"
                            height="100px"    
                        /><br />
                    </div>

                    <h3 className="smallText">📶 Expected Output</h3>

                    <table className="tablecontainertestcase">
                        <thead className="smallText2">
                            <tr>
                                <th className="tabledata2">Test Case</th>
                                <th className="tabledata2">Input</th>
                                <th className="tabledata2">Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            resultList.map((list, index) => (
                                <tr key={index}>
                                <td className="tabledata">{index+1}</td>
                                <td className="tabledata">{list.input}</td>
                                <td className="tabledata">{list.output}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                </table>     
            </div>
        </div>
    )
}