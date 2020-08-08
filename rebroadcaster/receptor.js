const pcap = require('pcap')

module.exports = {

    /**
     * @param {String} device
     * @param { (packet : Buffer) => {}} callback
     */

    listen : (device, callback) => {
            
            pcap.createSession(device || '')
            .on(
                'packet', 
                /**
                 * @param {{buf : Buffer}} packet
                 */
                packet => callback(packet.buf) 
            )        

    },

}