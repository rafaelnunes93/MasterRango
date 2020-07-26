const faker = require('faker')
const {hash} = require('bcryptjs');

const User = require('./src/app/models/User')
const Recipe = require('./src/app/models/Recipe');
const File = require('./src/app/models/File');


let usersIds = [];
let totalRecipes = 20;
let totalUsers = 5;

async function  createUsers() {
    const users = [];
    const password =  await hash('123',8);

    while(users.length < totalUsers){
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
        });
    }
    const usersPromisse = users.map(user => User.create(user));

    usersIds = await Promise.all(usersPromisse)
}


async function createRicepe (){

    let recipes = []

    while(recipes.length < totalRecipes){
        recipes.push({
            category_id:Math.ceil(Math.random() * 3),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            title: faker.commerce.productName(),
            ingredients: faker.commerce.productMaterial() ,
            preparation: faker.commerce.lines(),
            description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
            quantity: faker.random.number(99),
            time: faker.random.number(99),
            status:Math.round(Math.random()),
        })
    }

    const recipesPromise = recipes.map(recipes => Recipes.create(recipes))
    recipesIds = await Promise.all(recipesPromise);

    let files = []

    while(files.length < 50){
        files.push({
            name: faker.image.image(),
            path: `public/images/placeholder.png`,
            recipes_id: recipesIds[Math.floor(Math.random() * totalRecipes)]
        })
    }

    const filesPromise = files.map(file => File.create(file))

    await Promise.all(filesPromise) 

}


async function init(){
    await createUsers();
    await createRicepe();
}

init();