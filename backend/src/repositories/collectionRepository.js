import pool from '../config/db.js'
import Repository from './repository.js'

class CollectionRepository extends Repository{
    constructor() {
        super("collection")
    }

    async getByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT c.* FROM ${this.table} c
             JOIN profile p ON c.profile_id = p.id
             WHERE p.user_id = ?`,
            [userId]
        )
        return rows
    }

    async search(term, limit) {
        const pattern = `%${term}%`
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE name LIKE ? OR description LIKE ? ORDER BY created_at DESC LIMIT ?`,
            [pattern, pattern, limit]
        )
        return rows
    }
}

const collectionRepository = new CollectionRepository()

export default collectionRepository
