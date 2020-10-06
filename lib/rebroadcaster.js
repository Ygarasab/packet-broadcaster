const receptor = require("./receptor")
const bb = require('buffer-broadcaster')

/**
 * @param {Number} port
 * @param {String} device
 * @param {Number} packetSize
 * @param {Number} packetsPerBatch
 */
const launchRebroadcaster = (port, device, packetSize, packetsPerBatch) => {

    let packetCount = 0
    let broadcaster = bb.launchBroadcaster(port)

    receptor.listen(device, packet => {

        packetCount++
        broadcaster.appendBuffer(packet.subarray(0, packetSize))

        if(packetCount == packetsPerBatch){
            broadcaster.broadcast()
            packetCount = 0
        }
    })
}

module.exports = {

    launchRebroadcaster

}
