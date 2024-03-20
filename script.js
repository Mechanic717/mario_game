score = 0;
cross = true;

audiogo = new Audio('gameover.mp3');
audio = new Audio('music.mp3');

window.addEventListener('load', function() {
    setTimeout(() => {
        audio.play();
    }, 1000);
});

document.onkeydown = function(e) {
    if (e.keyCode == 38) {
        mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        setTimeout(() => {
            mario.classList.remove('animateMario');
        }, 700);
    }
    if (e.keyCode == 39) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = marioX + 112 + 'px';
    }
    if (e.keyCode == 37) {
        mario = document.querySelector('.mario');
        marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = marioX - 112 + 'px';
    }
}

// Define a variable to store the interval ID
let intervalId;

// Start the interval and store its ID
intervalId = setInterval(() => {
    let mario = document.querySelector('.mario');
    let gameOver = document.querySelector('.gameOver');
    let obstacle = document.querySelector('.obstacle');

    const marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    const marioY = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    const obstacleX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const obstacleY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(marioX - obstacleX);
    const offsetY = Math.abs(marioY - obstacleY);
    // console.log(offsetX, offsetY);
    function updateScore(score) {
        scoreCont.innerHTML = "Your Score:" + score;
    }

    if (offsetX < 73 && offsetY < 100) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni');
        mario.classList.add('godown');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        // Clear the interval when the game is over
        clearInterval(intervalId);
    } else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.2;
            obstacle.style.animationDuration = newDur + 's';
            console.log(newDur);
        }, 500);
    }
}, 10);
