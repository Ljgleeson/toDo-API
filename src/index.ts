import { Server, Request, ResponseToolkit } from "@hapi/hapi";
const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'Hello World!';
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();


/*
src directory will contain all typescript code
dist directory will contain all javascript code compiled from typescript 
typescript looks for a file named tsconfig.json contains the specifications of how the root file and compiler options required to compile the project
    outDir is set to ./dist so compiler saves compiled files into the dist directory 
added start and compile script to package.json so i dont have to manually recompile source code after every edit
-can just use  npm start 
*/