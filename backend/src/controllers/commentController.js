import commentsRepository from "../repositories/commentsRepository.js"

async function create(req, res, next) {
    const { comment, card_id } = req.body
    const data = {
        user_id: req.user.id,
        comment,
        card_id
    }

    const commentObj = await commentsRepository.create(data)

    return res.status(201).json(commentObj)
}

export {
    create,
}