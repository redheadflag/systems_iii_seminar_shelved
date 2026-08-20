import { post } from "./api"

async function createComment({ card_id, user_id, comment }, token) {
    return await post('/comments', { card_id, user_id, comment }, token)
}

export {
    createComment,
}
