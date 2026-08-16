import path from 'node:path'
import mediaRepository from '../repositories/mediaRepository.js'
import { config } from '../config/config.js'

async function get(req, res, next) {
    const { id } = req.params

    const media = await mediaRepository.get(id)

    if (media === null) {
        return res.status(404).json({
            error: 'Media not found'
        })
    }

    return res.sendFile(path.resolve(config.storage.path, media.file_path))
}

async function create(req, res, next) {
    if (!req.file) {
        return res.status(400).json({
            error: 'No file uploaded'
        })
    }

    const media = await mediaRepository.create({
        user_id: req.user.id,
        file_path: req.file.filename,
    })

    return res.status(201).json(media)
}

export {
    get,
    create,
}
