import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail} from "../hook"

export const AdminDashboard = () => {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')
    const [sessionID, setSessionID] = useState('')

    const navigate = useNavigate();

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
            setRole(res.data[0].user_role)
            setSessionID(res.data[0].session_id)
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/MainPage")
            }
        })

    }, [])

    const gotohomepage = () => {
        navigate('/Home')
    }

    const gotouserpage = () => {
        navigate('/AdminDashboard/Users')
    }

    const gotocreateproblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    const gotopythonproblem = () => {
        navigate("/AdminDashboard/PythonProblems")
    }

    return (
        <div>
            <div className='navbar'>
                <div className="leftnav">
                    <button className="button" onClick={gotohomepage}>🡄 Home</button>
                </div>
                <div className="rightnav">
                    <h3 className="navdisplaytop">🔰 {username} ({fullname})</h3>
                </div>
            </div>
            <div className="container2">
                <a className="bigtitles">Administrator's Dashboard</a><br /><br />
                <button className="button2" onClick={gotocreateproblem}>Create Problem</button><br /><br />
                <button className="button2" onClick={gotouserpage}>Manage Users</button><br /><br />
                <button className="button2" onClick={gotopythonproblem}>Mange Problems</button><br /><br />
                <a className="smallText">Role = {role}</a><br />
                <a className="smallText">Session ID = {sessionID}</a><br />
            </div>
        </div>
    )
}