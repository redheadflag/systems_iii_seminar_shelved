import collectionRepository from '../repositories/collectionRepository.js'
import profileRepository from '../repositories/profileRepository.js'

export default async function authorizeCollectionOwner(req, res, next) {
    const { id } = req.params

    const collection = await collectionRepository.get(id)

    if (collection === null) {
        return res.status(404).json({
        error: 'Collection not found',
        })
    }

    const profile = await profileRepository.get(collection.profile_id)

    if (profile.user_id !== req.user.id) {
        return res.status(403).json({
            error: 'Forbidden',
        })
    }

    req.collection = collection

    next()
}
