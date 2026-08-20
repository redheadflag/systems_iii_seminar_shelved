import { get } from "./api"

async function search(query, token) {
    return await get(`/search?q=${encodeURIComponent(query)}`, token)
}

export {
    search,
}
