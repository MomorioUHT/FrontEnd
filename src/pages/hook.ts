import axios from "axios"

export const checkCurrentUser = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/checkLoginSession", {withCredentials: true}).then(res => {
            if (res.data === "NOT_LOGGEDIN") {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

export interface UserDetail {
    user_name: string;
    user_fullname: string;
    user_password: string;
    user_role: string;
    session_id: string;
}

export interface ResultDetail {
    result: string
}