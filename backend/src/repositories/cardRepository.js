import pool from '../config/db.js'
import Repository from './repository.js'

class CardRepository extends Repository{
    constructor() {
        super("card")
    }

    async getByCollectionId(collectionId) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE collection_id = ?`,
            [collectionId]
        )
        return rows
    }

    async getLatest(limit) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} ORDER BY created_at DESC LIMIT ?`,
            [limit]
        )
        return rows
    }

    async search(term, limit) {
        const searchPattern = `%${term}%`
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ?`,
            [searchPattern, searchPattern, limit]
        )
        return rows
    }
}

const cardRepository = new CardRepository()

export default cardRepository
