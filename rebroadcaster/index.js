const receptor = require("./receptor")
const sockets = require("./sockets")

var mainBuffer = Buffer.from([])



/**
 * @param {Number} port
 * @param {Boolean} live
 * @param {String} binder
 */
const launchRebroadcaster = (port, device) => {

    let websocket = sockets.getSocket(port)
    setInterval(() => emitPacket(websocket) , 1000)
    receptor.listen(device, packet => 
        mainBuffer = Buffer.concat([mainBuffer, packet.subarray(0, 1424)])
    )
}

/**
 * 
 * @param {Server} websocket 
 */
const emitPacket = websocket => {

    process.stdout.write(`${new Date()} ${mainBuffer.length / 1424} packets sent \r`)
    websocket.clients.forEach(
        client => client.send(mainBuffer)
    )
    mainBuffer = Buffer.from([])

}

module.exports = {

    launchRebroadcaster

}
