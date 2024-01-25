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
    ProblemID: string;
    ProblemName: string;
    ProblemLevel: string;
    ProblemRunAmt: string;
    ProblemDescription: string;
    Input1: string;
    Input2: string;
    Input3: string;
    Output1: string;
    Output2: string;
    Output3: string;
    CaseAmt: string;
    Cases: string;
}