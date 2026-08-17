import { get } from "./api"

async function getCollectionsByUserId(userId, token) {
    return await get(`/collections/user/${userId}`, token)
}

export {
    getCollectionsByUserId,
}
