import cardRepository from '../repositories/cardRepository.js'
import collectionRepository from '../repositories/collectionRepository.js'
import profileRepository from '../repositories/profileRepository.js'

export default async function authorizeCardOwner(req, res, next) {
    const { id } = req.params

    const card = await cardRepository.get(id)

    if (card === null) {
        return res.status(404).json({
            error: 'Card not found',
        })
    }

    const collection = await collectionRepository.get(card.collection_id)
    const profile = await profileRepository.get(collection.profile_id)

    if (profile.user_id !== req.user.id) {
        return res.status(403).json({
            error: 'Forbidden',
        })
    }

    req.card = card
    req.collection = collection

    next()
}
