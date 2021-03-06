var length = 0.5;
var time = 0.0;
var omega = 60;

var time_stopped = false;

var myTexture1;
var myTexture2;
var bgTexture;

var shininess = 50;
var lightPosition = vec3(0.0, 0.0, -1.0);

var uv1 = [];
var uv2 = [];

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

    points = [];
    normals = [];
    uv1 = [];
    uv2 = [];

    viewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(90, 1, 0.001, 1000);

    timer = new Timer();
    timer.reset();
    gl.enable(gl.DEPTH_TEST);

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);


  	skybox = new Skybox();
    NSMutableCar = new Car();
    single_intro = new Intro();
    single_sweetrose = new SweetRose();
    generateBuildings(master_grid, buildingActors);

    bindBuffers();

    render();
}

function generateBuildings(map, actors) {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j] === o) {
        var height = Math.floor(Math.random() * 3) + 1;
        var building = new Building(i, 0, j, 0.45, height);
        actors.push(building);
      }
    }
  }
}

function bindBuffers() {
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    positionBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    normalBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, normalBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );

    uvBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, uvBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(uv), gl.STATIC_DRAW );

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

    gl.bindBuffer( gl.ARRAY_BUFFER, uvBuffer );
    gl.vertexAttribPointer( ATTRIBUTE_uv, 2, gl.FLOAT, false, 0, 0 );

    UNIFORM_mvMatrix = gl.getUniformLocation(program, "mvMatrix");
    UNIFORM_pMatrix = gl.getUniformLocation(program, "pMatrix");
    UNIFORM_lightPosition = gl.getUniformLocation(program, "lightPosition");
    UNIFORM_shininess = gl.getUniformLocation(program, "shininess");
    UNIFORM_sampler = gl.getUniformLocation(program, "uSampler");
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
