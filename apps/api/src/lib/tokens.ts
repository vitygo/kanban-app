import jwt from 'jsonwebtoken'

const ACCESS_EXPIRES = '15m'
const REFRESH_EXPIRES = '7d'

export const signAccessToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: ACCESS_EXPIRES,
  })

export const signRefreshToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: REFRESH_EXPIRES,
  })

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { userId: string }