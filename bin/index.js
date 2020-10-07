#!/usr/bin/env node

const rebroadcaster = require('..')
const yargs = require('yargs')


const options = yargs

    .usage("Usage : [-d <device>] [-p <port>] ...")
    .option("d", {alias : "device", describe : "device to listen to", type : "string", default : 'enp0s31f6'})
    .option("p", {alias : "port", describe : "port for sockets", type : 'number', default : 7000})
    .option("s", {alias : "packet-size", describe : "length of each individual packet", type : 'number', default : 1424})
    .option("c", {alias : "packet-count", describe : "Number of packets per emitted Buffer", type : 'number', default : 131})
    .argv

console.log("Runnig Packet Rebroadcaster, by Ygarasab")
console.log("Listenning to device : ", options.d || 'all')
console.log("Emmitting through port : ", options.p)

rebroadcaster.launchRebroadcaster(options.p, options.d, options.s, options.c)
