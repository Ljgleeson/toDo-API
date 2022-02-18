const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql', 'root', 'supersecretpass', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
} )

/*
module.exports.getAll = async function () {
    try{
        await sequelize.authenticate()
        console.log("Connected")
        const [results, metadata] = await sequelize.query('SELECT * FROM todo')
        console.log(results)

    } catch(err){
        console.log("couldnt connect to database")
    }
}

*/

async function testConnection() {
    
    try{
        await sequelize.authenticate()
        console.log("Connected")
        const [results, metadata] = await sequelize.query('SELECT * FROM todo ORDER BY title ASC')
        console.log(results)
        const [results1, metadata1] = await sequelize.query('DELETE FROM todo WHERE task_id = "affe776e-25c3-4fff-8db5-48c9ebbfaaad"')
        console.log(results1)
        const [results2, metadata2] = await sequelize.query('SELECT * FROM todo')
        console.log(results2)

    } catch(err){
        console.log("couldnt connect to database")
    }
}

testConnection()