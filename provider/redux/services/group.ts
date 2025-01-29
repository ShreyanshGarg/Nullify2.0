import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["GetGroups"],
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (payload) => ({
        url: `group`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["GetGroups"],
    }),
    fetchGroup: builder.query({
      query: (userId: string) => ({
        url: `/group/${userId}`,
        method: "GET",
      }),
      providesTags: ["GetGroups"],
    }),
  }),
});

export const { useCreateGroupMutation, useFetchGroupQuery } = groupApi;
