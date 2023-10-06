import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail } from "./hook"

export const Home = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [role, setRole] = useState('')

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

    const logout = () => {
        axios.get<"LOGOUT_ERROR" | "LOGGED_OUT">(`${BACKEND_API_ENDPOINT}/logout`, {withCredentials: true}).then(res => {
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
        } 
    }

    const gotopythonpage = () => {
        navigate("/Python")
    }
    
    return (
        <div>       
            <div className='navbar'>
                <div className="rightnav">
                    <button className="button" onClick={logout}>🔓 Log out</button>
                </div>
                <div className="rightnav">
                    <h3 className="navdisplaytopclickable" onClick={gotoadmin}>👤 {username} ({fullname})</h3>
                </div>
                <div className="leftnav">
                    <h3 className="homepagesabsolute">🔬Labatory01-Test</h3>
                </div>
                <div className="leftnav">
                    <h3 className="smallhomepageabsolute">Made by MomorioUHT</h3>
                </div>
            </div>

            <div className='homepagelefttitle'>
                <a className="titles">Problems</a><br /><br />
                <button className="button2" onClick={gotopythonpage}>Python</button>
            </div>
            <div className='homepagerighttitle'>
                <a className="titles">Tools</a><br /><br />
                <button className="button2" onClick={gotoeditor}>🖥️ Editor</button>
            </div>
        </div>
    )
}