import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { UserDetail} from "./hook"

export const Users = () => {
    const navigate = useNavigate();
    const [userList, setUserList] = useState<UserDetail[]>([])

    useEffect(() => {
        axios.get<UserDetail[] | "NOT_LOGGEDIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/checkLoginSession", {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/Login")
                return
            }
        })

        axios.get<UserDetail[] | "ROLE_IS_ADMIN" | "ROLE_ISNOT_ADMIN" | "SERVER_SIDE_ERROR">("http://localhost:8000/administrator", {withCredentials: true}).then(res => {
            if (res.data === "ROLE_ISNOT_ADMIN" || res.data === "SERVER_SIDE_ERROR") {
                navigate("/login")
                return
            }
        })

        axios.get<UserDetail[] | "GET_USERLIST_ERROR">("http://localhost:8000/users").then(res => {
            if (res.data === "GET_USERLIST_ERROR") {
                alert("Get Userlist Error!")
            } else {
                setUserList(res.data)
            }
        })

    }, [])

    const deleteUser = (name: string) => {
        axios.post<"USER_DELETE_SUCCESS" | "DELETE_USER_ERROR">("http://localhost:8000/deleteUser", {userNameToDelete: name})
        .then(res => {
            if (res.data === "DELETE_USER_ERROR") {
                alert("Delete user error.")
                window.location.reload()
                return
            } else {
                alert("User Deleted!")
                window.location.reload()
                return
            }

        })
    }

    const gotohomepage = () => {
        navigate('/AdminDashboard')
    }

    return (
        <div className="container2">
            <h1 className="titles">Users</h1>
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
                        <td><button className="button" onClick={() => deleteUser(list.user_name)}>Delete</button></td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <button className="button" onClick={gotohomepage}>Go Back</button>
        </div>
    )
}