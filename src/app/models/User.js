const db = require('../../config/db')
const { hash } = require('bcryptjs')
const fs = require ('fs')

const Recipes = require('../models/Recipe')

module.exports = {
    async findOne(filters){
       
        let query = `SELECT * FROM users`

        Object.keys(filters).map(key =>{
            query = `
                ${query}
                ${key}
            `

            Object.keys(filters[key]).map(fields => {
                query = `${query} ${fields} = '${filters[key] [fields]}'`
            })
        })

        const results = await db.query(query)
        return results.rows[0]
    },

    async create(data){
        try {

            const query = `
        INSERT INTO users (
            name,
            email,
            password,
            is_admin
        )VALUES ($1,$2,$3,$4)
        RETURNING id
    `

    const passwordHash = await hash(data.password, 8)

    const values = [
        data.name,
        data.email,
        passwordHash,
        data.is_admin || false
    ]

    const results = await db.query(query,values)
    return results.rows[0].id
    
            
        } catch (error) {
            console.error(error)
        }
    },

    async update(id,fields){
        let query = "UPDATE users SET"

        Object.keys(fields).map((key, index , array) =>{
            if((index +1) < array.length){
                query = `${query}
                    ${key} = '${fields[key]}',
                     `  
                    
            }else{
                    query = `${query}
                        ${key} = '${fields[key]}'
                        WHERE id = ${id}
                         `
            }
        })

        await db.query(query)
        return
    },

    async delete(id){
        //pegar todas as receitas
        let results = await db.query("SELECT * FROM recipes WHERE user_id = $1",[id])
        const recipes = results.rows

        //pegar todas as imagens
            const allFilesPromise = recipes.map(recipe =>
                Recipes.files(recipe.id))

            let promiseResults = await Promise.all(allFilesPromise)

        //remover o usuario
        await db.query('DELETE FROM users WHERE id = $1',[id])


        //remover as  imagens das pastas
        promiseResults.map(results =>{
            results.rows.map(file => {
                try {
                    fs.unlinkSync(file.path)
                } catch (error) {
                    console.error(error)
            }

            })
                
        })       

    }
}