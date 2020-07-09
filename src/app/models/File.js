const db = require('../../config/db')
const fs = require('fs')


module.exports = {
    create({ filename, path, recipes_id }) {
        const query = `
            INSERT INTO files (
                name,
                path,
                recipes_id
            )VALUES ($1,$2,$3)
            RETURNING id
        `

        const values = [
            filename,
            path,
            recipes_id
        ]

        return db.query(query, values)
    },

    delete(id) {

        try {

            const result = db.query(`SELECT * FROM files WHERE id = $1`, [id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)

            return db.query(`
            DELETE FROM files WHERE id = $1
        `, [id])

        } catch (error) {
            console.error(error)
        }


    }
}