const ocanvas = document.getElementById('ocanvas');
const octx = ocanvas.getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fac = new FastAverageColor();
const dcanvas = document.getElementById('dcanvas');
const dctx = dcanvas.getContext('2d');

const acanvas = document.getElementById('acanvas');
const actx = acanvas.getContext('2d');

const fcanvas = document.getElementById('fcanvas');
const fctx = fcanvas.getContext('2d');
//const slider = document.getElementById("xpos");
//const yslider = document.getElementById("ypos");
import pixelmatch from './pixelmatch.js'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var shrek = new Image()
shrek.addEventListener('load', () => {
    octx.drawImage(shrek, 0, 0);
    main();
}, false)
shrek.src = prompt("what image (enter url, has to be 100x75 resolution)", "shrek.webp")

function avgcolor(img, x, y, w, h) {
    var color = fac.getColorFromArray4(img.data);
    return color;
}

var canv;
var dcanv;
var dcanvd;

var final = false;
var wid;
var len;

var stuff = [];

var score = 0;
var bestdiff = 999999;

function getarray(img) {
    return img.data;
}

function main() {

    var randx = randomIntFromInterval(0, 100);
    var randy = randomIntFromInterval(0, 75);

    wid = randomIntFromInterval(1, 100);
    len = randomIntFromInterval(1, 75);

    ctx.clearRect(0, 0, 100, 75);

    if(final) {
        ctx.putImageData(final, 0, 0);
    }

    canv = octx.getImageData(randx, randy, wid, len);
    var col = avgcolor(canv);
    ctx.fillStyle = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
    ctx.fillRect(randx, randy, wid, len);

    dcanv = octx.getImageData(0, 0, 100, 75);
    dcanvd = ctx.getImageData(0, 0, 100, 75);
    const diff = dctx.createImageData(100, 75);
    score = pixelmatch(dcanv.data, dcanvd.data, diff.data, 100, 75, { threshold: 0.1 });
    //console.log(diff);
    dctx.putImageData(diff, 0, 0);
    if (score < bestdiff) {
        bestdiff = score;
        stuff = [randx, randy, wid, len, col];
    }
}

var gen = document.querySelector('#gen');

function go() {
    for (let f = 0; f < 10; f++) {
        for (let c = 0; c < 60; c++) {
            //bestdiff = 999999999;
            main();
            
        }
        //fctx.clearRect(0, 0, 100, 75);
        fctx.fillStyle = `rgb(${stuff[4][0]}, ${stuff[4][1]}, ${stuff[4][2]})`;
        fctx.fillRect(stuff[0], stuff[1], stuff[2], stuff[3]);
        final = fctx.getImageData(0, 0, 100, 75);
    }
}

document.querySelector('#btn').addEventListener('click', go)












/*const ocanvas = document.getElementById('ocanvas');
const octx = ocanvas.getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fac = new FastAverageColor();
const dcanvas = document.getElementById('dcanvas');
const dctx = dcanvas.getContext('2d');

const acanvas = document.getElementById('acanvas');
const actx = acanvas.getContext('2d');

const fcanvas = document.getElementById('fcanvas');
const fctx = fcanvas.getContext('2d');
//const slider = document.getElementById("xpos");
//const yslider = document.getElementById("ypos");
import pixelmatch from './pixelmatch.js'

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

var shrek = new Image()
shrek.addEventListener('load', () => {
    octx.drawImage(shrek, 0, 0);
    main();
}, false)
shrek.src = prompt("what image (enter url, has to be 100x75 resolution)", "shrek.webp")

function avgcolor(img, x, y, w, h) {
    var color = fac.getColorFromArray4(img.data);
    return color;
}

var canv;
var dcanv;
var dcanvd;

var final = false;
var size;

var stuff = [];

var score = 0;
var bestdiff = 999999;

function getarray(img) {
    return img.data;
}

function main() {

    var randx = randomIntFromInterval(0, 100);
    var randy = randomIntFromInterval(0, 75);

    size = randomIntFromInterval(1, 100);

    ctx.clearRect(0, 0, 100, 75);

    if(final) {
        ctx.putImageData(final, 0, 0);
    }

    canv = octx.getImageData(randx, randy, size, size);
    var col = avgcolor(canv);
    ctx.fillStyle = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
    ctx.fillRect(randx, randy, size, size);

    dcanv = octx.getImageData(0, 0, 100, 75);
    dcanvd = ctx.getImageData(0, 0, 100, 75);
    const diff = dctx.createImageData(100, 75);
    score = pixelmatch(dcanv.data, dcanvd.data, diff.data, 100, 75, { threshold: 0.1 });
    //console.log(diff);
    dctx.putImageData(diff, 0, 0);
    if (score < bestdiff) {
        bestdiff = score;
        stuff = [randx, randy, size, col];
    }
}

var gen = document.querySelector('#gen');

function go() {
    for (let f = 0; f < 50; f++) {
        for (let c = 0; c < 30; c++) {
            //bestdiff = 999999999;
            main();
            
        }
        //fctx.clearRect(0, 0, 100, 75);
        fctx.fillStyle = `rgb(${stuff[3][0]}, ${stuff[3][1]}, ${stuff[3][2]})`;
        fctx.fillRect(stuff[0], stuff[1], stuff[2], stuff[2]);
        final = fctx.getImageData(0, 0, 100, 75);
    }
}

document.querySelector('#btn').addEventListener('click', go)*/