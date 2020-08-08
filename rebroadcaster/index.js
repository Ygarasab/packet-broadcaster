const sockets = require("./sockets")
const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()
const io = sockets.getSocket(server)

const packetSize = 1424
var receivedPackets = []

/**
 * @param {Number} port
 * @param {Boolean} live
 * @param {String} binder
 * @param {Boolean} verbose
 */
const launchRebroadcaster = (port, live, binder, verbose) => {

    setInterval( crunchPackets, 1000)

    const listener = live ? receptor.listenDevice : receptor.listenPcap
    listener(binder, packet => receivedPackets.push(packet.subarray(0, packetSize)))
    server.listen(port)

}

const crunchPackets = () => {

    let donePacket = [...receivedPackets]
    console.log(donePacket.length)
    receivedPackets = []
    io.emit('packet', donePacket)

}

module.exports = {

    launchRebroadcaster

}
