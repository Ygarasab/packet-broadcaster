const sockets = require("./sockets")
const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()
const io = sockets.getSocket(server)

const c = 0;

module.exports = {

    /**
     * @param {Number} port
     * @param {String} device
     */
    launchRebroadcaster : (port, device, verbose) => {

        

        receptor.listen(device, packet =>{
            io.emit('packet', packet)
            if(verbose){
                c++
                console.log("\rPacotes enviados : " + c)
            }
        })
        server.listen(port)

    }

}