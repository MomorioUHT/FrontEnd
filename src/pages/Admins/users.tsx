import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail} from "../hook"

export const Users = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState<UserDetail[]>([])
    const [displaying, setDisplaying] = useState('▶ Waiting for a command...')

    const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/checkLoginSession`, {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">(`${BACKEND_API_ENDPOINT}/administrator`, {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/login")
                return
            }
        })

        axios.get<UserDetail[] | "GET_USERLIST_ERROR">(`${BACKEND_API_ENDPOINT}/users`).then(res => {
            if (res.data === "GET_USERLIST_ERROR") {
                alert("Get Userlist Error!")
            } else {
                setUserList(res.data)
            }
        })

    })

    const deleteUser = (name: string) => {
        axios.post<"USER_DELETE_SUCCESS" | "DELETE_USER_ERROR">(`${BACKEND_API_ENDPOINT}/deleteUser`, {userNameToDelete: name})
        .then(res => {
            if (res.data === "DELETE_USER_ERROR") {
                setDisplaying('▶ ⚠️ User deletion error!')
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000);  
                return
            } else {
                setDisplaying('▶ ✅ User deleted!')
                setTimeout(function timer() {
                    window.location.reload()
                  }, 2000);  
                return
            }

        })
    }

    const gobacktoadmin = () => {
        navigate('/AdminDashboard')
    }

    return (
        <div className="container2">
            <h1 className="titles">Users</h1>
            <h3 className="smallText">{displaying}</h3>
            <table className="container2">
                <thead className="smallText2">
                    <tr>
                        <th>Index</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="smallText">
                    {
                    userList.map((list, index) => (
                        <tr key={index}>
                        <td>{index+1}</td>
                        <td>{list.user_name}</td>
                        <td>{list.user_fullname}</td>
                        <td>{list.user_password}</td>
                        <td>{list.user_role}</td>
                        <td><button className="button2" onClick={() => deleteUser(list.user_name)}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <button className="button" onClick={gobacktoadmin}>🡄 Go Back</button>
        </div>
    )
}