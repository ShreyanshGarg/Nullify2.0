import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => '/api/users',
    }),
  }),
});

export const { useGetAllUsersQuery } = userApi;
