import { post } from "./api"

async function createCard({ collection_id, title, description, picture_media_id, is_tradeable }, token) {
    return await post('/cards', { collection_id, title, description, picture_media_id, is_tradeable }, token)
}

export {
    createCard,
}
