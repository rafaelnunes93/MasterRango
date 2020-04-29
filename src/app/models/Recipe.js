const db = require('../../config/db')


module.exports = {
    create(data){
        const query = `
            INSERT INTO recipes (
                category_id,
                user_id,
                title,
                ingredients,
                preparation,
                description,
                quantity,
                time,
                status
            )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
        `

        const values = [
            data.category_id,
            2,
            data.title,
            data.ingredients,
            data.preparation,
            data.description,
            data.quantity,
            data.time,
            data.status,
        ]

        return db.query(query,values)
    }
}