import { cookies } from 'next/headers';
import { User } from '@/types/user';
import { nextServer } from './api';
import { AxiosResponse } from 'axios';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async (
  params: FetchNotesParams
) => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (
  id: string
) => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get(
    `/notes/${id}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  return data;
};


export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const response: AxiosResponse<User> = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};


export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};