/**
* @description : draw an heart applying an equation
*                from https://math.stackexchange.com/questions/12098/drawing-heart-in-mathematica
*
* @author cxts
* @github https://github.com/cxts
* @date 16/03/2020
* @required Draw.js, misc.js, Vector.js
* @param none
* @return none
*
**/


const xMin = 0;  // TUNNING
const xMax = 1.139  // TUNNING
const xInc = xMax / 50;  // TUNNING
const heartSize = 50;  // TUNNING
var x = xMin;
var rateSpeed = 1;  // TUNNING
var sizeDisplay = 1;  // TUNNING
var center = new Vector(width / 2, height / 2);  // TUNNING

var color = "#FF007F";  // TUNNING
var color2 = "rgba(255, 0, 200, .1)";  // TUNNING
var heartPoints = [];

// ray tracing option
var p = new Vector(width / 2, height / 2);  // TUNNING


// right part of the heart for x E [0;1,139]
// and then create the left curve by inverting the x sign at the end
/**
* @description : first set the right part of the heart for x E [0;1,139]
*                and then create the left curve by inverting the x sign at the end
*                finally draw the heart shape
*
* @param {NUMBER} rateSpeed : value of the rateSpeed var already set at the beginning of the script
* @param {OBJECT} center : Vector object already set at the beginning of the script
* @return {VOID}
*
**/
function drawHeart(rateSpeed, center) {
    // limiting display speed
    if(rateSpeed % 1 == 0 && x <= xMax) {
        let exp23 = 2 / 3,
            exp43 = 4 / 3;

        // heart tracing formula from https://math.stackexchange.com/questions/12098/drawing-heart-in-mathematica
        let yPos,
            yNeg;


        yPos = yNeg = Math.pow(x, exp23);
        let underRootPart = Math.pow(x, exp43) + 4 - (4 * x * x);
        if(underRootPart < 0) {
            let rootPart = -Math.sqrt(-underRootPart);
            yPos += rootPart;
            yNeg -= rootPart;
        } else {
            let rootPart = Math.sqrt(underRootPart);
            yPos += rootPart;
            yNeg -= rootPart;
        }

        yPos /= -2;
        yNeg /= -2;
        let vPosRight = new Vector(x, yPos);
        let vNegRight = new Vector(x, yNeg);
        let vPosLeft = new Vector(-x, yPos);
        let vNegLeft = new Vector(-x, yNeg);
        vPosRight.mult(heartSize);
        vNegRight.mult(heartSize);
        vPosLeft.mult(heartSize);
        vNegLeft.mult(heartSize);

        vPosRight.add(center);
        vNegRight.add(center);
        vPosLeft.add(center);
        vNegLeft.add(center);

        heartPoints.push(vPosRight, vNegRight, vPosLeft, vNegLeft );
        vPosRight.display(ctx, sizeDisplay, false ,true ,color );
        vNegRight.display(ctx, sizeDisplay, false ,true ,color );
        vPosLeft.display(ctx, sizeDisplay, false ,true ,color );
        vNegLeft.display(ctx, sizeDisplay, false ,true ,color );


        // ray tracing option
        // /*
        vPosRight.arrowFrom(ctx, p, color2);
        vNegRight.arrowFrom(ctx, p, color2);
        vPosLeft.arrowFrom(ctx, p, color2);
        vNegLeft.arrowFrom(ctx, p, color2);
        // */
    }
}


/**
* @description : called by window.requestAniamtionFrame(), draw the entire animation on canvas
* @param NONE
* @return {VOID}
*
**/
function draw() {
    rateSpeed++;
    if(x < xMax) {
        // move a particle randomly around the heart shape, works with section // ray tracing option
        p.move(getRandom(0, width), getRandom(0, height));  // TUNNING
        //
        drawHeart(rateSpeed, center);
        x = (x + xInc > xMax) ? 1.139 : x + xInc;
        if(!__paused) {
            window.requestAnimationFrame(draw);
        }
    }
}
window.requestAnimationFrame(draw);
