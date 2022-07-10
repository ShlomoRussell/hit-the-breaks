import { apiSlice } from "../../app/api/apiSlice";


const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReports: builder.query({
            query: () => "api/reports"
        })
    })
})

export const { useGetReportsQuery } = reportApiSlice;
export default reportApiSlice;
