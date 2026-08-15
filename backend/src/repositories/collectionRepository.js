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
}

const collectionRepository = new CollectionRepository()

export default collectionRepository
