import Repository from './repository.js'

class CommentLikesRepository extends Repository{
    constructor() {
        super("comment_likes")
    }
}

const commentLikesRepository = new CommentLikesRepository()

export default commentLikesRepository
