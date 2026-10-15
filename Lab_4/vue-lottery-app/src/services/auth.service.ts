import { http } from '@/api/http-client'
import type { LoginResponse } from '@/types/auth'
import type { User } from '@/types/user'

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
