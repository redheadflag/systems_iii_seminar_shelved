import { get } from "./api"

async function getUser(userId, token) {
    return await get(`/user/${userId}`, token)
}

async function getUserByUsername(username, token) {
    return await get(`/user/username/${username}`, token)
}

export {
    getUser,
    getUserByUsername,
}
