import pool from '../config/db.js'

export default class Repository {
    constructor(table) {
        this.table = table
    }

    async getById(id) {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [id]
          )
          return rows[0] || null
    }

    async getAll() {
        const [rows] = await pool.query(
            `SELECT * FROM ${this.table}`
        )

        return rows
    }

    async create(data) {
        const columns = Object.keys(data)
        const values = Object.values(data)
        const placeholders = columns.map(() => "?").join(", ")

        const [result] = await pool.query(
            `INSERT INTO ${this.table}
             (${columns.join(", ")})
             VALUES (${placeholders})`,
            values
        )

        return result.insertId
    }

    async update(id, data) {
        const columns = Object.keys(data)
        const values = Object.values(data)

        const assignments = columns
            .map(column => `${column} = ?`)
            .join(", ")

        const [result] = await pool.query(
            `UPDATE ${this.table}
             SET ${assignments}
             WHERE id = ?`,
            [...values, id]
        )

        return result.affectedRows
    }

    async delete(id) {
        const [result] = await pool.query(
            `DELETE FROM ${this.table}
             WHERE id = ?`,
            [id]
        )

        return result.affectedRows
    }
}