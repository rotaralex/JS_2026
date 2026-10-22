import { http } from '@/shared/api'
import type { User } from '@/shared/model'

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export class AuthService {
  login(username: string, password: string): Promise<LoginResponse> {
    return http<LoginResponse>('/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  getCurrentUser(): Promise<User> {
    return http<User>('/user/me')
  }
}
