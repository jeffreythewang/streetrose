var canvas;
var gl;
var length = 0.5;
var time = 0.0;
var timer = new Timer();
var omega = 60;

var time_stopped = false;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;

var myTexture1;
var myTexture2;
var bgTexture;

var viewMatrix;
var projectionMatrix;
var mvpMatrix;
var rotateTexture;

var shininess = 50;
var lightPosition = vec3(0.0, 0.0, 0.0);

var eye = vec3(0, 0.2, 1.5);
var at = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

var uv1 = [];
var uv2 = [];
var uvBackground = [];

var x_t = 0;
var y_t = 0;
var z_t = 0;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    vertices = [
        vec3(  length,   length, length ), //vertex 0
        vec3(  length,  -length, length ), //vertex 1
        vec3( -length,   length, length ), //vertex 2
        vec3( -length,  -length, length ),  //vertex 3
        vec3(  length,   length, -length ), //vertex 4
        vec3(  length,  -length, -length ), //vertex 5
        vec3( -length,   length, -length ), //vertex 6
        vec3( -length,  -length, -length )  //vertex 7
    ];

    var points = [];
    var normals = [];
    uv1 = [];
    uv2 = [];
    Cube(vertices, points, normals, uv1, false);
    Cube(vertices, points, normals, uv2, true);

    myTexture1 = gl.createTexture();
    myTexture1.image = new Image();
    myTexture1.image.onload = function(){
    	gl.bindTexture(gl.TEXTURE_2D, myTexture1);
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, myTexture1.image);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    	gl.generateMipmap(gl.TEXTURE_2D);
    	gl.bindTexture(gl.TEXTURE_2D, null);
    }

    myTexture1.image.src = "../Images/chrome.jpg";

    myTexture2 = gl.createTexture();
    myTexture2.image = new Image();
    myTexture2.image.onload = function(){
        gl.bindTexture(gl.TEXTURE_2D, myTexture2);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, myTexture2.image);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    myTexture2.image.src = "../Images/chrome.jpg";

    initBackground();

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    positionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    normalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, normalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );

    uvBuffer1 = gl.createBuffer();

    uvBuffer2 = gl.createBuffer();

    uvBackgroundBuffer = gl.createBuffer();

    ATTRIBUTE_position = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( ATTRIBUTE_position );

    ATTRIBUTE_normal = gl.getAttribLocation( program, "vNormal" );
    gl.enableVertexAttribArray( ATTRIBUTE_normal );

    ATTRIBUTE_uv = gl.getAttribLocation( program, "vUV" );
    gl.enableVertexAttribArray( ATTRIBUTE_uv);

    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    gl.vertexAttribPointer( ATTRIBUTE_position, 3, gl.FLOAT, false, 0, 0 );

    gl.bindBuffer( gl.ARRAY_BUFFER, normalBuffer );
    gl.vertexAttribPointer( ATTRIBUTE_normal, 3, gl.FLOAT, false, 0, 0 );

    UNIFORM_mvMatrix = gl.getUniformLocation(program, "mvMatrix");
    UNIFORM_pMatrix = gl.getUniformLocation(program, "pMatrix");
    UNIFORM_lightPosition = gl.getUniformLocation(program, "lightPosition");
    UNIFORM_shininess = gl.getUniformLocation(program, "shininess");
    UNIFORM_sampler = gl.getUniformLocation(program, "uSampler");
    UNIFORM_rotateTexture = gl.getUniformLocation(program, "rotateTexture");

    viewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(90, 1, 0.001, 1000);

    timer.reset();
    gl.enable(gl.DEPTH_TEST);

    window.addEventListener('keydown', handleKeydown);

    render();
}

function Cube(vertices, points, normals, uv, scale){
    Quad(vertices, points, normals, uv, 0, 1, 2, 3, vec3(0, 0, 1), scale);
    Quad(vertices, points, normals, uv, 4, 0, 6, 2, vec3(0, 1, 0), scale);
    Quad(vertices, points, normals, uv, 4, 5, 0, 1, vec3(1, 0, 0), scale);
    Quad(vertices, points, normals, uv, 2, 3, 6, 7, vec3(1, 0, 1), scale);
    Quad(vertices, points, normals, uv, 6, 7, 4, 5, vec3(0, 1, 1), scale);
    Quad(vertices, points, normals, uv, 1, 5, 3, 7, vec3(1, 1, 0 ), scale);
}

