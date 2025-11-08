import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBorrow, IBorrowSummary } from "./bookApi";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API}/api/borrow`,
  }),
  tagTypes: ["books","borrow"],
  endpoints: (builder) => ({

    postBorrow: builder.mutation({
          query: (body:IBorrow) => ({
            url: "/",
            method: "POST",
            body,
          }),
          invalidatesTags: ["books", "borrow"],
    }),

    getSummary: builder.query({
        query:()=>({
            url:"/",
            method:"GET",
        }),
         transformResponse: (response: { data: IBorrowSummary[] }) => response.data,
        providesTags: ['borrow']
    })
  }),
});

export const {usePostBorrowMutation, useGetSummaryQuery} = borrowApi;
