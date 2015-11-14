(function () {
    "use strict";
    var myDiv, pos, animID, scrollLimit, fullscreen, playBttn, speed = 1;

    function scroll() {
        if (pos <= scrollLimit) {
            myDiv.scrollTop = pos;
            pos += speed;
            animID = window.requestAnimationFrame(scroll);
        } else {
            window.cancelAnimationFrame(animID);
            playBttn.textContent = ">";
        }
    }

    function startAnim() {
        if (playBttn.textContent === ">") {
            playBttn.textContent = "||";
            // It also needs to be also set through a resize event.
            scrollLimit = myDiv.scrollHeight - myDiv.clientHeight;
            if (myDiv.scrollTop === scrollLimit) {
                myDiv.scrollTop = 0;
            }
            animID = window.requestAnimationFrame(scroll);
            pos = myDiv.scrollTop;
        } else {
            playBttn.textContent = ">";
            window.cancelAnimationFrame(animID);
        }
    }

    function makeFullscreen() {
        // Need to make an event to detect another way that fullscreen can change.
        if (fullscreen.checked) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            }
        } else {
            document.webkitExitFullscreen();
        }
    }

    function init() {
        myDiv = document.querySelector('#content');
        fullscreen = document.querySelector('#fullscreen');
        playBttn = document.querySelector('#anim');
        playBttn.addEventListener("click", startAnim);
        fullscreen.addEventListener("click", makeFullscreen);
    }

    window.addEventListener("load", init);
}());