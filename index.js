const Hapi = require('@hapi/hapi');

/*
initalize a new happy server
async and await enable asynchronous, promise based behavior to be written in a cleaner style,
avoiding the need to explicity configure promise chains 
promise: object representing the eventual completion or failure of an asynchronous operation
*/
const init = async () => {
    //connection details about server
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',                  //any valid HTTP method, array of HTTP methods, or an asterisk to allow any method
        path: '/',                      //defines the path including parameters. Can include optional parameters, numbered parameters, and even wildcards.
        handler: (request, h) => {         //performs main BUSINESS LOGIC of the route and sees the response
            return 'Hello World!';        //must return a value, promise, or throw an error 
        }
    })

    await server.start();                                           //start server
    console.log('Server running on %s', server.info.uri);           //log that shows its running 

};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();