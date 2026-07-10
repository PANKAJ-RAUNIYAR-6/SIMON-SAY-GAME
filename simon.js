//Game State
let gameSeq=[];   
let userSeq=[];   

//Game Settings
let ranbtnsChoose=["red","green","yellow","purple"];

let started=false; 
let level=0; 
let highScore = 0; 
let h2=document.querySelector("h2");

let h3=document.querySelector("h3");

//Display Game Started Message
function showGameStarted() {
    h3.innerText = "🎮 Game Started!";
    h3.style.color="red";
    h3.style.fontSize= "30px";
    
    setTimeout(() => {
        h3.innerText = "";
    }, 1500); 
}

//Start game with keyboard
document.addEventListener("keypress",function(){ 
     if(started==false){  
       console.log("Game is Started");
       started=true;  

showGameStarted();
      
       levelUp();
     }

});


//Flash the randomly selected button
function gameFlash(btn){  
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");  
    },250);

}

//Flash the button clicked by the user
function userFlash(btn){  
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");  
    },250);
}

//Generate the next level and random sequence
function levelUp(){
    //11)
    userSeq=[]; 
    level++; 

    // if(level > highScore){
    //     highScore=level;
    // }

    h2.innerText=`Level - ${level} | High Score : ${highScore}`;  
                                           
    let ranIndex=Math.floor(Math.random()*4);
  
    let ranColor=ranbtnsChoose[ranIndex];
   
    let ranBtn=document.querySelector(`.${ranColor}`);
   
    gameSeq.push(ranColor);
    console.log(gameSeq); 

 
    gameFlash(ranBtn); 
}

//Check if the user's sequence matches the game sequence
function checkAns(idx){ 
    
    if(userSeq[idx]===gameSeq[idx]){

        if(userSeq.length==gameSeq.length){   
            
            setTimeout(levelUp,1000); 
        }
        console.log("same value"); 

    }else{
  
    if(level > highScore){
        highScore = level;
    }
        
        h2.innerHTML=`Game Over! Your Score was:<b>${level}</b><br><br>
        High Score: <b>${highScore}</b><br>
         Press any key or box to start the game`;
       
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{ 
           document.querySelector("body").style.backgroundColor="white";
        },150); 
     
        reset(); 
    }
}


//Handle button clicks
function btnPress() {

    
    if (!started) {
        started = true;
 
showGameStarted();
        levelUp();
        return;
    }

    let whichbtnpress = this;

    userFlash(whichbtnpress);

    let userColor = whichbtnpress.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


//Add click event to all game buttons
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress); 

}

//Reset game after Game Over
function reset(){
    started=false; 
    gameSeq=[]; 
    userSeq=[]; 
    level=0;  

    h3.innerText="";
}