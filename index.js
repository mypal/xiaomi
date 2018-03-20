const dgram = require('dgram'),
    server = dgram.createSocket("udp4"),
    multicastAddr = '224.0.0.50',
    port = 4321;

server.on("error",err=>{
    console.log('socket已关闭');
})

server.on('error',(err)=>{
    console.log(err);
});

server.on("listening",()=>{
    console.log("socket正在监听中.....");
    server.addMembership(multicastAddr);
    server.setMulticastTTL(128);
    sendMsg();
    setTimeout(sendMsg2, 1000);
})

server.on('message',(msg,rinfo)=>{
    console.log(`msg from client ${rinfo.address}:${rinfo.port}`);
    console.log(msg.toString());
});

function sendMsg(){
    server.send('{"cmd":"whois"}',port,multicastAddr);
}

function sendMsg2() {
    server.send('{"cmd" : "get_id_list"}', 9898, '192.168.2.30');
}
server.bind(44321);
