const sockets = require("./sockets")
const receptor = require("./receptor")
const http = require("http")

const server = http.createServer()
const io = sockets.getSocket(server)

var c = 0;

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
                process.stdout.write(`Pacotes enviados : ${c}\r`)
         

            }
        })
        server.listen(port)

    }

}
