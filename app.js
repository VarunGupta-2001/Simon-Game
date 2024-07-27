let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");
let started = "false";
let level = 0;
let colors = ['red','green','yellow','purple'];
let btns = document.querySelectorAll(".btn");
let score = 0;
let highScore = 0;
let h2 = document.querySelector(".high_score");
document.addEventListener("keypress",function(){
    if(started == "false"){
        started = "true";
        levelUp();
    }
});

function levelUp(){
    level++;
    h3.innerText = `level = ${level}`;
    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = colors[randomIdx];
    gameSeq.push(randomColor);
    gameFlash(randomColor);
    userSeq=[];
}

function gameFlash(color){
    let btn = document.querySelector(`.${color}`);
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },150);
}

function check(idx){
    console.log(`user seq = ${userSeq[idx]}`);
    console.log(`game seq = ${gameSeq[idx]}`);
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,500);
        }
    }else{
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        score = level;
        if(score > highScore){
            highScore = score;
            h2.innerText = `High Score = ${highScore}`;
        }
        h3.innerHTML = `Game Over! Your score was ${score} <br>Press any key to start`;
        reset();
    }
}

for(btn of btns){
    btn.addEventListener("click",function(){
        let btnClick = this;
        btnClick.classList.add("userFlash");
        setTimeout(function(){
            btnClick.classList.remove("userFlash");
        },150);

        let color = btnClick.getAttribute("id");
        userSeq.push(color);

        check(userSeq.length-1);
    })
}

function reset(){
    started = "false";
    gameSeq = [];
    userSeq = [];
    level = 0;
}