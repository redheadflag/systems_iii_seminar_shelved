import cardRepository from '../repositories/cardRepository.js'
import collectionRepository from '../repositories/collectionRepository.js'
import profileRepository from '../repositories/profileRepository.js'
import commentsRepository from '../repositories/commentsRepository.js'
import commentLikesRepository from '../repositories/commentLikesRepository.js'
import cardLikesRepository from '../repositories/cardLikesRepository.js'

async function getDetailedCardResponse(card) {
    const comments = await commentsRepository.getByCardId(card.id)
    const cardLikes = await cardLikesRepository.getByCardId(card.id)

    const commentsWithLikes = await Promise.all(
        comments.map(async (comment) => ({
            ...comment,
            likes: await commentLikesRepository.getByCommentId(comment.id),
        }))
    )

    return {
        ...card,
        comments: commentsWithLikes,
        card_likes: cardLikes,
    }
}

async function get(req, res, next) {
    const { id } = req.params

    const card = await cardRepository.get(id)

    if (card === null) {
        return res.status(404).json({
            error: 'Card not found'
        })
    }

    return res.status(200).json(await getDetailedCardResponse(card))
}

async function list(req, res, next) {
    const { collection_id } = req.query

    const cards = collection_id !== undefined
        ? await cardRepository.getByCollectionId(collection_id)
        : await cardRepository.getAll()

    return res.status(200).json(await Promise.all(cards.map(getDetailedCardResponse)))
}

async function create(req, res, next) {
    const { collection_id, title, description, picture_media_id, is_tradeable } = req.body

    const collection = await collectionRepository.get(collection_id)

    if (collection === null) {
        return res.status(404).json({
            error: 'Collection not found'
        })
    }

    const profile = await profileRepository.get(collection.profile_id)

    if (profile.user_id !== req.user.id) {
        return res.status(403).json({
            error: 'Forbidden'
        })
    }

    const data = { collection_id, title }

    if (description !== undefined) data.description = description
    if (picture_media_id !== undefined) data.picture_media_id = picture_media_id
    if (is_tradeable !== undefined) data.is_tradeable = is_tradeable

    const card = await cardRepository.create(data)

    return res.status(201).json(card)
}

async function update(req, res, next) {
    const { id } = req.params

    await cardRepository.update(id, req.data)
    const card = await cardRepository.get(id)

    return res.status(200).json(card)
}

async function remove(req, res, next) {
    const { id } = req.params

    await cardRepository.delete(id)

    return res.status(204).send()
}

export {
    get,
    list,
    create,
    update,
    remove,
    getDetailedCardResponse,
}
