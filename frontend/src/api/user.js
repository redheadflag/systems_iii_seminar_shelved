import { get } from "./api"

async function getUser(userId, token) {
    return await get(`/user/${userId}`, token)
}

export {
    getUser,
}
