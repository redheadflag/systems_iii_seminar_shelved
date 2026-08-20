import { get, post } from "./api"

async function getCard(id, token) {
    return await get(`/cards/${id}`, token)
}

async function getLatestCards(token) {
    return await get('/cards/latest', token)
}

async function createCard({ collection_id, title, description, picture_media_id, is_tradeable }, token) {
    return await post('/cards', { collection_id, title, description, picture_media_id, is_tradeable }, token)
}

export {
    getCard,
    getLatestCards,
    createCard,
}