function Quad( vertices, points, normals, uv, v1, v2, v3, v4, normal, scale){

    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);
    normals.push(normal);

    if (!scale) {
        uv.push(vec2(0,0));
        uv.push(vec2(1,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,0));
        uv.push(vec2(1,1));
        uv.push(vec2(0,1));
    } else {
        uv.push(vec2(0,0));
        uv.push(vec2(2,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,0));
        uv.push(vec2(2,2));
        uv.push(vec2(0,2));
    }

    points.push(vertices[v1]);
    points.push(vertices[v3]);
    points.push(vertices[v4]);
    points.push(vertices[v1]);
    points.push(vertices[v4]);
    points.push(vertices[v2]);
}

function initBackground() {
    bgTexture = gl.createTexture();
    bgTexture.image = new Image();
    bgTexture.image.onload = function(){
    	gl.bindTexture(gl.TEXTURE_2D, bgTexture);
    	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bgTexture.image);
    	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    	//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    	gl.bindTexture(gl.TEXTURE_2D, null);
    }

    bgTexture.image.src = "../Images/space.jpg";
}

function drawBackground() {
    uvBackground = [
        vec2(-1, -1),
        vec2(1, -1),
        vec2(1, 1),
        vec2(-1, 1),
    ];

    gl.bindBuffer( gl.ARRAY_BUFFER, uvBackgroundBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(uvBackground), gl.STATIC_DRAW );
    gl.vertexAttribPointer( ATTRIBUTE_uv, 2, gl.FLOAT, false, 0, 0 );
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, bgTexture);

    //gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4);
}

function displayCar() {
    var mvMatrix = mult(viewMatrix, rotate(0, [0, 1, 0]));
    mvMatrix = mult(mvMatrix, translate(vec3(0, 0, 1.2)));
    mvMatrix = mult(mvMatrix, scale(vec3(.1, .1, .1)));

    gl.bindBuffer( gl.ARRAY_BUFFER, uvBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(uv1), gl.STATIC_DRAW );
    gl.vertexAttribPointer( ATTRIBUTE_uv, 2, gl.FLOAT, false, 0, 0 );
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture1);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.uniform3fv(UNIFORM_lightPosition,  flatten(lightPosition));
    gl.uniform1f(UNIFORM_shininess,  shininess);
    gl.uniform1i(UNIFORM_sampler, 0)

    gl.drawArrays( gl.TRIANGLES, 0, 36);
}

function animateRoad() {
    var mvMatrix = mult(viewMatrix, rotate(0, [0, 1, 0]));

    gl.bindBuffer( gl.ARRAY_BUFFER, uvBuffer1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(uv1), gl.STATIC_DRAW );
    gl.vertexAttribPointer( ATTRIBUTE_uv, 2, gl.FLOAT, false, 0, 0 );
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture1);

    gl.uniformMatrix4fv(UNIFORM_mvMatrix, false, flatten(mvMatrix));
    gl.uniformMatrix4fv(UNIFORM_pMatrix, false, flatten(projectionMatrix));

    gl.drawArrays( gl.TRIANGLES, 0, 36);
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    time += timer.getElapsedTime() / 1000;

    drawBackground();
    displayCar();

    window.requestAnimFrame( render );
}

// Event handler for keydown events
function handleKeydown(e) {
    switch(e.keyCode) {
        /* Car Direction Keys */
        case 87: // 'w' key for forward
            z_t += 0.25;
            break;
        case 65: // 'a' key for left
            x_t += 0.25;
            break;
        case 83: // 's' key for backwards
            z_t -= 0.25;
            break;
        case 68: // 'd' key for right
            x_t -= 0.25;
            break;

        /* Direction Keys */
        case 73: // 'i' key for forward
            z_t += 0.25;
            break;
        case 79: // 'o' key for backwards
            z_t -= 0.25;
            break;
    }
}
