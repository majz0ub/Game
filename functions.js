var w=window.innerWidth;
var h = window.innerHeight;
var playground = document.getElementById('playground');
var joystick={
    bdy:document.getElementById('joystick'),
    ctr:{
        x:0.2*w,
        y:0.2*w
    },
    dir:document.getElementById("joystickControler"),
    angle:Math.PI/2,//1.57rad
    raduis:0.1*w,
    moving:false
};
var player = { 
    bdy:createObject("player",w/10,w/10,playground),
    x:0.45*w,
    y:0.5*h-2*w/5,
    w:0.1*w,
    h:0.1*w,
    speed:0
}
var bombbutton=document.getElementById('bombbutton');
joystick.bdy.addEventListener("touchstart",e=>{joystickStart(e)});
playground.addEventListener("touchmove",e=>{joystickMove(e)});
joystick.bdy.addEventListener("touchend",e=>{joystickEnd(e)});
function joystickStart(event){
    joystick.moving=true;
}
function joystickEnd(event){
    joystick.moving=false;
    setTopLeft(joystick.dir,joystick.raduis-0.04*w,joystick.raduis-0.04*w);
}
setTopLeft(player.bdy,player.x,player.y);
function movePlayer(){
    if(joystick.moving){
        var angle=joystick.angle,
            speed=player.speed/40,
            maxspeed=w/250;
        speed=speed>maxspeed?maxspeed:speed;
        var pos=vector(angle,speed,speed);
        player.x+=pos.x;
        player.y+=pos.y;
        if(player.x+player.h/20<=0||player.x+player.h/5>=h-player.h){
            player.x-=pos.x;
        }if(player.y+player.w/20<=0||player.y+player.w/5>=w-player.w){
            player.y-=pos.y;
        }
        setTopLeft(player.bdy,player.x,player.y);
    }
}
setInterval(movePlayer,50/3);
var vector=function(angle,len,maxlen){
    if(len>maxlen)len=maxlen;
    return {
        x:Math.cos(angle)*len,
        y:Math.sin(angle)*len
    }
}
function distance(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));}

function setTopLeft(obj,x,y){
    obj.style.top =`${x}px`;
    obj.style.left=`${y}px`;
}
function createObject(objId,w,h,parrent){
    var obj= document.createElement('canvas');
    var context = obj.getContext('2d');
    obj.width=100;
    obj.height=100;
    obj.style.width=`${w}px`;
    obj.style.height=`${h}px`;
    obj.id=objId;
    parrent.append(obj);
    context.fillStyle="white";
    context.fillRect(0,20,20,80);
    context.fillRect(80,20,20,80);
    context.fillStyle='black';
    context.fillRect(0,25,20,10);
    context.fillRect(80,25,20,10);
    context.fillRect(0,45,20,10);
    context.fillRect(80,45,20,10);
    context.fillRect(0,65,20,10);
    context.fillRect(80,65,20,10);
    context.fillRect(0,85,20,10);
    context.fillRect(80,85,20,10);
    context.fillStyle=("rgba(0,100,0,100%)");
    context.fillRect(10,30,80,60);
    context.fillStyle="rgba(0,205,0,95%)";
    context.fillRect(20,40,60,40);
    context.fillRect(47.5,0,5,40);
    context.stroke();
    return obj;
}
