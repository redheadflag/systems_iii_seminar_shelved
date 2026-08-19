import pool from '../config/db.js'
import Repository from './repository.js'

class FollowersRepository extends Repository{
    constructor() {
        super("followers")
    }

    async countFollowers(userId) {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS followerscount FROM ${this.table} WHERE user_id = ?`,
            [userId]
        )
        return rows[0].followerscount
    }

    async countFollowing(userId) {
        const [rows] = await pool.query(
            `SELECT COUNT(*) AS followingcount FROM ${this.table} WHERE follower_id = ?`,
            [userId]
        )
        return rows[0].followingcount
    }
}

const followersRepository = new FollowersRepository()

export default followersRepository
