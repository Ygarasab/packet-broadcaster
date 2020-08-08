const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 7000, perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed.
  }});

var ps = Buffer.from([])

wss.on('connection', ws => {
    console.log('hi')

})

/**
 * @param {Number} port
 * @param {Boolean} live
 * @param {String} binder
 * @param {Boolean} verbose
 */
const launchRebroadcaster = (port, binder, verbose) => {

setInterval(() => {
 
    console.log(new Date())
    wss.clients.forEach(
        client => {
            
            client.send(ps)
        }
    )

ps = Buffer.from([])

}, 1000)

    receptor.listenDevice(binder, packet => {
    ps = Buffer.concat([ps, packet.subarray(0, 1424)])
})
}


module.exports = {

    launchRebroadcaster

}
