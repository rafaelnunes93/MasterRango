const db = require('../../config/db')
const { FileSystemLoader } = require('nunjucks')


module.exports = {

    all(){
        return db.query(`
            SELECT * FROM recipes 
            ORDER BY created_at DESC 
        `)
    },

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
                status,
                dificulty
            )VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            RETURNING id
        `

        const values = [
            data.category_id,
            data.user_id || 1,
            data.title,
            data.ingredients,
            data.preparation,
            data.description,
            data.quantity,
            data.time,
            data.status || 0,
            data.dificulty

        ]

        return db.query(query,values)
    },

    find(id){
        return db.query('SELECT * FROM recipes WHERE id = $1',[id])
    },

    update(data){
        const query = `
            UPDATE recipes SET
                category_id=($1),
                title=($2),
                ingredients=($3),
                preparation=($4),
                description=($5),
                quantity=($6),
                time=($7),
                status=($8),
                dificulty=($9)
            WHERE id = $10    
        `

        const values = [
            data.category_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.description,
            data.quantity,
            data.time,
            data.status,
            data.dificulty,
            data.id
        ]

        return db.query(query,values)

    },

    delete(id){
        return db.query('DELETE FROM recipes WHERE id = $1',[id] )
    },

    files(id){
        return db.query(`
            SELECT * FROM files WHERE recipes_id = $1
            `,[id])
    }
}