const { Server } = require('ws');

module.exports = {

    /**
     * @param {Number} port
     * @returns {Server}
     */
    getSocket : port => {
        
        const wss = new Server({ port, perMessageDeflate: {
            zlibDeflateOptions: {
            chunkSize: 1024,
            memLevel: 7,
            level: 3
            },
            zlibInflateOptions: {
            chunkSize: 10 * 1024
            },
            clientNoContextTakeover: true,
            serverNoContextTakeover: true,
            serverMaxWindowBits: 10,
            concurrencyLimit: 10,
            threshold: 1024
        }});

        wss.on('connection', _ => {
            console.log('Someone just started listening')
        })

        return wss
    }

}