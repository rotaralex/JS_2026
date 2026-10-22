import type { User } from '../entities/user/model/user'

export interface LoginResponse extends User {
  accessToken: string
  refreshToken: string
}
