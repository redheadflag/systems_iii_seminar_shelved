import collectionRepository from '../repositories/collectionRepository.js'
import profileRepository from '../repositories/profileRepository.js'

async function get(req, res, next) {
    const { id } = req.params

    const collection = await collectionRepository.get(id)

    if (collection === null) {
        return res.status(404).json({
            error: 'Collection not found'
        })
    }

    return res.status(200).json(collection)
}

async function getByUserId(req, res, next) {
    const { userId } = req.params

    const profile = await profileRepository.getByUserId(userId)

    if (profile === null) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    const collections = await collectionRepository.getByUserId(userId)

    return res.status(200).json(collections)
}

async function create(req, res, next) {
    const { user_id, name, description, is_public } = req.body

    if (Number(user_id) !== req.user.id) {
        return res.status(403).json({
            error: "You can only create collections for yourself"
        })
    }

    const profile = await profileRepository.getByUserId(user_id)

    if (profile === null) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    const data = { profile_id: profile.id, name }

    if (description !== undefined) data.description = description
    if (is_public !== undefined) data.is_public = is_public

    const id = await collectionRepository.create(data)
    const collection = await collectionRepository.get(id)

    return res.status(201).json(collection)
}

async function update(req, res, next) {
    const { id } = req.params

    const existing = await collectionRepository.get(id)

    if (existing === null) {
        return res.status(404).json({
            error: 'Collection not found'
        })
    }

    const profile = await profileRepository.get(existing.profile_id)

    if (profile.user_id !== req.user.id) {
        return res.status(403).json({
            error: "You can only update your own collections"
        })
    }

    const { name, description, is_public } = req.body
    const data = {}

    if (name !== undefined) data.name = name
    if (description !== undefined) data.description = description
    if (is_public !== undefined) data.is_public = is_public

    await collectionRepository.update(id, data)
    const collection = await collectionRepository.get(id)

    return res.status(200).json(collection)
}

async function remove(req, res, next) {
    const { id } = req.params

    const existing = await collectionRepository.get(id)

    if (existing === null) {
        return res.status(404).json({
            error: 'Collection not found'
        })
    }

    const profile = await profileRepository.get(existing.profile_id)

    if (profile.user_id !== req.user.id) {
        return res.status(403).json({
            error: "You can only delete your own collections"
        })
    }

    await collectionRepository.delete(id)

    return res.status(204).send()
}

export {
    get,
    getByUserId,
    create,
    update,
    remove,
}
