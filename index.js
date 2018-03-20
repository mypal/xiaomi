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
    // setInterval(()=>{
    //     sendMsg();
    // },1500)
})

server.on('message',(msg,rinfo)=>{
    console.log(`msg from client ${rinfo.address}:${rinfo.port}`);
    console.log(msg);
});

function sendMsg(){
    server.send('大家好啊，我是服务端.',port,multicastAddr);
}
server.bind(32123);