import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail, ProblemDetail } from "../hook"

export const PythonProblems = () => {
    const navigate = useNavigate();
    const [problemList, setProblemList] = useState<ProblemDetail[]>([])
    const [displaying, setDisplaying] = useState('▶ Waiting for a command...')

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
        })

        axios.get<ProblemDetail[] | "GET_PYTHON_PROBLEM_ERROR">(`${BACKEND_API_ENDPOINT}/PythonProblems`).then(res => {
            if (res.data === "GET_PYTHON_PROBLEM_ERROR") {
                alert("Get Python Problem List Error!")
            } else {
                setProblemList(res.data)
            }
        })

    }, [])

    const deleteProblem = (ID: string) => {
        axios.post<"DELETE_PROBLEM_ERROR" | "PROBLEM_DELETE_SUCCESS">(`${BACKEND_API_ENDPOINT}/deletePythonProblems`, {ProblemID: ID})
        .then(res => {
            if (res.data === "DELETE_PROBLEM_ERROR") {
                setDisplaying('▶ ⚠️ Problem deletion error!')
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000); 
                window.location.reload()
                return
            } else {
                setDisplaying('▶ ✅ Problem Deleted!')
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000); 
                window.location.reload()
                return
            }

        })
    }

    const gobacktoadmin = () => {
        navigate('/AdminDashboard')
    }

    return (
        <div className="container4">
            <h1 className="titles">Python Problems</h1>
            <h3 className="smallText">{displaying}</h3>
            <table className="tablecontainer">
                <thead className="smallText2">
                    <tr>
                        <th>Problem ID</th>
                        <th>Name</th>
                        <th>Cases Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="smallText">
                    {
                    problemList.map((list, index) => (
                        <tr key={index}>
                        <td>{list.ProblemID}</td>
                        <td>{list.ProblemName}</td>
                        <td>{list.CaseAmt}</td>
                        <td><button className="button2" onClick={() => deleteProblem(list.ProblemID)}>Delete Problem</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <button className="button" onClick={gobacktoadmin}>🡄 Go Back</button>
        </div>
    )
}