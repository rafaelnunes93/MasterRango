const db = require('../../config/db')
const Base = require('./Base')

Base.init({table: 'recipes'})

module.exports =  {
   ...Base,

   async files(id){
    const results = await db.query(`
        SELECT * FROM files WHERE recipes_id = $1
        `,[id])

    return results.rows
},

async search(params){
    const {filter, category} = params

    let query = "",
        filterQuery = `WHERE`

    if(category){
        filterQuery = `${filterQuery}
        recipes_category_id = ${category}  
        AND `
    }

    filterQuery =`
        ${filterQuery}
        recipes.title ilike '%${filter}%'
        OR recipes.ingredients ilike '%${filter}%'
    `

    
        query = `
            SELECT recipes.*,
            categories.name AS category_name
          FROM recipes
          LEFT JOIN categories ON (categories.id = recipes.category_id)
          ${filterQuery}
        `

        const results = await db.query(query)
        return results.rows
}


}


