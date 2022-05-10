const ocanvas = document.getElementById('ocanvas');
const octx = ocanvas.getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fac = new FastAverageColor();

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

var total = 0;

var canv;
var dcanv;
var dcanvd;

var current = 40;

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
    c++;
    //await null;
    wid = current//randomIntFromInterval(1, 100);
    len = current//randomIntFromInterval(1, 75);

    var randx = randomIntFromInterval(0, 100 - wid / 3);
    var randy = randomIntFromInterval(0, 75 - len / 3);

    ctx.clearRect(0, 0, 100, 75);

    if (final) {
        ctx.putImageData(final, 0, 0);
    }

    canv = octx.getImageData(randx, randy, wid, len);
    var col = avgcolor(canv);
    ctx.fillStyle = `rgb(${col[0]}, ${col[1]}, ${col[2]})`;
    ctx.fillRect(randx, randy, wid, len);

    dcanv = octx.getImageData(0, 0, 100, 75);
    dcanvd = ctx.getImageData(0, 0, 100, 75);
    score = pixelmatch(dcanv.data, dcanvd.data, null, 100, 75, { threshold: 0.1 });
    if (score < bestdiff) {
        bestdiff = score;
        stuff = [randx, randy, wid, len, col];
    }

    //if(c < document.getElementById("tries").value) {
    //  requestAnimationFrame(main);
    //}
}
let c = 0;
let f = 0;
var gen = document.querySelector('#gen');
var thing = 1;

function thingie() {
    //for (let f = 0; f < document.getElementById("gens").value; f++) {
    for (let c = 0; c < document.getElementById("tries").value; c++) {
        //bestdiff = 999999999;

        //c = 0;
        main();

    }
    //fctx.clearRect(0, 0, 100, 75);
    fctx.fillStyle = `rgb(${stuff[4][0]}, ${stuff[4][1]}, ${stuff[4][2]})`;
    fctx.fillRect(stuff[0], stuff[1], stuff[2], stuff[3]);
    final = fctx.getImageData(0, 0, 100, 75);

    //console.log(f);
    total++;
    f++;

    document.getElementById("objs").innerHTML = `objects: ${total}`

    if (f < document.getElementById("gens").value) {
        window.requestAnimationFrame(thingie);
    }
    //}
}

function go() {
    f = 0;
    thingie();
    current = Math.floor(current * 0.75);
    //console.log(current);
    //console.log(thing);
    //thing++;
    console.log("total: " + total);
}

function click() {
    if ( current < 2 ) {
        current = 2;
    }
    document.getElementById("size").innerHTML = `size: ${current}`
    go();
    console.log("hi");
}

function aclick() {
    for(let l = 0; l < 11; l++) {
    if ( current < 2 ) {
        current = 2;
    }
    document.getElementById("size").innerHTML = `size: ${current}`
    go();
    console.log("hi");
    //document.getElementById("tries").value = document.getElementById("tries").value + 5;
}
}

document.querySelector('#btn').addEventListener('click', click);

//document.querySelector('#abtn').addEventListener('click', aclick);

/*
const ocanvas = document.getElementById('ocanvas');
const octx = ocanvas.getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const fac = new FastAverageColor();

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

var total = 0;

var canv;
var dcanv;
var dcanvd;

var current = 40;

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
    wid = current//randomIntFromInterval(1, 100);
    len = current//randomIntFromInterval(1, 75);

    var randx = randomIntFromInterval(0, 100 - wid / 3);
    var randy = randomIntFromInterval(0, 75 - len / 3);

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
    score = pixelmatch(dcanv.data, dcanvd.data, null, 100, 75, { threshold: 0.1 });
    if (score < bestdiff) {
        bestdiff = score;
        stuff = [randx, randy, wid, len, col];
    }
}

var gen = document.querySelector('#gen');
var thing = 1;
async function go() {
    await null;
    for (let f = 0; f < document.getElementById("gens").value; f++) {
        for (let c = 0; c < document.getElementById("tries").value; c++) {
            //bestdiff = 999999999;
            main();
            
        }
        //fctx.clearRect(0, 0, 100, 75);
        fctx.fillStyle = `rgb(${stuff[4][0]}, ${stuff[4][1]}, ${stuff[4][2]})`;
        fctx.fillRect(stuff[0], stuff[1], stuff[2], stuff[3]);
        final = fctx.getImageData(0, 0, 100, 75);

        console.log(f);
        total++;
    }
    current = current * 0.75;
    console.log(current);
    console.log(thing);
    thing++;
    console.log("total: " + total);
}

function click() {
    go();
    console.log("hi");
}

document.querySelector('#btn').addEventListener('click', click);
*/