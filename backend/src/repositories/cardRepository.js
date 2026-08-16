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
}

const cardRepository = new CardRepository()

export default cardRepository
