#!/usr/bin/env node

const rebroadcaster = require('../rebroadcaster')
const yargs = require('yargs')


const options = yargs

    .usage("Usage : [-d <device>] [-p <port>]")
    .option("d", {alias : "device", describe : "device to listen to", type : "string", default : ''})
    .option("p", {alias : "port", describe : "port for sockets", type : 'number', default : 7000})
    .option("v", {alias : "verbose", boolean : true})
    .argv

console.log("Runnig Packet Broadcaster, from Ygarasab")
console.log("Listenning to device : ", options.d || 'all')
console.log("Emmitting through port :", options.d)

rebroadcaster.launchRebroadcaster(optionsp, options.d, options.v)