const sockets = require("./sockets")
const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()
const io = sockets.getSocket(server)

module.exports = {

    /**
     * @param {Number} port
     * @param {String} device
     */
    launchRebroadcaster : (port, device) => {

        receptor.listen(device, packet => io.emit('packet', packet))
        server.listen(port)

    }

}