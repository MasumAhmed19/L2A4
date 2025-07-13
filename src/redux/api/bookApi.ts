import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IBook {
    _id: string;
    title:string,
    author:string,
    genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn:string,
    description?:string,
    copies:number,
    available:boolean,
    createdAt:string,
    updatedAt:string
}


export interface IBorrow {
    book : string,
    quantity: number,
    dueDate: Date
}



export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API}/api/books`,
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({

    getAllBooks: builder.query<IBook[], void>({
        query: ()=>({
            url:'',
            method: 'GET',
        }),
        transformResponse: (response: { data: IBook[] }) => response.data,
        providesTags: ['books', "borrow"]
    }),

    getBookById: builder.query<IBook, string>({
        query:(id:string)=>({
            url:`/${id}`,
            method:'GET'
        }),
        transformResponse: (response: { data: IBook }) => response.data,
        providesTags: ['books']
    }),

    postBook: builder.mutation({
      query: (body:IBook) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),

    delBook: builder.mutation({
      query: (id:string)=>({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
     
    updateBook: builder.mutation<IBook, {id:string, body:IBook}>({
      query:({id, body})=>({
        url:`/${id}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["books"],

    })

  }),
});

export const {usePostBookMutation, useGetAllBooksQuery, useGetBookByIdQuery, useDelBookMutation, useUpdateBookMutation} = bookApi;
