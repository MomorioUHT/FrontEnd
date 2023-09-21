import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail} from "./hook"

export const AdminDashboard = () => {
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')
    const [sessionID, setSessionID] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/checkLoginSession", {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
            setUsername(res.data[0].user_name)
            setFullname(res.data[0].user_fullname)
            setFullname(res.data[0].user_password)
            setRole(res.data[0].user_role)
            setSessionID(res.data[0].session_id)
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/administrator", {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/login")
            }
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

    const gotohomepage = () => {
        navigate('/Home')
    }

    const gotouserpage = () => {
        navigate('/AdminDashboard/Users')
    }

    const gotoeditor = () => {
        navigate("/Editor")
    }

    const gotocreateproblem = () => {
        navigate("/AdminDashboard/CreateProblem")
    }

    return (
        <div>
            <div className='navbar'>
            <div className="leftnav">
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gotoeditor}>Editor</button>
                </div>
                <div className="leftnav">
                    <button className="button" onClick={gotohomepage}>Home</button>
                </div>
                <div className="rightnav">
                    <button className="button" onClick={logout}>Log out</button>
                </div>
                <div className="rightnav">
                    <h3 className="navdisplaytop">{username} ({fullname})</h3>
                </div>
            </div>
            <div className="container2">
                <a className="titles">Administrator's Dashboard</a><br /><br />
                <a className="titles">{username} ({fullname})</a><br /><br />
                <button className="button2" onClick={gotouserpage}>Manage Users</button><br /><br />
                <button className="button2" onClick={gotocreateproblem}>Create</button><br /><br />
                <a className="smallText">Role = {role}</a><br />
                <a className="smallText">Session ID = {sessionID}</a><br />
            </div>
        </div>
    )
}