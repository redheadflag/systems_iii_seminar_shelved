import cardRepository from '../repositories/cardRepository.js'
import collectionRepository from '../repositories/collectionRepository.js'
import { getDetailedCardResponse } from './cardController.js'
import { getDetailedCollectionResponse } from './collectionController.js'

async function search(req, res, next) {
    const { q } = req.query

    const [collections, cards] = await Promise.all([
        collectionRepository.search(q, 3),
        cardRepository.search(q, 3),
    ])

    return res.status(200).json({
        collections: await Promise.all(collections.map(getDetailedCollectionResponse)),
        cards: await Promise.all(cards.map(getDetailedCardResponse)),
    })
}

export {
    search,
}
