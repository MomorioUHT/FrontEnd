export interface UserDetail {
    user_name: string;
    user_fullname: string;
    user_password: string;
    user_role: string;
    session_id: string;
}

export interface ResultDetail {
    input: string;
    output: string;
}

export interface ProblemDetail {
    ProblemLanguage: string;
    ProblemID: string;
    ProblemName: string;
    ProblemLevel: string;
    ProblemRunAmt: string;
    ProblemDescription: string;
    Input1: String;
    Input2: String;
    Input3: String;
    Output1: String;
    Output2: String;
    Output3: String;
    CaseAmt: string;
    Cases: string;
}