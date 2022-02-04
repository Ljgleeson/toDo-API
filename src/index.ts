import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { getRoutes } from "../routes/routes"

export let server: Server


const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });


    getRoutes()

    await server.start();
    console.log('I am in index.ts! Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
