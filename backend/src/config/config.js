import dotenv from "dotenv"

dotenv.config()

export const config = Object.freeze({
    port: process.env.PLAIN_BACKEND_PORT,

    minPasswordLength: Number(process.env.MIN_PASSWORD_LENGTH),

    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
    },

    storage: {
        path: process.env.STORAGE_PATH,
        maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB),
    },

    cors: {
        origin: process.env.CORS_ORIGIN,
    },
})
