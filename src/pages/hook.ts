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
    ProblemExamples: string;
    CaseAmt: string;
    Cases: string;
}