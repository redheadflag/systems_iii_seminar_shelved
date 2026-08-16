import pool from '../config/db.js'
import Repository from './repository.js'

class CommentsRepository extends Repository{
    constructor() {
        super("comments")
    }

    async getByCardId(cardId) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE card_id = ?`,
            [cardId]
        )
        return rows
    }
}

const commentsRepository = new CommentsRepository()

export default commentsRepository
