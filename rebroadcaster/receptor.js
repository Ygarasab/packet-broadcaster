const pcap = require('pcap')
const pcapp = require('pcap-parser')

module.exports = {

    /**
     * @param {String} device
     * @param { (packet : Buffer) => {}} callback
     */

    listenDevice : (device, callback) => {
            
            pcap.createSession(device || '')
            .on(
                'packet', 
                /**
                 * @param {{buf : Buffer}} packet
                 */
                packet => callback(packet.buf) 
            )        

    },

    /**
     * @param {String} filepath
     * @param { (packet : Buffer) => {}} callback
     */
    listenPcap : (filepath, callback) => {

        pcapp.parse(filepath)
        
        .on(
            'packet', 
            /**
             * @param {{data : Buffer}} packet
             */
            packet => callback(packet.data) 
        )        

    }
}