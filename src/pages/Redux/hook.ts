export interface UserDetail {
    user_name: string;
    user_tag: string;
    user_password: string;
    user_role: string;
    session_id: string;
}

export interface ResultDetail {
    input: string;
    output: string;
}

export interface EachProblem {
    ProblemName: string;
    ProblemID: string;
}

export interface ProblemDetail {
    ProblemID: string;
    ProblemName: string;
    ProblemLevel: string;
    ProblemDescription: string;
    Cases: string;
}

export interface LabDetail {
    LabName: string;
}

export interface LabProgress {
    user_name: string;
    [problemID: string]: string; 
}