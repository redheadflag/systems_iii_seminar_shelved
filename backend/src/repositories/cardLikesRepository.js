import pool from '../config/db.js'
import Repository from './repository.js'

class CardLikesRepository extends Repository{
    constructor() {
        super("card_likes")
    }

    async getByCardId(cardId) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE card_id = ?`,
            [cardId]
        )
        return rows
    }
}

const cardLikesRepository = new CardLikesRepository()

export default cardLikesRepository
