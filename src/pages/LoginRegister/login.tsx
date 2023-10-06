import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserDetail } from "../hook";
import axios from 'axios';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Login = () => {
    const [username, setLoginUsername] = useState('')
    const [password, setLoginPassword] = useState('')

    const [displaying, setDisplaying] = useState('▶ Please login...')

    const navigate = useNavigate();
    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR" | "LOGGED_IN">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                return
            } else {
                navigate("/home")
            }
        })
    })
    
    const Check = (e: any) => {
        if (!username || !password) {
            alert(`Please enter username and password!`)
            return
        } else {
            axios.post<UserDetail[] | "WRONG" | "SEVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/login`, {
                username: username,
                password: password
              }, {withCredentials: true})
              .then(function (response) {
                console.log(response);
                if (response.data === "SEVER_SIDE_ERROR" || response.data === "WRONG") {
                    setDisplaying('▶ ❌ Username or Password is incorrect!')
                } else {
                    navigate("/Home")
                }
              })
        }
    }

    return (
        <div>
            <div>
                <h1>Login</h1>
                <h3>{displaying}</h3>
                <input className="form-control" aria-describedby="inputGroup-sizing-lg" placeholder="Username" value={username} onChange={(e) => setLoginUsername(e.target.value)}/><br />
                <input className="form-control" aria-describedby="inputGroup-sizing-lg" type="password" placeholder="Password" value={password} onChange={(e) => setLoginPassword(e.target.value)}/><br /><br />
                <button type="button" className="btn btn-primary" onClick={Check}>Login</button><br /><br />
                <a className="smallText">Does not have an Account?</a><br />
                <Link className="smallText2" to="/Register">Register</Link>
            </div>
        </div>
    )
}