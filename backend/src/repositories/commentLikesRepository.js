import pool from '../config/db.js'
import Repository from './repository.js'

class CommentLikesRepository extends Repository{
    constructor() {
        super("comment_likes")
    }

    async getByCommentId(commentId) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE comment_id = ?`,
            [commentId]
        )
        return rows
    }
}

const commentLikesRepository = new CommentLikesRepository()

export default commentLikesRepository
