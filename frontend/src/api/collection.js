import { get, post } from "./api"

async function getCollectionsByUserId(userId, token) {
    return await get(`/collections/user/${userId}`, token)
}

async function createCollection({ name, description, is_public }, token) {
    return await post('/collections', { name, description, is_public }, token)
}

export {
    getCollectionsByUserId,
    createCollection,
}
