import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { checkCurrentUser } from "./hook";
import { UserDetail } from "./hook"
import axios from 'axios';

export const Login = () => {
    const [username, setLoginUsername] = useState('')
    const [password, setLoginPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        checkCurrentUser().then(isLoggedIn => {
            if (isLoggedIn) {
                navigate("/Home")
            }
        })
    }, [])

    const checkAdmin = () => {
        axios.get("http://localhost:8000/administrator", {withCredentials: true}).then(res => {
            console.log(res.data)
            if (res.data == "ROLE_ISNOT_ADMIN") {
                navigate("/Home")
            } if (res.data == "ROLE_IS_ADMIN") {
                navigate("/AdminDashBoard")
            } else if (res.data == "SERVER_SIDE_ERROR") {
                alert("SERVER_SIDE_ERROR")
            }
        })
    }
    
    const Check = (e: any) => {
        if (!username || !password) {
            alert(`Please enter username and password!`)
            return
        } else {
            axios.post<UserDetail[] | "WRONG" | "SEVER_SIDE_ERROR">('http://localhost:8000/login', {
                username: username,
                password: password
              }, {withCredentials: true})
              .then(function (response) {
                console.log(response);
                if (response.data == "SEVER_SIDE_ERROR" || response.data === "WRONG") {
                    alert(`Username or Password is Incorrect!`)
                    window.location.reload()
                } else {
                    checkAdmin()
                }
              })
        }
    }

    return (
        <div>
            <div className="container">
                <h1 className="bigtitles">Login</h1>
                <input className="inputBox" placeholder="Username" value={username} onChange={(e) => setLoginUsername(e.target.value)}/><br />
                <input className="inputBox" type="password" placeholder="Password" value={password} onChange={(e) => setLoginPassword(e.target.value)}/><br /><br />
                <button className="button" onClick={Check}>Login</button><br /><br />
                <a className="smallText">Does not have an Account?</a><br />
                <Link className="smallText2" to="/Register">Register</Link>
            </div>
        </div>
    )
}