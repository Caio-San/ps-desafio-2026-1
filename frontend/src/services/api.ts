import { auth } from '@/auth'
import { isServerSide } from '@/lib/is-server-side'
import axios, { AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

function firstItemToObject(
  obj: Record<string, string[]>,
): Record<string, string> {
  const newObj: Record<string, string> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = obj[key][0]
    }
  }
  return newObj
}

export type ResponseErrorType = {
  message: string
  status: number
  errors: {
    [key: string]: string
  }
}

export class ResponseError extends Error implements ResponseErrorType {
  errors: {
    [key: string]: string
  }

  status: number

  constructor(
    message: string,
    errors: {
      [key: string]: string
    },
    status: number,
  ) {
    super(message)
    this.errors = errors
    this.status = status
  }
}

const baseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
})

baseApi.interceptors.request.use(async (config) => {
  let token = null
  if (isServerSide()) {
    const session = await auth()
    token = session?.user?.token
  } else {
    const session = await getSession()
    token = session?.user?.token
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

baseApi.interceptors.response.use(
  (response) => response.data,
  async (error) => {

    if (error.response) {
      const { status, data } = error.response;

      if (status === 422 && data.errors) {
        const errors = firstItemToObject(data.errors);
        throw new ResponseError(data.message || "Erro de validação", errors, status);
      }

      throw new ResponseError(data.message || "Erro no servidor", {}, status);
    }

  
    throw new ResponseError("Falha na conexão com o servidor", {}, 500);
  },
)

export async function api<T = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  config?: AxiosRequestConfig,
) {
  try {
   
    const isFormData = config?.data instanceof FormData;

    const response = await baseApi.request<T>({
      method,
      url,
      ...config,
      headers: {
        ...config?.headers,
        
        ...(isFormData ? { 'Content-Type': 'multipart/form-data' } : {}),
      },
    })
    return { response: response as T, error: undefined }
  // api.ts
  } catch (e) {
    const error = e as ResponseErrorType;

  
    if (error.status === 401 || error.status === 403) {
      if (isServerSide()) redirect('/auth/sign-out');
      else window.location.href = '/auth/sign-out';
    }

    return { 
      response: undefined, 
      error: {
        message: error.message || "Erro inesperado",
        status: error.status || 500,
        errors: error.errors || {}
      } 
    };
  }
}
