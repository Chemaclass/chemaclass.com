const snowflakesCount = 35;

let bodyHeightPx = null;
let pageHeightVh = null;

function setHeightVariables() {
    bodyHeightPx = document.documentElement.offsetHeight;
    pageHeightVh = (100 * bodyHeightPx / window.innerHeight) - 5;
}

function showSnow(isShowSnow) {
    if (isShowSnow) {
        document.getElementById('snow').style.display = "block";
    } else {
        document.getElementById('snow').style.display = "none";
    }
}

function generateSnowflakes(snowDensity) {
    snowDensity -= 1;
    const snowWrapper = document.getElementById('snow');
    snowWrapper.innerHTML = '';
    for (let i = 0; i < snowDensity; i++) {
        let board = document.createElement('div');
        board.className = "snowflake";
        snowWrapper.appendChild(board);
    }
}

function getOrCreateCSSElement() {
    let cssElement = document.getElementById("psjs-css");
    if (cssElement) {
        return cssElement;
    }

    cssElement = document.createElement('style');
    cssElement.id = 'psjs-css';
    document.head.appendChild(cssElement);
    return cssElement;
}

// Append style for each snowflake to the head
function addCSS(rule) {
    const cssElement = getOrCreateCSSElement();
    cssElement.innerHTML = rule; // safe to use innerHTML
    document.head.appendChild(cssElement);
}

function randomInt(value = 100) {
    return Math.floor(Math.random() * value) + 1;
}

function randomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// Create style for snowflake
function generateSnowCSS(snowDensity = 50) {
    let snowflakeName = "snowflake";
    let rule = ``;

    for (let i = 1; i < snowDensity; i++) {
        let randomX = Math.random() * 100 - 10; // vw
        let randomOffset = Math.random() * 10 // vw;
        let randomXEnd = randomX + randomOffset;
        let randomXEndYoyo = randomX + (randomOffset / 2);
        let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
        let randomYoyoY = randomYoyoTime * pageHeightVh; // vh
        let randomScale = Math.random();
        let fallDuration = randomIntRange(50, pageHeightVh / 10 * 3); // s
        let fallDelay = randomInt(pageHeightVh / 10 * 3) * -1; // s
        let opacity = Math.random();

        rule += `
      .${snowflakeName}:nth-child(${i}) {
        opacity: ${opacity};
        transform: translate(${randomX}vw, -10px) scale(${randomScale});
        animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
      }
      @keyframes fall-${i} {
        ${randomYoyoTime * 100}% {
          transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
        }
        to {
          transform: translate(${randomXEndYoyo}vw, ${pageHeightVh}vh) scale(${randomScale});
        }
      }
    `
    }
    addCSS(rule);
}

// Load the rules and execute after the DOM loads
function createSnow(isShowSnow) {
    setHeightVariables();
    generateSnowCSS(snowflakesCount);
    generateSnowflakes(snowflakesCount);
    showSnow(isShowSnow);
}

function isChristmas() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return (month === 12) || (month === 1 && day <= 15);
}

// Enable / disable snowflakes from toggle button in menu
const SNOW_KEY = 'snow';
const ENABLE_SNOW = 'show';
const DISABLE_SNOW = 'hide';

const toggleSnow = document.getElementById('toggle-snow');

if (isChristmas() === false) {
    localStorage.removeItem(SNOW_KEY);
    toggleSnow.style.display = "none";
} else {
    if (localStorage.getItem(SNOW_KEY) === ENABLE_SNOW) {
        localStorage.setItem(SNOW_KEY, ENABLE_SNOW);
    }

    if (localStorage.getItem(SNOW_KEY) === ENABLE_SNOW) {
        // toggleSnow.innerHTML = "⛄️";
        toggleSnow.innerHTML = "❅️";
        createSnow(true);
    } else {
        // toggleSnow.innerHTML = "☃️";
        toggleSnow.innerHTML = "❆";
        createSnow(false);
    }
}

function toggleSnowMethod() {
    if (localStorage.getItem(SNOW_KEY) !== ENABLE_SNOW) {
        localStorage.setItem(SNOW_KEY, ENABLE_SNOW);
        // toggleSnow.innerHTML = "⛄️"
        toggleSnow.innerHTML = "❅️";
        createSnow(true);
    } else {
        localStorage.setItem(SNOW_KEY, DISABLE_SNOW);
        // toggleSnow.innerHTML = "☃️";
        toggleSnow.innerHTML = "❆";
        createSnow(false);
    }
}

toggleSnow.addEventListener('click', toggleSnowMethod);
