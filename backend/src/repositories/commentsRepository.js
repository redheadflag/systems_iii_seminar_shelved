import Repository from './repository.js'

class CommentsRepository extends Repository{
    constructor() {
        super("comments")
    }
}

const commentsRepository = new CommentsRepository()

export default commentsRepository
