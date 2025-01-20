import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Friendship"],
  endpoints: (builder) => ({
    searchUserByEmail: builder.query({
      query: (email: string) => ({
        url: `users/search?email=${email}`,
        method: "GET",
      }),
    }),
    createFriendship: builder.mutation({
      query: ({ user_id1, user_id2 }) => ({
        url: `friends`,
        method: "POST",
        body: { user_id1, user_id2 },
      }),
      invalidatesTags: ["Friendship"],
    }),
    fetchFriendship: builder.query({
      query: (userId: string) => ({
        url: `/friends?userId=${userId}`,
        method: "GET",
      }),
      providesTags: ["Friendship"], 
    }),
    acceptFriendship: builder.mutation({
      query: ({ user_id1, user_id2 }: { user_id1: string; user_id2: string }) => ({
        url: `/friends/accepted`,
        method: "POST",
        body: { user_id1, user_id2 },
      }),
      invalidatesTags: ["Friendship"], 
    }),
    declineFriendship: builder.mutation({
      query: ({ user_id1, user_id2 }: { user_id1: string; user_id2: string }) => ({
        url: `/friends/declined`,
        method: "POST",
        body: { user_id1, user_id2 },
      }),
      invalidatesTags: ["Friendship"], 
    }),
    fetchFriendById: builder.query({
      query: (friendId: string) => ({
        url: `friends/${friendId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazySearchUserByEmailQuery,
  useCreateFriendshipMutation,
  useFetchFriendshipQuery, 
  useAcceptFriendshipMutation,
  useDeclineFriendshipMutation,
  useFetchFriendByIdQuery
} = authApi;
