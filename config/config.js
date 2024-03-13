import { config } from 'dotenv';

config()

export const PORT_RESTSERVER = process.env.PORT || 3000

export const MONGODB_ATLAS = process.env.MONGODB_ATLAS
export const MONGODB_LOCAL = process.env.MONGODB_LOCAL

export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID