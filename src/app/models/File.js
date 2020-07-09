const db = require('../../config/db')


module.exports = {
    create({filename , path , recipes_id}){
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

        return db.query(query,values)
    },
}