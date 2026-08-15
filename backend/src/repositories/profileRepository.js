import pool from '../config/db.js'
import Repository from './repository.js'

class ProfileRepository extends Repository{
    constructor() {
        super("profile")
    }

    async getByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE user_id = ?`,
            [userId]
        )
        return rows[0] || null
    }
}


const profileRepository = new ProfileRepository()

export default profileRepository
