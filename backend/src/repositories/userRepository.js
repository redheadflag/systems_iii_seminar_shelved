import pool from '../config/db.js';
import Repository from './repository.js';
import profileRepository from './profileRepository.js'
import followersRepository from './followersRepository.js'

class UserRepository extends Repository{
    constructor() {
        super("user")
    }

    async create(data) {
        const connection = await pool.getConnection()

        try {
            await connection.beginTransaction()

            const user = await super.create(data, connection)
            await profileRepository.create({ user_id: user.id }, connection)

            await connection.commit()

            return user
        } catch (error) {
            await connection.rollback()
            throw error
        } finally {
            connection.release()
        }
    }

    async getByUsername(username) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE username = ?`,
            [username]
        )
        const user = rows[0] || null

        if (user === null) {
            return null
        }

        user.profile = await profileRepository.getByUserId(user.id)
        user.followers_count = await followersRepository.countFollowers(user.id)
        user.following_count = await followersRepository.countFollowing(user.id)

        return user
    }
}


const userRepository = new UserRepository()

export default userRepository