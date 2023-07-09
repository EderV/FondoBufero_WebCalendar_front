export interface UserLogin {
  username: string,
  password: string
}

export interface UserToken {
  userId: string,
  accessToken: string,
  sessionExpiration: number
}

export interface UserStorage {
  userId: string,
  accessToken: string,
  loginDate: Date,
  sessionExpirationDate: Date
}
