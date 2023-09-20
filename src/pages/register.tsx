import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import { checkCurrentUser } from "./hook";

export const Register = () => {
    const [reguser, setregUser] = useState('')
    const [regfullname, setregFullname] = useState('')
    const [regpassword, setregPassword] = useState('')
    const [regconfirmpassword, setregconfirmPassword] = useState('')
    const navigate = useNavigate();

    const Check = (e: any) => {
        if (!reguser || !regfullname || !regpassword || !regconfirmpassword) {
            alert(`Please fill all of the informations!`)
        } else if (regfullname == reguser) {
            alert(`User & Fullname can't be the same!`)
        }else if (regpassword !== regconfirmpassword) {
            alert(`Password Does not Match!`)
        } else {
            axios.post('http://localhost:8000/register', {
                username: reguser,
                password: regpassword,
                fullname: regfullname,
                role: "User",
                sessionID: 0
              })
              .then(function (response) {
                console.log(response);
                if (response.data === "MySQL_REG_COMPLETED!") {
                    alert(`Registeration Complete, You can not login!`)
                    return navigate('/Login')
                } else if (response.data === "POST_ADD_USER_ERROR") {
                    alert(`There was a problem in server side.`)
                }
              })
        }
    }

    useEffect(() => {
        checkCurrentUser().then(isLoggedIn => {
            if (isLoggedIn) {
                navigate("/Home")
            }
        })
    }, [])

    return (
        <div className="container">
            <h1 className="bigtitles">Create Account</h1>
            <input className="inputBox" placeholder="Fullname" value={regfullname} onChange={(e) => setregFullname(e.target.value)}/><br />
            <input className="inputBox" placeholder="Username" value={reguser} onChange={(e) => setregUser(e.target.value)}/><br />
            <input className="inputBox" type="password" placeholder="Password" value={regpassword} onChange={(e) => setregPassword(e.target.value)}/><br />
            <input className="inputBox" type="password" placeholder="Confirm Password" value={regconfirmpassword} onChange={(e) => setregconfirmPassword(e.target.value)}/><br /><br />
            <button className="button" onClick={Check}>Register</button><br /><br />
            <a className="smallText">Already has an Account?</a><br />
            <Link className="smallText2" to="/Login">Login</Link>
        </div>
    )
}