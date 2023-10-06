import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserDetail } from "../hook";
import axios from 'axios';

export const Register = () => {
    const [reguser, setregUser] = useState('')
    const [regpassword, setregPassword] = useState('')
    const [regconfirmpassword, setregconfirmPassword] = useState('')

    const [displaying, setDisplaying] = useState('▶ Register to start your journey!')
    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    const navigate = useNavigate();

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
        if (!reguser || !regpassword || !regconfirmpassword) {
            setDisplaying('▶ ⚠️ Please fill out all of the information!')
        } else if (regpassword !== regconfirmpassword) {
            setDisplaying('▶ ⚠️ Password does not match!')
        } else if (String(regpassword).length < 6 || String(regconfirmpassword).length < 6) {
            setDisplaying('▶ ⚠️ Password must be at least 6 characters long')
        } else {
            axios.post(`${BACKEND_API_ENDPOINT}/register`, {
                username: reguser,
                password: regpassword,
                fullname: reguser + '#' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000),
                role: "User",
                sessionID: 0
              })
              .then(function (response) {
                console.log(response);
                if (response.data === "MySQL_REG_COMPLETED!") {
                    setDisplaying('▶ ✅ Register Complete! Redirecting to login page 🕑')
                    setTimeout(function timer() {
                        navigate('/login')
                      }, 2000);  
                } else if (response.data === "POST_ADD_USER_ERROR") {
                    setDisplaying('▶ ⚠️ Authentication server error...')
                }
              })
        }
    }

    return (
        <div className="container2">
            <h1 className="bigtitles">Create Account</h1>
            <h3 className="smallText">{displaying}</h3>
            <input className="inputBox" placeholder="Username" value={reguser} onChange={(e) => setregUser(e.target.value)}/><br />
            <input className="inputBox" type="password" placeholder="Password" value={regpassword} onChange={(e) => setregPassword(e.target.value)}/><br />
            <input className="inputBox" type="password" placeholder="Confirm Password" value={regconfirmpassword} onChange={(e) => setregconfirmPassword(e.target.value)}/><br /><br />
            <button className="button2" onClick={Check}>Register</button><br /><br />
            <a className="smallText">Already has an Account?</a><br />
            <Link className="smallText2" to="/Login">Login</Link>
        </div>
    )
}