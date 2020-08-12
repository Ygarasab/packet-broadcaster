# packet-rebroadcaster

A node.js library for rebroadcasting packets received from local capturing through WebSockets

## Description

This library was written with the only goal of facilitating packet gathering for the Teccon II project, but its arguments utility manages to make the module quite flexible and useful.

So, what it does, it listens (using the node-pcap module) to a local device that's receiving info in the form of packets, mostly through ethernet; and then it rebroadcasts that data through a WebSocket Server, in the form of a `Buffer`.

Notice that the developer can define the size of each packet and how many packets will be sent in each buffer broadcasted by the server

## Instalation

Initialy, this library was thought to be used as a CLI. So it's likely for you to want to install it like that

`npm i -g packet-rebroadcaster`

That way, you are able to use it as CLI.

But, of course, if you want to use it as dependency, you can go with

`npm i packet-rebroadcaster`

## Using the CLI

Once you install the package globally in your machine, you will be able to execute it from the terminal. Notice that, since this code tries to reach your network devices, you might run it with admin privileges. 

The `rebroadcast-packets` command has the following usage specs :

```
Usage : [-d <device>] [-p <port>] ...

Opções:
  --help              shows help                                        [boolean]
  --version           shows version                                     [boolean]
  -d, --device        device to listen to                  [string] [default: ""]
  -p, --port          port for sockets                   [number] [default: 7000]
  -s, --packet-size   length of each individual packet   [number] [default: 1424]
  -c, --packet-count  Number of packets per emitted Buffer[number] [default: 131]
```

So in order to broadcast packets you are getting from your loopback through your port 5000, you would do somethig like that:

`rebroadcast-packets -d lo -p 5000` 