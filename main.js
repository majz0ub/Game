var bombs= new Queue;
bombbutton.addEventListener("pointerdown",addBomb);
function joystickMove(event){
    if(joystick.moving){
        var pos={
            x:event.touches[0].clientX,
            y:event.touches[0].clientY
        }
        joystick.angle=Math.atan2(pos.x-joystick.ctr.x,pos.y-joystick.ctr.y);
        if(joystick.angle<0)//fixing the angle to be from 0~359 deg instead of 0~179+-0.1~-179deg
            joystick.angle+=2*Math.PI;
        var dis=distance(pos.x,pos.y,joystick.ctr.x,joystick.ctr.y);
        var pos2=vector(Math.PI/2-joystick.angle,dis,joystick.raduis);
        setTopLeft(joystick.dir,pos2.y+joystick.raduis-0.04*w,pos2.x+joystick.raduis-0.04*w);
        player.bdy.style.transform=`rotate(${Math.PI-joystick.angle}rad)`;
        player.speed=dis;
    }
}
bombbutton.addEventListener("pointerdown",addBomb);
function addBomb(){
    var bumb= document.createElement("p");
    bumb.classList.add('bumb');
    var x=player.x+player.w/2+w*0.01;
    var y=player.y+player.h/2+w*0.01;

    var pos= vector(joystick.angle,player.w/1.5,player.w/1.5);

    bumb.style.top=`${x+pos.x}px`;
    bumb.style.left=`${y+pos.y}px`;
    playground.append(bumb);
    var obj={
        ele:bumb,
        x:x+pos.x,
        y:y+pos.y,
        angle:joystick.angle
    };
    bombs.enqueue(obj);
}
setInterval(moveBombs,100/6);
function moveBombs(){
    for(var i=0;i<bombs.size();i++){
        var angle=bombs.at(i).angle,
            speed=w/200;
        var x = bombs.at(i).x;
        var y = bombs.at(i).y;
        x+=Math.cos(angle)*speed;
        y+=Math.sin(angle)*speed;
        bombs.at(i).ele.style.top=x+'px';
        bombs.at(i).ele.style.left=y+'px';
        bombs.at(i).x=x;
        bombs.at(i).y=y;
    }
    deleteBombs();
}
function deleteBombs(){
    if(bombs.isEmpty()){
        return;
    }
    if(bombs.at(0).x>h||bombs.at(0).y>w||bombs.at(0).x<0||bombs.at(0).y<0){
        playground.removeChild(bombs.at(0).ele);
        bombs.remove(bombs.at(0));
    }
}
