import pool from '../config/db.js';
import Repository from './repository.js';

class UserRepository extends Repository{
    constructor() {
        super("user")
    }
    
    async getByUsername(username) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE username = ?`,
            [username]
        )
        return rows[0] || null
    }
}


const userRepository = new UserRepository()

export default userRepository