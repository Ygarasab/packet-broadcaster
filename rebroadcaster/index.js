const receptor = require("./receptor")
const sockets = require("./sockets")

var mainBuffer = Buffer.from([])

var pcap_session
var dropped = 0

/**
 * @param {Number} port
 * @param {Boolean} live
 * @param {String} binder
 */
const launchRebroadcaster = (port, device) => {

    let c = 0

    let websocket = sockets.getSocket(port)
    //setInterval(() => emitPacket(websocket) , 1500)
    pcap_session = receptor.listen(device, packet => {
        c++
        mainBuffer = Buffer.concat([mainBuffer, packet.subarray(0, 1424)])
        if(c == 131){
            emitPacket(websocket)
c = 0
        }
    }
    )
}

/**
 * 
 * @param {Server} websocket 
 */
const emitPacket = websocket => {
    
let nc = 0
    websocket.clients.forEach(
        client => {client.send(mainBuffer)
nc++
}    )
    mainBuffer = Buffer.from([])
process.stdout.write(`[ ${new Date().toLocaleTimeString()} ] ${mainBuffer.length / 1424} packets sent to ${nc} listeners \r`)

}

module.exports = {

    launchRebroadcaster

}
