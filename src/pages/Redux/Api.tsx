import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ProblemDetail,UserDetail } from "./hook"

const BACKEND_API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export const problemsApi = createApi({
    reducerPath: "problemsApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_API_ENDPOINT}`}),
    endpoints: (builder) => ({
        Problems: builder.query<ProblemDetail[], void>({
            query: () => "Problems",
        }),
        CurrentProblem: builder.query<ProblemDetail, string>({
            query: (problemID) => `currentProblem/${problemID}`,
        }),
        AddProblem: builder.mutation<void, ProblemDetail>({
            query: (problem) => ({
                url: '/SaveToDatabase',
                method: "POST",
                body: problem
            })
        }),
        DeleteProblem: builder.mutation<void, string>({
            query: (currentProblemID) => ({
                url: `/deleteProblems`,
                method: 'POST',
                body: {
                    ProblemID: currentProblemID
                }
            })
        })
    })
})

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_API_ENDPOINT}`}),
    endpoints: (builder) => ({
        Users: builder.query<UserDetail[], void>({
            query: () => "users",
        }),
        DeleteUser: builder.mutation<void, String>({
            query: (username) => ({
                url: '/deleteUser',
                method: "POST",
                body: {
                    userNameToDelete: username
                }
            })
        })
    })
})

export const { 
    useProblemsQuery, 
    useCurrentProblemQuery,
    useAddProblemMutation,
    useDeleteProblemMutation,
} = problemsApi;

export const {
    useUsersQuery,
    useDeleteUserMutation,
} = userApi;