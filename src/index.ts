import { routes } from "./routes/routes"
const Sequelize = require('sequelize')
const Hapi = require('@hapi/hapi')


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    // configuration for registering the plugin specified to our db
    await server.register([
        {
            plugin: require('hapi-sequelizejs'),
            options: [
                {
                    name: 'todoDB',
                    models: [__dirname + '/models/sqlModels' ],
                    sequelize: new Sequelize('mysql', 'root', 'supersecretpass', {
                        host: 'localhost',
                        port: 3306,
                        dialect: 'mysql'
                    }),
                    sync: true
                }
            ],
        },
    ]);

    server.route(routes)

    await server.start();

    console.log('Server is now running on %s', server.info.uri);
};


process.on('unhandledRejection', (err) => { 
    console.log(err);
    process.exit(1);
});
init();