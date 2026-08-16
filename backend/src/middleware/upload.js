import multer from 'multer'
import path from 'node:path'
import { config } from '../config/config.js'

const storagePath = path.resolve(config.storage.path)

const upload = multer({
    storage: multer.diskStorage({
        destination: storagePath,
        filename: (req, file, cb) => {
            const extension = file.originalname.split('.').pop()
            cb(null, `${crypto.randomUUID()}.${extension}`)
        },
    }),
    limits: { fileSize: config.storage.maxFileSizeMb * 1024 * 1024 },
})

export default upload
