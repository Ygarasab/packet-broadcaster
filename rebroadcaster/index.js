const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()

const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 7000 });

/**
 * @param {Number} port
 * @param {Boolean} live
 * @param {String} binder
 * @param {Boolean} verbose
 */
const launchRebroadcaster = (port, live, binder, verbose) => {

    setInterval( crunchPackets, 1000)

    const listener = live ? receptor.listenDevice : receptor.listenPcap
    listener(binder, packet => wss.clients.forEach(
        client => {
            client.send(packet)
        }
    ))
    server.listen(port)

}


module.exports = {

    launchRebroadcaster

}
