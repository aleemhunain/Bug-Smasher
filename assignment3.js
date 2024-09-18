window.addEventListener("load", setupGame);

console.log("1");
function setupGame() {

    //set up header
    let header = document.getElementById("gameheader");
    header.style.width = "512px";
    header.style.height = "75px";

    //set up scoretitle
    let scoretit = document.getElementById("scoretitle");

    //set up score and title
    let score = document.getElementById("score");
    score.innerText = "Score: ";
    let title = document.getElementById("title");
    title.innerText = "BugSmasher";

    //set up reset score
    let resscore = document.getElementById("resscore");
    let resscoreBtn = document.createElement("button");
    resscoreBtn.type = "button";
    resscore.appendChild(resscoreBtn);
    resscoreBtn.innerText = "Reset Score";
    resscoreBtn.classList.add("reset");

    //set up reset speed
    let resspeed = document.getElementById("resspeed");
    let resspeedBtn = document.createElement("button");
    resspeedBtn.type = "button";
    resspeed.appendChild(resspeedBtn);
    resspeedBtn.innerText = "Reset Speed";
    resspeedBtn.classList.add("reset");

    //set up canvas
    let canvasBox = document.getElementById("canvas");
    canvasBox.style.width = "512px";
    canvasBox.style.height = "480px";
    canvasBox.style.backgroundColor = "red";
    let canvas = document.createElement("canvas");
    let cantxt = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 480;
    canvasBox.appendChild(canvas);


    //set up image background
    let bgReady = false;
    let bgImage = new Image();
    bgImage.onload = function() {
        bgReady = true;
    };
    bgImage.src = "background.png";

    //set up bug image
    let bugReady = false;
    let bugImage = new Image();
    bugImage.onload = function() {
        bugReady = true;
    };
    bugImage.src = "ladybug.gif";

    //set up bug destination, delete later
    let destReady = false;
    let destImage = new Image();
    destImage.onload = function() {
        destReady = true;
    };
    destImage.src = "dest.png";

    //game object s
    var mouse = {
        x: -5,
        y: -5
    }
    var ladybug = {
        speed: 150,
        x: 0, 
        y: 0,
        destX: 0,
        destY: 0,
        dirX: 0,
        dirY: 0
    };

    var bugsSmashed = 0;

    //handle keyboard controls, will implement maybe
    var clickDown = false;

    addEventListener("mousedown", function(e) {
        clickDown = true;
        let rect = canvas.getBoundingClientRect()
        let cursX = e.clientX;
        let cursY = e.clientY;
        mouse.x = cursX - rect.left;
        mouse.y = cursY- rect.top;
    }, false);

    addEventListener("mouseup", function(e) {
        clickDown = false;
        mouse.x = -5;
        mouse.y = -5;
    }, false);

    //set up the initial bug position
    var reset = function () {
        mouse.x = -5;
        mouse.y = -5;

        ladybug.x = (Math.random() * (canvas.width - bugImage.width));
        ladybug.y = (Math.random() * (canvas.height - bugImage.height));

        ladybug.destX = (Math.random() * (canvas.width - bugImage.width));
        ladybug.destY = (Math.random() * (canvas.height - bugImage.height));

        let pointX = ladybug.destX + 0.5*bugImage.width;
        let pointY = ladybug.destX + 0.5*bugImage.height;

        let absTot = Math.abs(pointX - ladybug.x) + Math.abs(pointY - ladybug.y);
        let deltaX = (pointX - ladybug.x)/absTot;
        let deltaY = (pointY - ladybug.y)/absTot;

        ladybug.dirX = deltaX;
        ladybug.dirY = deltaY;
    }

    //update game objects
    var update = function(modifier) {

        //ladybug motion
        ladybug.x = ladybug.x + ladybug.dirX*ladybug.speed*modifier;
        ladybug.y = ladybug.y + ladybug.dirY*ladybug.speed*modifier;

        //wall collision reset
        if ((ladybug.x <= 0) || (ladybug.x >= (canvas.width - bugImage.width))) {
            reset();
        } else if ((ladybug.y <= 0) || (ladybug.y >= (canvas.height - bugImage.height))) {
            reset();
        }

        //mouse detection click event
        if (clickDown) {
            if ((ladybug.x <= mouse.x) && ((ladybug.x + bugImage.width) >= mouse.x)
                && (ladybug.y <= mouse.y) && ((ladybug.y + bugImage.height) >= mouse.y)) {
                    console.log("clicked");
                    clickDown = false;
                    bugsSmashed += 1;
                    ladybug.speed += 45;
                    reset();
            }
        }
    }

    //draw everything
    var render = function() {
        if (bgReady) {
            cantxt.drawImage(bgImage, 0, 0);
        }
        if (bugReady) {
            cantxt.drawImage(bugImage, ladybug.x, ladybug.y);
        }

        //score
        score.innerText = "Score: " + bugsSmashed.toString();
    }

    //the main game loop
    var main = function() {
        var now = Date.now();
        var delta = now - then;

        update(delta/ 1000);
        render();

        then = now;

        requestAnimationFrame(main);
    };

    var then = Date.now();
    reset();
    main();

    resspeedBtn.addEventListener("click", function (e) {
        ladybug.speed = 150;
    }, false)

    resscoreBtn.addEventListener("click", function (e) {
        bugsSmashed = 0;
        ladybug.speed = 150;
    }, false)

}