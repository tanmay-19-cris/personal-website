(function script() {
const nekoEl = document.createElement("div");


let nekoPosX = 32;
let nekoPosY = 32;
let mousePosX = 0;
let mousePosY = 0;

// Food trap
let foodActive = false;
let foodX = 0;
let foodY = 0;
let foodEl = null;

let frameCount = 0;
let idleTime = 0;
let idleAnimation = null;
let idleAnimationFrame = 0;

const nekoSpeed = 10;

const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratch: [[-5, 0], [-6, 0], [-7, 0]],
    tired: [[-3, -2]],
    sleeping: [[-2, 0], [-2, -1]],
    N: [[-1, -2], [-1, -3]],
    NE: [[0, -2], [0, -3]],
    E: [[-3, 0], [-3, -1]],
    SE: [[-5, -1], [-5, -2]],
    S: [[-6, -3], [-7, -2]],
    SW: [[-5, -3], [-6, -1]],
    W: [[-4, -2], [-4, -3]],
    NW: [[-1, 0], [-1, -1]]
};

function create() {
    nekoEl.id = "catanimation";
    nekoEl.style.width = "32px";
    nekoEl.style.height = "32px";
    nekoEl.style.position = "fixed";
    nekoEl.style.backgroundImage = "url('./catanimation.gif')";
    nekoEl.style.imageRendering = "pixelated";
    nekoEl.style.left = "16px";
    nekoEl.style.top = "16px";
    nekoEl.style.pointerEvents = "none";
    nekoEl.style.zIndex = "99999";

    document.body.appendChild(nekoEl);

    document.addEventListener("mousemove", function (event) {
        if (!foodActive) {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
        }
    });

    document.addEventListener("click", function (event) {
        if (foodEl) {
            foodEl.remove();
        }

        foodEl = document.createElement("div");
        foodEl.textContent = "🐟";
        foodEl.style.position = "fixed";
        foodEl.style.left = (event.clientX - 8) + "px";
        foodEl.style.top = (event.clientY - 8) + "px";
        foodEl.style.fontSize = "20px";
        foodEl.style.pointerEvents = "none";
        foodEl.style.zIndex = "99998";
        document.body.appendChild(foodEl);

        foodX = event.clientX;
        foodY = event.clientY;
        foodActive = true;

    });

    window.scriptInterval = setInterval(frame, 100);
}

function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = (sprite[0] * 32) + "px " + (sprite[1] * 32) + "px";
}

function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
}

function idle() {
    idleTime += 1;

    if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
        idleAnimation = ["sleeping", "scratch"][Math.floor(Math.random() * 2)];
    }

    switch (idleAnimation) {
        case "sleeping":
            if (idleAnimationFrame < 8) {
                setSprite("tired", 0);
                break;
            }
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            if (idleAnimationFrame > 192) resetIdleAnimation();
            break;

        case "scratch":
            setSprite("scratch", idleAnimationFrame);
            if (idleAnimationFrame > 9) resetIdleAnimation();
            break;

        default:
            setSprite("idle", 0);
            return;
    }

    idleAnimationFrame += 1;
}

function frame() {
    frameCount += 1;

    const targetX = foodActive ? foodX : mousePosX;
    const targetY = foodActive ? foodY : mousePosY;

    const diffX = nekoPosX - targetX;
    const diffY = nekoPosY - targetY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);

if (distance < nekoSpeed || distance < 24) {

    // Cat reached the food
    if (foodActive) {
        foodActive = false;

        // Keep the fish for 5 seconds AFTER arriving
        setTimeout(function () {
            if (foodEl) {
                foodEl.remove();
                foodEl = null;
            }
        }, 5000);
    }

    idle();
    return;
}

    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
    }

    let direction = "";
    if (diffY / distance > 0.5) direction += "N";
    if (diffY / distance < -0.5) direction += "S";
    if (diffX / distance > 0.5) direction += "W";
    if (diffX / distance < -0.5) direction += "E";

    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoEl.style.left = (nekoPosX - 16) + "px";
    nekoEl.style.top = (nekoPosY - 16) + "px";
}

create();


})();
