
var prevSpeed =0;
var currSpeed=0;

function addClass(){
  console.log("In add class");
    let newClass = "speed_" + currSpeed;
    let prevClass = "speed_" + prevSpeed;
    console.log(newClass);
    let el = document.getElementsByClassName("arrow_wrapper")[0];
    let km = document.getElementsByClassName("km")[0]; 

    if(el.classList.contains(prevClass)){
      console.log("inside contains");
        el.classList.remove(prevClass);
        el.classList.add(newClass);
    }
    else{
      el.classList.add(newClass);
    }
       
        km.innerHTML = currSpeed.toString();
        console.log(km.innerHTML);
    
    prevSpeed=currSpeed;
}  

//-------------------------------------------------socket handling------------------------------------------------------------------
const socket =io();

socket.on('speed',(speed)=>{
    currSpeed=speed;
    addClass();
    console.log("Speed: ",speed);
});