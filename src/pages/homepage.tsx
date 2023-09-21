import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "./hook"

export const Home = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

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

    const gotoeditor = () => {
        navigate("/Editor")
    }

    const gotoadmin = () => {
        if (role === 'Admin') {
            navigate("/Admindashboard")
        } else {
            alert("You do not have permission to access that page!")
        }
    }

    const gotopythonpage = () => {
        navigate("/Python")
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
                    <button className="button" onClick={gotoeditor}>Editor</button>
                </div>
            </div>
            <div className='container'>
                <a className="titles">Avalible Class</a><br /><br />
                <button className="button2" onClick={gotopythonpage}>Python Programs</button>
            </div>
        </div>
    )
}