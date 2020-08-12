const receptor = require("./receptor")
const sockets = require("./sockets")

var mainBuffer = Buffer.from([])

/**
 * @param {Number} port
 * @param {String} device
 * @param {Number} packetSize
 * @param {Number} packetsPerBatch
 */
const launchRebroadcaster = (port, device, packetSize, packetsPerBatch) => {

    let packetCount = 0
    let websocket = sockets.getSocket(port)
    receptor.listen(device, packet => {
        packetCount++
        mainBuffer = Buffer.concat([mainBuffer, packet.subarray(0, packetSize)])
        if(packetCount == packetsPerBatch){
            emitPacket(websocket)
            packetCount = 0
        }
    })
}

/**
 * 
 * @param {Server} websocket 
 */
const emitPacket = websocket => {
    
    websocket.clients.forEach( client => client.send(mainBuffer))
    process.stdout.write(`[ ${new Date().toLocaleTimeString()} ] ${mainBuffer.length / 1424} packets sent to ${websocket.clients.size} listeners \r`)
    mainBuffer = Buffer.from([])
   

}

module.exports = {

    launchRebroadcaster

}
