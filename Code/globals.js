var canvas;
var gl;

var UNIFORM_mvpMatrix;
var UNIFORM_lightPosition;
var UNIFORM_shininess;
var ATTRIBUTE_position;
var ATTRIBUTE_normal;

var positionBuffer;
var normalBuffer;

var viewMatrix;
var projectionMatrix;
var mvpMatrix;
var rotateTexture;

var time = 0.0;
var timer;

var points = [];
var normals = [];
var uv = [];

var eye_x = 0;
var eye_y = 0.2;
var eye_z = -0.4;

var eye = vec3(eye_x, eye_y, eye_z);
var at = vec3(0, 0, 0);
var up = vec3(0, 1, 0);

// stores objects of all the data
// [ [objectA vertexBegin, objectA numVertices],
//   [objectB vertexBegin, objectB numVertices],
//   [objectC vertexBegin, objectC numVertices] ];
var buildingActors = [];
var treeActors = [];
var NSMutableCar;
var single_intro;

var skybox;

var CAR_wheel_turn = 0; // position relative to car
var CAR_wheel_position = 0; // position relative to physical grid
var CAR_wheel_turning = false;
var CAR_position = 0;
var CAR_angle = 0;
var CAR_isRotating = false;

var in_intro = true;
var intro_offset = 0;

var in_sweetrose = false;

var o = 'o';
var r = 'r';

var master_grid = [//0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
                    [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o], // 0
                    [o, r, r, r, o, r, r, r, r, r, r, o, o, o, o, o], // 1
                    [o, o, o, r, o, r, o, o, o, o, r, o, r, r, r, o], // 2
                    [o, o, r, r, o, r, o, o, r, r, r, o, r, o, r, o], // 3
                    [o, o, r, o, o, r, o, o, r, o, o, o, r, o, r, o], // 4
                    [o, o, r, r, r, r, o, o, r, o, o, o, r, o, r, o], // 5
                    [o, o, o, o, o, o, o, o, r, r, r, r, r, o, r, o], // 6
                    [o, o, o, o, o, o, o, o, o, o, o, o, o, o, r, o], // 7
                    [o, r, r, r, o, o, r, r, r, o, r, r, r, r, r, o], // 8
                    [o, r, o, r, o, o, r, o, r, o, r, o, o, o, o, o], // 9
                    [o, r, o, r, o, o, r, o, r, o, r, o, o, o, o, o], // 0
                    [o, r, o, r, r, r, r, o, r, r, r, o, o, o, o, o], // 1
                    [o, r, o, o, o, o, o, o, o, o, o, o, o, o, o, o], // 2
                    [o, r, o, o, o, o, o, o, o, o, o, o, o, o, o, o], // 3
                    [o, r, r, r, r, r, r, r, r, r, r, r, r, r, r, o], // 4
                    [o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o], // 5
                  ];


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

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function formatTime(time) {
  var sec_num = parseInt(time, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
}
