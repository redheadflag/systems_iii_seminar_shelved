import cardRepository from '../repositories/cardRepository.js'
import collectionRepository from '../repositories/collectionRepository.js'
import profileRepository from '../repositories/profileRepository.js'
import { getDetailedCardResponse } from './cardController.js'

async function getDetailedCollectionResponse(collection) {
    const cards = await cardRepository.getByCollectionId(collection.id)

    return {
        ...collection,
        cards: await Promise.all(cards.map(getDetailedCardResponse)),
    }
}

async function get(req, res, next) {
    const { id } = req.params

    const collection = await collectionRepository.get(id)

    if (collection === null) {
        return res.status(404).json({
            error: 'Collection not found'
        })
    }

    return res.status(200).json(await getDetailedCollectionResponse(collection))
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

    return res.status(200).json(await Promise.all(collections.map(getDetailedCollectionResponse)))
}

async function create(req, res, next) {
    const { name, description, is_public } = req.body

    const profile = await profileRepository.getByUserId(req.user.id)

    if (profile === null) {
        return res.status(404).json({
            error: 'User not found'
        })
    }

    const data = { profile_id: profile.id, name }

    if (description !== undefined) data.description = description
    if (is_public !== undefined) data.is_public = is_public

    const collection = await collectionRepository.create(data)

    return res.status(201).json(collection)
}

async function update(req, res, next) {
    const { id } = req.params

    await collectionRepository.update(id, req.data)
    const collection = await collectionRepository.get(id)

    return res.status(200).json(collection)
}

async function remove(req, res, next) {
    const { id } = req.params

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
