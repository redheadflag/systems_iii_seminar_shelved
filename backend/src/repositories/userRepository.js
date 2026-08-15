import pool from '../config/db.js';
import Repository from './repository.js';
import profileRepository from './profileRepository.js'

class UserRepository extends Repository{
    constructor() {
        super("user")
    }

    async create(data) {
        const userId = await super.create(data)

        await profileRepository.create({ user_id: userId })

        return userId
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

        return user
    }
}


const userRepository = new UserRepository()

export default userRepository